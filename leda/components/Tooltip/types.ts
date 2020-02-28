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
  top?: string,
  left?: string,
  opacity: 1 | 0,
  height: 'auto' | '0',
  whiteSpace: 'nowrap',
}

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipBodyProps {
  style: React.CSSProperties,
  position: TooltipPosition,
  title: React.ReactNode,
  ref?: React.Ref<HTMLDivElement>,
  theme: GlobalDefaultTheme[typeof COMPONENTS_NAMESPACES.tooltip],
}

export interface TooltipRefCurrent {
  wrapper: HTMLDivElement | null,
}

export interface ShowTooltip {
  (data: {
    mergeStyle: React.Dispatch<React.CSSProperties>,
    invisibleElementRef: React.MutableRefObject<HTMLDivElement | null>,
    position: TooltipPosition,
    setPosition: SetState<TooltipPosition>,
    tooltipRef: React.MutableRefObject<HTMLDivElement | null>,
  }): void,
}

export interface HideTooltip {
  (data: {
    mergeStyle: React.Dispatch<React.CSSProperties>,
    isOpen: boolean | undefined,
    setPosition: SetState<TooltipPosition>,
    positionProp: TooltipPosition,
  }): void,
}

export interface UseTooltipEffects {
  (data: {
    mergeStyle: React.Dispatch<React.CSSProperties>,
    invisibleElementRef: React.MutableRefObject<HTMLDivElement | null>,
    tooltipRef: React.MutableRefObject<HTMLDivElement | null>,
    isOpen: boolean | undefined,
    position: TooltipPosition,
    positionProp: TooltipPosition,
    setPosition: SetState<TooltipPosition>,
    setHidden: SetState<boolean>,
    children: React.ReactNode,
  }): void,
}
