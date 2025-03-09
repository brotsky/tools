import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        success:
          "border-transparent bg-green-500 text-primary-foreground shadow hover:bg-green-500/80",
        outline: "text-foreground",
        // Static variants without hover effects
        "default-static":
          "border-transparent bg-primary text-primary-foreground shadow",
        "secondary-static":
          "border-transparent bg-secondary text-secondary-foreground",
        "destructive-static":
          "border-transparent bg-destructive text-destructive-foreground shadow",
        "success-static":
          "border-transparent bg-green-500 text-primary-foreground shadow",
        "outline-static": "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Badge component props
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Badge component for displaying status indicators, tags, or labels
 * 
 * @example
 * ```tsx
 * <Badge>New</Badge>
 * <Badge variant="secondary">Updated</Badge>
 * <Badge variant="destructive">Removed</Badge>
 * <Badge variant="success">Completed</Badge>
 * <Badge variant="outline">Draft</Badge>
 * ```
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
