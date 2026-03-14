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
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MultiSelect } from '@/components/ui/multi-select';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import {
  EVENT_FORM_SCHEMA,
  EVENT_FORM_DEFAULT_VALUES,
  EVENT_TYPE_OPTIONS,
  TARGET_AUDIENCE_OPTIONS,
  EVENT_FORMAT_OPTIONS,
  COST_TYPE_OPTIONS,
  DATE_TYPE_OPTIONS,
} from './EventForm.constants';
import { toast } from 'sonner';
import { createEvent } from './EventForm.actions';

export const EventForm = () => {
  const form = useForm<z.infer<typeof EVENT_FORM_SCHEMA>>({
    resolver: zodResolver(EVENT_FORM_SCHEMA),
    defaultValues: EVENT_FORM_DEFAULT_VALUES,
  });

  const eventFormat = form.watch('event_format');
  const dateType = form.watch('date_type');
  const costType = form.watch('cost_type');

  async function onSubmit(values: z.infer<typeof EVENT_FORM_SCHEMA>) {
    try {
      const result = await createEvent(values);

      if (result.success) {
        toast.success('Мероприятие успешно создано!');
        form.reset();
      } else {
        toast.error(
          result.error ||
            'Не удалось создать мероприятие. Попробуйте снова.',
        );
      }
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Не удалось отправить форму. Попробуйте снова.');
    }
  }

  const locationPlaceholder =
    eventFormat === 'online'
      ? 'Zoom, Youtube, и т.д.'
      : 'Страна, город, адрес';

  return (
    <Card className='mb-10 bg-white shadow-xl backdrop-blur-sm'>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            {/* 1. Название мероприятия */}
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Название мероприятия</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Подкаст-конференция 2026'
                      type='text'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 2–3. Тип мероприятия + Для кого */}
            <div className='grid grid-cols-12 gap-4'>
              <div className='col-span-6'>
                <FormField
                  control={form.control}
                  name='event_type'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Тип мероприятия</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Выберите тип' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {EVENT_TYPE_OPTIONS.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-6'>
                <FormField
                  control={form.control}
                  name='target_audience'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Для кого</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={TARGET_AUDIENCE_OPTIONS}
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder='Выберите аудиторию'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* 4. Организатор */}
            <FormField
              control={form.control}
              name='organizer'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Организатор</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Название компании / студии / комьюнити'
                      type='text'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 5–6. Формат мероприятия + Место проведения */}
            <div className='grid grid-cols-12 gap-4'>
              <div className={eventFormat ? 'col-span-4' : 'col-span-12'}>
                <FormField
                  control={form.control}
                  name='event_format'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Формат</FormLabel>
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
                          {EVENT_FORMAT_OPTIONS.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {eventFormat && (
                <div className='col-span-8'>
                  <FormField
                    control={form.control}
                    name='location'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Место проведения</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={locationPlaceholder}
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

            {/* 7. Дата и время */}
            <div className='space-y-4'>
              <div className='grid grid-cols-12 gap-4'>
                <div className='col-span-4'>
                  <FormField
                    control={form.control}
                    name='date_type'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Дата</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Тип даты' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {DATE_TYPE_OPTIONS.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className={dateType === 'range' ? 'col-span-4' : 'col-span-8'}>
                  <FormField
                    control={form.control}
                    name='date_start'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel required>
                          {dateType === 'range' ? 'Начало' : 'Дата проведения'}
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-full pl-3 text-left font-normal',
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {dateType === 'range' && (
                  <div className='col-span-4'>
                    <FormField
                      control={form.control}
                      name='date_end'
                      render={({ field }) => (
                        <FormItem className='flex flex-col'>
                          <FormLabel required>Окончание</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    'w-full pl-3 text-left font-normal',
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
                            <PopoverContent
                              className='w-auto p-0'
                              align='start'
                            >
                              <Calendar
                                mode='single'
                                selected={field.value}
                                onSelect={field.onChange}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 8. Стоимость участия */}
            <div className='grid grid-cols-12 gap-4'>
              <div className={costType === 'paid' ? 'col-span-6' : 'col-span-12'}>
                <FormField
                  control={form.control}
                  name='cost_type'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Стоимость участия</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Выберите' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {COST_TYPE_OPTIONS.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {costType === 'paid' && (
                <div className='col-span-6'>
                  <FormField
                    control={form.control}
                    name='cost_amount'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Сумма</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='1000'
                            type='number'
                            {...field}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            {/* 9. Краткое описание */}
            <FormField
              control={form.control}
              name='short_description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Краткое описание</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Что за мероприятие и зачем туда идти'
                      className='resize-none'
                      rows={3}
                      maxLength={300}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Максимум 300 символов</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 10. Подробное описание */}
            <FormField
              control={form.control}
              name='detailed_description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Подробное описание</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Программа, спикеры, формат, аудитория и т.д.'
                      className='resize-none'
                      rows={10}
                      maxLength={2000}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Опционально. Максимум 2000 символов
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 11. Вебсайт */}
            <FormField
              control={form.control}
              name='website'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Вебсайт / страница регистрации</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='https://example.com'
                      type='text'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 12. Контакты организатора */}
            <div className='space-y-4'>
              <FormLabel>Контакты организатора</FormLabel>

              <div className='grid grid-cols-12 gap-4'>
                <div className='col-span-4'>
                  <FormField
                    control={form.control}
                    name='contact_email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
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
                </div>

                <div className='col-span-4'>
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
                </div>

                <div className='col-span-4'>
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
                </div>
              </div>
            </div>

            {/* 13. Регистрация до */}
            <FormField
              control={form.control}
              name='registration_deadline'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Регистрация до</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className='ml-auto block' size='lg' type='submit'>
              Отправить
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
