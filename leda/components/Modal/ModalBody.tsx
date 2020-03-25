import React from 'react';
import { mergeClassNames, getClassNames, useElement } from '../../utils';
import { Div } from '../Div';
import { LedaContext } from '../LedaProvider';
import { ModalContext } from './ModalContext';
import { ModalElementsProps } from './types';

export const ModalBody: React.FC<ModalElementsProps> = (props: ModalElementsProps): React.ReactElement => {
  const { underscoreClassesTransform } = React.useContext(LedaContext);

  const {
    className, children, wrapperRender, ...restProps
  } = mergeClassNames(props, { underscoreClassesTransform });

  const modalContext = React.useContext(ModalContext);

  const { renders: { modalBody: modalBodyRenders } } = React.useContext(LedaContext);

  const Wrapper = useElement(
    'Wrapper',
    Div,
    wrapperRender || modalBodyRenders.wrapperRender,
    props,
  );

  return (
    <Wrapper
      className={getClassNames(className, modalContext.bodyClassName)}
      {...restProps}
    >
      {children}
    </Wrapper>
  );
};

ModalBody.displayName = 'ModalBody';
