import {
  GetTooltipPosition, GetTooltipOffsets, TooltipPosition,
} from './types';

export const getTooltipPosition: GetTooltipPosition = ({
  position, elementRect, tooltipRect, arrowSize,
}) => {
  const checkPosition = (tooltipPosition: TooltipPosition): boolean => {
    switch (tooltipPosition) {
      case 'top':
        return elementRect.top >= tooltipRect.height + arrowSize;
      case 'left':
        return elementRect.left >= tooltipRect.width + arrowSize;
      case 'right':
        return elementRect.right + tooltipRect.width + arrowSize <= window.innerWidth;
      case 'bottom':
        return elementRect.bottom + tooltipRect.height + arrowSize <= window.innerHeight;
      default:
        return false;
    }
  };

  switch (position) {
    case 'top':
      return Array<TooltipPosition>('top', 'bottom', 'right', 'left').find(checkPosition) ?? 'top';
    case 'left':
      return Array<TooltipPosition>('left', 'right', 'bottom', 'top').find(checkPosition) ?? 'left';
    case 'right':
      return Array<TooltipPosition>('right', 'left', 'top', 'bottom').find(checkPosition) ?? 'right';
    case 'bottom':
      return Array<TooltipPosition>('bottom', 'top', 'left', 'right').find(checkPosition) ?? 'bottom';
    default:
      return undefined;
  }
};

export const getTooltipOffsets: GetTooltipOffsets = ({
  position, elementRect,
}) => {
  const top = ((): number => {
    switch (position) {
      case 'top':
        return window.pageYOffset + elementRect.top;
      case 'bottom':
        return window.pageYOffset + elementRect.bottom;
      default:
        return window.pageYOffset + elementRect.top + elementRect.height / 2;
    }
  })();

  const left = ((): number => {
    switch (position) {
      case 'left':
        return window.pageXOffset + elementRect.left;
      case 'right':
        return window.pageXOffset + elementRect.right;
      default:
        return window.pageXOffset + elementRect.left + elementRect.width / 2;
    }
  })();

  return {
    top, left,
  };
};
