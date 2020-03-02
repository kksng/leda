import {
  HideTooltip, ShowTooltip, TooltipPosition, TooltipStyles,
} from './types';
import { SetState } from '../../commonTypes';

const updateTooltipPosition = (data: {
  elementRect: DOMRect,
  tooltipRect: DOMRect,
  position: TooltipPosition,
  setPosition: SetState<TooltipPosition>,
}): TooltipPosition => {
  const {
    elementRect, tooltipRect, position, setPosition,
  } = data;

  const arrowSize = 10;

  if (position === 'top') {
    if (elementRect.top - tooltipRect.height < arrowSize) {
      setPosition('bottom');

      return 'bottom';
    }

    return 'top';
  }

  if (position === 'left') {
    if (elementRect.left - tooltipRect.width < arrowSize) {
      setPosition('right');

      return 'right';
    }

    return 'left';
  }

  if (position === 'right') {
    if (window.innerWidth - tooltipRect.width - elementRect.right < arrowSize) {
      setPosition('left');

      return 'left';
    }

    return 'right';
  }

  if (position === 'bottom') {
    if (window.innerHeight - tooltipRect.height - elementRect.bottom < arrowSize) {
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
  const element = invisibleElementRef.current?.nextElementSibling;
  const tooltip = tooltipRef.current;

  if (!element) return;

  const elementRect = element.getBoundingClientRect();

  const newPosition = tooltip && updateTooltipPosition({
    elementRect,
    tooltipRect: tooltip.getBoundingClientRect(),
    position,
    setPosition,
  });

  const newTooltipStyles: TooltipStyles = {
    top: (() => {
      switch (newPosition) {
        default:
        case 'top':
          return window.pageYOffset + elementRect.top;
        case 'right':
          return window.pageYOffset + elementRect.top + elementRect.height / 2;
        case 'left':
          return window.pageYOffset + elementRect.top + elementRect.height / 2;
        case 'bottom':
          return window.pageYOffset + elementRect.bottom;
      }
    })(),
    left: (() => {
      switch (newPosition) {
        default:
        case 'top':
          return window.pageXOffset + elementRect.left + elementRect.width / 2;
        case 'right':
          return window.pageXOffset + elementRect.right;
        case 'left':
          return window.pageXOffset + elementRect.left;
        case 'bottom':
          return window.pageXOffset + elementRect.left + elementRect.width / 2;
      }
    })(),
  };

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
