import { ReactNode } from 'react';

type TFullPageLayoutProps = {
  children: ReactNode;
};

export const FullPageLayout = (props: TFullPageLayoutProps) => {
  const { children } = props;

  return <div className='h-screen'>{children}</div>;
};
