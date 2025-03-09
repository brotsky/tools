import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/index';
import { Loader2 } from 'lucide-react';

/**
 * Button component with various styles, sizes, and states
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-primary',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:outline-destructive',
        success:
          'bg-green-600 text-primary-foreground hover:bg-green-500 focus-visible:outline-green-600',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:outline-secondary',
        ghost: 'bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline focus-visible:outline-primary',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:outline-input',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-2 text-sm',
        lg: 'px-4 py-2 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

/**
 * Button component props including variants, loading state, and icon support
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Whether to use the child as the button component
   */
  asChild?: boolean;

  /**
   * Whether the button is in a loading state
   */
  loading?: boolean;

  /**
   * Optional icon to display next to the button text
   */
  icon?: React.ReactNode;
}

/**
 * Button component with support for variants, loading states, and icons
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">Click Me</Button>
 * <Button variant="outline" loading>Saving...</Button>
 * <Button variant="ghost" icon={<PlusIcon className="mr-2 h-4 w-4" />}>Add Item</Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <div className="inline-flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {children}
          </div>
        ) : icon ? (
          <div className="inline-flex items-center">
            {icon}
            {children}
          </div>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
