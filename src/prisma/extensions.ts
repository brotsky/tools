/**
 * Prisma Extensions for @brotsky/tools
 *
 * This file contains extensions for Prisma Client to enhance its capabilities
 */

import { PrismaClient } from '@prisma/client';
import { createSoftDeleteExtension } from 'prisma-extension-soft-delete';

/**
 * Creates a Prisma client with soft delete capabilities
 *
 * @returns Enhanced Prisma client with soft delete extension
 *
 * @example
 * ```ts
 * const prisma = createSoftDeletePrismaClient();
 * // Now deletions will be soft deletes by default
 * await prisma.user.delete({ where: { id } });
 * ```
 */
export function createSoftDeletePrismaClient() {
  return new PrismaClient().$extends(
    createSoftDeleteExtension({
      models: {
        User: true,
        Organization: true,
        // Add more models as needed
      },
      defaultConfig: {
        field: 'deletedAt',
        createValue: deleted => (deleted ? new Date() : null),
      },
    })
  );
}

/**
 * Type for a Prisma client with soft delete capabilities
 */
export type SoftDeletePrismaClient = ReturnType<typeof createSoftDeletePrismaClient>;

// Export other Prisma extensions here
