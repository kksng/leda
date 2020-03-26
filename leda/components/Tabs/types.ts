import React from 'react';
import { CustomRender } from '../../commonTypes';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { GlobalDefaultTheme, PartialGlobalDefaultTheme } from '../../utils/useTheme';
import { LiProps } from '../Li';

export interface TabsProps {
  /** Устанавливает номер выбранного таба */
  activeTabKey?: string | number,
  /** Обработчик выбора таба */
  onChange?: (event: ChangeEvent) => void,
  /** Тема компонента */
  theme?: PartialGlobalDefaultTheme[typeof COMPONENTS_NAMESPACES.tabs],
  /** Кастомный wrapper */
  wrapperRender?: CustomRender<TabsProps, TabsState, WrapperProps>,
  /** Кастомный content */
  contentRender?: CustomRender<TabsProps, TabsState, ContentProps>,
  /** Кастомный heading */
  headingRender?: CustomRender<TabsProps, TabsState, HeadingProps>,
  /** Кастомный tab */
  tabRender?: CustomRender<TabProps, {}, LiProps>,
  /** Reference */
  ref?: React.Ref<TabsRefCurrent>,
  /** Вложенные элементы */
  children?: React.ReactNode,
  /** Классы переданные через _ */
  [x: string]: unknown,
}

export interface TabsState {
  activeTabKey: string | number,
}

export type TabProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Делает вкладку неактивной */
  isDisabled?: boolean,
  /** Номер вкладки. Нумерация от 0, т.к. обработчик onSelect комопнента Tabs возвращает номер вкладки начиная с 0. */
  tabKey: string | number,
  /** Тема копмонента */
  theme?: PartialGlobalDefaultTheme[typeof COMPONENTS_NAMESPACES.tabs],
  /** Название таба. Может принимать название в виде строки или ReactNode */
  title: React.ReactNode,
  /** Вложенные элементы */
  children?: React.ReactNode,
  /** Кастомный tab */
  tabRender?: CustomRender<TabProps, {}, LiProps>,
  /** Классы переданные через _ */
  [x: string]: unknown,
};

export interface TabsContextType {
  activeTabKey: string | number,
  onTabSelect: SelectHandler,
  theme: GlobalDefaultTheme[typeof COMPONENTS_NAMESPACES.tabs],
  tabRender?: CustomRender<TabProps, {}, LiProps>,
}

export interface SelectHandler {
  (ev: React.MouseEvent<HTMLLIElement>, tabKey: string | number): void,
}

export interface CreateSelectHandler {
  (
    props: TabsProps,
    activeTabKey: string | number,
    setActiveTabKey: React.Dispatch<React.SetStateAction<string | number>>
  ): SelectHandler,
}

export interface TabContentProps {
  /** EventKey выбранной вкладки */
  activeTabKey: string | number,
  /** Вложенные элементы */
  children?: React.ReactNode,
}

export interface ChangeEvent extends React.MouseEvent {
  component: {
    value: string | number,
  },
}

export interface WrapperProps {
  className?: string,
  style?: React.CSSProperties,
  ref?: React.Ref<TabsRefCurrent>,
  children?: React.ReactNode,
}

export interface ContentProps {
  className?: string,
  children?: React.ReactNode,
}

export interface HeadingProps {
  className?: string,
  children?: React.ReactNode,
}

export interface CustomElements {
  Wrapper: React.FC<WrapperProps>,
  Content: React.FC<ContentProps>,
  Heading: React.FC<HeadingProps>,
}

export interface TabsRefCurrent {
  wrapper: HTMLElement | null,
  content: HTMLElement | null,
}

export interface TabRefCurrent {
  wrapper: HTMLLIElement | null,
}
