import * as React from 'react';
import * as L from '../../../leda';
import { MainContext } from '../components/MainContext';
import { Langs } from '../../lang/types';

export interface SideNavigationProps {
  children: React.ReactElement | React.ReactElement[],
}

export const SideNavigation = (props: SideNavigationProps): React.ReactElement => {
  const { children } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  const { lang, setCurrentLanguage } = React.useContext(MainContext);

  return (
    <L.Div
      _bside
      _opened={isOpen}
      onMouseOver={() => setIsOpen(true)}
      onMouseOut={() => setIsOpen(false)}
    >
      <L.Span
        _fas
        _faArrowCircleLeft
        _menuIcon
        _r180={isOpen}
      />
      <L.Div _marginLeft>
        <L.H5 _title>
          {lang.sidebar.title}
        </L.H5>
        <L.Div _storyListContainer>
          <L.Ul _storyList>
            {children}
          </L.Ul>
        </L.Div>
      </L.Div>
      <L.DropDown _langDropDown>
        <L.Span
          _fas
          _faGlobeAmericas
          _menuIcon
        />
        <L.Ul _langList>
          <L.Li _langItem onClick={() => setCurrentLanguage(Langs.En)}>{lang.sidebar.langGlobe.en}</L.Li>
          <L.Li _langItem onClick={() => setCurrentLanguage(Langs.Ru)}>{lang.sidebar.langGlobe.ru}</L.Li>
        </L.Ul>
      </L.DropDown>
    </L.Div>
  );
};

SideNavigation.displayName = 'SideNavigation';
