import * as React from 'react';
import debounce from 'lodash/debounce';
import isMatch from 'lodash/isMatch';
import { getTooltipPosition, getTooltipOffsets } from './helpers';
import { TooltipPosition, TooltipStyle, UseTooltip } from './types';

export const useTooltip: UseTooltip = ({
  arrowSize,
  transitionTimeout,
  initialIsOpen,
  initialPosition,
  element,
  tooltip,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean | undefined>(initialIsOpen ?? false);

  const [position, setPosition] = React.useState<TooltipPosition>();

  const [style, setStyle] = React.useState<TooltipStyle>({
    opacity: 0, visibility: 'hidden',
  });

  const mergeStyle = React.useCallback((newStyle: Partial<TooltipStyle>) => {
    setStyle((oldStyle) => {
      if (isMatch(oldStyle, newStyle)) {
        return oldStyle;
      }

      return {
        ...oldStyle,
        ...newStyle,
      };
    });
  }, []);

  // sometimes update needed to wait for elements
  const updateRender = React.useCallback(() => {
    setStyle((object) => ({
      ...object,
    }));
  }, []);

  const updateTooltip = React.useCallback(() => {
    if (!element || !tooltip) {
      return;
    }

    const elementRect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    const newPosition = getTooltipPosition({
      position: initialPosition, elementRect, tooltipRect, arrowSize,
    }) || initialPosition;

    setPosition(newPosition);

    const newOffsets = getTooltipOffsets({
      position: newPosition, elementRect,
    });

    mergeStyle(newOffsets);
  }, [element, tooltip, initialPosition, arrowSize, mergeStyle]);

  const closeTooltip = React.useCallback(() => {
    setIsOpen(false);

    setPosition(undefined);

    setStyle({
      opacity: 0, visibility: 'hidden',
    });
  }, []);

  const debounceCloseTooltip = React.useMemo(() => {
    const close = () => {
      closeTooltip();
    };

    return debounce(close, transitionTimeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeTooltip]);

  const hideTooltip = React.useCallback(() => {
    setIsOpen(undefined);

    mergeStyle({
      opacity: 0,
    });

    debounceCloseTooltip();
  }, [debounceCloseTooltip, mergeStyle]);

  const showTooltip = React.useCallback(() => {
    if (!element || !tooltip) {
      updateRender();

      return;
    }

    setIsOpen(true);

    setStyle({
      opacity: 1,
    });

    updateTooltip();

    debounceCloseTooltip.cancel();
  }, [debounceCloseTooltip, updateTooltip, element, tooltip, updateRender]);

  const handleTransitionEnd = React.useCallback<React.TransitionEventHandler>(() => {
    if (isOpen != null) {
      return;
    }

    closeTooltip();
  }, [isOpen, closeTooltip]);

  React.useEffect(() => {
    if (isOpen === false) {
      return undefined;
    }

    if (!element || !tooltip) {
      updateRender();

      return undefined;
    }

    const handleResize = () => {
      updateTooltip();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  }, [isOpen, updateTooltip, element, tooltip, updateRender]);

  React.useEffect(() => {
    if (initialIsOpen != null) {
      return undefined;
    }

    if (!element) {
      updateRender();

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
  }, [initialIsOpen, showTooltip, hideTooltip, element, updateRender]);

  React.useEffect(() => {
    if (initialIsOpen == null) {
      return;
    }

    if (initialIsOpen) {
      showTooltip();
    } else {
      hideTooltip();
    }
  }, [initialIsOpen, showTooltip, hideTooltip]);

  return {
    handleTransitionEnd,
    position,
    style,
  };
};
