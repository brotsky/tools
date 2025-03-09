'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/index';

/**
 * Props for the ThemeToggle component
 */
interface ThemeToggleProps {
  /**
   * Optional callback when theme changes
   */
  onThemeChange?: (theme: string) => void;
  /**
   * Optional current theme override
   */
  currentTheme?: string;
}

/**
 * ThemeToggle component that allows switching between light, dark, and system themes
 *
 * Supports optional GraphQL integration for persisting user theme preferences
 *
 * @example
 * ```tsx
 * <ThemeToggle />
 * ```
 */
export function ThemeToggle({ onThemeChange, currentTheme }: ThemeToggleProps) {
  const { setTheme, theme: themeFromProvider } = useTheme();
  const theme = currentTheme || themeFromProvider;

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    if (onThemeChange) {
      onThemeChange(newTheme);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleThemeChange('light')}
        className={cn(
          'hover:bg-accent hover:text-accent-foreground',
          theme === 'light' && 'bg-accent text-accent-foreground'
        )}
      >
        <Sun className={cn('h-[1.2rem] w-[1.2rem]', theme === 'light' && 'fill-current')} />
        <span className="sr-only">Light theme</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleThemeChange('dark')}
        className={cn(
          'hover:bg-accent hover:text-accent-foreground',
          theme === 'dark' && 'bg-accent text-accent-foreground'
        )}
      >
        <Moon className={cn('h-[1.2rem] w-[1.2rem]', theme === 'dark' && 'fill-current')} />
        <span className="sr-only">Dark theme</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleThemeChange('system')}
        className={cn(
          'hover:bg-accent hover:text-accent-foreground',
          theme === 'system' && 'bg-accent text-accent-foreground'
        )}
      >
        <Monitor className={cn('h-[1.2rem] w-[1.2rem]', theme === 'system' && 'fill-current')} />
        <span className="sr-only">System theme</span>
      </Button>
    </div>
  );
}
