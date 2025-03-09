/**
 * Utility functions for the @brotsky/tools library
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import logger from '@/utils/logger';
export type { LoggerType } from '@/utils/logger';

/**
 * Combines multiple class names with Tailwind CSS support
 * Uses clsx and tailwind-merge for proper handling of Tailwind classes
 *
 * @param inputs - Class values to be merged
 * @returns Merged class string
 *
 * @example
 * ```tsx
 * <div className={cn('text-red-500', isActive && 'bg-blue-200')}>Content</div>
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Export the logger
export { logger };
