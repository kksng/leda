import * as React from 'react';
import { hideTooltip, showTooltip } from './helpers';
import { UseTooltipEffects } from './types';

export const useTooltipEffects: UseTooltipEffects = ({
  mergeStyle, invisibleElementRef, tooltipRef, isOpen, position, setPosition, setHidden, positionProp, children,
}) => {
  // hide on mount and unmount
  React.useEffect(() => {
    const hide = (): void => hideTooltip({
      mergeStyle, isOpen, positionProp, setPosition,
    });

    hide();

    return () => hide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect((): (() => void) | void => {
    const element = invisibleElementRef.current;

    const hide = (): void => hideTooltip({
      mergeStyle, isOpen, positionProp, setPosition,
    });

    const show = (): void => showTooltip({
      mergeStyle,
      invisibleElementRef,
      position,
      setPosition,
      tooltipRef,
    });

    if (element && element.nextElementSibling) {
      // Проверка на видимость элемента в доме. При W и H === 0 eventListener не срабатывает.
      // Проверка нужна для CheckBox и других невидимых элементов
      if ((element.nextElementSibling as HTMLElement).offsetWidth === 0 && (element.nextElementSibling as HTMLElement).offsetHeight === 0) {
        setHidden(true);
        element.nextElementSibling.addEventListener('pointerenter', show);
        element.nextElementSibling.addEventListener('touchstart', show);
        element.nextElementSibling.addEventListener('pointerleave', hide);
        element.nextElementSibling.addEventListener('touchend', hide);
      } else {
        element.nextElementSibling.addEventListener('pointerenter', show);
        element.nextElementSibling.addEventListener('touchstart', show);
        element.nextElementSibling.addEventListener('pointerleave', hide);
        element.nextElementSibling.addEventListener('touchend', hide);
      }

      return () => {
        if (element && element.nextElementSibling) {
          element.nextElementSibling.removeEventListener('pointerenter', show);
          element.nextElementSibling.removeEventListener('touchstart', show);
          element.nextElementSibling.removeEventListener('pointerleave', hide);
          element.nextElementSibling.removeEventListener('touchend', hide);
        }
      };
    }

    return undefined;
  }, [mergeStyle, invisibleElementRef, isOpen, position, positionProp, setHidden, setPosition, tooltipRef]);

  React.useEffect((): void => {
    if (isOpen) {
      setTimeout(() => showTooltip({
        mergeStyle,
        invisibleElementRef,
        position,
        setPosition,
        tooltipRef,
      }), 500);
    }
  }, [mergeStyle, invisibleElementRef, isOpen, position, positionProp, setPosition, tooltipRef]);

  // hide if child unmounts
  React.useEffect(() => {
    const element = invisibleElementRef.current;

    if (element && !element.nextElementSibling) {
      hideTooltip({
        mergeStyle,
        setPosition,
        positionProp,
        isOpen,
      });
    }
  }, [mergeStyle, children, invisibleElementRef, isOpen, positionProp, setPosition, tooltipRef]);
};
