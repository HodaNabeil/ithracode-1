import * as React from 'react';
import { cn } from '@/lib/utils';

const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative flex w-full items-center overflow-hidden border border-input bg-background shadow-sm transition-colors hover:border-gray-alpha-300 focus-within:ring-1 focus-within:ring-ring dark:hover:border-gray-alpha-200',
      'selection:bg-primary selection:text-primary-foreground',
      className,
    )}
    {...props}
  />
));
InputGroup.displayName = 'InputGroup';

const InputGroupAddon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center px-3 text-muted-foreground', className)}
    {...props}
  />
));
InputGroupAddon.displayName = 'InputGroupAddon';

const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      'flex h-11.5 w-full bg-transparent py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      className,
    )}
    {...props}
  />
));
InputGroupInput.displayName = 'InputGroupInput';

export { InputGroup, InputGroupAddon, InputGroupInput };
