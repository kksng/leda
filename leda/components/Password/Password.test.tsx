import React from 'react';
import {
  render,
  fireEvent,
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { Password } from './index';
import { PasswordStrength } from './constants';
import { validatePassword } from '../../validators/password';

describe('Check Password snapshots collection', () => {
  test('is Password component render right?', () => {
    const { container } = render(<Password name="test" />);

    expect(container.firstChild)
      .toMatchSnapshot();
  });
  test('is Password with defaultValue render right?', () => {
    const defaultValue = '12345';
    const { container } = render(<Password defaultValue={defaultValue} name="test" />);
    const input = container.querySelectorAll('input.password-input')[0];

    expect(input)
      .toHaveAttribute('value', defaultValue);

    expect(container.firstChild)
      .toMatchSnapshot();
  });
  test('is Password with hasClearButton render right?', () => {
    const defaultValue = '12345';
    const displayClearBtn = true;
    const hiddenClearBtn = false;
    const { container, rerender, debug } = render(<Password defaultValue={defaultValue} hasClearButton={displayClearBtn} name="test" />);
    const icon = container.querySelectorAll('.password-clear-icon')[0];
    const input = container.querySelectorAll('input.password-input')[0];

    expect(icon)
      .toBeInTheDocument();

    expect(input)
      .toBeInTheDocument();

    expect(container.firstChild)
      .toMatchSnapshot();

    rerender(<Password defaultValue={defaultValue} hasClearButton={hiddenClearBtn} name="test" />);

    expect(icon)
      .not
      .toBeInTheDocument();
  });
});
describe('Check Password attributes test collection', () => {
  test('is Password with isDisabled attributes work right?', () => {
    const onFocus = jest.fn();
    const { container, getByRole } = render(<Password isDisabled onFocus={onFocus} />);
    const input = container.querySelectorAll('input.password-input')[0];

    expect(container.querySelectorAll('.password-element-wrapper.disabled'))
      .toHaveLength(1);

    expect(input)
      .toHaveAttribute('disabled');

    getByRole('textbox').focus();

    expect(onFocus)
      .toHaveBeenCalledTimes(0);
  });
  test('is Password with letterCase attributes work right?', () => {
    const onChange = jest.fn();
    const inputUpper = 'upper';
    const inputLower = 'lower';
    const { container, rerender } = render(<Password letterCase={inputUpper} onChange={onChange} />);
    const input = container.querySelectorAll('input.password-input')[0];

    userEvent.type(input, 'abc');

    expect(onChange)
      .lastCalledWith(expect.objectContaining({
        component: expect.objectContaining({
          value: 'ABC',
        }),
      }));

    rerender(<Password letterCase={inputLower} onChange={onChange} />);

    userEvent.type(input, 'ABC');

    expect(onChange)
      .lastCalledWith(expect.objectContaining({
        component: expect.objectContaining({
          value: 'abc',
        }),
      }));
  });
  test('is Password with maxLength attributes work right?', () => {
    const max = 2;
    const onChange = jest.fn();
    const { container } = render(<Password maxLength={max} onChange={onChange} />);
    const input = container.querySelectorAll('input.password-input')[0];

    userEvent.type(input, 'abcd');

    expect(onChange)
      .lastCalledWith(expect.objectContaining({
        component: expect.objectContaining({
          value: 'ab',
        }),
      }));
  });
  test('is Password with allowedSymbols attributes work right?', () => {
    const onlyNumber = new RegExp(/^\d+$/);
    const onChange = jest.fn();
    const { container } = render(<Password allowedSymbols={onlyNumber} onChange={onChange} />);
    const input = container.querySelectorAll('input.password-input')[0];

    userEvent.type(input, '0abcd');

    expect(onChange)
      .lastCalledWith(expect.objectContaining({
        component: expect.objectContaining({
          value: '0',
        }),
      }));
  });
  test('is Password with forbiddenSymbols attributes work right?', () => {
    const onlyNumber = new RegExp(/^\d+$/);
    const onChange = jest.fn();
    const { container } = render(<Password forbiddenSymbols={onlyNumber} onChange={onChange} />);
    const input = container.querySelectorAll('input.password-input')[0];

    userEvent.type(input, 'a0123');

    expect(onChange)
      .lastCalledWith(expect.objectContaining({
        component: expect.objectContaining({
          value: 'a',
        }),
      }));
  });
  test('is Password with minPasswordEvaluationLength attributes work right?', () => {
    const emptyPasswordMessage = 'Используйте строчные и прописные латинские буквы и цифры, не менее 8 символов';
    const notEmptyPasswordMessage = 'Слабый пароль';
    const minEvalLength = 4;
    const {
      container,
      getByText,
      rerender,
    } = render(<Password minPasswordEvaluationLength={minEvalLength} />);
    const input = container.querySelectorAll('input.password-input')[0];

    userEvent.type(input, '012');

    expect(getByText(emptyPasswordMessage))
      .toBeInTheDocument();

    rerender(<Password minPasswordEvaluationLength={minEvalLength} />);

    userEvent.type(input, '0123');

    expect(getByText(notEmptyPasswordMessage))
      .toBeInTheDocument();
  });
  test('is Password with passwordEvalutors attributes work right?', () => {
    const passworLowTxt = 'Пароль слабоват';
    const passwordMediumTxt = 'Надёжный пароль';
    const passwordStrongTxt = 'Отличный пароль';
    const passwordEvaluators = [
      {
        strengthLevel: PasswordStrength.Low,
        evaluator: () => true,
        evaluationMessage: passworLowTxt,
      },
      {
        strengthLevel: PasswordStrength.Medium,
        evaluator: (password: string) => {
          if (validatePassword(password)) return true;
          return false;
        },
        evaluationMessage: passwordMediumTxt,
      },
      {
        strengthLevel: PasswordStrength.Strong,
        evaluator: (password: string) => {
          if (
            validatePassword(password)
            && password.length > 12
            && /[!@#$%*]/.test(password)
          ) {
            return true;
          }
          return false;
        },
        evaluationMessage: passwordStrongTxt,
      },
    ];
    const {
      container,
      getByText,
    } = render(<Password passwordEvaluators={passwordEvaluators} />);

    const input = container.querySelectorAll('input.password-input')[0];

    userEvent.type(input, '3233');

    expect(getByText(passworLowTxt))
      .toBeInTheDocument();

    userEvent.type(input, '3233@#Dq');

    expect(getByText(passwordMediumTxt))
      .toBeInTheDocument();

    userEvent.type(input, '3233@#DqEErrq');

    expect(getByText(passwordStrongTxt))
      .toBeInTheDocument();
  });
});
describe('Check Password events test collection', () => {
  test('is Password onBlur event work right?', () => {
    const onBlur = jest.fn();
    const validName = 'text';
    const validValue = '123';
    const { container } = render(<Password defaultValue={validValue} name={validName} onBlur={onBlur} />);
    const input = container.querySelectorAll('input.password-input')[0];

    fireEvent.blur(input);

    expect(input)
      .not
      .toHaveFocus();

    expect(onBlur)
      .toBeCalledTimes(1);

    expect(onBlur)
      .lastCalledWith(expect.objectContaining({
        component: expect.objectContaining({
          name: validName,
        }),
      }));
  });
  test('is Password onFocus event work right?', () => {
    const onFocus = jest.fn();
    const validName = 'text';
    const validValue = '123';
    const { container } = render(<Password defaultValue={validValue} name={validName} onFocus={onFocus} />);
    const input = container.querySelectorAll('input.password-input')[0];

    fireEvent.focus(input);

    expect(onFocus)
      .toBeCalledTimes(1);

    expect(onFocus)
      .lastCalledWith(expect.objectContaining({
        component: expect.objectContaining({
          name: validName,
        }),
      }));
  });
  test('is Password onChange event work right?', () => {
    const onChange = jest.fn();
    const validName = 'text';
    const validValue = '123';
    const { container } = render(<Password defaultValue={validValue} name={validName} onChange={onChange} />);
    const input = container.querySelectorAll('input.password-input')[0];

    userEvent.type(input, validValue);

    expect(onChange)
      .toBeCalledTimes(validValue.length);

    expect(onChange)
      .lastCalledWith(expect.objectContaining({
        component: expect.objectContaining({
          name: validName,
          value: validValue,
        }),
      }));
  });
});
