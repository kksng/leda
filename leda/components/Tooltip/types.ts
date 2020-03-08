import React from 'react';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { PartialGlobalDefaultTheme } from '../../utils/useTheme';

export interface TooltipProps {
  ref?: React.Ref<TooltipRefCurrent>,
  /** Размер стрелки тултипа */
  arrowSize?: number,
  /** Дочерние элементы */
  children?: React.ReactNode,
  /** Показан ли тултип (удобно для отладки) */
  isOpen?: boolean,
  /** Расположение тултипа, одно из: top, right, bottom, left. По-умолчанию - top */
  position?: TooltipPosition,
  /** Тема компонента */
  theme?: PartialGlobalDefaultTheme[typeof COMPONENTS_NAMESPACES.tooltip],
  /** Заголовок принимается в виде строки, html, JSX */
  title: React.ReactNode,
  /** Максимальная продолжительность выполнения анимации */
  transitionTimeout?: number,
}

export interface TooltipStyle extends React.CSSProperties {
  opacity: 0 | 1,
  height?: 0,
  overflow?: 'hidden',
  top?: number,
  left?: number,
}

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left' | undefined;

export interface TooltipBodyProps {
  ref?: React.Ref<HTMLDivElement>,
  onTransitionEnd: React.TransitionEventHandler,
  tooltipClassNames?: string,
  style: TooltipStyle,
  title: React.ReactNode,
}

export interface TooltipRefCurrent {
  wrapper: HTMLDivElement | null,
}

export interface GetTooltipPosition {
  (data: {
    arrowSize?: number,
    position: TooltipPosition,
    elementRect: DOMRect,
    tooltipRect: DOMRect,
  }): TooltipPosition,
}

export interface GetTooltipOffsets {
  (data: {
    elementRect: DOMRect,
    position: TooltipPosition,
  }): {
    top?: number,
    left?: number,
  },
}

export interface UseTooltip {
  (data: {
    arrowSize?: number,
    transitionTimeout?: number,
    initialIsOpen?: boolean,
    initialPosition: TooltipPosition,
    elementRef?: React.RefObject<Element | undefined>,
    tooltipRef?: React.RefObject<Element | undefined>,
  }): {
    handleTransitionEnd: React.TransitionEventHandler,
    position: TooltipPosition,
    style: TooltipStyle,
  },
}
