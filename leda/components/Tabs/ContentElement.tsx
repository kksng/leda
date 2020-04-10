import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ContentProps } from './types';
import { Div } from '../Div';

export const ContentElement = (props: ContentProps) => {
  const {
    children, tabContentNode, tabContentRef, ...restProps
  } = props;

  if (tabContentRef) {
    if (tabContentRef.current) {
      const node = tabContentRef.current.wrapper ?? tabContentRef.current;
      return ReactDOM.createPortal(children, node);
    }
    return null;
  }

  if (tabContentNode) return ReactDOM.createPortal(children, tabContentNode);

  return <Div {...restProps}>{children}</Div>;
};
