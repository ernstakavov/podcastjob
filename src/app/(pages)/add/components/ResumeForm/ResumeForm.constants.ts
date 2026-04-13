import { z } from 'zod'

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

export const getResumeFormDefaultValues = () => ({
  position: 'Подкаст-продюсер',
  roles: ['producer', 'editor'],
  employment_type: ['full-time', 'project'],
  work_format: 'remote',
  city: 'Москва',
  salary_type: 'range',
  salary_fixed: '' as unknown as number | '',
  salary_from: 120000 as number | '',
  salary_to: 250000 as number | '',
  salary_period: 'monthly',
  experience:
    '3 года опыта в подкаст-продакшене. Запустил 5 подкастов с нуля, 2 из которых вошли в топ-10 Apple Podcasts.',
  achievements:
    'Подкаст "Голос индустрии" — 50 000 прослушиваний за первый месяц. Победитель конкурса "Лучший подкаст 2025".',
  skills:
    'Adobe Audition, Pro Tools, Audacity, Descript, монтаж, сценарии, работа с гостями, SMM-продвижение',
  contact_email: 'test@example.com',
  contact_phone: '+7 999 123 45 67',
  contact_telegram: '@testproducer',
  contact_website: 'https://example.com/portfolio',
})
