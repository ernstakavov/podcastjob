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
    close_date: z.coerce.date(),
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

export const getVacancyFormDefaultValues = () => ({
  title: '',
  role: '',
  employer: '',
  work_mode: '',
  city: '',
  employment_type: 'full-time',
  schedule: 'flexible',
  salary_type: 'range',
  salary_fixed: '' as unknown as number | '',
  salary_min: 100000 as number | '',
  salary_max: 200000 as number | '',
  salary_period: 'monthly',
  description:
    'Разработка концепций подкастов, координация работы команды, управление производственным процессом, контроль качества контента.',
  responsibilities: [
    { value: 'Разработка концепций подкастов' },
    { value: 'Координация работы команды' },
    { value: 'Управление производственным процессом' },
    { value: 'Контроль качества контента' },
    { value: 'Взаимодействие с гостями и спикерами' },
  ],
  requirements: [
    { value: 'Опыт работы в подкаст-индустрии не менее 2 лет' },
    { value: 'Знание основ звукозаписи и монтажа' },
    {
      value:
        'Умение работать с аудио-редакторами (Audacity, Adobe Audition, Pro Tools)',
    },
    { value: 'Навыки работы с гостями и интервью' },
  ],
  working_conditions: [
    { value: 'Удаленная работа' },
    { value: 'Гибкий график' },
    { value: 'Возможность профессионального роста' },
    { value: 'Участие в интересных проектах' },
  ],
  contact: 'test@example.com',
  attachments_info: '',
  close_date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
})
