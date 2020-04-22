import * as React from 'react';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { useElement, useElementRef } from '../../utils';
import { Div } from '../Div';
import { LedaContext } from '../LedaProvider';
import { Ul } from '../Ul';
import { CustomElements, TabsProps, TabsScroll } from './types';
import { ContentElement } from './ContentElement';

export const useCustomElements = (props: TabsProps, state: { activeTabKey: string | number }): CustomElements => {
  const { renders: { [COMPONENTS_NAMESPACES.tabs]: tabsRenders } } = React.useContext(LedaContext);

  const {
    wrapperRender, contentRender, headingRender,
  } = props;

  const Wrapper = useElement(
    'Wrapper',
    Div,
    wrapperRender || tabsRenders.wrapperRender,
    props,
    state,
  );

  const Content = useElement(
    'Content',
    ContentElement,
    contentRender || tabsRenders.contentRender,
    props,
    state,
  );

  const Heading = useElement(
    'Heading',
    Ul,
    headingRender || tabsRenders.headerRender,
    props,
    state,
  );

  return {
    Wrapper,
    Content,
    Heading,
  };
};

export const useTabsScroll = ({ shouldScrollTabs }: { shouldScrollTabs?: boolean }): TabsScroll => {
  const [Element, containerRef] = useElementRef();
  const [hasScroll, setHasScroll] = React.useState(false);
  const [hasLeftArrow, setHasLeftArrow] = React.useState(false);
  const [hasRightArrow, setHasRightArrow] = React.useState(false);
  const [timeStamp, setTimeStamp] = React.useState(0);
  const mainElementRect = Element?.getBoundingClientRect();
  const tabsContainer = Element?.querySelector(':last-child');
  const tabs = Element?.querySelectorAll('.tabs-item');

  const scrollHandler = (ev: any) => {
    // todo: add throttling
    setTimeStamp(ev.timeStamp);
  };

  const onRightClick = () => {
    if (tabsContainer == null || mainElementRect == null) return;

    const tabCrossingRightBorder = [...tabs].find((el) => el.getBoundingClientRect().right > mainElementRect.right);
    if (tabCrossingRightBorder == null) return;

    const tabShift = tabCrossingRightBorder.getBoundingClientRect().right - mainElementRect.right;
    const leftShift = Math.abs(tabsContainer.getBoundingClientRect().left - mainElementRect.left);

    Element?.scrollTo({
      top: mainElementRect.top,
      left: mainElementRect.left + tabShift + leftShift,
      behavior: 'smooth',
    });
  };

  const onLeftClick = () => {
    if (tabsContainer == null || mainElementRect == null) return;

    const tabCrossingLeftBorder = [...tabs].reverse().find((el) => el.getBoundingClientRect().left < mainElementRect.left);
    if (tabCrossingLeftBorder == null) return;

    const tabShift = Math.ceil(Math.abs(tabCrossingLeftBorder.getBoundingClientRect().left - mainElementRect.left));
    const leftShift = Math.abs(tabsContainer.getBoundingClientRect().left - mainElementRect.left);

    Element?.scrollTo({
      top: mainElementRect.top,
      left: leftShift - tabShift,
      behavior: 'smooth',
    });
  };

  React.useEffect(() => {
    if (shouldScrollTabs && Element && tabsContainer) {
      const tabsContainerRect = tabsContainer.getBoundingClientRect();
      const elementRect = Element.getBoundingClientRect();

      if (tabsContainerRect.width > elementRect.width) {
        setHasScroll(true);
        Element.style.overflowX = 'scroll';

        setHasLeftArrow(tabsContainerRect.left < elementRect.left);
        setHasRightArrow(Math.round(tabsContainerRect.right) > elementRect.right);
      }
    }
  }, [Element, timeStamp]);

  React.useEffect(() => {
    Element?.addEventListener('scroll', scrollHandler);

    return () => {
      Element?.removeEventListener('scroll', scrollHandler);
    };
  });

  return {
    containerRef,
    hasScroll,
    hasLeftArrow,
    hasRightArrow,
    onRightClick,
    onLeftClick,
  };
};
