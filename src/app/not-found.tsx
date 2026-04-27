import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className='grid min-h-screen overflow-hidden bg-white font-[family-name:var(--font-geist-sans)]'>
      <Header />
      <main className='relative z-[2] mx-auto mt-10 w-full max-w-[900px] px-6 pb-24'>
        <header className='mb-10 animate-[slide-in_0.6s_ease-out] text-center'>
          <h1 className='mb-5 text-[clamp(48px,10vw,80px)] leading-[0.95] font-extrabold tracking-tight'>
            <span className='text-black'>Ошибка </span>
            <span className='text-[#00A739]'>404</span>
          </h1>
          <p className='mx-auto max-w-[480px] text-base leading-relaxed text-black/60'>
            Похоже, такой страницы не существует или она была перемещена.
            Проверьте адрес или вернитесь на главную, чтобы разместить вакансию,
            резюме или мероприятие.
          </p>
        </header>

        <div className='animate-[slide-in_0.6s_ease-out_0.15s_both]'>
          <div className='flex flex-col items-center gap-4'>
            <Link href='/add'>
              <Button className='h-12 cursor-pointer rounded-full bg-[#00A739] px-10 text-[15px] font-bold tracking-wide text-white uppercase transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0'>
                На главную
              </Button>
            </Link>
            <a
              href='https://t.me/podcastjob'
              target='_blank'
              rel='noopener'
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
