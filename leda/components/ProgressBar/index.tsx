import React from 'react';
import { Div } from '../Div';
import {
  bindFunctionalRef, getClassNames, useProps, useTheme,
} from '../../utils';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { ProgressBarProps, ProgressBarRefCurrent } from './types';

export const ProgressBar = React.forwardRef((props: ProgressBarProps, ref?: React.Ref<ProgressBarRefCurrent>) => {
  const {
    value,
    className,
    theme: themeProp,
    ...restProps
  } = useProps(props);

  const width = `${value}%`;

  const theme = useTheme(themeProp, COMPONENTS_NAMESPACES.progressBar);

  const wrapperClassNames = getClassNames(className, theme.wrapper);

  return (
    <Div
      {...restProps}
      className={wrapperClassNames}
      ref={ref && ((component) => bindFunctionalRef(component, ref, component && {
        wrapper: component.wrapper,
      }))}
    >
      <div className={theme.fill} style={{ width }}>
        {value > 10 && width}
      </div>
    </Div>
  );
}) as React.FC<ProgressBarProps>;

ProgressBar.displayName = 'ProgressBar';
