import * as React from 'react';
import { cn } from '@/utils/index';

/**
 * Input component props
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Whether the input has an error
   */
  error?: boolean;
}

/**
 * Input component for form fields
 *
 * @example
 * ```tsx
 * <Input type="email" placeholder="Email" />
 * <Input type="password" error={true} />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-red-500 text-red-500 focus-visible:ring-red-500',
          className
        )}
        aria-invalid={error}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
