import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VacancyForm } from '../VacancyForm';
import { ResumeForm } from '../ResumeForm';
import { EventForm } from '../EventForm';

export const FormTabs = () => {
  return (
    <>
      <Tabs defaultValue='vacancy'>
        <TabsList className='w-full'>
          <TabsTrigger value='vacancy'>Вакансия</TabsTrigger>
          <TabsTrigger value='resume'>Резюме</TabsTrigger>
          <TabsTrigger value='event'>Ивент</TabsTrigger>
        </TabsList>
        <TabsContent value='vacancy'>
          <VacancyForm />
        </TabsContent>
        <TabsContent value='resume'>
          <ResumeForm />
        </TabsContent>
        <TabsContent value='event'>
          <EventForm />
        </TabsContent>
      </Tabs>
    </>
  );
};
