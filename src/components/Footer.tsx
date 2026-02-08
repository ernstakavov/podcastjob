import { LogoIcon } from '@/app/icons/LogoIcon';
import { TelegramIcon } from '@/app/icons/TelegramIcon';
import { YoutubeIcon } from '@/app/icons/YoutubeIcon';
import { cn } from '@/lib/utils';

type FooterProps = {
  className?: string;
};

export const Footer = (props: FooterProps) => {
  const { className } = props;

  return (
    <footer
      className={cn(
        'relative flex min-h-[128px] flex-[0_0_auto] flex-col items-center justify-between bg-[#141414] px-0 pt-8 pb-2 text-[#e4e3e8]',
        className,
      )}
    >
      <div className='mx-auto flex w-[100%] max-w-[1228px] justify-between px-6 max-[944px]:flex-col max-sm:max-w-[320px]'>
        <a href='https://podcasts.ru/' className='logo max-[944px]:mb-[24px]'>
          <LogoIcon />
        </a>
        <div className='flex gap-4 max-[768px]:flex-col'>
          <a href='https://podcasts.ru/about/' className='action-link'>
            О проекте
          </a>
          <a
            href='https://drive.google.com/file/d/1eG77nPKfNmhX6jUAsgUdkTCdgVh_FQcY/view?usp=drive_link'
            className='action-link'
          >
            Медиакит
          </a>
          <a href='https://podcasts.ru/useragreement/' className='action-link'>
            Пользовательское соглашение
          </a>
          <a
            href='https://docs.google.com/document/d/1Gja8NDQpENtCsTW-cYBA_KUzJ2EMQjOIxf9ABtH386U/edit?usp=sharing'
            className='action-link'
          >
            Редакционная политика
          </a>
        </div>
        <div className='social'>
          <a href='https://t.me/P0DCASTS' className='action-link'>
            <TelegramIcon />
          </a>
          <a
            href='https://www.youtube.com/channel/UCR2ZV9ARhpfhrQ0obkDVOeg'
            className='action-link'
          >
            <YoutubeIcon />
          </a>
        </div>
      </div>
      <div className='rights'>
        <span className='text-[#999999]'>© 2020-2023 </span>
        <a href='https://podcasts.ru/'>Podcasts.ru</a>
      </div>
    </footer>
  );
};
