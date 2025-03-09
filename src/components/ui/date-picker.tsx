'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils';
import { CalendarIcon } from 'lucide-react';

/**
 * DatePicker component props
 */
export interface DatePickerProps {
  /** Current date value */
  value: Date | null;
  /** Callback when date changes */
  onChange: (date: Date | null) => void;
  /** Whether the date picker is disabled */
  disabled?: boolean;
  /** Function to determine which days should be disabled */
  disabledDays?: (date: Date) => boolean;
  /** Additional class name */
  className?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Error state */
  error?: boolean;
}

/**
 * DatePicker component for selecting dates
 *
 * @example
 * ```tsx
 * const [date, setDate] = useState<Date | null>(null);
 *
 * <DatePicker
 *   value={date}
 *   onChange={setDate}
 *   placeholder="Select date"
 * />
 * ```
 */
export function DatePicker({
  value,
  onChange,
  disabled,
  disabledDays,
  className,
  placeholder = 'Select date',
  error,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value ? format(value, 'yyyy-MM-dd') : '');

  // Handle calendar selection
  const handleSelect = (date: Date | undefined) => {
    onChange(date ?? null);
    setInputValue(date ? format(date, 'yyyy-MM-dd') : '');
    setIsOpen(false);
  };

  // Handle manual input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    // Try to parse the date
    const date = new Date(val);
    if (!isNaN(date.getTime())) {
      onChange(date);
    } else {
      onChange(null);
    }
  };

  // Handle blur to format the date properly
  const handleBlur = () => {
    if (value) {
      setInputValue(format(value, 'yyyy-MM-dd'));
    }
  };

  // Update input value when value prop changes
  React.useEffect(() => {
    setInputValue(value ? format(value, 'yyyy-MM-dd') : '');
  }, [value]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div className={cn('flex gap-2 items-center', className)}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            disabled={disabled}
            className="h-9 w-9"
            onClick={() => setIsOpen(true)}
            type="button"
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <Input
          type="date"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full"
          error={error}
        />
      </div>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value ?? undefined}
          onSelect={handleSelect}
          disabled={disabledDays || disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
