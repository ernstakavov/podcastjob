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
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import {
  EVENT_FORM_SCHEMA,
  EVENT_FORM_DEFAULT_VALUES,
} from './EventForm.constants';
import { toast } from 'sonner';
import { createEvent } from './EventForm.actions';
import { ContactField } from '@/components/form/ContactField';

export const EventForm = () => {
  const form = useForm<z.infer<typeof EVENT_FORM_SCHEMA>>({
    resolver: zodResolver(EVENT_FORM_SCHEMA),
    defaultValues: EVENT_FORM_DEFAULT_VALUES,
  });

  async function onSubmit(values: z.infer<typeof EVENT_FORM_SCHEMA>) {
    try {
      const result = await createEvent(values);

      if (result.success) {
        toast.success('Ивент успешно создан!');
        form.reset();
      } else {
        toast.error(
          result.error || 'Не удалось создать ивент. Попробуйте снова.',
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
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Подкаст-конференция 2025'
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
              name='date'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Дата</FormLabel>
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

            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Место проведения</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Москва, Конференц-зал'
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
              name='conditions'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Условия участия</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Опишите условия участия в мероприятии'
                      className='resize-none'
                      rows={10}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Опционально. Максимум 200 символов (примерно 10 строк)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='program'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Программа</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Опишите программу мероприятия'
                      className='resize-none'
                      rows={20}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Опционально. Максимум 400 символов (примерно 20 строк)
                  </FormDescription>
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
