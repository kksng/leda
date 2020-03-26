import * as React from 'react';
import { restoreLang } from '../../lang';
import { CurrentLanguage, Langs } from '../../lang/types';
import { Themes } from '../../constants';

export interface MainContextContent {
  stories: {
    [storyUrl: string]: {
      groupNames: string[],
    },
  },
  lang: CurrentLanguage,
  theme: Themes,
  setCurrentLanguage: (lang: Langs) => void,
  setStoryContext: (url: string, groupNames: string[]) => void,
  setCurrentTheme: (theme: Themes) => void,
}

export const MainContext = React.createContext<MainContextContent>({
  stories: {},
  lang: restoreLang(),
  theme: Themes.Light,
  setCurrentLanguage: () => {},
  setStoryContext: () => {},
  setCurrentTheme: () => {},
});
