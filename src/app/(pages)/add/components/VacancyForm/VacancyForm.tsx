'use client'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ContactField } from '@/components/form/ContactField'
import { EmploymentTypeField } from '@/components/form/EmploymentTypeField'
import { RoleField } from '@/components/form/RoleField'
import { SalaryField } from '@/components/form/SalaryField'
import { WorkModeField } from '@/components/form/WorkModeField'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon, Plus, X } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import {
  SCHEDULE_TYPES,
  VACANCY_FORM_SCHEMA,
  getVacancyFormDefaultValues,
} from './VacancyForm.constants'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createVacancy } from './VacancyForm.actions'
import { FormButton } from '@/components/form/FormButton'

type FormValues = z.infer<typeof VACANCY_FORM_SCHEMA>

const FieldArraySection = ({
  label,
  name,
  control,
}: {
  label: string
  name: 'responsibilities' | 'requirements' | 'working_conditions'
  control: ReturnType<typeof useForm<FormValues>>['control']
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

export const VacancyForm = () => {
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(VACANCY_FORM_SCHEMA),
    defaultValues: getVacancyFormDefaultValues(),
  })

  async function onSubmit(values: FormValues) {
    try {
      const result = await createVacancy(values)

      if (result.success) {
        router.push('/add/success?type=vacancy')
      } else {
        toast.error(
          result.error || 'Не удалось создать вакансию. Попробуйте снова.',
        )
      }
    } catch (error) {
      console.error('Form submission error', error)
      toast.error('Не удалось отправить форму. Попробуйте снова.')
    }
  }

  return (
    <Card className='relative mb-10 overflow-hidden rounded-[32px] border border-white/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-[20px]'>
      <CardContent className='relative z-[2]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            {/* 1. Название вакансии */}
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Название вакансии</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Монтажёр для подкаста'
                      type='text'
                      maxLength={100}
                      className='focus:border-green'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 3. Работодатель */}
            <FormField
              control={form.control}
              name='employer'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Работодатель</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Либо-Либо'
                      type='text'
                      maxLength={100}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-12 gap-4'>
              {/* 2. Роль — Select */}
              <div className='col-span-4'>
                <RoleField control={form.control} name='role' />
              </div>

              {/* 5. Тип занятости — Select */}
              <div className='col-span-4'>
                <EmploymentTypeField
                  control={form.control}
                  name='employment_type'
                />
              </div>

              {/* 6. График работы — Select */}
              <div className='col-span-4'>
                <FormField
                  control={form.control}
                  name='schedule'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>График работы</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Выберите график' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SCHEDULE_TYPES.map(({ label, value }) => (
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

            {/* 4. Формат работы + город */}
            <WorkModeField
              control={form.control}
              name='work_mode'
              cityName='city'
            />

            {/* 7. Оплата: тип + сумма + период */}
            <SalaryField
              control={form.control}
              typeName='salary_type'
              fixedName='salary_fixed'
              minName='salary_min'
              maxName='salary_max'
              periodName='salary_period'
            />

            {/* 8. Короткое описание */}
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Короткое описание</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Кратко опишите вакансию'
                      className='resize-none'
                      rows={7}
                      maxLength={500}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Максимум 500 символов</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 9. Обязанности — useFieldArray */}
            <FieldArraySection
              label='Обязанности'
              name='responsibilities'
              control={form.control}
            />

            {/* 10. Требования — useFieldArray */}
            <FieldArraySection
              label='Требования'
              name='requirements'
              control={form.control}
            />

            {/* 11. Условия работы — useFieldArray */}
            <FieldArraySection
              label='Условия работы'
              name='working_conditions'
              control={form.control}
            />

            {/* 12. Как откликнуться */}
            <ContactField control={form.control} name='contact' />

            {/* 13. Что приложить */}
            <FormField
              control={form.control}
              name='attachments_info'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Что приложить к отклику</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Резюме, портфолио, ссылка на работы'
                      type='text'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Опционально</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 14. Вакансия активна до — Calendar */}
            <FormField
              control={form.control}
              name='close_date'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Вакансия активна до</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Выберите дату</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Мы скроем вакансию через три недели, если не указана другая
                    дата.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormButton />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
