import React from 'react';
import { Div } from '../Div';
import {
  bindFunctionalRef, getClassNames, mergeClassNames, useTheme,
} from '../../utils';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { ProgressBarProps, ProgressBarRefCurrent } from './types';
import { LedaContext } from '../LedaProvider';

export const ProgressBar = React.forwardRef((props: ProgressBarProps, ref?: React.Ref<ProgressBarRefCurrent>) => {
  const { underscoreClassesTransform } = React.useContext(LedaContext);

  const {
    value,
    className,
    theme: themeProp,
    ...restProps
  } = mergeClassNames<ProgressBarProps>(props, { underscoreClassesTransform });

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
