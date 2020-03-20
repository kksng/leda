import { isNil } from 'lodash';
import { NumericTextBoxProps, WrapperProps, NormalizeParameters } from './types';
import { DEFAULT_VALUES } from './constants';

export const getNumberPrecision = (format: string, numberStartIndex: number): number => {
  const firstDecimalIndex = format.indexOf('#', numberStartIndex + 1);

  if (firstDecimalIndex === -1) return 0;

  const decimalPart = format.slice(firstDecimalIndex);

  return (decimalPart.match(/#/g) || []).length;
};

const addThousandSeparator = (number: number, separator: string): string => {
  const value = number.toString();

  if (value.length < 3) return value;

  return value
    .split('')
    .reverse()
    .join('')
    .replace(/([\d]{3})/g, `$1${separator}`)
    .split('')
    .reverse()
    .join('')
    .replace(/^[^\d]/, '');
};

export const getSeparator = (format: string): string | null => {
  const numberStartIndex = format.indexOf('#');

  if (numberStartIndex === -1) {
    throw new Error('L.NumericTextBox: incorrect format! Can\'t find any "#" symbols, format must contain at least one!');
  }

  if (format[numberStartIndex + 1] === '#') {
    throw new Error('L.NumericTextBox: incorrect format! Symbol "#" can\'t follow same "#" symbol! Perhaps you\'ve forgot about decimal separator!');
  }

  return format[numberStartIndex + 1] !== ' ' ? format[numberStartIndex + 1] : null;
};

// форматирует значение (значение при блюре)
// "1200.05" -> "1 200.05 Руб."
export const formatValue = (value?: number | null, format = '#', thousandSeparator = ' '): string => {
  if (isNil(value)) return '';

  const isNegative = value < 0;

  const number = Math.abs(value);

  const numberStartIndex = format.indexOf('#');

  const precision = getNumberPrecision(format, numberStartIndex);

  const separator = getSeparator(format) || '';

  const integerPart = Math.floor(number);

  const decimalPart = Math.ceil(Math.floor((number % 1) * (10 ** (precision + 1))) / 10);

  return format
    .replace(/#/, `${isNegative ? '-' : ''}${addThousandSeparator(integerPart, thousandSeparator)}`)
    .replace(/.#+/, precision === 0 ? '' : `${separator}${decimalPart.toString().padStart(precision, '0')}`);
};

// выбирает какое значение отобразить (formatted или inputValue)
export const getValue = (
  value: number | null,
  inputValue: string,
  format: string,
  isFocused: boolean,
  thousandsSeparator: string,
): string => {
  const separator = getSeparator(format);

  if (separator === thousandsSeparator) {
    throw new Error(`L.NumericTextBox: decimal separator (${JSON.stringify(separator)}) and thousands separator (${JSON.stringify(thousandsSeparator)}) cannot be the same character!`);
  }

  if (thousandsSeparator === '-') {
    throw new Error('L.NumericTextBox: thousands separator cannot be "-"!');
  }

  if (separator === '-') {
    throw new Error('L.NumericTextBox: decimal separator cannot be "-"!');
  }

  if (isFocused) {
    return inputValue;
  }

  return formatValue(value, format, thousandsSeparator);
};

// извлекает из строки число
// "1 200.05 Руб." -> 1200.05
export const extractValue = (value: string, format = '#', thousandsSeparator = ' '): number | null => {
  if (value.length === 0) return null;

  const separator = getSeparator(format);

  const standardizedValue = (() => {
    const standardizedSeparatorValue = separator
      ? value.replace(separator, '.')
      : value;

    if (thousandsSeparator) {
      const thousandsSeparatorRegExp = new RegExp(`\\${thousandsSeparator}`, 'g');
      return standardizedSeparatorValue.replace(thousandsSeparatorRegExp, '');
    }

    return standardizedSeparatorValue;
  })();

  const parsedValue = Number.parseFloat(standardizedValue);

  return Number.isNaN(parsedValue) ? null : parsedValue;
};

// ограничивает число по min/max и количеству знаков после запятой
export const normalizeValue = ({
  format = '#',
  min,
  max,
  sign,
  value,
  step,
}: NormalizeParameters): number | null => {
  // данная проверка необходима для случая, когда заданы значения min и/или max и значения в boxes = null
  if (isNil(value) && !isNil(sign)) {
    if (max !== DEFAULT_VALUES.maxValue && sign === -1) {
      return max ?? null;
    }

    if (min !== DEFAULT_VALUES.minValue && sign === 1) {
      return min ?? null;
    }
  }

  const newValue: number | null = (() => {
    if (!isNil(step) && !isNil(sign)) {
      return (!isNil(value) ? value : 0) + (step * sign);
    }

    return value;
  })();

  if (isNil(newValue)) return null;

  if (!isNil(min) && newValue < min) return min;

  if (!isNil(max) && newValue > max) return max;

  const numberStartIndex = format.indexOf('#');

  const precision = getNumberPrecision(format, numberStartIndex);

  const fixedValue = precision
    ? newValue.toFixed(precision)
    : newValue.toFixed();

  return Number.parseFloat(fixedValue);
};

export const getRestProps = (props: NumericTextBoxProps): WrapperProps => {
  const {
    arrowButtonsRender,
    defaultValue,
    format,
    inputRender,
    className,
    max,
    min,
    name,
    form,
    onBlur,
    onChange,
    onClick,
    onFocus,
    prefixRender,
    step,
    isDisabled,
    isRequired,
    isValid: isValidProp,
    shouldValidateUnmounted,
    thousandsSeparator,
    requiredMessage,
    invalidMessage,
    invalidMessageRender,
    validator,
    suffixRender,
    theme: themeProp,
    value: valueProp,
    wrapperRender,
    ...restProps
  } = props;

  return restProps;
};

// форматирует inputValue (значение при фокусе)
// "1 200.05 Руб." -> "1200.05" (Отличается от числа)
export const formatInputValue = (formattedValue: string, format: string): string => {
  const fractionSeparator = getSeparator(format);

  const separator = fractionSeparator?.length ? `\\${fractionSeparator}` : '';

  // значение без лишних символов "1 200.05 Руб." -> "1200.05"
  const cleanValue = formattedValue
    .replace(/^[^\d]*(?=\d)/, '')
    .replace(new RegExp(`[^\\d${separator}]`, 'g'), '');

  const value = `${formattedValue.startsWith('-') ? '-' : ''}${cleanValue}`;

  const hasMoreThanOneFractionSeparator = (formattedValue.match(new RegExp(separator, 'g'))?.length ?? 0) > 1;

  // в случае, если разделителей разряда больше 1 - нужно убрать лишние
  if (fractionSeparator && hasMoreThanOneFractionSeparator) {
    return value.replace(/\D+$/, '');
  }

  return value;
};
