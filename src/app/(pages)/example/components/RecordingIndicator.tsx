import { cn } from '@/lib/utils'

type TRecordingIndicatorProps = {
  label: string
  className: string
}

export const RecordingIndicator = (props: TRecordingIndicatorProps) => {
  const { label, className } = props

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-black px-6 py-2',
        className,
      )}
      // style={{
      //   display: 'inline-flex',
      //   alignItems: 'center',
      //   gap: '10px',
      //   padding: '10px 24px',
      //   background: '#000000',
      //   borderRadius: '100px',
      //   marginBottom: '28px',
      // }}
    >
      <div
        className='h-2 w-2 rounded-full bg-red-600'
        style={{
          // width: '8px',
          // height: '8px',
          // borderRadius: '50%',
          // background: '#FF3B30',
          animation: 'recordingPulse 1.5s ease-in-out infinite',
        }}
      />
      <span
        className='body-text'
        style={{
          fontSize: '12px',
          fontWeight: '600',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#FFFFFF',
        }}
      >
        {label}
      </span>
    </div>
  )
}
