'use client'

import { useFieldArray, type Control } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Plus, X } from 'lucide-react'
import { VACANCY_FORM_SCHEMA } from './VacancyForm.constants'

type FormValues = z.infer<typeof VACANCY_FORM_SCHEMA>

export const FieldArraySection = ({
  label,
  name,
  control,
}: {
  label: string
  name: 'responsibilities' | 'requirements' | 'working_conditions'
  control: Control<FormValues>
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  })

  return (
    <div className='space-y-3'>
      <FormLabel required>{label}</FormLabel>
      {fields.map((field, index) => (
        <FormField
          key={field.id}
          control={control}
          name={`${name}.${index}.value`}
          render={({ field: inputField }) => (
            <FormItem>
              <div className='flex items-center gap-2'>
                <FormControl>
                  <Input {...inputField} placeholder={`Пункт ${index + 1}`} />
                </FormControl>
                {fields.length > 1 && (
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    onClick={() => remove(index)}
                    className='shrink-0'
                  >
                    <X className='h-4 w-4' />
                  </Button>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      {fields.length < 10 && (
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={() => append({ value: '' })}
        >
          <Plus className='mr-1 h-4 w-4' />
          Добавить пункт
        </Button>
      )}
    </div>
  )
}
