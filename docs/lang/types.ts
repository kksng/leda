export interface CurrentLanguage {
  langName: Langs,
  sidebar: {
    title: string,
    langGlobe: {
      en: string,
      ru: string,
    },
    menu: {
      basicsGroupName: string,
      startingWorkGroupName: string,
      conceptStoryName: string,
      apiGroupName: string,
      apiFeaturesStoryName: string,
      apiEventsStoryName: string,
      markupStoryName: string,
      customizationGroupName: string,
      customizationComponentsStoryName: string,
      customizationStylesStoryName: string,
      customizationClassesStoryName: string,
      customizationElementsStoryName: string,
      layoutStatusBarApi: string,
    },
  },
}

export enum Langs {
  Ru = 'RU',
  En = 'EN',
}
