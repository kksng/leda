import { CurrentLanguage, Langs } from './types';

export const en: CurrentLanguage = {
  langName: Langs.En,
  sidebar: {
    title: 'Leda Documentation',
    langGlobe: {
      en: 'English',
      ru: 'Russian',
    },
    menu: {
      basicsGroupName: 'Basics',
      startingWorkGroupName: 'Getting Started',
      conceptStoryName: 'Concept',
      apiGroupName: 'API',
      apiFeaturesStoryName: 'API Features',
      apiEventsStoryName: 'Events API',
      markupStoryName: 'Markup helpers',
      customizationGroupName: 'Customization',
      customizationComponentsStoryName: 'Component Customization',
      customizationStylesStoryName: 'Styles Customization',
      customizationClassesStoryName: 'ClassNames Customization',
      customizationElementsStoryName: 'Elements Customization',
      layoutStatusBarApi: 'API',
    },
  },
};
