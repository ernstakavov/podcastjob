import { PODCAST_ROLE_GROUPS } from '@/lib/podcastRoles';
import { z } from 'zod';

export const VACANCY_FORM_SCHEMA = z
  .object({
    title: z.string().min(1, 'Обязательное поле'),
    company_name: z.string().min(1, 'Обязательное поле'),
    employment: z.string().min(1, 'Обязательное поле'),
    work_mode: z.string().min(1, 'Обязательное поле'),
    close_date: z.coerce.date().optional(),
    salary_min: z.coerce
      .number({
        required_error: 'Обязательное поле',
        invalid_type_error: 'Введите число',
      })
      .positive('Зарплата должна быть больше 0'),
    salary_max: z.coerce
      .number({
        required_error: 'Обязательное поле',
        invalid_type_error: 'Введите число',
      })
      .positive('Зарплата должна быть больше 0'),
    contact: z.string().min(1, 'Обязательное поле'),
    experience: z.string().optional(),
    working_schedule: z.string().min(1, 'Обязательное поле'),
    responsibilities: z
      .string()
      .min(300, 'Минимум 300 символов (примерно 20 строк)'),
    requirements: z
      .string()
      .min(300, 'Минимум 300 символов (примерно 20 строк)'),
    additional_requirements: z.string().optional(),
    working_conditions: z.string().min(1, 'Обязательное поле'),
    position: z.string().min(1, 'Обязательное поле'),
  })
  .refine((data) => data.salary_max >= data.salary_min, {
    message: 'Максимальная зарплата должна быть больше или равна минимальной',
    path: ['salary_max'],
  });

export const VACANCY_FORM_DEFAULT_VALUES = {
  title: '',
  company_name: '',
  employment: '',
  work_mode: '',
  close_date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
  contact: '',
  experience: '',
  working_schedule: '',
  responsibilities: '',
  requirements: '',
  additional_requirements: '',
  working_conditions: '',
  position: '',
};

export const EMPLOYMENT_TYPES = [
  { label: 'полный раб. день', value: 'full-time' },
  { label: 'неполный раб. день', value: 'part-time' },
  { label: 'под проект/контракт', value: 'project-contract' },
  { label: 'практикант', value: 'internship' },
];

export const WORK_MODE_TYPES = [
  { label: 'удаленная', value: 'remote' },
  { label: 'офисная', value: 'office' },
  { label: 'любой', value: 'any' },
];

export const podcastRoleGroupLabels: Record<PODCAST_ROLE_GROUPS, string> = {
  [PODCAST_ROLE_GROUPS.administrator]: 'Администратор',
  [PODCAST_ROLE_GROUPS.audio_production]: 'Аудио-продакшн',
  [PODCAST_ROLE_GROUPS.audio_post_production]: 'Аудио-постпродакшн',
  [PODCAST_ROLE_GROUPS.cast]: 'Кастинг',
  [PODCAST_ROLE_GROUPS.video_production]: 'Видео-продакшн',
  [PODCAST_ROLE_GROUPS.video_post_production]: 'Видео-постпродакшн',
  [PODCAST_ROLE_GROUPS.community]: 'Сообщество',
  [PODCAST_ROLE_GROUPS.creative_director]: 'Креативный директор',
  [PODCAST_ROLE_GROUPS.design]: 'Дизайн',
  [PODCAST_ROLE_GROUPS.writing]: 'Редакция',
  [PODCAST_ROLE_GROUPS.other]: 'Другое',
};
