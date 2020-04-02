import * as React from 'react';
import { GlobalDefaultTheme, PartialGlobalDefaultTheme } from '../../utils/useTheme';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { CustomRender, CustomEventHandler } from '../../commonTypes';
import { DivProps } from '../Div';

export interface ChangeEvent extends React.ChangeEvent {
  component: {
    value: string | number,
    name?: string,
  },
}

export interface RadioGroupProps {
  /** Дочерние элементы L.RadioButton */
  children: React.ReactNode,
  /** Имя группы radio-элементов */
  name?: string,
  /** Обработчик изменения состояния элементов */
  onChange?: (event: ChangeEvent) => void,
  /** Выключенное состояние всей группы */
  isDisabled?: boolean,
  /** Тема копмонента */
  theme?: PartialGlobalDefaultTheme[typeof COMPONENTS_NAMESPACES.radio],
  /** Reference */
  ref?: React.Ref<RadioGroupRefCurrent>,
  /** Компонент-обертка для группы radio-элементов. */
  wrapperRender?: CustomRender<RadioGroupProps, { value?: string | number }, WrapperProps>,
  /** Текущий выбранный элемент */
  value?: string | number,
  /** Классы переданные через _ */
  [x: string]: unknown,
}

export interface RadioButtonProps extends React.HTMLAttributes<HTMLInputElement> {
  /** Уникальный идентификатор кнопки (используется для выбора активной кнопки) */
  value: string | number,
  /** Id радио-кнопки */
  id?: string,
  /** Сделать неактивным */
  isDisabled?: boolean,
  /** Имя */
  name?: string,
  /** Тема компонента */
  theme?: GlobalDefaultTheme[typeof COMPONENTS_NAMESPACES.radio],
  ref?: React.Ref<RadioGroupRefCurrent>,
  /** Компонент-обертка для RadioButton. Передавать в виде <Wrapper props />. По умолчанию - <Div /> */
  wrapperRender?: CustomRender<RadioButtonProps, {}, WrapperProps>,
  /** Классы переданные через _ */
  [x: string]: unknown,
}

export interface WrapperProps {
  className?: string,
  [x: string]: unknown,
}

export interface PropsFromParent {
  onChange: (event: ChangeEvent) => void,
  isChecked?: boolean,
}

export interface RadioGroupRefCurrent {
  wrapper: HTMLElement | null,
}
