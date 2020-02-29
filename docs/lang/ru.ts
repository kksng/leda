import { CurrentLanguage, Langs } from './types';

export const ru: CurrentLanguage = {
  langName: Langs.Ru,
  sidebar: {
    title: 'Документация Leda',
    langGlobe: {
      en: 'Английский',
      ru: 'Русский',
    },
    menu: {
      basicsGroupName: 'Основы',
      startingWorkGroupName: 'Начало работы',
      conceptStoryName: 'Введение',
      apiGroupName: 'API',
      apiFeaturesStoryName: 'Особенности API',
      apiEventsStoryName: 'Events',
      markupStoryName: 'Вёрстка',
      customizationGroupName: 'Кастомизация',
      customizationComponentsStoryName: 'Кастомизация компонентов',
      customizationStylesStoryName: 'Кастомизация стилей',
      customizationClassesStoryName: 'Переопределение css-классов',
      customizationElementsStoryName: 'Изменение элемента',
    },
  },
};
