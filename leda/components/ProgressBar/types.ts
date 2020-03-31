import * as React from 'react';
import { PartialGlobalDefaultTheme } from '../../utils/useTheme';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { CustomRender } from '../../commonTypes';
import { SpanProps } from '../Span';

export interface ProgressBarProps {
  /** Тема компонента */
  theme?: PartialGlobalDefaultTheme[typeof COMPONENTS_NAMESPACES.progressBar],
  /** Значение "завершенности" прогресс бара */
  value: number,
  /** Реф */
  ref?: React.Ref<ProgressBarRefCurrent>,
  /** Кастомный рендер для цифр со значением компонента, если цифры не нужны - передайте () => null */
  valueRender?: CustomRender<ProgressBarProps, {}, ValueLabelProps>,
  /** Классы переданные через _ */
  [x: string]: unknown,
}

export interface ValueLabelProps {
  children: React.ReactNode,
  'data-value': number,
}

export interface ProgressBarRefCurrent {
  wrapper: HTMLDivElement | null,
}
