'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils';
import { buttonVariants } from '@/components/ui/button';
import 'react-day-picker/style.css';

/**
 * Calendar component props
 */
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

/**
 * Calendar component for date selection
 *
 * @example
 * ```tsx
 * <Calendar
 *   mode="single"
 *   selected={date}
 *   onSelect={setDate}
 *   disabled={(date) => date < new Date()}
 * />
 * ```
 */
function Calendar({
  className,
  // These props are used by the DayPicker internally
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  classNames,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      mode="single"
      required={false}
      className={cn('p-3 bg-background', className)}
      classNames={{
        day: cn(
          'font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground'
        ),
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside: 'text-muted-foreground opacity-50',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
      }}
      components={{
        PreviousMonthButton: (props: React.ComponentProps<'button'>) => (
          <button {...props} className={cn(buttonVariants({ variant: 'outline' }), 'h-9 w-9')}>
            <ChevronLeft className="h-6 w-6" />
          </button>
        ),
        NextMonthButton: (props: React.ComponentProps<'button'>) => (
          <button {...props} className={cn(buttonVariants({ variant: 'outline' }), 'h-9 w-9')}>
            <ChevronRight className="h-6 w-6" />
          </button>
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
