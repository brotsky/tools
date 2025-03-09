import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names using clsx and twMerge
 * 
 * This utility function is used to merge Tailwind CSS classes with proper precedence
 * and handling of conditional classes. It uses clsx for conditional class support and
 * twMerge to handle Tailwind-specific class conflicts.
 * 
 * @param inputs - Class values to be combined
 * @returns Combined class string
 * 
 * @example
 * ```tsx
 * <div className={cn(
 *   "base-class", 
 *   condition && "conditional-class",
 *   className
 * )} />
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
