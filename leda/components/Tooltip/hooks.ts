import * as React from 'react';
import { debounce } from 'lodash';
import { getTooltipPosition, getTooltipOffsets } from './helpers';
import { TooltipPosition, TooltipStyle, UseTooltip } from './types';

export const useTooltip: UseTooltip = ({
  arrowSize,
  childrenProp,
  isOpenProp,
  positionProp,
  transitionTimeout,
  elementRef,
  tooltipRef,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean | undefined>(isOpenProp ?? false);

  const [position, setPosition] = React.useState<TooltipPosition>();

  const [style, setStyle] = React.useState<TooltipStyle>({
    opacity: isOpenProp ? 1 : 0, visibility: 'hidden',
  });

  const mergeStyle = React.useCallback((newStyle: TooltipStyle) => {
    setStyle((oldStyle) => ({
      ...oldStyle, ...newStyle,
    }));
  }, [setStyle]);

  const closeTooltip = React.useCallback(() => {
    setIsOpen(false);

    setPosition(undefined);

    setStyle({
      opacity: 0, visibility: 'hidden',
    });
  }, []);

  const debounceCloseTooltip = React.useMemo(() => {
    const close = (shouldResume: boolean) => {
      if (!shouldResume) {
        return;
      }

      closeTooltip();
    };

    return debounce(close, transitionTimeout);
  }, [closeTooltip, transitionTimeout]);

  const updateTooltip = React.useCallback(() => {
    const elementRect = elementRef.current?.getBoundingClientRect();
    const tooltipRect = tooltipRef.current?.getBoundingClientRect();

    if (!elementRect || !tooltipRect) {
      return;
    }

    const nextPosition = getTooltipPosition({
      position: positionProp, elementRect, tooltipRect, arrowSize,
    });

    setPosition(nextPosition);

    const newOffsets = getTooltipOffsets({
      position: nextPosition, elementRect,
    });

    mergeStyle(newOffsets);
  }, [arrowSize, mergeStyle, elementRef, tooltipRef, positionProp]);

  const hideTooltip = React.useCallback(() => {
    mergeStyle({
      opacity: 0,
    });

    setIsOpen(undefined);

    debounceCloseTooltip(true);
  }, [debounceCloseTooltip, mergeStyle]);

  const showTooltip = React.useCallback(() => {
    mergeStyle({
      opacity: 1, visibility: undefined,
    });

    setIsOpen(true);

    updateTooltip();

    debounceCloseTooltip(false);
  }, [debounceCloseTooltip, mergeStyle, updateTooltip]);

  const handleTransitionEnd = React.useCallback<React.TransitionEventHandler>(() => {
    if (isOpen != null) {
      return;
    }

    closeTooltip();
  }, [isOpen, closeTooltip]);

  React.useEffect(() => {
    if (!childrenProp || isOpen === false) {
      return undefined;
    }

    const handleResize = () => {
      updateTooltip();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, childrenProp, updateTooltip]);

  React.useEffect(() => {
    const element = elementRef.current;

    if (!childrenProp || isOpenProp != null || element == null) {
      return undefined;
    }

    element.addEventListener('pointerenter', showTooltip);
    element.addEventListener('pointerleave', hideTooltip);
    element.addEventListener('touchstart', showTooltip);
    element.addEventListener('touchend', hideTooltip);

    return () => {
      element.removeEventListener('pointerenter', showTooltip);
      element.removeEventListener('pointerleave', hideTooltip);
      element.removeEventListener('touchstart', showTooltip);
      element.removeEventListener('touchend', hideTooltip);
    };
  }, [isOpenProp, childrenProp, hideTooltip, showTooltip, elementRef]);

  React.useEffect(() => {
    if (isOpenProp == null) {
      return;
    }

    if (childrenProp && isOpenProp) {
      showTooltip();
    } else {
      hideTooltip();
    }
  }, [isOpenProp, childrenProp, hideTooltip, showTooltip]);

  return {
    handleTransitionEnd,
    position,
    style,
  };
};
