import { useFormContext } from 'react-hook-form'
import { Loader2 } from 'lucide-react'
import { Button } from '../ui/button'

export const FormButton = () => {
  const {
    formState: { isSubmitting },
  } = useFormContext()

  return (
    <Button
      className='mt-6 h-12 w-full cursor-pointer rounded-full bg-[#00A739] text-[15px] font-bold tracking-wide text-white uppercase transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0'
      type='submit'
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <Loader2 className='size-5 animate-spin' />
      ) : (
        'Опубликовать вакансию'
      )}
    </Button>
  )
}
