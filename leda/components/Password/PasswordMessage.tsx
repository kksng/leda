import React from 'react';
import { Div } from '../Div';
import { PasswordMessageProps } from './types';
import { getPasswordStrength, strengthLevelToCssClass } from './helpers';

export const PasswordMessage = (props: PasswordMessageProps) => {
  const {
    value, theme, minPasswordEvaluationLength, passwordEvaluators,
  } = props;

  if (
    value === null
    || value.length < minPasswordEvaluationLength
  ) {
    return (
      <Div
        className={theme?.messageDefault}
      >
        Не меньше 5 символов и со знаком препинания - нам важна ваша безопасность
      </Div>
    );
  }

  const { strengthLevel, message } = getPasswordStrength(value, passwordEvaluators);

  return (
    // todo: объединить в один компонент
    <Div
      className={strengthLevelToCssClass({ theme, strengthLevel })}
    >
      {message}
    </Div>
  );
};
