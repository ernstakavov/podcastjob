import { cn } from '@/lib/utils'

type TRecordingIndicatorProps = {
  label: string
  className?: string
}

export const RecordingIndicator = (props: TRecordingIndicatorProps) => {
  const { label, className } = props

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-2',
        className,
      )}
    >
      <div className='h-2 w-2 animate-[recording-pulse_1.5s_ease-in-out_infinite] rounded-full bg-red-600' />
      <span className='text-xs font-semibold tracking-[0.15em] text-white uppercase'>
        {label}
      </span>
    </div>
  )
}
