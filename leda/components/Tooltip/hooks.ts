import * as React from 'react';
import { hideTooltip, showTooltip } from './helpers';
import { UseTooltipEffects } from './types';

export const useTooltipEffects: UseTooltipEffects = ({
  mergeStyle, invisibleElementRef, tooltipRef, isOpen, position, setPosition, setHidden, positionProp,
}) => {
  // hide on mount and unmount
  React.useEffect(() => {
    const hide = (): void => hideTooltip({
      isOpen, positionProp, setPosition, mergeStyle,
    });

    hide();

    return () => hide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect((): (() => void) | void => {
    const element = invisibleElementRef.current;

    const hide = (): void => hideTooltip({
      isOpen, positionProp, setPosition, mergeStyle,
    });

    const show = (): void => showTooltip({
      invisibleElementRef, tooltipRef, position, setPosition, mergeStyle,
    });

    const sibling = element?.nextElementSibling;

    if (sibling) {
      // Проверка на видимость элемента в доме. При W и H === 0 eventListener не срабатывает.
      // Проверка нужна для CheckBox и других невидимых элементов
      if ((sibling as HTMLElement).offsetWidth === 0 && (sibling as HTMLElement).offsetHeight === 0) {
        setHidden(true);
        sibling.addEventListener('pointerenter', show);
        sibling.addEventListener('touchstart', show);
        sibling.addEventListener('pointerleave', hide);
        sibling.addEventListener('touchend', hide);
      } else {
        sibling.addEventListener('pointerenter', show);
        sibling.addEventListener('touchstart', show);
        sibling.addEventListener('pointerleave', hide);
        sibling.addEventListener('touchend', hide);
      }

      return () => {
        if (element && sibling) {
          sibling.removeEventListener('pointerenter', show);
          sibling.removeEventListener('touchstart', show);
          sibling.removeEventListener('pointerleave', hide);
          sibling.removeEventListener('touchend', hide);
        }
      };
    }

    return undefined;
  }, [invisibleElementRef, tooltipRef, isOpen, positionProp, setPosition, mergeStyle, position, setHidden]);

  React.useEffect((): void => {
    if (isOpen) {
      setTimeout(() => showTooltip({
        mergeStyle, invisibleElementRef, position, setPosition, tooltipRef,
      }), 500);
    }
  }, [invisibleElementRef, tooltipRef, isOpen, positionProp, setPosition, mergeStyle, position]);

  // hide if child unmounts
  React.useEffect(() => {
    const element = invisibleElementRef.current;

    if (element && !element.nextElementSibling) {
      hideTooltip({
        setPosition, positionProp, mergeStyle, isOpen,
      });
    }
  }, [invisibleElementRef, tooltipRef, isOpen, positionProp, setPosition, mergeStyle]);
};
