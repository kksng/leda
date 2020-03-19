import * as React from 'react';
import { MainContext, MainContextContent } from '../components/MainContext';
import { CurrentLanguage, Langs } from '../../lang/types';
import { restoreLang, setLang } from '../../lang';
import { Themes } from '../../constants';
import { restoreTheme, setTheme } from '../helpers';

export interface RootProps {
  children: React.ReactNode | React.ReactNode[],
}

export const Root = (props: RootProps): React.ReactElement => {
  const { children } = props;
  const [storiesContext, setStoriesContext] = React.useState<MainContextContent['stories']>({});
  const [currentLang, setCurrentLang] = React.useState<CurrentLanguage>(restoreLang);
  const [currentTheme, setCurrentTheme] = React.useState<Themes>(restoreTheme);

  const setStoryContext = React.useCallback((url: string, groupNames: string[]) => {
    setStoriesContext((prevStories) => ({
      ...prevStories,
      [url]: { groupNames },
    }));
  }, []);

  const setNewLang = React.useCallback((lang: Langs) => {
    setCurrentLang(setLang(lang));
  }, []);

  const setNewTheme = React.useCallback((theme: Themes) => {
    setCurrentTheme(setTheme(theme));
  }, []);

  const mainContextValue = {
    stories: storiesContext,
    lang: currentLang,
    theme: currentTheme,
    setCurrentLanguage: setNewLang,
    setCurrentTheme: setNewTheme,
    setStoryContext,
  };

  return (
    <MainContext.Provider value={mainContextValue}>
      {children}
    </MainContext.Provider>
  );
};

Root.displayName = 'Root';
