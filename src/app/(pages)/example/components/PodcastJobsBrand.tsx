'use client'

// Подкаст Биржа Талантов - Фирменный стиль
// Зелёный #00A739, белый #FFFFFF, чёрный #000000
// Factor B для заголовков, Proxima Nova для текста

import { useState } from 'react'
import { RecordingIndicator } from './RecordingIndicator'

export const PodcastJobBoard = () => {
  const [activeTab, setActiveTab] = useState('vacancy')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayTab, setDisplayTab] = useState('vacancy')

  const switchTab = (newTab) => {
    if (newTab === activeTab || isTransitioning) return

    setIsTransitioning(true)
    setActiveTab(newTab)

    setTimeout(() => {
      setDisplayTab(newTab)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 250)
  }
  const [vacancyForm, setVacancyForm] = useState({
    showTitle: '',
    company: '',
    role: '',
    description: '',
    requirements: '',
    compensation: '',
    location: '',
    remote: false,
    episodeFrequency: 'weekly',
    genre: '',
    contact: '',
  })
  const [resumeForm, setResumeForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolio: '',
    experience: '',
    skills: [],
    preferredRoles: [],
    bio: '',
    equipment: '',
    sampleWork: '',
  })
  const [eventsForm, setEventsForm] = useState({
    name: '',
    date: '',
    location: '',
    conditions: '',
    program: '',
    contacts: '',
  })

  const roles = [
    'Ведущий',
    'Со-ведущий',
    'Продюсер',
    'Редактор',
    'Звукорежиссёр',
    'Букер гостей',
    'SMM-менеджер',
    'Сценарист',
  ]
  const skills = [
    'Аудиомонтаж',
    'Интервьюирование',
    'Сторителлинг',
    'Звуковой дизайн',
    'Маркетинг',
    'Исследования',
    'Написание сценариев',
    'Живая запись',
  ]
  const genres = [
    'Тру-крайм',
    'Комедия',
    'Новости и политика',
    'Бизнес',
    'Технологии',
    'Здоровье и wellness',
    'Спорт',
    'Искусство и культура',
    'Образование',
    'Художественная проза',
  ]

  const handleVacancyChange = (field, value) => {
    setVacancyForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleResumeChange = (field, value) => {
    setResumeForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleEventsChange = (field, value) => {
    setEventsForm((prev) => ({ ...prev, [field]: value }))
  }

  const toggleSkill = (skill) => {
    setResumeForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }))
  }

  const toggleRole = (role) => {
    setResumeForm((prev) => ({
      ...prev,
      preferredRoles: prev.preferredRoles.includes(role)
        ? prev.preferredRoles.filter((r) => r !== role)
        : [...prev.preferredRoles, role],
    }))
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFFFFF',
        fontFamily:
          '"Proxima Nova", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
        color: '#000000',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Фоновые декоративные элементы */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {/* Звуковые волны - зелёные */}
        <svg
          style={{ position: 'absolute', top: '8%', left: '3%', opacity: 0.08 }}
          width='200'
          height='100'
          viewBox='0 0 200 100'
        >
          <rect x='0' y='30' width='8' height='40' fill='#00A739' rx='4' />
          <rect x='20' y='20' width='8' height='60' fill='#00A739' rx='4' />
          <rect x='40' y='10' width='8' height='80' fill='#00A739' rx='4' />
          <rect x='60' y='25' width='8' height='50' fill='#00A739' rx='4' />
          <rect x='80' y='35' width='8' height='30' fill='#00A739' rx='4' />
          <rect x='100' y='15' width='8' height='70' fill='#00A739' rx='4' />
          <rect x='120' y='30' width='8' height='40' fill='#00A739' rx='4' />
          <rect x='140' y='20' width='8' height='60' fill='#00A739' rx='4' />
        </svg>

        {/* Микрофон - минималистичный и узнаваемый */}
        <svg
          style={{
            position: 'absolute',
            top: '12%',
            right: '4%',
            opacity: 0.06,
          }}
          width='120'
          height='280'
          viewBox='0 0 120 280'
          fill='none'
        >
          {/* Корпус микрофона (капсула) */}
          <rect x='30' y='10' width='60' height='100' rx='30' fill='#000000' />
          {/* Сетка микрофона */}
          <line
            x1='30'
            y1='35'
            x2='90'
            y2='35'
            stroke='#FFFFFF'
            strokeWidth='2'
            opacity='0.3'
          />
          <line
            x1='30'
            y1='55'
            x2='90'
            y2='55'
            stroke='#FFFFFF'
            strokeWidth='2'
            opacity='0.3'
          />
          <line
            x1='30'
            y1='75'
            x2='90'
            y2='75'
            stroke='#FFFFFF'
            strokeWidth='2'
            opacity='0.3'
          />
          {/* Держатель (дуга) */}
          <path
            d='M20 110 Q20 160 60 160 Q100 160 100 110'
            stroke='#000000'
            strokeWidth='10'
            fill='none'
            strokeLinecap='round'
          />
          {/* Ножка */}
          <line
            x1='60'
            y1='160'
            x2='60'
            y2='240'
            stroke='#000000'
            strokeWidth='10'
            strokeLinecap='round'
          />
          {/* Подставка */}
          <line
            x1='30'
            y1='240'
            x2='90'
            y2='240'
            stroke='#000000'
            strokeWidth='10'
            strokeLinecap='round'
          />
        </svg>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&display=swap');

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes recordingPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @keyframes contentFadeOut {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
          to {
            opacity: 0;
            transform: translateY(-12px) scale(0.98);
            filter: blur(4px);
          }
        }

        @keyframes contentFadeIn {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.98);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes tabIndicatorSlide {
          0% { box-shadow: 0 0 0 rgba(0, 167, 57, 0); }
          50% { box-shadow: 0 6px 25px rgba(0, 167, 57, 0.4); }
          100% { box-shadow: 0 4px 20px rgba(0, 167, 57, 0.3); }
        }

        .form-content-enter {
          animation: contentFadeIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .form-content-exit {
          animation: contentFadeOut 0.25s cubic-bezier(0.4, 0, 1, 1) forwards;
        }

        .tab-active {
          animation: tabIndicatorSlide 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        * {
          box-sizing: border-box;
        }

        input, textarea, select {
          font-family: "Proxima Nova", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
          letter-spacing: -0.02em;
        }

        ::selection {
          background: #00A739;
          color: #FFFFFF;
        }

        /* Factor B simulation - using heavy weight for headings */
        .heading-factor {
          font-family: "Factor B", "Montserrat", "SF Pro Display", sans-serif;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .body-text {
          font-family: "Proxima Nova", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
          letter-spacing: -0.02em;
        }
      `}</style>

      {/* Основной контент - z-index: 2 */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '900px',
          margin: '0 auto',
          padding: '60px 24px 100px',
        }}
      >
        {/* Шапка */}
        <header
          style={{
            textAlign: 'center',
            marginBottom: '60px',
            animation: 'slideIn 0.6s ease-out',
          }}
        >
          <RecordingIndicator label='Идет Набор' className='mb-6' />
          <h1
            className='heading-factor'
            style={{
              fontSize: 'clamp(48px, 10vw, 80px)',
              fontWeight: '800',
              margin: '0 0 20px',
              lineHeight: '0.95',
              color: '#000000',
            }}
          >
            <span>Podcasts.ru</span>
            <br />
            <span style={{ color: '#00A739' }}>Биржа Талантов</span>
          </h1>

          <p
            className='body-text'
            style={{
              fontSize: '16px',
              color: 'rgba(0, 0, 0, 0.6)',
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            Заполните форму, чтобы разместить вакансию, резюме или мероприятие.
            После модерации ваша заявка будет опубликована в telegram-канале
            @podcastjob.
          </p>
        </header>

        {/* Вкладки */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '48px',
            animation: 'slideIn 0.6s ease-out 0.15s both',
            minHeight: '56px',
            alignItems: 'center',
          }}
        >
          <button
            onClick={() => switchTab('vacancy')}
            className={`body-text ${activeTab === 'vacancy' ? 'tab-active' : ''}`}
            style={{
              padding: '16px 36px',
              fontSize: '14px',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              border:
                activeTab === 'vacancy'
                  ? '2px solid transparent'
                  : '2px solid #000000',
              borderRadius: '100px',
              cursor: 'pointer',
              transition:
                'background 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
              background: activeTab === 'vacancy' ? '#00A739' : '#FFFFFF',
              color: activeTab === 'vacancy' ? '#FFFFFF' : '#000000',
              boxShadow:
                activeTab === 'vacancy'
                  ? '0 4px 20px rgba(0, 167, 57, 0.3)'
                  : 'none',
            }}
          >
            Вакансия
          </button>
          <button
            onClick={() => switchTab('resume')}
            className={`body-text ${activeTab === 'resume' ? 'tab-active' : ''}`}
            style={{
              padding: '16px 36px',
              fontSize: '14px',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              border:
                activeTab === 'resume'
                  ? '2px solid transparent'
                  : '2px solid #000000',
              borderRadius: '100px',
              cursor: 'pointer',
              transition:
                'background 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
              background: activeTab === 'resume' ? '#00A739' : '#FFFFFF',
              color: activeTab === 'resume' ? '#FFFFFF' : '#000000',
              boxShadow:
                activeTab === 'resume'
                  ? '0 4px 20px rgba(0, 167, 57, 0.3)'
                  : 'none',
            }}
          >
            Резюме
          </button>
          <button
            onClick={() => switchTab('events')}
            className={`body-text ${activeTab === 'events' ? 'tab-active' : ''}`}
            style={{
              padding: '16px 36px',
              fontSize: '14px',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              border:
                activeTab === 'events'
                  ? '2px solid transparent'
                  : '2px solid #000000',
              borderRadius: '100px',
              cursor: 'pointer',
              transition:
                'background 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
              background: activeTab === 'events' ? '#00A739' : '#FFFFFF',
              color: activeTab === 'events' ? '#FFFFFF' : '#000000',
              boxShadow:
                activeTab === 'events'
                  ? '0 4px 20px rgba(0, 167, 57, 0.3)'
                  : 'none',
            }}
          >
            Ивенты
          </button>
        </div>

        {/* Контейнер формы - стиль обложки подкаста */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            background: 'transparent',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '32px',
            padding: 'clamp(32px, 6vw, 56px)',
            animation: 'slideIn 0.6s ease-out 0.3s both',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Декоративный элемент - угловой акцент как на обложках */}
          <div
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              width: '120px',
              height: '120px',
              background: '#00A739',
              borderRadius: '0 32px 0 100%',
              opacity: 0.3,
            }}
          />

          <div
            className={
              isTransitioning ? 'form-content-exit' : 'form-content-enter'
            }
            style={{
              willChange: 'transform, opacity, filter',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {displayTab === 'vacancy' && (
              <VacancyForm
                form={vacancyForm}
                onChange={handleVacancyChange}
                roles={roles}
                genres={genres}
              />
            )}
            {displayTab === 'resume' && (
              <ResumeForm
                form={resumeForm}
                onChange={handleResumeChange}
                onToggleSkill={toggleSkill}
                onToggleRole={toggleRole}
                roles={roles}
                skills={skills}
              />
            )}
            {displayTab === 'events' && (
              <EventsForm form={eventsForm} onChange={handleEventsChange} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function VacancyForm({ form, onChange, roles, genres }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        alert('Вакансия успешно опубликована!')
      }}
    >
      <div style={{ marginBottom: '36px' }}>
        <h2
          className='heading-factor'
          style={{
            fontSize: '36px',
            fontWeight: '800',
            margin: '0 0 8px',
            color: '#000000',
          }}
        >
          Разместить вакансию
        </h2>
        <p
          className='body-text'
          style={{
            fontSize: '15px',
            color: 'rgba(0, 0, 0, 0.5)',
            margin: 0,
          }}
        >
          Найдите нового члена команды подкаста
        </p>
      </div>

      <div style={{ display: 'grid', gap: '24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          <FormField
            label='Название подкаста / шоу'
            required
            value={form.showTitle}
            onChange={(v) => onChange('showTitle', v)}
            placeholder='Ежедневный разбор'
          />
          <FormField
            label='Компания / Сеть'
            value={form.company}
            onChange={(v) => onChange('company', v)}
            placeholder='Медиа Продакшн'
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          <SelectField
            label='Должность'
            required
            value={form.role}
            onChange={(v) => onChange('role', v)}
            options={roles}
            placeholder='Выберите должность...'
          />
          <SelectField
            label='Жанр'
            value={form.genre}
            onChange={(v) => onChange('genre', v)}
            options={genres}
            placeholder='Выберите жанр...'
          />
        </div>

        <TextAreaField
          label='Описание вакансии'
          required
          value={form.description}
          onChange={(v) => onChange('description', v)}
          placeholder='Опишите роль, обязанности и что делает ваше шоу уникальным...'
          rows={4}
        />

        <TextAreaField
          label='Требования'
          value={form.requirements}
          onChange={(v) => onChange('requirements', v)}
          placeholder='Укажите требуемый опыт, навыки и квалификацию...'
          rows={3}
          required={undefined}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          <FormField
            label='Местоположение'
            value={form.location}
            onChange={(v) => onChange('location', v)}
            placeholder='Москва, Россия'
          />
          <FormField
            label='Оплата'
            value={form.compensation}
            onChange={(v) => onChange('compensation', v)}
            placeholder='50 000-75 000 ₽/мес'
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            alignItems: 'end',
          }}
        >
          <SelectField
            label='Частота выпусков'
            value={form.episodeFrequency}
            onChange={(v) => onChange('episodeFrequency', v)}
            options={[
              'Ежедневно',
              'Еженедельно',
              'Раз в две недели',
              'Ежемесячно',
              'По ситуации',
            ]}
          />
          <CheckboxField
            label='Возможна удалённая работа'
            checked={form.remote}
            onChange={(v) => onChange('remote', v)}
          />
        </div>

        <FormField
          label='Контактный Email'
          required
          type='email'
          value={form.contact}
          onChange={(v) => onChange('contact', v)}
          placeholder='hr@vashpodcast.ru'
        />

        <SubmitButton>Опубликовать вакансию</SubmitButton>
      </div>
    </form>
  )
}

function ResumeForm({
  form,
  onChange,
  onToggleSkill,
  onToggleRole,
  roles,
  skills,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        alert('Резюме успешно отправлено!')
      }}
    >
      <div style={{ marginBottom: '36px' }}>
        <h2
          className='heading-factor'
          style={{
            fontSize: '36px',
            fontWeight: '800',
            margin: '0 0 8px',
            color: '#000000',
          }}
        >
          Отправить резюме
        </h2>
        <p
          className='body-text'
          style={{
            fontSize: '15px',
            color: 'rgba(0, 0, 0, 0.5)',
            margin: 0,
          }}
        >
          Покажите свои аудио-таланты миру
        </p>
      </div>

      <div style={{ display: 'grid', gap: '24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          <FormField
            label='Полное имя'
            required
            value={form.fullName}
            onChange={(v) => onChange('fullName', v)}
            placeholder='Иван Петров'
          />
          <FormField
            label='Email'
            required
            type='email'
            value={form.email}
            onChange={(v) => onChange('email', v)}
            placeholder='ivan@email.ru'
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          <FormField
            label='Телефон'
            type='tel'
            value={form.phone}
            onChange={(v) => onChange('phone', v)}
            placeholder='+7 (999) 123-45-67'
          />
          <FormField
            label='Портфолио / Сайт'
            type='url'
            value={form.portfolio}
            onChange={(v) => onChange('portfolio', v)}
            placeholder='https://moiproekty.ru'
          />
        </div>

        <div>
          <label
            className='body-text'
            style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#000000',
              marginBottom: '12px',
            }}
          >
            Предпочитаемые роли
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {roles.map((role) => (
              <TagButton
                key={role}
                active={form.preferredRoles.includes(role)}
                onClick={() => onToggleRole(role)}
              >
                {role}
              </TagButton>
            ))}
          </div>
        </div>

        <div>
          <label
            className='body-text'
            style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#000000',
              marginBottom: '12px',
            }}
          >
            Навыки
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {skills.map((skill) => (
              <TagButton
                key={skill}
                active={form.skills.includes(skill)}
                onClick={() => onToggleSkill(skill)}
              >
                {skill}
              </TagButton>
            ))}
          </div>
        </div>

        <TextAreaField
          label='Опыт работы'
          required
          value={form.experience}
          onChange={(v) => onChange('experience', v)}
          placeholder='Расскажите о своём пути в подкастинге, проектах и достижениях...'
          rows={4}
        />

        <TextAreaField
          label='О себе'
          value={form.bio}
          onChange={(v) => onChange('bio', v)}
          placeholder='Краткое представление о вас и вашей страсти к аудио...'
          rows={3}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          <FormField
            label='Оборудование / ПО'
            value={form.equipment}
            onChange={(v) => onChange('equipment', v)}
            placeholder='Pro Tools, Adobe Audition, Shure SM7B...'
          />
          <FormField
            label='Ссылка на примеры работ'
            type='url'
            value={form.sampleWork}
            onChange={(v) => onChange('sampleWork', v)}
            placeholder='https://soundcloud.com/moi-demo'
          />
        </div>

        <SubmitButton>Отправить резюме</SubmitButton>
      </div>
    </form>
  )
}

function EventsForm({ form, onChange }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        alert('Ивент успешно опубликован!')
      }}
    >
      <div style={{ marginBottom: '36px' }}>
        <h2
          className='heading-factor'
          style={{
            fontSize: '36px',
            fontWeight: '800',
            margin: '0 0 8px',
            color: '#000000',
          }}
        >
          Добавить ивент
        </h2>
        <p
          className='body-text'
          style={{
            fontSize: '15px',
            color: 'rgba(0, 0, 0, 0.5)',
            margin: 0,
          }}
        >
          Анонсируйте мероприятие для подкастеров
        </p>
      </div>

      <div style={{ display: 'grid', gap: '24px' }}>
        <FormField
          label='Название'
          required
          value={form.name}
          onChange={(v) => onChange('name', v)}
          placeholder='Подкаст-конференция 2026'
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          <FormField
            label='Дата'
            required
            type='date'
            value={form.date}
            onChange={(v) => onChange('date', v)}
            placeholder=''
          />
          <FormField
            label='Место проведения'
            required
            value={form.location}
            onChange={(v) => onChange('location', v)}
            placeholder='Москва, Центр событий'
          />
        </div>

        <TextAreaField
          label='Условия участия'
          value={form.conditions}
          onChange={(v) => onChange('conditions', v)}
          placeholder='Опишите условия участия, стоимость, требования к участникам...'
          rows={10}
          maxRows={10}
        />

        <TextAreaField
          label='Программа'
          value={form.program}
          onChange={(v) => onChange('program', v)}
          placeholder='Расскажите о программе мероприятия, спикерах, расписании...'
          rows={20}
          maxRows={20}
        />

        <FormField
          label='Контакты'
          required
          value={form.contacts}
          onChange={(v) => onChange('contacts', v)}
          placeholder='Email, телефон или ссылка на регистрацию'
        />

        <SubmitButton>Опубликовать ивент</SubmitButton>
      </div>
    </form>
  )
}

function FormField({
  label,
  required,
  type = 'text',
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label
        className='body-text'
        style={{
          display: 'block',
          fontSize: '12px',
          fontWeight: '600',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#000000',
          marginBottom: '10px',
        }}
      >
        {label} {required && <span style={{ color: '#00A739' }}>*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className='body-text'
        style={{
          width: '100%',
          padding: '16px 18px',
          fontSize: '15px',
          background: 'rgba(255, 255, 255, 0.5)',
          border: '2px solid rgba(0, 0, 0, 0.15)',
          borderRadius: '12px',
          color: '#000000',
          outline: 'none',
          transition: 'all 0.2s ease',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#00A739'
          e.target.style.background = 'rgba(255, 255, 255, 0.7)'
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'rgba(0, 0, 0, 0.15)'
          e.target.style.background = 'rgba(255, 255, 255, 0.5)'
        }}
      />
    </div>
  )
}

function SelectField({
  label,
  required,
  value,
  onChange,
  options,
  placeholder,
}) {
  return (
    <div>
      <label
        className='body-text'
        style={{
          display: 'block',
          fontSize: '12px',
          fontWeight: '600',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#000000',
          marginBottom: '10px',
        }}
      >
        {label} {required && <span style={{ color: '#00A739' }}>*</span>}
      </label>
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='body-text'
        style={{
          width: '100%',
          padding: '16px 18px',
          fontSize: '15px',
          background: 'rgba(255, 255, 255, 0.5)',
          border: '2px solid rgba(0, 0, 0, 0.15)',
          borderRadius: '12px',
          color: value ? '#000000' : 'rgba(0, 0, 0, 0.4)',
          outline: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        <option
          value=''
          disabled
          style={{ background: '#FFFFFF', color: '#000000' }}
        >
          {placeholder || 'Выберите...'}
        </option>
        {options.map((opt) => (
          <option
            key={opt}
            value={opt}
            style={{ background: '#FFFFFF', color: '#000000' }}
          >
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}

function TextAreaField({
  label,
  required,
  value,
  onChange,
  placeholder,
  rows = 3,
}) {
  return (
    <div>
      <label
        className='body-text'
        style={{
          display: 'block',
          fontSize: '12px',
          fontWeight: '600',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#000000',
          marginBottom: '10px',
        }}
      >
        {label} {required && <span style={{ color: '#00A739' }}>*</span>}
      </label>
      <textarea
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className='body-text'
        style={{
          width: '100%',
          padding: '16px 18px',
          fontSize: '15px',
          background: 'rgba(255, 255, 255, 0.5)',
          border: '2px solid rgba(0, 0, 0, 0.15)',
          borderRadius: '12px',
          color: '#000000',
          outline: 'none',
          resize: 'vertical',
          minHeight: '100px',
          transition: 'all 0.2s ease',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#00A739'
          e.target.style.background = 'rgba(255, 255, 255, 0.7)'
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'rgba(0, 0, 0, 0.15)'
          e.target.style.background = 'rgba(255, 255, 255, 0.5)'
        }}
      />
    </div>
  )
}

function CheckboxField({ label, checked, onChange }) {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        cursor: 'pointer',
        padding: '16px 0',
      }}
    >
      <div
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '6px',
          border: checked ? 'none' : '2px solid rgba(0, 0, 0, 0.3)',
          background: checked ? '#00A739' : 'rgba(255, 255, 255, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease',
        }}
      >
        {checked && (
          <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
            <path
              d='M2 7L5.5 10.5L12 4'
              stroke='#FFFFFF'
              strokeWidth='2.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        )}
      </div>
      <input
        type='checkbox'
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ display: 'none' }}
      />
      <span
        className='body-text'
        style={{
          fontSize: '15px',
          color: '#000000',
        }}
      >
        {label}
      </span>
    </label>
  )
}

function TagButton({ children, active, onClick }) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='body-text'
      style={{
        padding: '10px 20px',
        fontSize: '14px',
        fontWeight: '500',
        border: active ? 'none' : '2px solid rgba(0, 0, 0, 0.2)',
        borderRadius: '100px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        background: active ? '#00A739' : 'rgba(255, 255, 255, 0.5)',
        color: active ? '#FFFFFF' : '#000000',
      }}
    >
      {children}
    </button>
  )
}

function SubmitButton({ children }) {
  return (
    <button
      type='submit'
      className='body-text'
      style={{
        width: '100%',
        padding: '20px 36px',
        fontSize: '15px',
        fontWeight: '700',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        border: 'none',
        borderRadius: '100px',
        cursor: 'pointer',
        background: '#00A739',
        color: '#FFFFFF',
        marginTop: '16px',
        transition: 'all 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.target.style.background = '#000000'
        e.target.style.color = '#FFFFFF'
        e.target.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.target.style.background = '#00A739'
        e.target.style.color = '#FFFFFF'
        e.target.style.transform = 'translateY(0)'
      }}
    >
      {children}
    </button>
  )
}
