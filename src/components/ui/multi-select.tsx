'use client';

import * as React from 'react';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

function MultiSelect({
  options,
  value,
  onValueChange,
  placeholder = 'Выберите...',
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const selectedLabels = options
    .filter((opt) => value.includes(opt.value))
    .map((opt) => opt.label)
    .join(', ');

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onValueChange(value.filter((v) => v !== optionValue));
    } else {
      onValueChange([...value, optionValue]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type='button'
          role='combobox'
          aria-expanded={open}
          aria-controls='multi-select-list'
          className={cn(
            'border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*="text-"])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          data-placeholder={!selectedLabels ? '' : undefined}
        >
          <span className='truncate'>
            {selectedLabels || placeholder}
          </span>
          <ChevronDownIcon className='size-4 shrink-0 opacity-50' />
        </button>
      </PopoverTrigger>
      <PopoverContent className='w-[var(--radix-popover-trigger-width)] p-1' align='start'>
        <div id='multi-select-list' role='listbox' aria-multiselectable='true'>
        {options.map((option) => {
          const isSelected = value.includes(option.value);
          return (
            <button
              key={option.value}
              type='button'
              role='option'
              aria-selected={isSelected}
              className={cn(
                'relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground',
                isSelected && 'font-medium',
              )}
              onClick={() => toggleOption(option.value)}
            >
              {option.label}
              {isSelected && (
                <span className='absolute right-2 flex size-3.5 items-center justify-center'>
                  <CheckIcon className='size-4' />
                </span>
              )}
            </button>
          );
        })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { MultiSelect };
