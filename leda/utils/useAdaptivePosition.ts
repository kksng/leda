import * as React from 'react';
import throttle from 'lodash/throttle';
import { DivRefCurrent } from '../components/Div';

export interface ClassNamesMap {
  top?: string,
  right?: string,
  visible?: string,
}

interface AdaptivePositionProps {
  elRef: React.MutableRefObject<DivRefCurrent | null>,
  isOpen: boolean,
  classNames: ClassNamesMap,
  boundingContainerRef?: React.RefObject<HTMLElement | { wrapper: HTMLElement | null}>,
}

const getElementRectFromRef = (ref?: React.RefObject<HTMLElement | {
  wrapper: HTMLElement | null,
}>) => {
  if (ref == null) {
    return null;
  }

  const boundingElement = ref.current instanceof HTMLElement ? ref.current : ref.current?.wrapper;

  return boundingElement?.getBoundingClientRect();
};

export const useAdaptivePosition = ({
  elRef,
  isOpen,
  classNames,
  boundingContainerRef,
}: AdaptivePositionProps) => {
  React.useEffect(() => {
    const visibleClass = classNames.visible;

    if (!isOpen || !visibleClass) {
      return undefined;
    }

    const updatePosition = () => {
      const element = elRef.current?.wrapper;
      const wrapper = element?.parentElement;

      if (!element || !wrapper) {
        return;
      }

      const elementRect = element?.getBoundingClientRect();
      const wrapperRect = wrapper?.getBoundingClientRect();

      const boundingElRect = getElementRectFromRef(boundingContainerRef);

      const bottomOrHeight = boundingElRect?.bottom ?? window.innerHeight;

      const rightOrWidth = boundingElRect?.right ?? window.innerWidth;

      const isOutOfBottom = bottomOrHeight < elementRect.bottom;

      const isEnoughPlaceOnBottom = elementRect.bottom + elementRect.height + wrapperRect.height < bottomOrHeight;

      const isOutOfRight = rightOrWidth < elementRect.right;

      const isEnoughPlaceOnRight = elementRect.right + elementRect.width < wrapperRect.width + rightOrWidth;

      if (classNames.top && isOutOfBottom) {
        element?.classList.add(classNames.top);
      } else if (classNames.top && isEnoughPlaceOnBottom) {
        element?.classList.remove(classNames.top);
      }

      if (classNames.right && isOutOfRight) {
        element?.classList.add(classNames.right);
      } else if (classNames.right && isEnoughPlaceOnRight) {
        element?.classList.remove(classNames.right);
      }
    };

    updatePosition();

    const element = elRef.current?.wrapper;

    const throttleUpdatePosition = throttle(updatePosition, 125);

    element?.classList.add(visibleClass);

    window.addEventListener('scroll', throttleUpdatePosition);

    return () => {
      element?.classList.remove(visibleClass);

      window.removeEventListener('scroll', throttleUpdatePosition);
    };
  }, [boundingContainerRef, classNames, elRef, isOpen]);
};
