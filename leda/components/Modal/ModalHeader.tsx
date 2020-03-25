import React from 'react';
import { LedaContext } from '../LedaProvider';
import { ModalContext } from './ModalContext';
import { Div } from '../Div';
import { mergeClassNames, getClassNames, useElement } from '../../utils';
import { ModalElementsProps } from './types';

export const ModalHeader: React.FC<ModalElementsProps> = (props: ModalElementsProps): React.ReactElement => {
  const { underscoreClassesTransform } = React.useContext(LedaContext);

  const {
    className, children, wrapperRender, ...restProps
  } = mergeClassNames(props, { underscoreClassesTransform });

  const modalContext = React.useContext(ModalContext);

  const { renders: { modalHeader: modalHeaderRenders } } = React.useContext(LedaContext);

  const Wrapper = useElement(
    'Wrapper',
    Div,
    wrapperRender || modalHeaderRenders.wrapperRender,
    props,
  );

  return (
    <Wrapper
      className={getClassNames(className, modalContext.headerClassName)}
      {...restProps}
    >
      {children}
    </Wrapper>
  );
};

ModalHeader.displayName = 'ModalHeader';
