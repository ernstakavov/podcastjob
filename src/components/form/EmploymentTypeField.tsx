'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MultiSelect } from '@/components/ui/multi-select'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import type { SelectOption } from './types'

export const EMPLOYMENT_TYPES = [
  { label: 'Полная занятость', value: 'full-time' },
  { label: 'Частичная занятость', value: 'part-time' },
  { label: 'Проектная работа', value: 'project' },
  { label: 'Фриланс', value: 'freelance' },
]

type EmploymentTypeFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  multi?: boolean
  options?: SelectOption[]
}

export const EmploymentTypeField = <TFieldValues extends FieldValues>({
  control,
  name,
  multi = false,
  options = EMPLOYMENT_TYPES,
}: EmploymentTypeFieldProps<TFieldValues>) => {
  if (multi) {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel required>Занятость</FormLabel>
            <FormControl>
              <MultiSelect
                options={options}
                value={field.value}
                onValueChange={field.onChange}
                placeholder='Выберите тип занятости'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Тип занятости</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder='Выберите тип занятости' />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
