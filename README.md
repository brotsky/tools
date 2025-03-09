# @brotsky/tools

A reusable TypeScript module providing React components, Prisma utilities, GraphQL server code, and more for Next.js applications.

## Features

- **UI Components**: Modern React components built with TailwindCSS, Radix UI, and shadcn/ui
- **GraphQL Utilities**: Tools for building GraphQL APIs with Pothos and Prisma
- **Prisma Extensions**: Helpful utilities for working with Prisma ORM
- **Logging**: Structured logging with Pino
- **Next.js Integration**: Built for seamless integration with Next.js applications

## Installation

```bash
bun add @brotsky/tools
```

## Usage

### UI Components

```tsx
import { Button, Input } from '@brotsky/tools';

function MyForm() {
  return (
    <form>
      <Input placeholder="Enter your name" />
      <Button variant="primary">Submit</Button>
    </form>
  );
}
```

### GraphQL Route Setup

The package includes a powerful utility for setting up GraphQL API routes in Next.js:

```ts
// src/app/api/graphql/route.ts
import { createGraphQLRoute } from "@brotsky/tools";
import { schema } from "@/gql/server/schema";
import { getUser } from "@/lib/auth";

export const runtime = "nodejs";
export const maxDuration = 300;

const { POST, GET } = createGraphQLRoute({
  schema,
  getUserFromRequest: getUser,
  maxDuration: 300,
});

export { POST, GET };
```

### Prisma Extensions

```ts
import { createSoftDeletePrismaClient } from '@brotsky/tools';

const prisma = createSoftDeletePrismaClient();

// Now deletions will be soft deletes by default
await prisma.user.delete({ where: { id } });
```

### Logging

```ts
import { logger } from '@brotsky/tools';

logger.info({ userId: '123' }, "User logged in");
logger.error({ error }, "Failed to process payment");
```

## GraphQL Route Helper

The `createGraphQLRoute` function simplifies setting up GraphQL endpoints in Next.js applications:

```typescript
export function createGraphQLRoute<UserType = any>({
  schema,
  graphqlEndpoint = "/api/graphql",
  getUserFromRequest,
  maxDuration = 300,
  maskedErrors = process.env.NODE_ENV === "production",
  landingPage = false,
}: CreateGraphQLRouteOptions<UserType>)
```

### Parameters

- `schema`: Your GraphQL schema created with Pothos or other schema builders
- `graphqlEndpoint`: Path for the GraphQL endpoint (defaults to "/api/graphql")
- `getUserFromRequest`: Function to get the current user from the request
- `maxDuration`: Maximum duration in seconds for serverless functions
- `maskedErrors`: Whether to mask errors in production (defaults to true in production)
- `landingPage`: Whether to show the GraphQL landing page (defaults to false)

### Returns

The function returns an object with:
- `POST`: Handler for POST requests
- `GET`: Handler for GET requests
- `yoga`: The underlying Yoga instance

## Development

```bash
# Install dependencies
bun install

# Build the package
bun run build

# Run TypeScript type checking
bun ts-errors

# Format code
bun format

# Run tests
bun test
```

## License

MIT