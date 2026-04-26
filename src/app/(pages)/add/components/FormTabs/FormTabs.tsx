import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReactNode } from 'react'
import { VacancyForm } from '../VacancyForm'
import { ResumeForm } from '../ResumeForm'
import { EventForm } from '../EventForm'

export type FormTab = {
  title: string
  value: string
  component: ReactNode
}

export const FORM_TABS: Record<string, FormTab> = {
  vacancy: {
    title: 'Вакансия',
    value: 'vacancy',
    component: <VacancyForm />,
  },
  resume: {
    title: 'Резюме',
    value: 'resume',
    component: <ResumeForm />,
  },
  event: {
    title: 'Ивент',
    value: 'event',
    component: <EventForm />,
  },
}

export const FormTabs = () => {
  const defaultTab = FORM_TABS.vacancy
  const tabs = FORM_TABS

  return (
    <>
      <Tabs defaultValue={defaultTab.value}>
        <TabsList className='w-full'>
          {Object.values(tabs).map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.values(tabs).map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}
