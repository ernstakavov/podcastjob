'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radiogroup'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useWatch } from 'react-hook-form'
import type { SelectOption } from './types'

export const SALARY_TYPE_OPTIONS = [
  { label: 'Фиксированная', value: 'fixed' },
  { label: 'Вилка', value: 'range' },
]

export const SALARY_PERIOD_OPTIONS = [
  { label: 'в месяц', value: 'monthly' },
  { label: 'за проект', value: 'per-project' },
  { label: 'в час', value: 'hourly' },
  { label: 'в год', value: 'yearly' },
]

type SalaryFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  typeName: FieldPath<TFieldValues>
  fixedName: FieldPath<TFieldValues>
  minName: FieldPath<TFieldValues>
  maxName: FieldPath<TFieldValues>
  periodName: FieldPath<TFieldValues>
  typeOptions?: SelectOption[]
  periodOptions?: SelectOption[]
}

export const SalaryField = <TFieldValues extends FieldValues>({
  control,
  typeName,
  fixedName,
  minName,
  maxName,
  periodName,
  typeOptions = SALARY_TYPE_OPTIONS,
  periodOptions = SALARY_PERIOD_OPTIONS,
}: SalaryFieldProps<TFieldValues>) => {
  const salaryType = useWatch({ control, name: typeName })

  return (
    <div className='space-y-4'>
      <FormField
        control={control}
        name={typeName}
        render={({ field }) => (
          <FormItem className='space-y-3'>
            <FormLabel required>Оплата</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className='flex space-x-4'
              >
                {typeOptions.map(({ label, value }) => (
                  <FormItem
                    className='flex items-center space-y-0 space-x-2'
                    key={value}
                  >
                    <FormControl>
                      <RadioGroupItem value={value} />
                    </FormControl>
                    <FormLabel className='font-normal'>{label}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className='grid grid-cols-12 gap-4'>
        {salaryType === 'fixed' ? (
          <div className='col-span-6'>
            <FormField
              control={control}
              name={fixedName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Сумма</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='50 000'
                      type='number'
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) => {
                        const value = e.target.value
                        field.onChange(value === '' ? '' : Number(value))
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ) : (
          <>
            <div className='col-span-3'>
              <FormField
                control={control}
                name={minName}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>От</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='50 000'
                        type='number'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => {
                          const value = e.target.value
                          field.onChange(value === '' ? '' : Number(value))
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-3'>
              <FormField
                control={control}
                name={maxName}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>До</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='100 000'
                        type='number'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => {
                          const value = e.target.value
                          field.onChange(value === '' ? '' : Number(value))
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        <div className='col-span-6'>
          <FormField
            control={control}
            name={periodName}
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Период</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Выберите период' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {periodOptions.map(({ label, value }) => (
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
      </div>
    </div>
  )
}
