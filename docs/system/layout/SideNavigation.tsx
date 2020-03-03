import * as React from 'react';
import * as L from '../../../leda';
import { MainContext } from '../components/MainContext';
import { Langs } from '../../lang/types';
import { getIsSidebarOpen, setIsSidebarOpen } from '../helpers';

export interface SideNavigationProps {
  children: React.ReactElement | React.ReactElement[],
}

export const SideNavigation = (props: SideNavigationProps): React.ReactElement => {
  const { children } = props;
  const [isOpen, setIsOpen] = React.useState(getIsSidebarOpen());

  const { lang, setCurrentLanguage } = React.useContext(MainContext);

  return (
    <L.Div _bsidePanel _opened={isOpen}>
      <L.Div
        _bside
      >
        <L.Span
          _fas
          _faArrowCircleLeft
          _menuIcon
          _marginRight
          _r180={isOpen}
          onClick={() => {
            setIsOpen(!isOpen);
            setIsSidebarOpen(!isOpen);
          }}
        />
        <L.Div _storyMenu>
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
          <L.H5 _title>
            {lang.sidebar.title}
          </L.H5>
          <L.Div _storyListContainer>
            <L.Ul _storyList>
              {children}
            </L.Ul>
          </L.Div>
        </L.Div>
      </L.Div>
    </L.Div>
  );
};

SideNavigation.displayName = 'SideNavigation';
