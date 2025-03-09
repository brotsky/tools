import { builder } from '../../builder';

/**
 * Standard pagination input for GraphQL queries
 * Used for paginating lists of items
 */
export const PaginationInput = builder?.inputType('PaginationInput', {
  fields: t => ({
    /**
     * Page number (1-based)
     * @default 1
     */
    page: t.int({ defaultValue: 1 }),

    /**
     * Number of items per page
     * @default 10
     */
    perPage: t.int({ defaultValue: 10 }),
  }),
});

/**
 * Converts a pagination input to Prisma pagination arguments
 *
 * @param input - Pagination input from GraphQL
 * @returns Prisma skip and take arguments
 */
export function getPrismaSkipTake(input: { page: number; perPage: number }) {
  const { page, perPage } = input;
  return {
    skip: (page - 1) * perPage,
    take: perPage,
  };
}
