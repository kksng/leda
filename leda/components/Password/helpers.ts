import isRegExp from 'lodash/isRegExp';
import { PasswordEvaluator } from './types';

const defaultEvaluators: PasswordEvaluator[] = [
  {
    message: 'Слабый пароль.',
  },
  {
    evaluator: (value) => !!value.match(/[a-z]/)?.length && !!value.match(/\d/)?.length,
    message: 'Надёжный пароль.',
  },
  {
    evaluator: (value) => !!value.match(/[^A-z\d]/)?.length,
    message: 'Отличный пароль.',
  },
];

export const evaluatePassword = (
  value: string,
  evaluators: PasswordEvaluator[] = defaultEvaluators,
): string | undefined => {
  if (value == null) {
    return undefined;
  }

  let message: string | undefined;

  evaluators.every((evaluator) => {
    if (typeof evaluator.evaluator === 'function' && !evaluator.evaluator(value)) {
      return false;
    }

    if (isRegExp(evaluator.evaluator) && !evaluator.evaluator.test(value)) {
      return false;
    }

    message = evaluator.message;

    return true;
  });

  return message;
};
