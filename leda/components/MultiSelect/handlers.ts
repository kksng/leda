import * as React from 'react';
import { isFunction, isNil } from 'lodash';
import {
  BlurData,
  ClearData,
  FocusData,
  KeyDownData,
  MouseDownData,
  MultiSelectProps,
  SelectData,
  Value,
} from './types';
import { CustomEventHandler, SetState, SomeObject } from '../../commonTypes';
import { SuggestionTarget, GroupedSomeObject } from '../../src/SuggestionList/types';
import { filterData } from './helpers';

export const createFocusHandler = (
  props: MultiSelectProps, extraData: FocusData,
): React.FocusEventHandler<HTMLInputElement> => (ev) => {
  const { onFocus, name } = props;

  const { value, setFocused } = extraData;

  if (isFunction(onFocus)) {
    const customEvent = {
      ...ev,
      component: {
        name,
        value,
      },
    };

    onFocus(customEvent);
  }

  setFocused(true);
};

export const createBlurHandler = (
  props: MultiSelectProps, extraData: BlurData,
): React.FocusEventHandler<HTMLInputElement> => (ev) => {
  const { onBlur, name } = props;

  const {
    setFocused, value, validateCurrent, setFilterValue,
  } = extraData;

  const isValid = validateCurrent();

  if (isFunction(onBlur)) {
    const customEvent = {
      ...ev,
      component: {
        value,
        name,
        isValid,
      },
    };

    onBlur(customEvent);
  }

  setFocused(false);

  setFilterValue('');
};

export const createSelectHandler = (
  props: MultiSelectProps, extraData: SelectData,
): CustomEventHandler<React.MouseEvent<HTMLElement> & SuggestionTarget> => (ev) => {
  const {
    onChange, name, value: valueProp, isDisabled, maxSelected, data,
  } = props;

  if (isDisabled) return;

  const {
    setValue, value, setFilterValue,
  } = extraData;

  const shouldRemoveValue = (value as (string | number | SomeObject)[]).includes(ev.target.value);
  const groupItems: SomeObject[] = (data as SomeObject[]).filter((item) => (item?.groupName && item?.groupName === (ev.target.value as GroupedSomeObject).key));
  const shouldRemoveGroupValues = groupItems?.some((item) => (value as SomeObject[]).includes(item));
  const shouldRemoveAllValues = data?.length === value.length;

  const newValue = (() => {
    if (shouldRemoveValue) {
      return (value as (string | number | SomeObject)[]).filter((item) => (item !== ev.target.value));
    }

    if (shouldRemoveGroupValues) {
      return (value as (string | number | SomeObject)[]).filter((item) => (!groupItems.includes(item as SomeObject)));
    }

    if (shouldRemoveAllValues) {
      return [];
    }

    if ((ev.target.value as GroupedSomeObject)?.dataItems) {
      return [...value, ...(ev.target.value as GroupedSomeObject).dataItems];
    }

    if (!data?.includes(ev.target.value)) {
      return data;
    }

    return [...value, ev.target.value];
  })() as (string[] | number[] | SomeObject[]);

  if (!isNil(maxSelected) && newValue.length >= maxSelected) {
    setFilterValue('');
  }

  if (valueProp === undefined) setValue(newValue);

  if (isFunction(onChange)) {
    const customEvent = {
      ...ev,
      component: {
        value: newValue,
        name,
        selectedValue: shouldRemoveValue ? undefined : ev.target.value,
        deselectedValues: shouldRemoveValue ? [ev.target.value] as string[] | number[] | SomeObject[] : undefined,
      },
    };

    onChange(customEvent);
  }
};

export const createClearHandler = (
  props: MultiSelectProps, extraData: ClearData,
): React.MouseEventHandler<HTMLElement> => (ev) => {
  const {
    onChange, name, value: valueProp, isDisabled,
  } = props;

  if (isDisabled) return;

  const { setValue, value } = extraData;

  if (valueProp === undefined) setValue([]);

  if (isFunction(onChange)) {
    const customEvent = {
      ...ev,
      component: {
        value: [] as string[] | number[] | SomeObject[],
        name,
        deselectedValues: value,
      },
    };

    onChange(customEvent);
  }
};

export const createMouseDownHandler = (
  props: MultiSelectProps, extraData: MouseDownData,
): React.MouseEventHandler<HTMLElement> => (ev) => {
  ev.preventDefault();

  const { inputRef: { current: input } } = extraData;

  if (input) input.focus();
};

export const createKeyDownHandler = (
  props: MultiSelectProps, extraData: KeyDownData,
): React.KeyboardEventHandler<HTMLInputElement> => (ev) => {
  const {
    data, textField, filterRule, compareObjectsBy,
  } = props;

  const {
    filterValue,
    highlightedSuggestion,
    setHighlightedSuggestion,
    handleSelect,
    value,
    setFocused,
    resultedData,
    canSelectAll,
    hasCheckBoxes,
  } = extraData;

  if (!data) return;

  const filteredData = filterData({
    data,
    filterValue,
    textField,
    filterRule,
    value,
    compareObjectsBy,
  }) || [];

  const dataForHighlight: Value[] | GroupedSomeObject[] = hasCheckBoxes ? (resultedData as (Value | GroupedSomeObject)[])
    .reduce((acc: Value[] | GroupedSomeObject[], val: Value | GroupedSomeObject) => {
      const groupedSomeObjectValue = val as GroupedSomeObject;

      if (groupedSomeObjectValue.key) {
        acc.push(groupedSomeObjectValue);
        groupedSomeObjectValue.dataItems.forEach((item: Value) => (acc as Value[]).push(item));
        return acc;
      }

      (acc as Value[]).push(val);
      return acc;
    }, canSelectAll ? ['Выбрать все'] : []) : filteredData;

  const highlightedItem = (dataForHighlight as (string | number | SomeObject)[]).find((item) => item === highlightedSuggestion);
  // текущий индекс
  const currentIndex = (dataForHighlight as (string | number | SomeObject)[]).indexOf(highlightedItem || '');

  if (ev.key === 'ArrowDown' || ev.key === 'Down') {
    // предотвращаем скролл страницы
    ev.preventDefault();
    // новый индекс, механизм работает как барабан
    const nextIndex = (currentIndex + 1) % dataForHighlight.length;

    const newHighlightedSuggestion = dataForHighlight[nextIndex];

    setHighlightedSuggestion(newHighlightedSuggestion);

    return;
  }

  if (ev.key === 'ArrowUp' || ev.key === 'Up') {
    // предотвращаем скроллинг страницы
    ev.preventDefault();
    // новый индекс, механизм работает как барабан
    const nextIndex = (() => {
      if (currentIndex <= 0) return dataForHighlight.length - 1;

      return currentIndex - 1;
    })();

    const newHighlightedSuggestion = dataForHighlight[nextIndex];

    setHighlightedSuggestion(newHighlightedSuggestion);

    return;
  }

  if (ev.key === 'Enter') {
    if (!highlightedSuggestion) return;

    setHighlightedSuggestion(null);

    // вызываем обработчик
    handleSelect({
      ...ev,
      target: {
        ...ev.target,
        value: highlightedSuggestion,
      },
    } as unknown as React.MouseEvent<HTMLElement> & SuggestionTarget);

    return;
  }

  if (ev.key === 'Backspace' && !filterValue && value.length !== 0) {
    // вызываем обработчик
    handleSelect({
      ...ev,
      target: {
        ...ev.target,
        value: value[value.length - 1],
      },
    } as unknown as React.MouseEvent<HTMLElement> & SuggestionTarget);
  }
};

export const createResetHandler = ({
  props,
  setValue,
  value,
}: {
  props: MultiSelectProps,
  setValue: SetState<Value[]>,
  value: Value[],
}) => () => {
  setValue(value);
  if (isFunction(props.onChange)) {
    const customEvent = {
      component: {
        name: props.name,
        value,
      },
    };
    props.onChange(customEvent);
  }
};
