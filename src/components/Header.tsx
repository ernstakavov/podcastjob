'use client';

import { useState } from 'react';
import { LogoIcon } from '@/app/icons/LogoIcon';
import { Cross } from '@/app/icons/Cross';

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className='position sticky top-0 z-10 flex w-full items-center justify-between bg-[#141414] px-0 py-3 text-[#e4e3e8]'>
        <div className='mx-auto flex w-[100%] max-w-[1228px] items-center justify-between px-6 max-sm:max-w-[320px]'>
          <a href='https://podcasts.ru/'>
            <LogoIcon />
          </a>
          <button className='block' onClick={() => setMenuOpen(!menuOpen)}>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M23 3H1V5H23V3ZM1 11H23V13H1V11ZM1 19H23V21H1V19Z'
                fill='white'
              ></path>
            </svg>
          </button>
        </div>
      </header>
      <nav
        className={`invisible fixed -top-full left-0 z-30 h-full w-full bg-white transition-all delay-[0s] duration-[0.4s] ease-[ease] ${
          menuOpen ? 'visible top-0' : ''
        }`}
      >
        <div className='relative m-0 flex h-full w-screen min-w-[360px] flex-col items-center justify-center bg-[#141414] px-8 py-0'>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <Cross className='absolute top-8 right-6 h-8 w-8 fill-neutral-100 text-2xl' />
          </button>
          <ul>
            <div>
              <li>
                <a href='https://podcasts.ru/lenta/'>МЕДИА</a>
              </li>
              <li>
                <a href='https://podcast.ru/'>СЕРВИС ССЫЛОК</a>
              </li>
              <li>
                <a href='http://podcasts.ru/new'>НОВЫЕ ПОДКАСТЫ</a>
              </li>
              <li>
                <a href='https://podcasts.ru/about/'>О ПРОЕКТЕ</a>
              </li>
            </div>
            <div>
              <li>
                <a href='https://podcasts.ru/specialisty/'>БАЗА СПЕЦИАЛИСТОВ</a>
              </li>
              <li>
                <a href='https://podcasts.ru/studios/'>БАЗА СТУДИЙ</a>
              </li>
              <li>
                <a href='https://podcasts.ru/help/'>БАЗА ЗНАНИЙ</a>
              </li>
              <li>
                <a href='https://budu.jobs/c/60d9b210-c795-48e9-b5a7-a23f142b7b2d?tab=vacancies'>
                  ВАКАНСИИ
                </a>
              </li>
            </div>
          </ul>
          <div>
            {/* className={styles.media}  */}
            <div>
              {/* className={styles.links} */}
              <a href='https://podcast.ru/1541595049'>Новостной подкаст</a>
            </div>
            <div>
              {/* className={styles.links} */}
              <a href='https://t.me/P0DCASTS'>Telegram</a>
              <a href='https://www.youtube.com/channel/UCR2ZV9ARhpfhrQ0obkDVOeg'>
                YouTube
              </a>
              <a href='https://twitter.com/podcasts_ru'>Twitter</a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
