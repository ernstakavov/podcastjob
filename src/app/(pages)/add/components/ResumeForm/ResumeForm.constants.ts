import { PODCAST_ROLE_GROUPS } from '@/lib/podcastRoles';
import { z } from 'zod';

export const RESUME_FORM_SCHEMA = z.object({
  position: z.string().min(1, 'Обязательное поле'),
  employment_type: z.string().min(1, 'Обязательное поле'),
  salary_expected: z.coerce
    .number({
      required_error: 'Обязательное поле',
      invalid_type_error: 'Введите число',
    })
    .positive('Зарплата должна быть больше 0'),
  experience: z
    .string()
    .min(150, 'Минимум 150 символов (примерно 10 строк)')
    .max(300, 'Максимум 300 символов (примерно 15 строк)'),
  achievements: z
    .string()
    .max(200, 'Максимум 200 символов (примерно 10 строк)')
    .optional(),
  skills: z.string().min(150, 'Минимум 150 символов (примерно 10 строк)'),
  contact: z.string().min(1, 'Обязательное поле'),
});

export const RESUME_FORM_DEFAULT_VALUES = {
  position: '',
  employment_type: '',
  contact: '',
  experience: '',
  achievements: '',
  skills: '',
};

export const EMPLOYMENT_TYPES = [
  { label: 'полный раб. день', value: 'full-time' },
  { label: 'неполный раб. день', value: 'part-time' },
  { label: 'под проект/контракт', value: 'project-contract' },
  { label: 'практикант', value: 'internship' },
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
