import React from 'react';
import isNil from 'lodash/isNil';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { createSelectHandler } from './handlers';
import { useCustomElements, useTabsScroll } from './hooks';
import { TabContent } from './TabContent';
import { Tab } from './Tab';
import {
  bindFunctionalRef, getClassNames, useElementRef, useProps, useTheme,
} from '../../utils';
import { TabsContext } from './TabsContext';
import { TabsProps, TabsRefCurrent } from './types';
import { ArrowLeft, ArrowRight } from './ScrollArrows';
import { Div } from '../Div';

export const Tabs = React.forwardRef((props: TabsProps, ref?: React.Ref<TabsRefCurrent>): React.ReactElement | null => {
  const {
    theme: themeProp,
    activeTabKey: activeTabKeyProp,
    children,
    className,
    shouldScrollTabs,
    style,
    tabContentNode,
    tabRender,
  } = useProps(props);

  const theme = useTheme(themeProp, COMPONENTS_NAMESPACES.tabs);

  const [activeTabKeyState, setActiveTabKeyState] = React.useState<string | number>(0);

  // если не передано activeTabKey - работать в неконтролируемом режиме
  const activeTabKey = isNil(activeTabKeyProp)
    ? activeTabKeyState
    : activeTabKeyProp;

  const handleSelect = createSelectHandler(props, activeTabKeyState, setActiveTabKeyState);

  const tabsContext = {
    activeTabKey, onTabSelect: handleSelect, theme, tabRender,
  };

  const combinedClassNames = getClassNames(theme.wrapper, className);

  const {
    Wrapper,
    Content,
    Heading,
  } = useCustomElements(props, { activeTabKey: activeTabKeyState });

  const [
    elementRef,
    hasScroll,
    onRightClick,
    onLeftClick,
  ] = useTabsScroll({ shouldScrollTabs });

  if (!children) return null;

  return (
    <Wrapper
      className={combinedClassNames}
      style={style as React.CSSProperties}
      ref={ref && ((component) => bindFunctionalRef(component, ref, component && {
        wrapper: component.wrapper,
        content: component.wrapper && component.wrapper.querySelector(`.${theme.content}`),
      }))}
    >
      <Div
        ref={elementRef}
        style={{
          width: '100%',
        }}
      >
        {hasScroll && (
          <>
            <ArrowRight
              onClick={onRightClick}
            />
            <ArrowLeft
              onClick={onLeftClick}
            />
          </>
        )}

        <ul
          className={theme.tabsBar}
          style={{
            display: 'inline-flex',
          }}
        >
          <TabsContext.Provider value={tabsContext}>
            {React.Children.map(children, (child) => {
              if (!React.isValidElement(child)) return null;

              return (
                <Tab {...child.props} />
              );
            })}
          </TabsContext.Provider>
        </ul>
      </Div>
      <Content className={theme.content} tabContentNode={tabContentNode}>
        <TabContent activeTabKey={activeTabKey} key={activeTabKey}>
          {children}
        </TabContent>
      </Content>
    </Wrapper>
  );
}) as React.FC<TabsProps>;

Tabs.displayName = 'Tabs';
