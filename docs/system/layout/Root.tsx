import * as React from 'react';
import { MainContext, MainContextContent } from '../components/MainContext';
import { CurrentLanguage, Langs } from '../../lang/types';
import { restoreLang, setLang } from '../../lang';

export interface RootProps {
  children: React.ReactNode | React.ReactNode[],
}

export const Root = (props: RootProps): React.ReactElement => {
  const { children } = props;
  const [storiesContext, setStoriesContext] = React.useState<MainContextContent['stories']>({});
  const [currentLang, setCurrentLang] = React.useState<CurrentLanguage>(restoreLang());

  const setStoryContext = React.useCallback((url: string, groupNames: string[]) => {
    setStoriesContext((prevStories) => ({
      ...prevStories,
      [url]: { groupNames },
    }));
  }, []);

  const setNewLang = React.useCallback((lang: Langs) => {
    setCurrentLang(setLang(lang));
  }, []);

  const mainContextValue = {
    stories: storiesContext,
    lang: currentLang,
    setCurrentLanguage: setNewLang,
    setStoryContext,
  };

  return (
    <MainContext.Provider value={mainContextValue}>
      {children}
    </MainContext.Provider>
  );
};

Root.displayName = 'Root';
