import { z } from 'zod'

export const EVENT_TYPE_OPTIONS = [
  { label: 'Конференция', value: 'conference' },
  { label: 'Митап', value: 'meetup' },
  { label: 'Воркшоп', value: 'workshop' },
  { label: 'Фестиваль', value: 'festival' },
  { label: 'Онлайн-стрим', value: 'online-stream' },
  { label: 'Опен-колл', value: 'open-call' },
  { label: 'Другое', value: 'other' },
]

export const TARGET_AUDIENCE_OPTIONS = [
  { label: 'Продюсеры', value: 'producers' },
  { label: 'Редакторы', value: 'editors' },
  { label: 'Ведущие', value: 'hosts' },
  { label: 'Новички индустрии', value: 'newcomers' },
  { label: 'Другое', value: 'other' },
]

export const EVENT_FORMAT_OPTIONS = [
  { label: 'Оффлайн', value: 'offline' },
  { label: 'Онлайн', value: 'online' },
  { label: 'Гибрид', value: 'hybrid' },
]

export const COST_TYPE_OPTIONS = [
  { label: 'Бесплатно', value: 'free' },
  { label: 'Платно', value: 'paid' },
]

export const DATE_TYPE_OPTIONS = [
  { label: 'Одна дата', value: 'single' },
  { label: 'Период (от/до)', value: 'range' },
]

export const EVENT_FORM_SCHEMA = z
  .object({
    title: z.string().min(1, 'Обязательное поле'),
    event_type: z.string().min(1, 'Обязательное поле'),
    target_audience: z
      .array(z.string())
      .min(1, 'Выберите хотя бы одну аудиторию'),
    organizer: z.string().min(1, 'Обязательное поле'),
    event_format: z.string().min(1, 'Обязательное поле'),
    location: z.string().optional(),
    date_type: z.string().min(1, 'Обязательное поле'),
    date_start: z.coerce.date({
      required_error: 'Обязательное поле',
    }),
    date_end: z.coerce.date().optional(),
    cost_type: z.string().min(1, 'Обязательное поле'),
    cost_amount: z.coerce
      .number({ invalid_type_error: 'Введите число' })
      .positive('Сумма должна быть больше 0')
      .optional()
      .or(z.literal('')),
    short_description: z
      .string()
      .min(1, 'Обязательное поле')
      .max(300, 'Максимум 300 символов'),
    detailed_description: z
      .string()
      .max(2000, 'Максимум 2000 символов')
      .optional(),
    website: z.string().optional(),
    contact_email: z
      .string()
      .email('Некорректный email')
      .optional()
      .or(z.literal('')),
    contact_telegram: z.string().optional(),
    contact_phone: z.string().optional(),
    registration_deadline: z.coerce.date().optional(),
  })
  .refine(
    (data) => !!data.location && data.location.trim().length > 0,
    {
      message: 'Укажите место проведения или платформу',
      path: ['location'],
    },
  )
  .refine(
    (data) => {
      if (data.date_type === 'range') {
        return !!data.date_end
      }
      return true
    },
    {
      message: 'Укажите дату окончания',
      path: ['date_end'],
    },
  )
  .refine(
    (data) => {
      if (data.date_type === 'range' && data.date_start && data.date_end) {
        return data.date_end >= data.date_start
      }
      return true
    },
    {
      message: 'Дата окончания должна быть позже даты начала',
      path: ['date_end'],
    },
  )
  .refine(
    (data) => {
      if (data.cost_type === 'paid') {
        return typeof data.cost_amount === 'number' && data.cost_amount > 0
      }
      return true
    },
    {
      message: 'Укажите стоимость',
      path: ['cost_amount'],
    },
  )

export const EVENT_FORM_DEFAULT_VALUES = {
  title: '',
  event_type: '',
  target_audience: [] as string[],
  organizer: '',
  event_format: '',
  location: '',
  date_type: 'single',
  date_start: undefined as unknown as Date,
  date_end: undefined as unknown as Date | undefined,
  cost_type: 'free',
  cost_amount: '' as unknown as number | '',
  short_description: '',
  detailed_description: '',
  website: '',
  contact_email: '',
  contact_telegram: '',
  contact_phone: '',
  registration_deadline: undefined as unknown as Date | undefined,
}
