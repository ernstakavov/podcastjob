import { LogoIcon } from '@/app/icons/LogoIcon'
import { TelegramIcon } from '@/app/icons/TelegramIcon'
import { YoutubeIcon } from '@/app/icons/YoutubeIcon'
import { VkIcon } from '@/app/icons/VkIcon'
import { cn } from '@/lib/utils'

type FooterProps = {
  className?: string
}

export const Footer = (props: FooterProps) => {
  const { className } = props

  return (
    <footer className={cn('flex-[0_0_auto]', className)}>
      {/* Main footer row */}
      <div className='bg-[#141414] px-6 py-6'>
        <div className='mx-auto flex max-w-[1240px] items-center justify-between max-[900px]:flex-col max-[900px]:gap-6'>
          {/* Logo */}
          <div className='w-[16.667%] max-[900px]:w-auto'>
            <a href='https://podcasts.ru/' aria-label='Podcasts.ru'>
              <LogoIcon className='mx-auto h-auto w-3/5' />
            </a>
          </div>

          {/* Links */}
          <div className='flex flex-wrap gap-x-6 gap-y-3 text-[#e4e3e8] max-[600px]:flex-col'>
            <a
              href='https://podcasts.ru/about/'
              className='border-b border-solid border-current text-inherit hover:border-transparent'
            >
              О проекте
            </a>
            <a
              href='https://drive.google.com/file/d/1eG77nPKfNmhX6jUAsgUdkTCdgVh_FQcY/view?usp=drive_link'
              target='_blank'
              rel='noopener'
              className='border-b border-solid border-current text-inherit hover:border-transparent'
            >
              Медиакит
            </a>
            <a
              href='https://podcasts.ru/useragreement/'
              className='border-b border-solid border-current text-inherit hover:border-transparent'
            >
              Пользовательское соглашение
            </a>
            <a
              href='https://docs.google.com/document/d/1Gja8NDQpENtCsTW-cYBA_KUzJ2EMQjOIxf9ABtH386U/edit?usp=sharing'
              target='_blank'
              rel='noopener'
              className='border-b border-solid border-current text-inherit hover:border-transparent'
            >
              Редакционная политика
            </a>
          </div>

          {/* Social icons */}
          <div className='flex items-center gap-3 max-[600px]:hidden'>
            <a
              href='https://t.me/podcasts'
              target='_blank'
              rel='noopener nofollow'
              title='Telegram'
              aria-label='Telegram'
              className='text-[#e4e3e8] transition-opacity hover:opacity-70'
            >
              <TelegramIcon />
            </a>
            <a
              href='https://vk.ru/podcasts_ru'
              target='_blank'
              rel='noopener nofollow'
              title='Vkontakte'
              aria-label='Vkontakte'
              className='text-[#e4e3e8] transition-opacity hover:opacity-70'
            >
              <VkIcon />
            </a>
            <a
              href='https://youtube.com/podcasts_ru'
              target='_blank'
              rel='noopener nofollow'
              title='YouTube'
              aria-label='YouTube'
              className='text-[#e4e3e8] transition-opacity hover:opacity-70'
            >
              <YoutubeIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright row */}
      <div className='bg-[#141414] px-6 py-4'>
        <p className='text-center text-[0.8rem] text-[#999999]'>
          © 2020-2026{' '}
          <a href='https://podcasts.ru/' className='text-[#e4e3e8]'>
            Podcasts.ru
          </a>
        </p>
      </div>
    </footer>
  )
}
