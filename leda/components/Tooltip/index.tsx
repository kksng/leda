import * as React from 'react';
import isString from 'lodash/isString';
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
    children: childrenProp,
    isOpen: isOpenProp,
    position: positionProp = defaultPosition,
    theme: themeProp,
    title,
    transitionTimeout = defaultTransitionTimeout,
  } = props;

  const theme = useTheme(themeProp, COMPONENTS_NAMESPACES.tooltip);

  const elementRef = React.useRef<Element | null>(null);
  const tooltipRef = React.useRef<Element | null>(null);

  const {
    handleTransitionEnd,
    position,
    style,
  } = useTooltip({
    arrowSize,
    childrenProp,
    isOpenProp,
    positionProp,
    transitionTimeout,
    elementRef,
    tooltipRef,
  });

  const tooltipClassNames = getClassNames(position ? theme[position] : theme.tooltip);

  const shouldWrapChildren = React.useMemo(() => {
    if (Array.isArray(childrenProp) && childrenProp.length) {
      return childrenProp.length === 1 || isString(childrenProp[0]);
    }

    return !childrenProp || isString(childrenProp);
  }, [childrenProp]);

  // добавление враппера нужно если потомков несколько или передана строка
  const children = shouldWrapChildren ? (
    <div className={theme.wrapper}>
      {childrenProp}
    </div>
  ) : childrenProp;

  // невидимый элемент нужен для получения dom node у элемента children
  return (
    <>
      <div
        style={{ display: 'none' }}
        ref={(instance) => {
          elementRef.current = instance?.nextElementSibling ?? null;
        }}
      />
      {children}
      <TooltipBody
        onTransitionEnd={handleTransitionEnd}
        tooltipClassNames={tooltipClassNames}
        style={style}
        title={title}
        ref={(instance) => {
          tooltipRef.current = instance;

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
