# Инструкции по применению миграции базы данных

## Обзор схемы

Проект использует одну начальную миграцию (`supabase/migrations/20250105000000_initial_schema.sql`), которая создаёт две таблицы: `vacancy` и `resume`.

### Таблица `vacancy`

| Поле                      | Тип                      | Обязательное | Описание                          |
| ------------------------- | ------------------------ | ------------ | --------------------------------- |
| `id`                      | TEXT (PK)                | да           | Уникальный идентификатор          |
| `title`                   | TEXT                     | да           | Заголовок вакансии                |
| `employer`                | TEXT                     | да           | Название компании                 |
| `position`                | TEXT                     | да           | Должность                         |
| `salary_min`              | INTEGER                  | да           | Минимальная зарплата              |
| `salary_max`              | INTEGER                  | да           | Максимальная зарплата             |
| `experience`              | TEXT                     | нет          | Требуемый опыт работы             |
| `employment_type`         | TEXT                     | да           | Тип занятости                     |
| `work_mode`               | TEXT                     | да           | Формат работы (remote/office/any) |
| `schedule`                | TEXT                     | да           | График работы                     |
| `close_date`              | TIMESTAMP WITH TIME ZONE | нет          | Дата закрытия вакансии            |
| `responsibilities`        | TEXT                     | да           | Обязанности                       |
| `requirements`            | TEXT                     | да           | Требования                        |
| `additional_requirements` | TEXT                     | нет          | Дополнительные требования         |
| `working_conditions`      | TEXT                     | да           | Условия работы                    |
| `contact`                 | TEXT                     | да           | Контактная информация             |
| `created_at`              | TIMESTAMP WITH TIME ZONE | да           | Дата создания (автоматически)     |
| `updated_at`              | TIMESTAMP WITH TIME ZONE | да           | Дата обновления (автоматически)   |

### Таблица `resume`

| Поле              | Тип                      | Обязательное | Описание                        |
| ----------------- | ------------------------ | ------------ | ------------------------------- |
| `id`              | TEXT (PK)                | да           | Уникальный идентификатор        |
| `position`        | TEXT                     | да           | Искомая должность               |
| `employment_type` | TEXT                     | да           | Тип занятости                   |
| `salary_expected` | INTEGER                  | да           | Желаемая зарплата               |
| `experience`      | TEXT                     | да           | Опыт работы                     |
| `achievements`    | TEXT                     | нет          | Достижения                      |
| `skills`          | TEXT                     | да           | Навыки                          |
| `contact`         | TEXT                     | да           | Контактная информация           |
| `created_at`      | TIMESTAMP WITH TIME ZONE | да           | Дата создания (автоматически)   |
| `updated_at`      | TIMESTAMP WITH TIME ZONE | да           | Дата обновления (автоматически) |

## Применение миграции (Supabase CLI)

### 1. Установить Supabase CLI

```bash
npm install -g supabase
```

### 2. Привязать проект

```bash
supabase link --project-ref <your-project-ref>
```

`project-ref` можно найти в Supabase Dashboard → Settings → General.

### 3. Применить миграции

```bash
supabase db push
```

Команда применит все непримененные миграции из `supabase/migrations/`.

### 4. Сгенерировать TypeScript-типы

```bash
supabase gen types typescript --project-id <your-project-ref> > src/lib/supabase/types.ts
```

## Полный сброс базы данных

Если нужно пересоздать таблицы с нуля (удалит все данные):

```bash
supabase db reset --linked
```

## Создание новых миграций

При изменении схемы создайте новый файл миграции:

```bash
supabase migration new <description>
```

Затем отредактируйте сгенерированный файл в `supabase/migrations/` и выполните `supabase db push`.

## Соответствие полей формы и базы данных

### Vacancy

| Поле формы                | Поле БД                   |
| ------------------------- | ------------------------- |
| `title`                   | `title`                   |
| `company_name`            | `employer`                |
| `employment`              | `employment_type`         |
| `work_mode`               | `work_mode`               |
| `close_date`              | `close_date`              |
| `salary_min`              | `salary_min`              |
| `salary_max`              | `salary_max`              |
| `position`                | `position`                |
| `experience`              | `experience`              |
| `working_schedule`        | `schedule`                |
| `responsibilities`        | `responsibilities`        |
| `requirements`            | `requirements`            |
| `additional_requirements` | `additional_requirements` |
| `working_conditions`      | `working_conditions`      |
| `contact`                 | `contact`                 |

### Resume

| Поле формы        | Поле БД           |
| ----------------- | ----------------- |
| `position`        | `position`        |
| `employment_type` | `employment_type` |
| `salary_expected` | `salary_expected` |
| `experience`      | `experience`      |
| `achievements`    | `achievements`    |
| `skills`          | `skills`          |
| `contact`         | `contact`         |

Маппинг формы → БД выполняется в файлах `*.actions.ts` рядом с компонентами форм.
