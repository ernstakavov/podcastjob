import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { FormTabs } from './components/FormTabs';

export default function Add() {
  return (
    <div className='grid min-h-screen bg-[#E6E6E6] font-[family-name:var(--font-geist-sans)]'>
      <Header />
      <main className='mx-auto mt-10 w-full max-w-5xl px-4'>
        <FormTabs />
      </main>
      <Footer className='mt-auto' />
    </div>
  );
}
