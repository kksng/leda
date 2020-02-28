// скопировано с https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/round
import * as React from 'react';
import { isFunction } from 'lodash';
// eslint-disable-next-line import/no-unresolved
import { ClassValue } from 'classnames/types';
import classnames from 'classnames';
import classnamesDedupe from 'classnames/dedupe';
import { SomeObject, GetPluralFormParams } from '../commonTypes';

export const getFileWordEnding = (number: number): string => {
  const beforeLast = number.toString().slice(-2, -1);
  const last = number.toString().slice(-1);

  if (last === '1' && beforeLast !== '1') return 'a';

  return 'ов';
};

/** Функция для подставления окончаний.
 * Пример использования:
 *  getPluralForm({
      count: componentState.value.length,
      one: 'значение',
      two: 'значения',
      five: 'значений',
    })" */
export const getPluralForm = ({
  count, one, two, five,
}: GetPluralFormParams): string => {
  let n = Math.abs(count);
  n %= 100;

  if (n >= 5 && n <= 20) {
    return five;
  }

  n %= 10;

  if (n === 1) {
    return one;
  }

  if (n >= 2 && n <= 4) {
    return two;
  }

  return five;
};

const initRef = <T, C>(ref: React.Ref<T> | React.MutableRefObject<T>, current: C): void => {
  if (isFunction(ref)) {
    ref(current as unknown as T);
  } else if (ref) {
    (ref as React.MutableRefObject<T>).current = current as unknown as T;
  }
};

// привязка рефа к функциональному компоненту
export const bindFunctionalRef = <V, T, C>(component: V, ref: React.Ref<T> | React.MutableRefObject<T>, current: C): void => {
  if (!ref) return;
  // если компонент null - запишем в реф null
  if (!component || !current) {
    initRef<T, null>(ref, null);
  } else {
    initRef<T, C>(ref, current);
  }
};


export const getComputedTheme = <D, T>(defaultTheme: D, theme: T): D & T => ({ ...defaultTheme, ...theme });

// привязка рефа к классовому компоненту
export const bindClassRef = <T, C>(instance: T, current: C | undefined | null): void => {
  if (!current || !instance) return;

  Object.keys(current).forEach((field) => {
    (instance as unknown as SomeObject)[field] = (current as unknown as SomeObject)[field];
  });
};

// возвращает строку, которая содержит классы, или undefined, если классы не были переданы
export const getClassNames = (...classNames: ClassValue[]): string | undefined => classnames(...classNames) || undefined;
// возвращает строку, которая содержит классы без повторений, или undefined, если классы не были переданы
export const getDedupedClassNames = (...classNames: ClassValue[]): string | undefined => classnamesDedupe(...classNames) || undefined;

// TEST UTILS

// при генерации снапшотов некоторые проперти изменяются динамически и снапшоты ломаются, чтобы избежать этого удалим ненужные проперти
const removeProp = <T extends object>(obj: T): Partial<T> => {
  const object = { ...obj } as { props: { [x: string]: unknown}, children: unknown};
  const forbiddenProps = [
    'activedescendant',
    'anchor',
    'aria-activedescendant',
    'aria-controls',
    'aria-owns',
    'calendarGuid',
    'containerInfo',
    'id',
    'initialFocusedDate',
    'optionPrefix',
    'owns',
    'popupSettings',
    'ariaActiveDescendant',
    'ariaOwns',
    'minDate',
    'min',
    'aria-valuemin',
    'location',
    'history',
  ];

  if (object.props) {
    Object.keys(object.props).forEach((prop) => {
      if (forbiddenProps.includes(prop)) object.props[prop] = '';
      // у DatePicker в календаре каждый день падает тест, тк меняется ячейка с классом k-today, уберем этот класс
      if (prop === 'className' && object.props[prop] === 'k-today') delete object.props[prop];
    });
  }

  if (object.children && Array.isArray(object.children)) {
    object.children.forEach((child) => removeProp(child));
  }

  return object as unknown as Partial<T>;
};

export const fixJSON = <T extends object>(wrapperJSON: T): Partial<T> => removeProp(wrapperJSON);
// END OF TEST UTILS
