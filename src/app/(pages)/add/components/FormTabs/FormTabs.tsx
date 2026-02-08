import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReactNode } from 'react';

export type FormTab = {
  title: string;
  value: string;
  component: ReactNode;
};

type FormTabsProps = {
  defaultTab: FormTab;
  tabs: Record<string, FormTab>;
};

export const FormTabs = (props: FormTabsProps) => {
  const { defaultTab, tabs } = props;

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
  );
};
