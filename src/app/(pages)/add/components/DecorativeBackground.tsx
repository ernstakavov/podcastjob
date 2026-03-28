export const DecorativeBackground = () => {
  return (
    <div className='pointer-events-none fixed inset-0 z-0'>
      {/* Sound wave bars - green */}
      <svg
        className='absolute top-[8%] left-[3%] opacity-[0.08]'
        width='200'
        height='100'
        viewBox='0 0 200 100'
      >
        <rect x='0' y='30' width='8' height='40' fill='#00A739' rx='4' />
        <rect x='20' y='20' width='8' height='60' fill='#00A739' rx='4' />
        <rect x='40' y='10' width='8' height='80' fill='#00A739' rx='4' />
        <rect x='60' y='25' width='8' height='50' fill='#00A739' rx='4' />
        <rect x='80' y='35' width='8' height='30' fill='#00A739' rx='4' />
        <rect x='100' y='15' width='8' height='70' fill='#00A739' rx='4' />
        <rect x='120' y='30' width='8' height='40' fill='#00A739' rx='4' />
        <rect x='140' y='20' width='8' height='60' fill='#00A739' rx='4' />
      </svg>

      {/* Microphone illustration */}
      <svg
        className='absolute top-[12%] right-[4%] opacity-[0.06]'
        width='120'
        height='280'
        viewBox='0 0 120 280'
        fill='none'
      >
        <rect x='30' y='10' width='60' height='100' rx='30' fill='#000000' />
        <line
          x1='30' y1='35' x2='90' y2='35'
          stroke='#FFFFFF' strokeWidth='2' opacity='0.3'
        />
        <line
          x1='30' y1='55' x2='90' y2='55'
          stroke='#FFFFFF' strokeWidth='2' opacity='0.3'
        />
        <line
          x1='30' y1='75' x2='90' y2='75'
          stroke='#FFFFFF' strokeWidth='2' opacity='0.3'
        />
        <path
          d='M20 110 Q20 160 60 160 Q100 160 100 110'
          stroke='#000000' strokeWidth='10' fill='none' strokeLinecap='round'
        />
        <line
          x1='60' y1='160' x2='60' y2='240'
          stroke='#000000' strokeWidth='10' strokeLinecap='round'
        />
        <line
          x1='30' y1='240' x2='90' y2='240'
          stroke='#000000' strokeWidth='10' strokeLinecap='round'
        />
      </svg>
    </div>
  );
};
