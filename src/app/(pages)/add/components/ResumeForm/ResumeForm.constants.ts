import { z } from 'zod'
import { PODCAST_ROLES } from '@/lib/podcastRoles'

export { PODCAST_ROLES }

export const EMPLOYMENT_TYPES = [
  { label: 'Полная занятость', value: 'full-time' },
  { label: 'Частичная занятость', value: 'part-time' },
  { label: 'Проектная работа', value: 'project' },
  { label: 'Фриланс', value: 'freelance' },
]

export const SALARY_TYPE_OPTIONS = [
  { label: 'Фиксированная', value: 'fixed' },
  { label: 'Вилка', value: 'range' },
]

export const SALARY_PERIOD_OPTIONS = [
  { label: 'в месяц', value: 'monthly' },
  { label: 'за проект', value: 'per-project' },
  { label: 'в год', value: 'yearly' },
]

export const RESUME_FORM_SCHEMA = z
  .object({
    position: z.string().min(1, 'Обязательное поле'),
    roles: z.array(z.string()).min(1, 'Выберите хотя бы одну роль'),
    employment_type: z
      .array(z.string())
      .min(1, 'Выберите хотя бы один тип занятости'),
    work_format: z.string().min(1, 'Обязательное поле'),
    city: z.string().optional(),
    salary_type: z.string().min(1, 'Обязательное поле'),
    salary_fixed: z.coerce
      .number({ invalid_type_error: 'Введите число' })
      .positive('Зарплата должна быть больше 0')
      .optional()
      .or(z.literal('')),
    salary_from: z.coerce
      .number({ invalid_type_error: 'Введите число' })
      .positive('Зарплата должна быть больше 0')
      .optional()
      .or(z.literal('')),
    salary_to: z.coerce
      .number({ invalid_type_error: 'Введите число' })
      .positive('Зарплата должна быть больше 0')
      .optional()
      .or(z.literal('')),
    salary_period: z.string().min(1, 'Обязательное поле'),
    experience: z.string().min(1, 'Обязательное поле'),
    achievements: z.string().optional(),
    skills: z.string().min(1, 'Обязательное поле'),
    contact_email: z
      .string()
      .min(1, 'Обязательное поле')
      .email('Введите корректный email'),
    contact_phone: z.string().optional(),
    contact_telegram: z.string().optional(),
    contact_website: z.string().optional(),
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
        return typeof data.salary_from === 'number' && data.salary_from > 0
      }
      return true
    },
    {
      message: 'Укажите минимальную зарплату',
      path: ['salary_from'],
    },
  )
  .refine(
    (data) => {
      if (data.salary_type === 'range') {
        return typeof data.salary_to === 'number' && data.salary_to > 0
      }
      return true
    },
    {
      message: 'Укажите максимальную зарплату',
      path: ['salary_to'],
    },
  )
  .refine(
    (data) => {
      if (
        data.salary_type === 'range' &&
        typeof data.salary_from === 'number' &&
        typeof data.salary_to === 'number'
      ) {
        return data.salary_to >= data.salary_from
      }
      return true
    },
    {
      message: 'Максимальная зарплата должна быть больше или равна минимальной',
      path: ['salary_to'],
    },
  )

export const RESUME_FORM_DEFAULT_VALUES = {
  position: '',
  roles: [] as string[],
  employment_type: [] as string[],
  work_format: '',
  city: '',
  salary_type: 'range',
  salary_fixed: '' as unknown as number | '',
  salary_from: '' as unknown as number | '',
  salary_to: '' as unknown as number | '',
  salary_period: 'monthly',
  experience: '',
  achievements: '',
  skills: '',
  contact_email: '',
  contact_phone: '',
  contact_telegram: '',
  contact_website: '',
}
