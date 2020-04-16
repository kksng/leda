import { MaskRules } from './types';

export const baseMaskRules: MaskRules = {
  '#': {
    validate: (char: string) => /\d/.test(char),
  },
  l: {
    validate: (char: string) => /[a-zA-Z]/.test(char),
  },
  L: {
    validate: (char: string) => /[a-zA-Z]/.test(char),
    transform: (char: string) => char.toUpperCase(),
  },
  c: {
    validate: (char: string) => /[а-яА-Я]/.test(char),
  },
  C: {
    validate: (char: string) => /[а-яА-Я]/.test(char),
    transform: (char: string) => char.toUpperCase(),
  },
  x: {
    validate: () => true,
  },
  w: {
    validate: (char: string) => /[0-9a-zA-Z]/.test(char),
  },
  z: {
    validate: (char: string) => /[0-9a-zA-Zа-яА-Я]/.test(char),
  },
};

export enum INPUT_METHODS {
  add = 'add',
  remove = 'remove',
  replace = 'replace',
  // метод, обозначающий отсутствие изменений
  nothing = 'nothing'
}

export const DEFAULT_PLACEHOLDER_CHAR = '_';
