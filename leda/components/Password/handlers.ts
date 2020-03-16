import * as React from 'react';
import { SetState } from '../../commonTypes';
import { PasswordProps } from './types';
import * as helpers from './helpers';

export const useBlurHandler = (
  props: PasswordProps,
  setFocused: SetState<boolean>,
  validate: () => boolean,
): React.FocusEventHandler<HTMLInputElement> => React.useCallback((event) => {
  setFocused(false);

  const isValid = validate();

  if (props.onBlur) {
    const newEvent = {
      ...event,
      component: {
        name: props.name,
        value: event.target.value,
        isValid,
      },
    };

    props.onBlur(newEvent);
  }
}, [props, setFocused, validate]);

export const useChangeHandler = (
  props: PasswordProps,
  minPasswordEvaluationLength: number,
  setEvaluationMessage: SetState<string | undefined>,
  setValue: SetState<string>,
): React.ChangeEventHandler<HTMLInputElement> => React.useCallback((event) => {
  if (props.maxLength && props.maxLength < event.target.value.length) {
    return;
  }

  const newMessage = helpers.evaluatePassword(event.target.value, props.passwordEvaluator);

  setEvaluationMessage(newMessage);

  if (props.value == null) {
    setValue(event.target.value);
  }

  if (props.onChange) {
    const newEvent = {
      ...event,
      component: {
        name: props.name,
        value: event.target.value,
      },
    };

    props.onChange(newEvent);
  }
}, [props, setEvaluationMessage, setValue]);

export const useFocusHandler = (
  props: PasswordProps,
  isValid: boolean,
  setFocused: SetState<boolean>,
): React.FocusEventHandler<HTMLInputElement> => React.useCallback((event) => {
  setFocused(true);

  if (props.onFocus) {
    const newEvent = {
      ...event,
      component: {
        name: props.name,
        value: event.target.value,
        isValid,
      },
    };

    props.onFocus(newEvent);
  }
}, [props, setFocused, isValid]);

export const useKeyDownHandler = (
  props: PasswordProps,
): React.KeyboardEventHandler<HTMLInputElement> => React.useCallback((event) => {
  if (props.onEnterPress && event.key === 'Enter') {
    const newEvent = {
      ...event,
      component: {
        name: props.name,
        value: event.currentTarget.value,
      },
    };

    props.onEnterPress(newEvent);
  }
}, [props]);

export const useMouseDownHandler = (
  props: PasswordProps,
  setValue: SetState<string>,
): React.MouseEventHandler<HTMLInputElement> => React.useCallback((event) => {
  event.preventDefault();

  if (props.value == null) {
    setValue('');
  }

  if (props.onChange) {
    const newEvent = {
      ...event,
      component: {
        name: props.name,
        value: '',
      },
    };

    props.onChange(newEvent);
  }
}, [props, setValue]);
