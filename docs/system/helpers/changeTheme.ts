import { Themes } from '../../constants';

export const restoreTheme = (): Themes => {
  const theme = localStorage.getItem('theme') as Themes || Themes.Light;

  const ledaLink = document.getElementById('leda-css') as HTMLLinkElement | null;

  const docsLink = document.getElementById('docs-dark-css') as HTMLLinkElement | null;

  if (theme === Themes.Dark) {
    if (ledaLink) {
      ledaLink.href = ledaLink.href.replace(Themes.Light, Themes.Dark);
    }

    if (!docsLink) {
      const newDocsLink = document.createElement('link');
      newDocsLink.href = '/assets/css/docs.dark.css';
      newDocsLink.id = 'docs-dark-css';
      newDocsLink.rel = 'stylesheet';

      document.head.appendChild(newDocsLink);
    }
  }

  return theme;
};

export const setTheme = (theme: Themes): Themes => {
  localStorage.setItem('theme', theme);

  const ledaLink = document.getElementById('leda-css') as HTMLLinkElement | null;

  const prevTheme = theme === Themes.Light ? 'dark' : 'light';

  if (ledaLink) {
    ledaLink.href = ledaLink.href.replace(prevTheme, theme);
  }

  const docsLink = document.getElementById('docs-dark-css') as HTMLLinkElement | null;

  if (docsLink) {
    document.head.removeChild(docsLink);
  } else {
    const newDocsLink = document.createElement('link');
    newDocsLink.href = '/assets/css/docs.dark.css';
    newDocsLink.id = 'docs-dark-css';
    newDocsLink.rel = 'stylesheet';

    document.head.appendChild(newDocsLink);
  }

  return theme;
};
