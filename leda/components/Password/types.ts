import * as React from 'react';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { PartialGlobalDefaultTheme } from '../../utils/useTheme';
import { ValidationProps } from '../Validation/types';
import { CustomRender } from '../../commonTypes';
import { DivProps } from '../Div';

export interface ClearEvent extends React.MouseEvent<HTMLInputElement> {
  component: {
    value: string,
    name?: string,
  },
}

export interface TypeEvent extends React.ChangeEvent<HTMLInputElement> {
  component: {
    value: string,
    name?: string,
  },
}

export interface ResetEvent {
  component: {
    value: string,
    name?: string,
  },
}

export interface PasswordEvaluation {
  length?: number,
  message?: string,
}

export interface PasswordEvaluationRender {
  elementProps?: {
    value: string,
    length: number,
  },
}

export interface EnterPressEvent extends React.KeyboardEvent<HTMLInputElement> {
  component: {
    value: string,
    name?: string,
  },
}

export type ChangeEvent = TypeEvent | ClearEvent | ResetEvent;

export interface BlurEvent extends React.FocusEvent<HTMLInputElement> {
  component: {
    value: string,
    name?: string,
    isValid: boolean,
  },
}

export interface FocusEvent extends React.FocusEvent<HTMLInputElement> {
  component: {
    value: string,
    name?: string,
  },
}

export interface PasswordEvaluator {
  evaluator?: RegExp | ((value: string) => boolean),
  message: string,
}

export interface PasswordProps extends ValidationProps {
  /** Значение по умолчанию */
  defaultValue?: string,
  /** Отображение кнопки очистки в инпуте */
  hasClearButton?: boolean,
  /** Отключенное состояние инпута */
  isDisabled?: boolean,
  /** Рендер инпута */
  inputRender?: CustomRender<PasswordProps, PasswordState, React.InputHTMLAttributes<HTMLInputElement>>,
  /** Переводит все вводимые буквы в верхний или нижний регистр */
  letterCase?: 'lower' | 'upper',
  /** Максимальная длина введенного значения */
  maxLength?: number,
  /** Имя компонента, используется в валидации и для сохранения данных из формы */
  name?: string,
  form?: string,
  isRequired?: boolean,
  /** Обработчик блюра */
  onBlur?: (ev: BlurEvent) => void,
  /** Обработчик изменения */
  onChange?: (ev: ChangeEvent) => void,
  /** Обработчик нажатия Enter */
  onEnterPress?: (ev: EnterPressEvent) => void,
  /** Обработчик фокуса */
  onFocus?: (ev: FocusEvent) => void,
  /** Реф */
  ref?: React.Ref<PasswordRefCurrent>,
  /** Тема компонента */
  theme?: PartialGlobalDefaultTheme[typeof COMPONENTS_NAMESPACES.password],
  /** Значение для инпута */
  value?: string,
  /** Рендер враппера */
  wrapperRender?: CustomRender<PasswordProps, PasswordState, DivProps>,
  /** Классы переданные через _ */
  passwordEvaluationRender?: (elementProps: any) => any,
  passwordRulesRender?: CustomRender<PasswordProps, PasswordState, React.InputHTMLAttributes<HTMLInputElement>>,
  passwordVisibilityRender?: CustomRender<PasswordProps, PasswordState, React.HTMLAttributes<HTMLElement>>,
  passwordEvaluator?: PasswordEvaluator[],
  minPasswordEvaluationLength?: number,
  [x: string]: unknown,
}

export interface PasswordState {
  isFocused: boolean,
  isValid: boolean,
  value: string,
}

export interface PasswordRefCurrent {
  wrapper: HTMLDivElement | null,
  input: HTMLInputElement | null,
}
