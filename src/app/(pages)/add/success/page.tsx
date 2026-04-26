import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { RecordingIndicator } from '@/components/RecordingIndicator'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function SuccessPage() {
  return (
    <div className='grid min-h-screen overflow-hidden bg-white font-[family-name:var(--font-geist-sans)]'>
      <Header />
      <main className='relative z-[2] mx-auto mt-10 w-full max-w-[900px] px-6 pb-24'>
        <header className='mb-10 animate-[slide-in_0.6s_ease-out] text-center'>
          <RecordingIndicator label='Отправлено' className='mb-6' />
          <h1 className='mb-5 text-[clamp(48px,10vw,80px)] leading-[0.95] font-extrabold tracking-tight'>
            <span className='text-[#00A739]'>Спасибо!</span>
          </h1>
        </header>

        <div className='animate-[slide-in_0.6s_ease-out_0.15s_both]'>
          <div className='mx-auto max-w-[520px] space-y-6'>
            <h2 className='text-xl font-bold text-[#141414]'>Что дальше?</h2>
            <div className='space-y-4'>
              <div className='flex gap-4'>
                <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#141414] text-sm font-bold text-white'>
                  1
                </div>
                <div>
                  <p className='font-semibold text-[#141414]'>Модерация</p>
                  <p className='text-sm leading-relaxed text-black/50'>
                    Наша команда проверит вашу заявку — обычно это занимает не
                    больше суток.
                  </p>
                </div>
              </div>

              <div className='flex gap-4'>
                <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#141414] text-sm font-bold text-white'>
                  2
                </div>
                <div>
                  <p className='font-semibold text-[#141414]'>Публикация</p>
                  <p className='text-sm leading-relaxed text-black/50'>
                    После одобрения заявка будет опубликована в telegram-канале{' '}
                    <a
                      href='https://t.me/podcastjob'
                      className='font-medium text-[#00A739] underline decoration-[#00A739]/30 underline-offset-2 transition-colors hover:text-[#008a2e]'
                    >
                      @podcastjob
                    </a>
                    .
                  </p>
                </div>
              </div>

              <div className='flex gap-4'>
                <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#141414] text-sm font-bold text-white'>
                  3
                </div>
                <div>
                  <p className='font-semibold text-[#141414]'>Отклики</p>
                  <p className='text-sm leading-relaxed text-black/50'>
                    Подписчики канала увидят вашу заявку и смогут связаться с
                    вами напрямую.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-18 flex flex-col items-center gap-4'>
            <Link href='/add'>
              <Button className='h-12 cursor-pointer rounded-full bg-[#00A739] px-10 text-[15px] font-bold tracking-wide text-white uppercase transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0'>
                Подать ещё одну заявку
              </Button>
            </Link>
            <a
              href='https://t.me/podcastjob'
              className='inline-flex items-center gap-2 text-sm font-medium text-black/40 transition-colors hover:text-[#00A739]'
            >
              Перейти в канал @podcastjob
            </a>
          </div>
        </div>
      </main>
      <Footer className='mt-auto' />
    </div>
  )
}
