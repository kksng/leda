import { CurrentLanguage, Langs } from './types';
import { en } from './en';
import { ru } from './ru';

export const setLang = (newLang: Langs): CurrentLanguage => {
  localStorage.setItem('lang', newLang);

  return (() => {
    switch (newLang) {
      case Langs.En:
        return en;
      case Langs.Ru:
        return ru;
      default:
        return en;
    }
  })();
};

export const restoreLang = (): CurrentLanguage => {
  const prevLang = localStorage.getItem('lang') as Langs ?? Langs.En;

  return setLang(prevLang);
};
