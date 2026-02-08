import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VacancyForm } from './components/VacancyForm';
import { ResumeForm } from './components/ResumeForm';

export default function Add() {
  return (
    <div className='grid min-h-screen bg-[#E6E6E6] font-[family-name:var(--font-geist-sans)]'>
      <Header />
      <main className='mx-auto mt-10 w-full max-w-5xl px-4'>
        <Tabs defaultValue='vacancy'>
          <TabsList className='w-full'>
            <TabsTrigger value='vacancy'>Вакансия</TabsTrigger>
            <TabsTrigger value='resume'>Резюме</TabsTrigger>
          </TabsList>
          <TabsContent value='vacancy'>
            <VacancyForm />
          </TabsContent>
          <TabsContent value='resume'>
            <ResumeForm />
          </TabsContent>
        </Tabs>
      </main>
      <Footer className='mt-auto' />
    </div>
  );
}
