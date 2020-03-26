import React from 'react';
import { ValidationProps } from '../Validation/types';
import { CustomRender } from '../../commonTypes';
import { PartialGlobalDefaultTheme } from '../../utils/useTheme';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { DivProps } from '../Div';

export interface TextareaRefCurrent {
  wrapper: HTMLDivElement | null,
  input: HTMLInputElement | null,
}

export interface ResetEvent {
  component: {
    value: string,
    name?: string,
  },
}

export interface TypeEvent extends React.ChangeEvent<HTMLTextAreaElement> {
  component: {
    value: string,
    name?: string,
  },
}

export type ChangeEvent = TypeEvent | ResetEvent;

export interface BlurEvent extends React.FocusEvent<HTMLTextAreaElement> {
  component: {
    value: string,
    name?: string,
    isValid?: boolean,
  },
}

export interface EnterPressEvent extends React.KeyboardEvent<HTMLTextAreaElement> {
  component: {
    value: string,
    name?: string,
  },
}

export interface FocusEvent extends React.FocusEvent<HTMLTextAreaElement> {
  component: {
    value: string,
    name?: string,
  },
}

export interface TextareaProps extends ValidationProps {
  /** Значение по умолчанию */
  defaultValue?: string,
  /** Переданные дети в качестве value */
  children?: React.ReactNode,
  /** Отключение ввода в компоненте */
  isDisabled?: boolean,
  /** Максимальная длина значения */
  maxLength?: number,
  /** Имя комопнента */
  name?: string,
  /** Обработчик блюра */
  onBlur?: (ev: BlurEvent) => void,
  /** Обработчик изменения */
  onChange?: (ev: ChangeEvent) => void,
  /** Обработчик нажатия Enter */
  onEnterPress?: (ev: EnterPressEvent) => void,
  /** Обработчик фокуса */
  onFocus?: (ev: FocusEvent) => void,
  /** Плейсхолдер в инпуте */
  placeholder?: string,
  /** Тема для компонента */
  theme?: PartialGlobalDefaultTheme[typeof COMPONENTS_NAMESPACES.textarea],
  /** Значение в textarea */
  value?: string,
  /** Обертка компонента */
  wrapperRender?: CustomRender<TextareaProps, { value: string }, DivProps>,
  /** Классы переданные через _ */
  [x: string]: unknown,
}

export interface CustomElements {
  Wrapper: React.FC<DivProps>,
}
