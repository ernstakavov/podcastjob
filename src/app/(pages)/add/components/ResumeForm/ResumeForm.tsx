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
import { EMPLOYMENT_TYPES, RESUME_FORM_SCHEMA } from './ResumeForm.constants';
import { toast } from 'sonner';
import { createResume } from './ResumeForm.actions';
import { ContactField } from '@/components/form/ContactField';
import { getResumeFormTestValues } from '@/__tests__/mocks/formMocks';

export const ResumeForm = () => {
  const form = useForm<z.infer<typeof RESUME_FORM_SCHEMA>>({
    resolver: zodResolver(RESUME_FORM_SCHEMA),
    defaultValues: getResumeFormTestValues(),
  });

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
    <Card className='mb-10 bg-white shadow-xl backdrop-blur-sm'>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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

            <div className='grid grid-cols-12 gap-4'>
              <div className='col-span-6'>
                <FormField
                  control={form.control}
                  name='employment_type'
                  render={({ field }) => (
                    <FormItem className='space-y-3'>
                      <FormLabel required>Занятость</FormLabel>
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

              <div className='col-span-6'>
                <FormField
                  control={form.control}
                  name='salary_expected'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Желаемая зарплата</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='150 000 ₽'
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
                  <FormLabel required>Опыт работы</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Опишите ваш опыт работы в подкаст-индустрии'
                      className='resize-none'
                      rows={10}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Минимум 150 символов, максимум 300 символов (примерно 10-15
                    строк)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      rows={8}
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
              name='skills'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Навыки</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Перечислите ваши профессиональные навыки, знание программ, оборудования'
                      className='resize-none'
                      rows={8}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Минимум 150 символов (примерно 10 строк)
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
