import * as React from 'react';
import { Content } from './Content';
import { SideNavigation } from './SideNavigation';

export interface MainLayoutProps {
  children: React.ReactElement | React.ReactElement[],
}

export const MainLayout = (props: MainLayoutProps): React.ReactElement => {
  const { children } = props;

  return (
    <>
      <Content>
        {children}
      </Content>
      <SideNavigation>
        {children}
      </SideNavigation>
    </>
  );
};

MainLayout.displayName = 'MainLayout';
