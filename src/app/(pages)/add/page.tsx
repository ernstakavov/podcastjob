import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { RecordingIndicator } from '@/components/RecordingIndicator'
import { FormTab, FormTabs } from './components/FormTabs'
import { DecorativeBackground } from './components/DecorativeBackground'

import { ResumeForm } from './components/ResumeForm'
import { VacancyForm } from './components/VacancyForm'
import { EventForm } from './components/EventForm'

export const FORM_TABS: Record<string, FormTab> = {
  vacancy: {
    title: 'Вакансия',
    value: 'vacancy',
    component: <VacancyForm />,
  },
  resume: {
    title: 'Резюме',
    value: 'resume',
    component: <ResumeForm />,
  },
  event: {
    title: 'Ивент',
    value: 'event',
    component: <EventForm />,
  },
}

export default function Add() {
  return (
    <div className='grid min-h-screen overflow-hidden bg-white font-[family-name:var(--font-geist-sans)]'>
      <Header />
      <DecorativeBackground />
      <main className='relative z-[2] mx-auto mt-10 w-full max-w-[900px] px-6 pb-24'>
        {/* Hero header */}
        <header className='mb-14 animate-[slide-in_0.6s_ease-out] text-center'>
          <RecordingIndicator label='Идет Набор' className='mb-6' />
          <h1 className='mb-5 text-[clamp(48px,10vw,80px)] leading-[0.95] font-extrabold tracking-tight'>
            <span className='text-black'>Podcasts.ru</span>
            <br />
            <span className='text-[#00A739]'>Биржа Талантов</span>
          </h1>
          <p className='mx-auto max-w-[480px] text-base leading-relaxed text-black/60'>
            Заполните форму, чтобы разместить вакансию, резюме или мероприятие.
            После модерации ваша заявка будет опубликована в telegram-канале
            @podcastjob.
          </p>
        </header>

        {/* Tabs + form */}
        <div className='animate-[slide-in_0.6s_ease-out_0.15s_both]'>
          <FormTabs defaultTab={FORM_TABS.vacancy} tabs={FORM_TABS} />
        </div>
      </main>
      <Footer className='mt-auto' />
    </div>
  )
}
