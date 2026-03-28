'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radiogroup';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MultiSelect } from '@/components/ui/multi-select';
import {
  PODCAST_ROLES,
  EMPLOYMENT_TYPES,
  WORK_FORMAT_TYPES,
  SALARY_TYPE_OPTIONS,
  SALARY_PERIOD_OPTIONS,
  RESUME_FORM_SCHEMA,
} from './ResumeForm.constants';
import { toast } from 'sonner';
import { createResume } from './ResumeForm.actions';
import { getResumeFormTestValues } from '@/__tests__/mocks/formMocks';

export const ResumeForm = () => {
  const form = useForm<z.infer<typeof RESUME_FORM_SCHEMA>>({
    resolver: zodResolver(RESUME_FORM_SCHEMA),
    defaultValues: getResumeFormTestValues(),
  });

  const salaryType = form.watch('salary_type');
  const workFormat = form.watch('work_format');

  async function onSubmit(values: z.infer<typeof RESUME_FORM_SCHEMA>) {
    try {
      const result = await createResume(values);

      if (result.success) {
        toast.success('Резюме успешно создано!');
        form.reset();
      } else {
        toast.error(
          result.error || 'Не удалось создать резюме. Попробуйте снова.',
        );
      }
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Не удалось отправить форму. Попробуйте снова.');
    }
  }

  return (
    <Card className='relative mb-10 overflow-hidden rounded-[32px] border border-white/10 bg-transparent shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-[20px]'>
      {/* Decorative green corner accent */}
      <div className='absolute top-0 right-0 h-[120px] w-[120px] rounded-[0_32px_0_100%] bg-[#00A739] opacity-30' />
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
            <FormField
              control={form.control}
              name='roles'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Роль в подкаст-индустрии</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={PODCAST_ROLES}
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder='Выберите роли'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 3. Занятость */}
            <FormField
              control={form.control}
              name='employment_type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Занятость</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={EMPLOYMENT_TYPES}
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder='Выберите тип занятости'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 4. Формат работы + город */}
            <div className='grid grid-cols-12 gap-4'>
              <div
                className={
                  workFormat === 'office' || workFormat === 'hybrid'
                    ? 'col-span-6'
                    : 'col-span-12'
                }
              >
                <FormField
                  control={form.control}
                  name='work_format'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Формат работы</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Выберите формат' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {WORK_FORMAT_TYPES.map(({ label, value }) => (
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

              {(workFormat === 'office' || workFormat === 'hybrid') && (
                <div className='col-span-6'>
                  <FormField
                    control={form.control}
                    name='city'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Город</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Москва'
                            type='text'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            {/* 5. Зарплата */}
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='salary_type'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormLabel required>Оплата</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className='flex space-x-4'
                      >
                        {SALARY_TYPE_OPTIONS.map(({ label, value }) => (
                          <FormItem
                            className='flex items-center space-y-0 space-x-2'
                            key={value}
                          >
                            <FormControl>
                              <RadioGroupItem value={value} />
                            </FormControl>
                            <FormLabel className='font-normal'>
                              {label}
                            </FormLabel>
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
                      control={form.control}
                      name='salary_fixed'
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
                                const value = e.target.value;
                                field.onChange(value === '' ? '' : Number(value));
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
                        control={form.control}
                        name='salary_from'
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
                                  const value = e.target.value;
                                  field.onChange(
                                    value === '' ? '' : Number(value),
                                  );
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
                        control={form.control}
                        name='salary_to'
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
                                  const value = e.target.value;
                                  field.onChange(
                                    value === '' ? '' : Number(value),
                                  );
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
                    control={form.control}
                    name='salary_period'
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
                            {SALARY_PERIOD_OPTIONS.map(({ label, value }) => (
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
                        <Input
                          placeholder='@username'
                          type='text'
                          {...field}
                        />
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

            <Button
              className='mt-4 block w-full rounded-full bg-[#00A739] px-9 py-5 text-[15px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-250 hover:-translate-y-0.5 hover:bg-black hover:text-white'
              size='lg'
              type='submit'
            >
              Отправить резюме
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
