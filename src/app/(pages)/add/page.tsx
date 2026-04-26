import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { RecordingIndicator } from '@/components/RecordingIndicator'
import { FormTabs } from './components/FormTabs'

export default function Add() {
  return (
    <div className='grid min-h-screen overflow-hidden bg-white font-[family-name:var(--font-geist-sans)]'>
      <Header />
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
            После модерации ваша заявка будет опубликована в telegram-канале{' '}
            <a
              href='https://t.me/podcastjob'
              className='transition-colors duration-300 hover:text-[#00A739]'
              target='_blank'
              rel='noopener'
            >
              @podcastjob.
            </a>
          </p>
        </header>

        {/* Tabs + form */}
        <div className='animate-[slide-in_0.6s_ease-out_0.15s_both]'>
          <FormTabs />
        </div>
      </main>
      <Footer className='mt-auto' />
    </div>
  )
}
