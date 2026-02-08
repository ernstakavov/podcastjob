import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { FormTab, FormTabs } from './components/FormTabs';

import { ResumeForm } from './components/ResumeForm';
import { VacancyForm } from './components/VacancyForm';
import { EventForm } from './components/EventForm';

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
};

export default function Add() {
  return (
    <div className='grid min-h-screen bg-[#E6E6E6] font-[family-name:var(--font-geist-sans)]'>
      <Header />
      <main className='mx-auto mt-10 w-full max-w-5xl px-4'>
        <FormTabs defaultTab={FORM_TABS.vacancy} tabs={FORM_TABS} />
      </main>
      <Footer className='mt-auto' />
    </div>
  );
}
