import { Button } from '../ui/button'

export const FormButton = () => {
  return (
    <Button
      className='mt-4 block w-full rounded-full bg-[#00A739] text-[15px] font-bold text-white uppercase transition-all duration-250 hover:bg-black hover:text-white'
      size='lg'
      type='submit'
    >
      Опубликовать вакансию
    </Button>
  )
}
