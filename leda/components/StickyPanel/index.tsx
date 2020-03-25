import * as React from 'react';
import {
  bindFunctionalRef, getClassNames, mergeClassNames, useTheme,
} from '../../utils';
import { Div } from '../Div';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { useStickyPanelEffect } from './hooks';
import {
  StickyPanelProps, StickyPanelRefCurrent, StickyPanelPosition, StickyPanelStyles,
} from './types';
import { LedaContext } from '../LedaProvider';

export const StickyPanel = React.forwardRef((props: StickyPanelProps, ref?: React.Ref<StickyPanelRefCurrent>): React.ReactElement => {
  const { underscoreClassesTransform } = React.useContext(LedaContext);

  const {
    theme: themeProp,
    children,
    offsetTop = 0,
    className,
    ...restProps
  } = mergeClassNames(props, { underscoreClassesTransform });

  const panelRef = React.useRef<HTMLDivElement | null>(null);

  const theme = useTheme(themeProp, COMPONENTS_NAMESPACES.stickyPanel);

  const [panelPosition, setPanelPosition] = React.useState<StickyPanelPosition>('none');

  const [panelStyles, setPanelStyles] = React.useState<StickyPanelStyles>({});

  useStickyPanelEffect({
    panelRef,
    offsetTop,
    panelPosition,
    setPanelPosition,
    setPanelStyles,
  });

  const panelWrapperClassname = getClassNames(className, theme.wrapper, {
    [theme.fixed]: panelPosition === 'fixed',
  });

  return (
    <Div
      className={panelWrapperClassname}
      ref={ref && ((component) => bindFunctionalRef(component, ref, component && {
        wrapper: component.wrapper,
      }))}
      {...restProps}
    >
      <div ref={panelRef} className={theme.container} style={panelStyles}>
        {children}
      </div>
    </Div>
  );
}) as React.FC<StickyPanelProps>;

StickyPanel.displayName = 'StickyPanel';
