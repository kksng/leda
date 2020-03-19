import { isString } from 'lodash';
import { predefinedAllowedSymbols, predefinedForbiddenSymbols } from './constants';
import { InputProps } from './types';

export const isSymbolAllowed = (value: string, allowedSymbols?: keyof typeof predefinedAllowedSymbols | RegExp): boolean => {
  if (!allowedSymbols || value.length === 0) return true;

  if (isString(allowedSymbols)) {
    const predefinedRegExp = predefinedAllowedSymbols[allowedSymbols];

    if (!predefinedRegExp) throw new Error(`L.Input: no such predefined allowedSymbols - "${allowedSymbols}"!`);

    return [...value].every((symbol) => predefinedRegExp.test(symbol));
  }

  if (allowedSymbols instanceof RegExp) {
    const regExp: RegExp = allowedSymbols;
    return [...value].every((symbol) => regExp.test(symbol));
  }

  throw new Error('L.Input: allowedSymbols prop accepts only predefined string or RegExp!');
};


export const isSymbolForbidden = (value: string, forbiddenSymbols?: keyof typeof predefinedForbiddenSymbols | RegExp): boolean => {
  if (!forbiddenSymbols || value.length === 0) return false;

  if (isString(forbiddenSymbols)) {
    const predefinedRegExp = predefinedForbiddenSymbols[forbiddenSymbols];

    if (!predefinedRegExp) throw new Error(`L.Input: no such predefined forbiddenSymbols - "${forbiddenSymbols}"!`);

    return [...value].some((symbol) => predefinedRegExp.test(symbol));
  }

  if (forbiddenSymbols instanceof RegExp) {
    const regExp: RegExp = forbiddenSymbols;
    return [...value].some((symbol) => regExp.test(symbol));
  }

  throw new Error('L.Input: forbiddenSymbols prop accepts only predefined string or RegExp!');
};

export const transformToCase = (letter: string, letterCase: InputProps['letterCase']): string | never => {
  if (letterCase === 'lower') return letter.toLowerCase();

  if (letterCase === 'upper') return letter.toUpperCase();

  throw new Error('L.Input: letterCase prop must be \'lower\' or \'upper\'!');
};

export const getValue = (valueProp: string | null | undefined, valueState: string): string => {
  if (valueProp === undefined) return valueState;

  if (valueProp === null) {
    return '';
  }

  return valueProp;
};
