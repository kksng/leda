import React from 'react';
import { SetState } from '../../commonTypes';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { GlobalDefaultTheme, PartialGlobalDefaultTheme } from '../../utils/useTheme';

export interface TooltipProps {
  /** Дочерние элементы */
  children?: React.ReactNode,
  /** Показан ли тултип (удобно для отладки) */
  isOpen?: boolean,
  /** Расположение тултипа, одно из: top, right, bottom, left. По-умолчанию - top */
  position?: TooltipPosition,
  /** Тема компонента */
  theme?: PartialGlobalDefaultTheme[typeof COMPONENTS_NAMESPACES.tooltip],
  ref?: React.Ref<TooltipRefCurrent>,
  /** Заголовок принимается в виде строки, html, JSX */
  title: React.ReactNode,
}

export interface TooltipStyles extends React.CSSProperties {
  top?: number,
  left?: number,
  height: 0 | 'auto',
  opacity: 0 | 1,
  whiteSpace: 'nowrap',
}

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipBodyProps {
  position: TooltipPosition,
  style: React.CSSProperties,
  theme: GlobalDefaultTheme[typeof COMPONENTS_NAMESPACES.tooltip],
  title: React.ReactNode,
  ref?: React.Ref<HTMLDivElement>,
}

export interface TooltipRefCurrent {
  wrapper: HTMLDivElement | null,
}

export interface ShowTooltip {
  (data: {
    invisibleElementRef: React.MutableRefObject<HTMLDivElement | null>,
    tooltipRef: React.MutableRefObject<HTMLDivElement | null>,
    position: TooltipPosition,
    setPosition: SetState<TooltipPosition>,
    mergeStyle: React.Dispatch<React.CSSProperties>,
  }): void,
}

export interface HideTooltip {
  (data: {
    isOpen: boolean | undefined,
    positionProp: TooltipPosition,
    setPosition: SetState<TooltipPosition>,
    mergeStyle: React.Dispatch<React.CSSProperties>,
  }): void,
}

export interface UseTooltipEffects {
  (data: {
    invisibleElementRef: React.MutableRefObject<HTMLDivElement | null>,
    tooltipRef: React.MutableRefObject<HTMLDivElement | null>,
    isOpen: boolean | undefined,
    positionProp: TooltipPosition,
    position: TooltipPosition,
    setPosition: SetState<TooltipPosition>,
    setHidden: SetState<boolean>,
    mergeStyle: React.Dispatch<React.CSSProperties>,
  }): void,
}
