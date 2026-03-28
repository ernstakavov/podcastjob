import { SoundWaveIcon } from '@/app/icons/SoundWaveIcon';
import { MicrophoneIcon } from '@/app/icons/MicrophoneIcon';

export const DecorativeBackground = () => {
  return (
    <div className='pointer-events-none fixed inset-0 z-0'>
      <SoundWaveIcon className='absolute top-[8%] left-[3%] opacity-[0.08]' />
      <MicrophoneIcon className='absolute top-[12%] right-[4%] opacity-[0.06]' />
    </div>
  );
};
