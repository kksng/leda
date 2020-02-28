import React from 'react';
import { GlobalDefaultTheme, PartialGlobalDefaultTheme } from '../../utils/useTheme';
import { COMPONENTS_NAMESPACES } from '../../constants';
import {
  CustomEventHandler, CustomRender, SetState, SomeObject,
} from '../../commonTypes';
import { ValidationProps } from '../Validation/types';
import { FilterRules } from '../DropDownSelect/types';
import { SuggestionListProps, SuggestionTarget, GroupedSomeObject } from '../../src/SuggestionList/types';
import { DivProps } from '../Div';
import { TagProps } from '../Tags/types';

export type Value = SomeObject | string | number | null;

export type MultiSelectValue = Value[];

export interface MultiSelectComponent {
  <T extends MultiSelectValue | null | undefined>(props: MultiSelectProps<T>): React.ReactElement,
  displayName?: string,
}

export interface ClearEvent<T> extends React.MouseEvent {
  component: {
    deselectedValues: T[],
    name?: string,
    value: T,
  },
}

export interface MouseSelectEvent<T> extends React.MouseEvent {
  component: {
    deselectedValues?: T[],
    name?: string,
    selectedValue?: T,
    value: T[],
  },
}

export interface EnterSelectEvent<T> extends React.KeyboardEvent {
  component: {
    name?: string,
    selectedValue: T,
    value: T[],
  },
}

export interface ResetEvent<T> {
  component: {
    name?: string,
    value: T[],
  },
}

export interface BlurEvent<T = Value> extends React.FocusEvent<HTMLInputElement> {
  component: {
    isValid?: boolean,
    name?: string,
    value: T[],
  },
}

export interface EnterPressEvent<T = Value> extends React.KeyboardEvent<HTMLInputElement> {
  component: {
    name?: string,
    value: T[],
  },
}

export interface FocusEvent<T = Value> extends React.FocusEvent<HTMLInputElement> {
  component: {
    name?: string,
    value: T[],
  },
}

export type ChangeEvent<T = Value> = MouseSelectEvent<T> | EnterSelectEvent<T> | ClearEvent<T> | ResetEvent<T>;

export interface MultiSelectProps<T extends MultiSelectValue | null | undefined = MultiSelectValue | null | undefined> extends ValidationProps {
  /** Есть ли кнопка "Выбрать все" */
  canSelectAll?: boolean,
  /** Кликабельны ли названия групп */
  canSelectGroup?: boolean,
  /** Сравнение объектов по произвольному полю, а не по ссылке */
  compareObjectsBy?: T extends object ? ((suggestionListItems: SomeObject) => any) | string : never,
  /** Данные для отображения в списке.
   * Если передаётся массив обьектов, нужно указать textField - поле обьекта, которое содержит данные для вывода в списке
  */
  data?: MultiSelectValue,
  /** Значение по-умолчанию */
  defaultValue?: T,
  /** Фильтр данных по правилу. smart (дефолтное значение) - "умный" поиск, startsWith - поиск по первым символам, includes - поиск по вхождению. При больших обьемах данных(больше 1-2 тысяч значений) не желательно использовать "умный поиск". */
  filterRule?: FilterRules,
  /** Ключ для группировки */
  groupBy?: (option: Value) => string | undefined,
  /** Кнопка очистки данных в инпуте. Появляется только в непустом инпуте. */
  hasClearButton?: boolean,
  /** Добавляются чекбоксы */
  hasCheckBoxes?: boolean,
  /** Выключенное состояние инпута */
  isDisabled?: boolean,
  /** Состояние загрузки лоадера - вместо списка в момент загрузки будет отображаться лоадер */
  isLoading?: boolean,
  /** Устанавливает открытое состояние списка */
  isOpen?: boolean,
  /** Кастомизации внешнего вида элемента выпадающего списка. */
  itemRender?: SuggestionListProps['itemRender'],
  /** Кастомизации внешнего вида выпадающего списка. */
  listRender?: SuggestionListProps['listRender'],
  /** Ограничение на количество выбранных элементов. После достижения лимита выпадающее окно перестает появляться */
  maxSelected?: number,
  /** Ограничение на количество показанных тегов. После достижения лимита появляется только один тег с количеством выбранных тегов и текстом. */
  maxVisibleTags?: number,
  /** Имя компонента */
  name?: string,
  /** Атрибут рендера выпадающего списка, если в data нет значений, равных содержимому инпута. Принимает JSX */
  noSuggestionsRender?: any,
  /** Обработчик события потери фокуса */
  onBlur?: (event: FocusEvent) => void,
  /** Обработчик изменения данных в инпуте */
  onChange?: (event: ChangeEvent) => void,
  /** Обработчик нажатия Enter */
  onEnterPress?: (event: EnterPressEvent) => void,
  /** Обработчик фокуса элемента */
  onFocus?: (event: FocusEvent) => void,
  /** Плейсхолдер инпута */
  placeholder?: string,
  /** Должен ли открыться выпадающий список, если достигнуто максимальное количество вариантов. По умолчанию - false */
  shouldOpenWhenMaxSelectedReached?: boolean,
  /** Имя поля объекта, данные из которого будут рендериться в качестве элементов списка */
  textField?: T extends object ? string : never,
  /** Реф */
  ref?: React.Ref<MultiSelectRefCurrent>,
  /** Тема */
  theme?: PartialGlobalDefaultTheme[typeof COMPONENTS_NAMESPACES.multiSelect],
  /** Устанавливает значение в инпуте (будет отображенио в виде выбранных тегов) */
  value?: T,
  /** Кастомный рендер тегов */
  tagRender?: CustomRender<MultiSelectProps, MultiSelectState, TagProps>,
  /** Кастомный рендер контейнера тегов */
  tagsContainerRender?: CustomRender<MultiSelectProps, MultiSelectState, TagsContainerProps>,
  /** Кастомный рендер враппера */
  wrapperRender?: CustomRender<MultiSelectProps, MultiSelectState, DivProps>,
  /** Кастомный рендер инпута */
  inputRender?: CustomRender<MultiSelectProps, MultiSelectState, React.InputHTMLAttributes<HTMLInputElement> & { ref?: React.Ref<HTMLInputElement | null>}>,
  /** Классы переданные через _ */
  [x: string]: unknown,
}

export interface MultiSelectState {
  filterValue: string,
  isFocused: boolean,
  value: MultiSelectValue,
}

export interface TagsContainerProps {
  children: React.ReactElement<TagProps>,
  hasClearButton?: boolean,
  onClearIconClick: React.MouseEventHandler<HTMLElement>,
  onMouseDown: React.MouseEventHandler<HTMLElement>,
  onTagClick: CustomEventHandler<React.MouseEvent<HTMLElement> & SuggestionTarget>,
  textField?: string,
  theme: GlobalDefaultTheme[typeof COMPONENTS_NAMESPACES.multiSelect],
  value: MultiSelectValue | string,
}

export interface MultiSelectRefCurrent {
  input: HTMLInputElement | null,
  wrapper: HTMLElement | null,
}

export interface FocusData {
  setFocused: SetState<boolean>,
  value: MultiSelectValue,
}

export interface BlurData {
  setFilterValue: SetState<string>,
  setFocused: SetState<boolean>,
  validateCurrent: () => boolean,
  value: MultiSelectValue,
}

export interface SelectData {
  setFilterValue: SetState<string>,
  setFocused: SetState<boolean>,
  setValue: SetState<MultiSelectValue>,
  value: MultiSelectValue,
}

export interface ClearData {
  setValue: SetState<MultiSelectValue>,
  value: MultiSelectValue,
}

export interface MouseDownData {
  inputRef: React.MutableRefObject<HTMLInputElement | null>,
}

export interface FilterDataParams {
  compareObjectsBy: MultiSelectProps['compareObjectsBy'],
  data: MultiSelectProps['data'],
  filterRule?: FilterRules,
  filterValue: string,
  textField?: string,
  value: MultiSelectValue,
}

export interface KeyDownData {
  filterValue: string,
  handleSelect: CustomEventHandler<React.MouseEvent<HTMLElement> & SuggestionTarget>,
  highlightedSuggestion: Value,
  setFocused: SetState<boolean>,
  setHighlightedSuggestion: SetState<Value>,
  value: MultiSelectValue,
  resultedData: Value[] | GroupedSomeObject[],
  canSelectAll: boolean | undefined,
  hasCheckBoxes: boolean | undefined,
}
