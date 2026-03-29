'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useWatch } from 'react-hook-form'

type SelectOption = {
  label: string
  value: string
}

export const WORK_MODE_OPTIONS: SelectOption[] = [
  { label: 'Офис', value: 'office' },
  { label: 'Гибрид', value: 'hybrid' },
  { label: 'Удалённо', value: 'remote' },
]

type WorkModeFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  cityName: FieldPath<TFieldValues>
  options?: SelectOption[]
}

export const WorkModeField = <TFieldValues extends FieldValues>({
  control,
  name,
  cityName,
  options = WORK_MODE_OPTIONS,
}: WorkModeFieldProps<TFieldValues>) => {
  const workMode = useWatch({ control, name })
  const showCity = workMode === 'office' || workMode === 'hybrid'

  return (
    <div className='grid grid-cols-12 gap-4'>
      <div className={showCity ? 'col-span-3' : 'col-span-12'}>
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Формат работы</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Выберите формат' />
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
      </div>

      {showCity && (
        <div className='col-span-9'>
          <FormField
            control={control}
            name={cityName}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Город</FormLabel>
                <FormControl>
                  <Input placeholder='Москва' type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  )
}
