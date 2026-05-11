import React from 'react';
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type CustomSelectProps } from './types';

const Select = React.memo<CustomSelectProps>(
  ({
    options,
    value,
    onValueChange,
    placeholder = 'اختر...',
    className,
    contentClassName,
    width,
    dir = 'rtl',
    disabled = false,
    resetKey,
  }) => {
    const triggerClassName = width
      ? `${className || ''} ${width}`.trim()
      : className;

    return (
      <ShadcnSelect
        key={resetKey}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger className={triggerClassName} dir={dir}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent dir={dir} className={contentClassName}>
          {options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>
    );
  },
);

Select.displayName = 'Select';

export default Select;
