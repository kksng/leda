import * as React from 'react';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { bindFunctionalRef, getClassNames, useTheme } from '../../utils';
import { TooltipBody } from './TooltipBody';
import { defaultArrowSize, defaultPosition, defaultTransitionTimeout } from './constants';
import { useTooltip } from './hooks';
import {
  TooltipProps, TooltipRefCurrent,
} from './types';

export const Tooltip = React.forwardRef((props: TooltipProps, ref?: React.Ref<TooltipRefCurrent>): React.ReactElement => {
  const {
    arrowSize = defaultArrowSize,
    children,
    isOpen,
    position: positionProp = defaultPosition,
    theme: themeProp,
    title,
    transitionTimeout = defaultTransitionTimeout,
  } = props;

  const theme = useTheme(themeProp, COMPONENTS_NAMESPACES.tooltip);

  const elementRef = React.useRef<Element>();
  const tooltipRef = React.useRef<Element>();

  const {
    handleTransitionEnd,
    position,
    style,
  } = useTooltip({
    arrowSize,
    transitionTimeout,
    initialIsOpen: isOpen,
    initialPosition: positionProp,
    elementRef,
    tooltipRef,
  });

  const tooltipClassNames = getClassNames(position ? theme[position] : theme.tooltip);

  return (
    <>
      <div
        className={theme.wrapper}
        ref={(instance) => {
          elementRef.current = instance || undefined;
        }}
      >
        {children}
      </div>
      <TooltipBody
        onTransitionEnd={handleTransitionEnd}
        tooltipClassNames={tooltipClassNames}
        style={style}
        title={title}
        ref={(instance) => {
          tooltipRef.current = instance || undefined;

          if (ref) {
            return bindFunctionalRef(instance, ref, instance && {
              wrapper: instance,
            });
          }

          return undefined;
        }}
      />
    </>
  );
}) as React.FC<TooltipProps>;

Tooltip.displayName = 'Tooltip';
