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

export const PODCAST_ROLES = [
  { label: 'Продюсер', value: 'producer' },
  { label: 'Монтаж', value: 'editing' },
  { label: 'Редактор', value: 'editor' },
  { label: 'Ведущий', value: 'host' },
  { label: 'Продакшн', value: 'production' },
  { label: 'Маркетинг', value: 'marketing' },
  { label: 'Дистрибуция', value: 'distribution' },
  { label: 'Другое', value: 'other' },
]

type RoleFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  multi?: boolean
  options?: SelectOption[]
}

export const RoleField = <TFieldValues extends FieldValues>({
  control,
  name,
  multi = false,
  options = PODCAST_ROLES,
}: RoleFieldProps<TFieldValues>) => {
  if (multi) {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel required>Роль в подкаст-индустрии</FormLabel>
            <FormControl>
              <MultiSelect
                options={options}
                value={field.value}
                onValueChange={field.onChange}
                placeholder='Выберите роли'
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
          <FormLabel required>Роль</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder='Выберите роль' />
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
