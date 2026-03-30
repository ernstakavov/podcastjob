'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RESUME_FORM_SCHEMA } from './ResumeForm.constants'
import { EmploymentTypeField } from '@/components/form/EmploymentTypeField'
import { RoleField } from '@/components/form/RoleField'
import { SalaryField } from '@/components/form/SalaryField'
import { WorkModeField } from '@/components/form/WorkModeField'
import { toast } from 'sonner'
import { createResume } from './ResumeForm.actions'
import { getResumeFormTestValues } from '@/__tests__/mocks/formMocks'
import { FormButton } from '@/components/form/FormButton'

export const ResumeForm = () => {
  const form = useForm<z.infer<typeof RESUME_FORM_SCHEMA>>({
    resolver: zodResolver(RESUME_FORM_SCHEMA),
    defaultValues: getResumeFormTestValues(),
  })

  async function onSubmit(values: z.infer<typeof RESUME_FORM_SCHEMA>) {
    try {
      const result = await createResume(values)

      if (result.success) {
        toast.success('Резюме успешно создано!')
        form.reset()
      } else {
        toast.error(
          result.error || 'Не удалось создать резюме. Попробуйте снова.',
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
            {/* 1. Должность */}
            <div>
              <h6 className='mb-1'>Должность</h6>
              <p className='text-muted-foreground text-sm'>
                Выберите должность, которая наиболее соответствует вашему опыту
                и навыкам.
              </p>
            </div>
            <FormField
              control={form.control}
              name='position'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Искомая должность</FormLabel>
                  <FormControl>
                    <Input placeholder='Звукорежиссёр' type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 2. Роль в подкаст-индустрии */}
            <RoleField control={form.control} name='roles' multi />

            {/* 3. Занятость */}
            <EmploymentTypeField
              control={form.control}
              name='employment_type'
              multi
            />

            {/* 4. Формат работы + город */}
            <WorkModeField
              control={form.control}
              name='work_format'
              cityName='city'
            />

            {/* 5. Зарплата */}
            <SalaryField
              control={form.control}
              typeName='salary_type'
              fixedName='salary_fixed'
              minName='salary_from'
              maxName='salary_to'
              periodName='salary_period'
            />

            {/* 6. Опыт */}
            <FormField
              control={form.control}
              name='experience'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Опыт работы</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Опишите ваш опыт работы в подкаст-индустрии'
                      className='resize-none'
                      rows={10}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 7. Достижения */}
            <FormField
              control={form.control}
              name='achievements'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Достижения</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Ваши профессиональные достижения, награды, значимые проекты'
                      className='resize-none'
                      rows={10}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Опционально</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 8. Навыки */}
            <FormField
              control={form.control}
              name='skills'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Навыки</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Перечислите ваши профессиональные навыки, знание программ, оборудования'
                      className='resize-none'
                      rows={10}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 9. Контакты */}
            <div className='space-y-4'>
              <FormLabel>Контакты</FormLabel>
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='contact_email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='example@mail.com'
                          type='email'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='contact_phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Телефон</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='+7 (999) 123-45-67'
                          type='tel'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='contact_telegram'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telegram</FormLabel>
                      <FormControl>
                        <Input placeholder='@username' type='text' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='contact_website'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Сайт / Портфолио</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='https://example.com'
                          type='url'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormButton />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
