import * as React from 'react';
import {
  HideTooltip, ShowTooltip, TooltipPosition,
} from './types';
import { SetState } from '../../commonTypes';

const getTooltipPosition = (data: {
  tooltipRef: React.MutableRefObject<HTMLDivElement | null>,
  target: Element,
  position: TooltipPosition,
  setPosition: SetState<TooltipPosition>,
}): TooltipPosition => {
  const {
    tooltipRef, target, position, setPosition,
  } = data;

  if (!tooltipRef.current) return 'top';

  const rect = tooltipRef.current.getBoundingClientRect();

  const targetRect = target.getBoundingClientRect();

  const arrowSize = 10;

  if (position === 'top') {
    if (targetRect.top - rect.height < arrowSize) {
      setPosition('bottom');

      return 'bottom';
    }

    return 'top';
  }

  if (position === 'left') {
    if (targetRect.left - rect.width < arrowSize) {
      setPosition('right');

      return 'right';
    }

    return 'left';
  }

  if (position === 'right') {
    if (window.innerWidth - rect.width - targetRect.right < arrowSize) {
      setPosition('left');

      return 'left';
    }

    return 'right';
  }

  if (position === 'bottom') {
    if (window.innerHeight - rect.height - targetRect.bottom < arrowSize) {
      setPosition('top');

      return 'top';
    }

    return 'bottom';
  }

  return 'top';
};

export const showTooltip: ShowTooltip = ({
  invisibleElementRef, tooltipRef, position, setPosition, mergeStyle,
}): void => {
  // вычисление координат тултипа на основе координат потомков тултипа
  const element = invisibleElementRef.current ? invisibleElementRef.current.nextElementSibling : null;

  if (!element) return;

  const {
    top, bottom, right, left, width, height,
  } = element.getBoundingClientRect();

  const newPosition = getTooltipPosition({
    tooltipRef,
    position,
    target: element,
    setPosition,
  });

  const newTooltipStyles: React.CSSProperties = {
    top: (() => {
      switch (newPosition) {
        case 'top':
          return window.pageYOffset + top;
        case 'right':
          return window.pageYOffset + top + height / 2;
        case 'left':
          return window.pageYOffset + top + height / 2;
        case 'bottom':
          return window.pageYOffset + bottom;
        default:
          return window.pageYOffset + top;
      }
    })(),
    left: (() => {
      switch (newPosition) {
        case 'top':
          return window.pageXOffset + left + width / 2;
        case 'right':
          return window.pageXOffset + right;
        case 'left':
          return window.pageXOffset + left;
        case 'bottom':
          return window.pageXOffset + left + width / 2;
        default:
          return window.pageXOffset + left + width / 2;
      }
    })(),
  } as const;

  mergeStyle({
    opacity: 1,
    height: 'auto',
    top: newTooltipStyles.top,
    left: newTooltipStyles.left,
  });
};

export const hideTooltip: HideTooltip = ({
  isOpen, positionProp, setPosition, mergeStyle,
}): void => {
  if (isOpen) return;

  mergeStyle({
    left: -99999,
    height: 0,
    opacity: 0,
  });

  setPosition(positionProp);
};
