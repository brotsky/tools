import { createYoga, YogaInitialContext } from 'graphql-yoga';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { NextApiRequest } from 'next';
import { GraphQLSchema } from 'graphql';
import { logger as baseLogger } from '@/utils/index';

/**
 * Type for the GraphQL context that will be available in resolvers
 */
export type GqlContext<UserType = any> = {
  user: UserType | null;
  logger: typeof baseLogger;
};

/**
 * Options for creating a GraphQL API route
 */
export interface CreateGraphQLRouteOptions<UserType = any> {
  /**
   * GraphQL schema for the API
   */
  schema: GraphQLSchema;

  /**
   * Optional path for the GraphQL endpoint (defaults to "/api/graphql")
   */
  graphqlEndpoint?: string;

  /**
   * Function to get the current user from the request
   * @param request The incoming request
   * @param logger Logger instance for debugging
   */
  getUserFromRequest?: (
    request: NextApiRequest,
    logger: typeof baseLogger
  ) => Promise<UserType | null>;

  /**
   * Maximum duration in seconds for the route handler (for serverless functions)
   * This is used in the route file, not directly in this utility
   */
  _maxDuration?: number;

  /**
   * Whether to mask errors in production (defaults to true)
   */
  maskedErrors?: boolean;

  /**
   * Whether to show the GraphQL landing page (defaults to false)
   */
  landingPage?: boolean;
}

/**
 * Creates handlers for a Next.js GraphQL API route with proper typing and logging
 *
 * @param options Configuration options for the GraphQL API
 * @returns Object with POST and GET handlers and the Yoga instance
 *
 * @example
 * ```ts
 * // src/app/api/graphql/route.ts
 * import { createGraphQLRoute } from "@/graphql/server/route-helpers";
 * import { schema } from "@/gql/server/schema";
 * import { getUser } from "@/lib/auth";
 *
 * export const runtime = "nodejs";
 * export const maxDuration = 300;
 *
 * const { POST, GET } = createGraphQLRoute({
 *   schema,
 *   getUserFromRequest: getUser,
 *   maxDuration: 300,
 * });
 *
 * export { POST, GET };
 * ```
 */
export function createGraphQLRoute<UserType = any>({
  schema,
  graphqlEndpoint = '/api/graphql',
  getUserFromRequest,
  // MaxDuration is used by Next.js in the route file to manage serverless function timeouts
  // We pass it here for completeness but it's actually applied in the route file
  // @ts-expect-error -- Parameter is for documentation purposes only and intentionally not used
  _maxDuration = 300,
  maskedErrors = process.env.NODE_ENV === 'production',
  landingPage = false,
}: CreateGraphQLRouteOptions<UserType>) {
  const yoga = createYoga({
    schema,
    graphqlEndpoint,
    fetchAPI: { Response },
    maskedErrors,
    landingPage,
    context: async initContext => {
      const request = initContext.request as Request & NextApiRequest;

      if (!request) {
        baseLogger.error({}, 'No graphql request found');
        return { user: null, logger: baseLogger };
      }

      return createContext({
        ...initContext,
        request,
      });
    },
  });

  async function createContext(
    initContext: YogaInitialContext & { request: NextApiRequest }
  ): Promise<GqlContext<UserType>> {
    const operationName = initContext.params?.operationName;
    let logger = baseLogger.child({ operationName });

    try {
      if (!getUserFromRequest) {
        return { user: null, logger };
      }

      const user = await getUserFromRequest(initContext.request, logger);

      if (user) {
        // @ts-ignore - We don't know the exact shape of UserType, but we're assuming it has an id
        logger = logger.child({ userId: user.id });
      }

      return { user, logger };
    } catch (err) {
      logger.error({ err }, 'Error creating context');
      return { user: null, logger };
    }
  }

  async function POST(request: NextRequest): Promise<Response> {
    const response = await yoga.handleRequest(request, {});
    return NextResponse.json(await response.json(), {
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
    });
  }

  async function GET(request: NextRequest): Promise<Response> {
    const response = await yoga.handleRequest(request, {});
    return NextResponse.json(await response.json(), {
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
    });
  }

  return {
    POST,
    GET,
    yoga,
  };
}
