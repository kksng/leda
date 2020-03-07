import * as React from 'react';
import { Group, MainLayout, Story } from './system';
import { Urls } from './constants';
import { Concept } from './stories/Basic/Concept/Concept';
import { MainContext } from './system/components/MainContext';
import { StatusBarApi } from './stories/Layout/StatusBar/API';

export const Docs = (): React.ReactElement => {
  const { lang } = React.useContext(MainContext);

  const { sidebar: { menu } } = lang;

  return (
    <MainLayout>
      <Group name={menu.basicsGroupName}>
        <Group name={menu.startingWorkGroupName}>
          <Story name={menu.conceptStoryName} url={Urls.Concept}>
            <Concept />
          </Story>
        </Group>
        <Group name={menu.apiGroupName}>
          <Story name={menu.apiFeaturesStoryName} url={Urls.Api} />
          <Story name={menu.apiEventsStoryName} url={Urls.ApiEvents} />
        </Group>
        <Story name={menu.markupStoryName} url={Urls.Markup} />
        <Group name={menu.customizationGroupName}>
          <Story name={menu.customizationComponentsStoryName} url={Urls.Customization} />
          <Story name={menu.customizationStylesStoryName} url={Urls.CustomizationStyles} />
          <Story name={menu.customizationClassesStoryName} url={Urls.CustomizationClasses} />
          <Story name={menu.customizationElementsStoryName} url={Urls.CustomizationElements} />
        </Group>
      </Group>
      <Group name="LAYOUT">
        <Group name="StatusBar">
          <Story name="API" url={Urls.StatusBarApi}>
            <StatusBarApi />
          </Story>
        </Group>
      </Group>
    </MainLayout>
  );
};

Docs.displayName = 'Docs';
