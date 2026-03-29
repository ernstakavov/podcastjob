import { z } from 'zod'

export const SCHEDULE_TYPES = [
  { label: 'Фиксированный', value: 'fixed' },
  { label: 'Гибкий', value: 'flexible' },
  { label: 'По проектам', value: 'project-based' },
]

export const VACANCY_FORM_SCHEMA = z
  .object({
    title: z.string().min(1, 'Обязательное поле'),
    role: z.string().min(1, 'Обязательное поле'),
    employer: z.string().min(1, 'Обязательное поле'),
    work_mode: z.string().min(1, 'Обязательное поле'),
    city: z.string().optional(),
    employment_type: z.string().min(1, 'Обязательное поле'),
    schedule: z.string().min(1, 'Обязательное поле'),
    salary_type: z.string().min(1, 'Обязательное поле'),
    salary_fixed: z.coerce
      .number({ invalid_type_error: 'Введите число' })
      .positive('Зарплата должна быть больше 0')
      .optional()
      .or(z.literal('')),
    salary_min: z.coerce
      .number({ invalid_type_error: 'Введите число' })
      .positive('Зарплата должна быть больше 0')
      .optional()
      .or(z.literal('')),
    salary_max: z.coerce
      .number({ invalid_type_error: 'Введите число' })
      .positive('Зарплата должна быть больше 0')
      .optional()
      .or(z.literal('')),
    salary_period: z.string().min(1, 'Обязательное поле'),
    description: z
      .string()
      .min(1, 'Обязательное поле')
      .max(500, 'Максимум 500 символов'),
    responsibilities: z
      .array(z.object({ value: z.string().min(1, 'Заполните пункт') }))
      .min(1, 'Добавьте хотя бы один пункт')
      .max(10, 'Максимум 10 пунктов'),
    requirements: z
      .array(z.object({ value: z.string().min(1, 'Заполните пункт') }))
      .min(1, 'Добавьте хотя бы один пункт')
      .max(10, 'Максимум 10 пунктов'),
    working_conditions: z
      .array(z.object({ value: z.string().min(1, 'Заполните пункт') }))
      .min(1, 'Добавьте хотя бы один пункт')
      .max(10, 'Максимум 10 пунктов'),
    contact: z.string().min(1, 'Обязательное поле'),
    attachments_info: z.string().optional(),
    close_date: z.coerce.date().optional(),
  })
  .refine(
    (data) => {
      if (data.salary_type === 'fixed') {
        return typeof data.salary_fixed === 'number' && data.salary_fixed > 0
      }
      return true
    },
    {
      message: 'Укажите сумму',
      path: ['salary_fixed'],
    },
  )
  .refine(
    (data) => {
      if (data.salary_type === 'range') {
        return typeof data.salary_min === 'number' && data.salary_min > 0
      }
      return true
    },
    {
      message: 'Укажите минимальную зарплату',
      path: ['salary_min'],
    },
  )
  .refine(
    (data) => {
      if (data.salary_type === 'range') {
        return typeof data.salary_max === 'number' && data.salary_max > 0
      }
      return true
    },
    {
      message: 'Укажите максимальную зарплату',
      path: ['salary_max'],
    },
  )
  .refine(
    (data) => {
      if (
        data.salary_type === 'range' &&
        typeof data.salary_min === 'number' &&
        typeof data.salary_max === 'number'
      ) {
        return data.salary_max >= data.salary_min
      }
      return true
    },
    {
      message: 'Максимальная зарплата должна быть больше или равна минимальной',
      path: ['salary_max'],
    },
  )

export const VACANCY_FORM_DEFAULT_VALUES = {
  title: '',
  role: '',
  employer: '',
  work_mode: '',
  city: '',
  employment_type: '',
  schedule: '',
  salary_type: 'range',
  salary_fixed: '' as unknown as number | '',
  salary_min: '' as unknown as number | '',
  salary_max: '' as unknown as number | '',
  salary_period: 'monthly',
  description: '',
  responsibilities: [{ value: '' }],
  requirements: [{ value: '' }],
  working_conditions: [{ value: '' }],
  contact: '',
  attachments_info: '',
  close_date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
}
