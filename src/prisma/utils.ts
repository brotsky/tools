/**
 * Prisma utility functions for @brotsky/tools
 *
 * This file contains helper functions for working with Prisma
 */

// We need the Prisma type for type annotations, even if not directly used
// @ts-ignore -- Used in type annotations
import type { Prisma } from '@prisma/client';
import { Logger } from '@/utils/logger';

// Type definitions for Prisma error classes that aren't properly exported in the types
// These match the actual runtime classes but provide proper TypeScript typing
type PrismaClientKnownRequestError = Error & {
  code: string;
  meta?: { target?: string[] };
  message: string;
};

type PrismaClientValidationError = Error & {
  message: string;
};

// Define enum type for query mode since it may not be exported by Prisma
type QueryMode = 'default' | 'insensitive';

// Define a generic type for enumerable results
type Enumerable<T> = T | T[];

/**
 * Type helper for extracting payload types from Prisma
 *
 * @example
 * ```ts
 * type UserCreateInput = PrismaPayloadType<typeof Prisma.UserPayload, 'create'>;
 * ```
 */
export type PrismaPayloadType<T extends Record<string, any>, K extends keyof T> = T[K] extends (
  ...args: any[]
) => infer R
  ? R
  : never;

/**
 * Creates a where condition for searching text across multiple fields
 *
 * @param search - Text to search for
 * @param fields - Array of field names to search in
 * @returns Prisma where condition object
 *
 * @example
 * ```ts
 * const where = createTextSearchCondition('john', ['name', 'email']);
 * const users = await prisma.user.findMany({ where });
 * ```
 */
export function createTextSearchCondition<T extends string>(
  search: string | undefined | null,
  fields: T[]
): Enumerable<{ [key in T]: { contains: string; mode: QueryMode } }> | undefined {
  if (!search) return undefined;

  const trimmed = search.trim();
  if (!trimmed) return undefined;

  return {
    OR: fields.map(field => ({
      [field]: {
        contains: trimmed,
        mode: 'insensitive' as QueryMode,
      },
    })),
  } as any;
}

/**
 * Creates a pagination object for Prisma queries
 *
 * @param page - Page number (1-based)
 * @param pageSize - Number of items per page
 * @returns Pagination object with skip and take properties
 *
 * @example
 * ```ts
 * const pagination = createPagination(2, 10);
 * const users = await prisma.user.findMany({ ...pagination });
 * ```
 */
export function createPagination(page: number = 1, pageSize: number = 10) {
  const skip = (page - 1) * pageSize;
  return {
    skip,
    take: pageSize,
  };
}

/**
 * Safely handles Prisma query errors
 *
 * @param error - Error thrown by Prisma
 * @param logger - Logger instance to log errors
 * @returns A standardized error object
 */
export function handlePrismaError(error: unknown, logger: Logger) {
  // Type guard for PrismaClientKnownRequestError
  const isPrismaKnownError = (err: unknown): err is PrismaClientKnownRequestError => {
    return (
      typeof err === 'object' &&
      err !== null &&
      'code' in err &&
      'message' in err &&
      typeof (err as any).code === 'string'
    );
  };

  // Type guard for PrismaClientValidationError
  const isPrismaValidationError = (err: unknown): err is PrismaClientValidationError => {
    return (
      typeof err === 'object' &&
      err !== null &&
      'message' in err &&
      err.constructor?.name === 'PrismaClientValidationError'
    );
  };

  if (isPrismaKnownError(error)) {
    // Handle known Prisma errors
    logger.error(
      { code: error.code, meta: error.meta },
      `[handlePrismaError] 🔴 Known Prisma error: ${error.message}`
    );

    if (error.code === 'P2002') {
      return {
        code: 'UNIQUE_CONSTRAINT_VIOLATION',
        message: 'A record with this value already exists',
        fields: error.meta?.target || [],
      };
    }

    if (error.code === 'P2025') {
      return {
        code: 'NOT_FOUND',
        message: 'Record not found',
      };
    }
  } else if (isPrismaValidationError(error)) {
    // Handle validation errors
    logger.error({}, `[handlePrismaError] 🔴 Validation error: ${error.message}`);
    return {
      code: 'VALIDATION_ERROR',
      message: 'Invalid data provided',
    };
  }

  // Handle unknown errors
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  logger.error({ errorMessage }, `[handlePrismaError] 🔴 Unknown database error`);
  return {
    code: 'DATABASE_ERROR',
    message: 'An unexpected database error occurred',
  };
}
