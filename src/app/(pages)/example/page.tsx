import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { PodcastJobBoard } from './components/PodcastJobsBrand'

export default function Example() {
  return (
    <div className='grid min-h-screen font-[family-name:var(--font-geist-sans)]'>
      <Header />
      <main className='mx-auto mt-10 w-full max-w-5xl px-4'>
        <PodcastJobBoard />
      </main>
      <Footer className='mt-auto' />
    </div>
  )
}
