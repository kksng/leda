import * as React from 'react';
import { restoreLang } from '../../lang';
import { CurrentLanguage, Langs } from '../../lang/types';

export interface MainContextContent {
  stories: {
    [storyUrl: string]: {
      groupNames: string[],
    },
  },
  lang: CurrentLanguage,
  setCurrentLanguage: (lang: Langs) => void,
  setStoryContext: (url: string, groupNames: string[]) => void,
}

export const MainContext = React.createContext<MainContextContent>({
  stories: {},
  lang: restoreLang(),
  setCurrentLanguage: () => {},
  setStoryContext: () => {},
});
