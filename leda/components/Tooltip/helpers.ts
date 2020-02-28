import * as React from 'react';
import {
  HideTooltip, ShowTooltip, TooltipPosition,
} from './types';
import { SetState } from '../../commonTypes';

const updateTooltipPosition = (data: {
  tooltipRef: React.MutableRefObject<HTMLDivElement | null>,
  target: Element,
  position: TooltipPosition,
  setPosition: SetState<TooltipPosition>,
}): TooltipPosition => {
  const {
    tooltipRef, position, setPosition, target,
  } = data;

  if (!tooltipRef || !tooltipRef.current) return 'top';

  const element = tooltipRef.current;

  const rect = element.getBoundingClientRect();

  const targetRect = target.getBoundingClientRect();

  const arrowSize = 10;

  const handleTopPosition = () => {
    if (targetRect.top - arrowSize - rect.height < 0 && position !== 'bottom') {
      setPosition('bottom');

      return 'bottom';
    }

    return 'top';
  };

  const handleLeftPosition = () => {
    if (targetRect.left - arrowSize - rect.width < 0 && position !== 'right') {
      setPosition('right');

      return 'right';
    }

    return 'left';
  };

  const handleRightPosition = () => {
    if (targetRect.right + arrowSize + rect.width > window.innerWidth && position !== 'left') {
      setPosition('left');

      return 'left';
    }

    return 'right';
  };

  const handleBottomPosition = () => {
    if (targetRect.bottom + arrowSize + rect.height > window.innerHeight && position !== 'top') {
      setPosition('top');

      return 'top';
    }

    return 'bottom';
  };

  if (position === 'top') return handleTopPosition();
  if (position === 'left') return handleLeftPosition();
  if (position === 'right') return handleRightPosition();
  if (position === 'bottom') return handleBottomPosition();

  return 'top';
};

export const showTooltip: ShowTooltip = ({
  mergeStyle, invisibleElementRef, position, setPosition, tooltipRef,
}): void => {
  // вычисление координат тултипа на основе координат потомков тултипа
  const element = invisibleElementRef.current ? invisibleElementRef.current.nextElementSibling : null;

  if (!element) return;

  const {
    top, bottom, right, left, width, height,
  } = element.getBoundingClientRect();

  if (tooltipRef.current) tooltipRef.current.style.height = 'auto';

  const newPosition = updateTooltipPosition({
    tooltipRef,
    position,
    target: element,
    setPosition,
  });

  const newTooltipStyles: { top: string, left: string } = {
    top: (() => {
      switch (newPosition) {
        case 'top':
          return `${top + window.pageYOffset}px`;
        case 'right':
          return `${top + window.pageYOffset + (height / 2)}px`;
        case 'left':
          return `${top + window.pageYOffset + (height / 2)}px`;
        case 'bottom':
          return `${bottom + window.pageYOffset}px`;
        default:
          return `${top + window.pageYOffset}px`;
      }
    })(),
    left: (() => {
      switch (newPosition) {
        case 'top':
          return `${left + window.pageXOffset + (width / 2)}px`;
        case 'right':
          return `${right + window.pageXOffset}px`;
        case 'left':
          return `${left + window.pageXOffset}px`;
        case 'bottom':
          return `${left + window.pageXOffset + (width / 2)}px`;
        default:
          return `${left + window.pageXOffset + (width / 2)}px`;
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
  mergeStyle, isOpen, positionProp, setPosition,
}): void => {
  if (isOpen) return;

  mergeStyle({
    opacity: '0',
    height: '0',
    left: '-99999px',
  });

  setPosition(positionProp);
};
