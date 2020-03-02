import React from 'react';
import { SetState } from '../../commonTypes';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { GlobalDefaultTheme, PartialGlobalDefaultTheme } from '../../utils/useTheme';

export interface TooltipProps {
  ref?: React.Ref<TooltipRefCurrent>,
  /** Показан ли тултип (удобно для отладки) */
  isOpen?: boolean,
  /** Расположение тултипа, одно из: top, right, bottom, left. По-умолчанию - top */
  position?: TooltipPosition,
  /** Дочерние элементы */
  children?: React.ReactNode,
  /** Тема компонента */
  theme?: PartialGlobalDefaultTheme[typeof COMPONENTS_NAMESPACES.tooltip],
  /** Заголовок принимается в виде строки, html, JSX */
  title: React.ReactNode,
}

export interface TooltipStyles extends React.CSSProperties {
  top?: number,
  left?: number,
  height?: 0 | 'auto',
  opacity?: 0 | 1,
}

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipBodyProps {
  ref?: React.Ref<HTMLDivElement>,
  position: TooltipPosition,
  style: React.CSSProperties,
  theme: GlobalDefaultTheme[typeof COMPONENTS_NAMESPACES.tooltip],
  title: React.ReactNode,
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
    mergeStyle: React.Dispatch<TooltipStyles>,
  }): void,
}

export interface HideTooltip {
  (data: {
    isOpen: boolean | undefined,
    positionProp: TooltipPosition,
    setPosition: SetState<TooltipPosition>,
    mergeStyle: React.Dispatch<TooltipStyles>,
  }): void,
}

export interface UseTooltipEffects {
  (data: {
    isOpen: boolean | undefined,
    positionProp: TooltipPosition,
    children?: React.ReactNode,
    invisibleElementRef: React.MutableRefObject<HTMLDivElement | null>,
    tooltipRef: React.MutableRefObject<HTMLDivElement | null>,
    position: TooltipPosition,
    setPosition: SetState<TooltipPosition>,
    setHidden: SetState<boolean>,
    mergeStyle: React.Dispatch<TooltipStyles>,
  }): void,
}
