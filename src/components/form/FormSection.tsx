import { ReactNode } from 'react'

type Props = {
  title: string
  description?: string
  children: ReactNode
}

export const FormSection = ({ title, description, children }: Props) => (
  <section className='space-y-6'>
    <div>
      <h6 className='text-lgx mb-1 font-medium'>{title}</h6>
      {description && (
        <p className='text-muted-foreground text-sm'>{description}</p>
      )}
    </div>
    <div className='space-y-8'>{children}</div>
  </section>
)
