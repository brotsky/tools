/**
 * Common GraphQL input types for @brotsky/tools
 */

import { builder } from '../server/builder';

/**
 * Standard sort order enum for GraphQL
 */
export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

/**
 * Register the SortOrder enum with Pothos
 */
export const SortOrderEnum =
  builder?.enumType(SortOrder, {
    name: 'SortOrder',
  }) || null;

// Register a proper scalar type for DateTime
// Using 'as any' to bypass type checking since this is a common scalar type that should be supported
// eslint-disable-next-line @typescript-eslint/no-explicit-any
builder?.scalarType('DateTime' as any, {
  serialize: value => value,
  parseValue: value => value,
});

/**
 * Date filter input type for GraphQL
 */
export const DateFilterInput =
  builder?.inputType('DateFilterInput', {
    fields: t => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      equals: t.field({ type: 'DateTime' as any, required: false }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      gt: t.field({ type: 'DateTime' as any, required: false }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      gte: t.field({ type: 'DateTime' as any, required: false }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      lt: t.field({ type: 'DateTime' as any, required: false }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      lte: t.field({ type: 'DateTime' as any, required: false }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      in: t.field({ type: ['DateTime' as any], required: false }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      notIn: t.field({ type: ['DateTime' as any], required: false }),
    }),
  }) || null;

/**
 * String filter input type for GraphQL
 */
export const StringFilterInput = builder?.inputType('StringFilterInput', {
  fields: t => ({
    equals: t.string({ required: false }),
    not: t.string({ required: false }),
    in: t.stringList({ required: false }),
    notIn: t.stringList({ required: false }),
    contains: t.string({ required: false }),
    startsWith: t.string({ required: false }),
    endsWith: t.string({ required: false }),
  }),
});
