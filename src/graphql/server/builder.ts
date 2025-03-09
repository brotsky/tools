import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import type { PrismaClient } from '@prisma/client';
import { GqlContext } from './route-helpers';

/**
 * Configure Pothos schema builder for GraphQL with Prisma
 *
 * @param prisma - PrismaClient instance
 * @returns Configured SchemaBuilder
 *
 * @example
 * ```ts
 * // src/gql/server/schema.ts
 * import { createBuilder } from "./builder";
 * import prisma from "@/lib/prisma";
 *
 * export const builder = createBuilder(prisma);
 *
 * // Define your GraphQL schema
 * builder.queryType({
 *   fields: (t) => ({
 *     // ...
 *   }),
 * });
 * ```
 */
export function createBuilder<TPrisma extends PrismaClient = PrismaClient>(prisma: TPrisma) {
  return new SchemaBuilder<{
    Context: GqlContext;
    PrismaTypes: {
      // Define your models here
      // Example:
      // User: {
      //   shape: PrismaUser;
      //   include: {
      //     orgs: true;
      //   };
      // };
    };
    AuthScopes: {
      authenticated: boolean;
      isAdmin: boolean;
    };
  }>({
    plugins: [PrismaPlugin, ScopeAuthPlugin],
    prisma: {
      // Force the type to match PrismaClient for the plugin
      client: prisma as unknown as PrismaClient,
    },
    scopeAuth: {
      // Define authorization scopes
      authScopes: async (context: GqlContext) => ({
        authenticated: !!context.user,
        isAdmin: !!context.user?.isAdmin,
      }),
    },
  });
}

/**
 * Default builder types for reuse across the application
 */
export type Builder = ReturnType<typeof createBuilder>;

/**
 * Reference to builder instance for testing purposes
 * Each application should create its own builder instance
 */
export let builder: Builder | null = null;

/**
 * Sets the global builder instance for testing purposes
 *
 * @param newBuilder - Builder instance to set globally
 */
export function setBuilder(newBuilder: Builder) {
  builder = newBuilder;
}
