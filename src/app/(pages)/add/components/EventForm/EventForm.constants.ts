import { z } from 'zod';

export const EVENT_FORM_SCHEMA = z.object({
  title: z.string().min(1, 'Обязательное поле'),
  date: z.coerce.date({
    required_error: 'Обязательное поле',
  }),
  location: z.string().min(1, 'Обязательное поле'),
  conditions: z
    .string()
    .max(200, 'Максимум 200 символов (примерно 10 строк)')
    .optional(),
  program: z
    .string()
    .max(400, 'Максимум 400 символов (примерно 20 строк)')
    .optional(),
  contact: z.string().min(1, 'Обязательное поле'),
});

export const EVENT_FORM_DEFAULT_VALUES = {
  title: '',
  date: undefined as unknown as Date,
  location: '',
  conditions: '',
  program: '',
  contact: '',
};
