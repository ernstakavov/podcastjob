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
import { ContactField } from '@/components/form/ContactField';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radiogroup';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import {
  EMPLOYMENT_TYPES,
  WORK_MODE_TYPES,
  VACANCY_FORM_SCHEMA,
  VACANCY_FORM_DEFAULT_VALUES,
} from './VacancyForm.constants';
import { toast } from 'sonner';
import { createVacancy } from './VacancyForm.actions';

export const VacancyForm = () => {
  const form = useForm<z.infer<typeof VACANCY_FORM_SCHEMA>>({
    resolver: zodResolver(VACANCY_FORM_SCHEMA),
    defaultValues: VACANCY_FORM_DEFAULT_VALUES,
  });

  async function onSubmit(values: z.infer<typeof VACANCY_FORM_SCHEMA>) {
    try {
      const result = await createVacancy(values);

      if (result.success) {
        toast.success('Вакансия успешно создана!');
        form.reset();
      } else {
        toast.error(
          result.error || 'Не удалось создать вакансию. Попробуйте снова.',
        );
      }
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Не удалось отправить форму. Попробуйте снова.');
    }
  }

  return (
    <Card className='mb-10 bg-white shadow-xl backdrop-blur-sm'>
      <CardContent>
        <Form {...form}>
          <form
            // action={}
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Заголовок</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Монтажёр'
                      type='text'
                      maxLength={50}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='company_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название компании</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Либо-Либо'
                      type='text'
                      maxLength={50}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-12 gap-4'>
              <div className='col-span-3'>
                <FormField
                  control={form.control}
                  name='employment'
                  render={({ field }) => (
                    <FormItem className='space-y-3'>
                      <FormLabel>Занятость</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className='flex flex-col space-y-1'
                        >
                          {EMPLOYMENT_TYPES.map(({ label, value }, index) => (
                            <FormItem
                              className='flex items-center space-y-0 space-x-3'
                              key={index}
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
              </div>

              <div className='col-span-3'>
                <FormField
                  control={form.control}
                  name='work_mode'
                  render={({ field }) => (
                    <FormItem className='space-y-3'>
                      <FormLabel>Формат работы</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className='flex flex-col space-y-1'
                        >
                          {WORK_MODE_TYPES.map(({ label, value }, index) => (
                            <FormItem
                              className='flex items-center space-y-0 space-x-3'
                              key={index}
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
              </div>
              <div className='col-span-6'>
                <FormField
                  control={form.control}
                  name='close_date'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Дата закрытия вакансии</FormLabel>
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
                        Мы скроем вакансию через три недели, если не указана
                        другая дата.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <h6 className='mb-1'>Должность</h6>
            <p className='text-muted-foreground mb-4 text-sm'>
              Укажите вакансию в соответсвии с наиблее подходящей должностью.
              Это поможет соискателям лучше понять задачи и требования — и
              повысить качество откликов.
            </p>
            <FormField
              control={form.control}
              name='position'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Искомая должностей</FormLabel>
                  <FormControl>
                    <Input placeholder='Администратор' type='text' {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            <h6 className='mb-4'>Диапазон заработной платы</h6>
            <div className='grid grid-cols-12 gap-4'>
              <div className='col-span-6'>
                <FormField
                  control={form.control}
                  name='salary_min'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>От</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='50 000 ₽'
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
              <div className='col-span-6'>
                <FormField
                  control={form.control}
                  name='salary_max'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>До</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='100 000 ₽'
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
            </div>

            <FormField
              control={form.control}
              name='experience'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Опыт работы</FormLabel>
                  <FormControl>
                    <Input placeholder='100 лет' type='text' {...field} />
                  </FormControl>
                  <FormDescription>Опционально</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='working_schedule'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>График работы</FormLabel>
                  <FormControl>
                    <Input placeholder='Пятидневка' type='text' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='responsibilities'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Обязанности</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder=''
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Минимум 300 символов (примерно 20 строк)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='requirements'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Требования</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder=''
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Минимум 300 символов (примерно 20 строк)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='additional_requirements'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Дополнительные требования</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder=''
                      className='resize-none'
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
              name='working_conditions'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Условия работы</FormLabel>
                  <FormControl>
                    <Input placeholder='' type='text' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <ContactField control={form.control} name='contact' />
            <Button className='ml-auto block' size='lg' type='submit'>
              Отправить
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
