'use client'

import { useState } from 'react'
import { LogoIcon } from '@/app/icons/LogoIcon'
import { Menu, XIcon } from 'lucide-react'

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Main header bar */}
      <header className='sticky top-0 z-10 w-full bg-[#141414] text-[#f5f5f5] shadow-[0_3px_5px_-1px_rgba(0,0,0,0.1),0_2px_1px_-1px_rgba(0,0,0,0.05)]'>
        <div className='mx-auto flex h-[50px] w-full max-w-[1240px] items-center justify-between px-6 md:h-[65px]'>
          <a href='https://podcasts.ru/' aria-label='Podcasts.ru'>
            <LogoIcon className='h-[30px] w-auto py-1 md:h-[45px] md:py-2 lg:h-[50px]' />
          </a>
          <button
            className='block'
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label='Меню'
          >
            <Menu
              width={36}
              height={36}
              className='cursor-pointer text-neutral-100'
            />
          </button>
        </div>
      </header>

      {/* Fullscreen menu overlay */}
      <nav
        className={`fixed inset-0 z-30 bg-[#141414] p-8 text-white transition-transform duration-300 ease-[cubic-bezier(.4,0,.2,1)] ${
          menuOpen ? 'translate-y-0' : 'pointer-events-none -translate-y-full'
        }`}
      >
        <div className='relative flex h-full w-full flex-col items-center justify-center'>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label='Закрыть'
            className='absolute top-0 right-0 flex h-24 w-24 items-center justify-center opacity-50 transition-opacity hover:opacity-100'
          >
            <XIcon
              width={48}
              height={48}
              className='cursor-pointer text-neutral-100'
            />
          </button>

          {/* Menu columns */}
          <div className='flex flex-row justify-center max-md:flex-col max-md:items-start max-md:gap-0'>
            {/* Column 1 */}
            <div className='flex flex-col items-start md:w-[300px] xl:mx-10'>
              <a
                href='https://podcasts.ru/lenta/'
                className='border-b border-transparent font-[Oswald,sans-serif] text-[14px] leading-[60px] uppercase transition-colors duration-300 hover:border-current md:text-[30px] md:leading-[80px]'
              >
                Медиа
              </a>
              <a
                href='https://podcast.ru/'
                target='_blank'
                rel='noopener'
                className='border-b border-transparent font-[Oswald,sans-serif] text-[14px] leading-[60px] uppercase transition-colors duration-300 hover:border-current md:text-[30px] md:leading-[80px]'
              >
                Сервис ссылок
              </a>
              <a
                href='https://podlist.ru'
                target='_blank'
                rel='noopener'
                className='border-b border-transparent font-[Oswald,sans-serif] text-[14px] leading-[60px] uppercase transition-colors duration-300 hover:border-current md:text-[30px] md:leading-[80px]'
              >
                Коллекции подкастов
              </a>
              <a
                href='https://podcasts.ru/about/'
                className='border-b border-transparent font-[Oswald,sans-serif] text-[14px] leading-[60px] uppercase transition-colors duration-300 hover:border-current md:text-[30px] md:leading-[80px]'
              >
                О проекте
              </a>
            </div>

            {/* Column 2 */}
            <div className='flex flex-col items-start md:w-[300px] xl:mx-10'>
              <a
                href='https://podcasts.ru/specialisty/'
                className='border-b border-transparent font-[Oswald,sans-serif] text-[14px] leading-[60px] uppercase transition-colors duration-300 hover:border-current md:text-[30px] md:leading-[80px]'
              >
                База специалистов
              </a>
              <a
                href='https://podcastbery.ru/studios'
                target='_blank'
                rel='noopener'
                className='border-b border-transparent font-[Oswald,sans-serif] text-[14px] leading-[60px] uppercase transition-colors duration-300 hover:border-current md:text-[30px] md:leading-[80px]'
              >
                База студий
              </a>
              <a
                href='https://podcasts.ru/help/'
                className='border-b border-transparent font-[Oswald,sans-serif] text-[14px] leading-[60px] uppercase transition-colors duration-300 hover:border-current md:text-[30px] md:leading-[80px]'
              >
                База знаний
              </a>
              <a
                href='https://t.me/podcastjob'
                target='_blank'
                rel='noopener'
                className='border-b border-transparent font-[Oswald,sans-serif] text-[14px] leading-[60px] uppercase transition-colors duration-300 hover:border-current md:text-[30px] md:leading-[80px]'
              >
                Вакансии
              </a>
            </div>
          </div>

          {/* Menu footer */}
          <div className='mt-[100px] flex flex-row justify-center max-md:mt-8 max-md:w-full max-md:flex-col'>
            <div className='text-left md:w-[300px] xl:mx-10'>
              <a
                href='https://podcast.ru/1719855411'
                target='_blank'
                rel='noopener'
                className='mr-2.5 text-[14px] leading-[18px] max-md:float-left max-md:leading-8'
              >
                Подкаст «Деньги на звуке»
              </a>
            </div>
            <div className='text-left md:w-[300px] xl:mx-10'>
              <a
                href='https://podcasts.t.me'
                target='_blank'
                rel='noopener'
                className='mr-2.5 text-[14px] leading-[18px] max-md:float-left max-md:leading-8'
              >
                Telegram
              </a>
              <a
                href='https://vk.ru/podcasts_ru'
                target='_blank'
                rel='noopener'
                className='mr-2.5 text-[14px] leading-[18px] max-md:float-left max-md:leading-8'
              >
                VK
              </a>
              <a
                href='https://youtube.com/podcasts_ru'
                target='_blank'
                rel='noopener'
                className='mr-2.5 text-[14px] leading-[18px] max-md:float-left max-md:leading-8'
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
