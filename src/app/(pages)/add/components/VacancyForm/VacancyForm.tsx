'use client'
import { useForm } from 'react-hook-form'
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
import { CalendarIcon } from 'lucide-react'
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
import { FormSubmitButton } from '@/components/form/FormSubmitButton'
import { FormSection } from '@/components/form/FormSection'
import { FieldArraySection } from '@/components/form/FieldArraySection'

type FormValues = z.infer<typeof VACANCY_FORM_SCHEMA>

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
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10'>
            <FormSection
              title='О вакансии'
              description='Кого вы ищете и в каком формате занятости.'
            >
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
                <div className='col-span-4'>
                  <RoleField control={form.control} name='role' />
                </div>

                <div className='col-span-4'>
                  <EmploymentTypeField
                    control={form.control}
                    name='employment_type'
                  />
                </div>

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
            </FormSection>

            <FormSection
              title='Условия работы'
              description='Где работать и сколько вы готовы платить.'
            >
              <WorkModeField
                control={form.control}
                name='work_mode'
                cityName='city'
              />

              <SalaryField
                control={form.control}
                typeName='salary_type'
                fixedName='salary_fixed'
                minName='salary_min'
                maxName='salary_max'
                periodName='salary_period'
              />
            </FormSection>

            <FormSection
              title='Описание'
              description='Чем будет заниматься сотрудник и что вы от него ожидаете.'
            >
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

              <FieldArraySection
                label='Обязанности'
                name='responsibilities'
                control={form.control}
              />

              <FieldArraySection
                label='Требования'
                name='requirements'
                control={form.control}
              />

              <FieldArraySection
                label='Условия работы'
                name='working_conditions'
                control={form.control}
              />
            </FormSection>

            <FormSection
              title='Отклик и сроки'
              description='Как откликнуться на вакансию и до какой даты она актуальна.'
            >
              <ContactField control={form.control} name='contact' />

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

              <FormField
                control={form.control}
                name='close_date'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Вакансия активна до:</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'pl-3 text-left font-normal',
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
                      Мы скроем вакансию через три недели, если не указана
                      другая дата.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormSection>

            <FormSubmitButton>Опубликовать вакансию</FormSubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
