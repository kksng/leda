import * as React from 'react';
import { CustomEventHandler, SetState } from '../../commonTypes';
import { InputProps } from './types';
import { isSymbolAllowed, isSymbolForbidden, transformToCase } from './helpers';

export const createChangeHandler = (
  props: InputProps,
  setValue: SetState<string>,
): CustomEventHandler<React.ChangeEvent<HTMLInputElement>> => (event) => {
  if ((props.maxLength && props.maxLength < event.target.value.length)
    || isSymbolForbidden(event.target.value, props.forbiddenSymbols)
    || !isSymbolAllowed(event.target.value, props.allowedSymbols)
  ) {
    return;
  }

  const newValue = props.letterCase ? transformToCase(event.target.value, props.letterCase) : event.target.value;

  if (props.value == null) {
    setValue(newValue);
  }

  if (props.onChange) {
    const newEvent = {
      ...event,
      component: {
        value: newValue,
        name: props.name,
      },
    };

    props.onChange(newEvent);
  }
};

export const createClearHandler = (
  props: InputProps,
  setValue: SetState<string>,
): CustomEventHandler<React.MouseEvent<HTMLInputElement>> => (event) => {
  event.preventDefault();

  const newEvent = {
    ...event,
    component: {
      value: '',
      name: props.name,
    },
  };

  if (props.value == null) {
    setValue('');
  }

  if (props.onChange) {
    props.onChange(newEvent);
  }
};

export const createBlurHandler = (
  props: InputProps,
  setFocused: SetState<boolean>,
  validate: () => boolean,
): React.FocusEventHandler<HTMLInputElement> => (event) => {
  setFocused(false);

  const newValid = validate();

  if (props.onBlur) {
    const newEvent = {
      ...event,
      component: {
        value: event.target.value,
        name: props.name,
        isValid: newValid,
      },
    };

    props.onBlur(newEvent);
  }
};

export const createFocusHandler = (
  props: InputProps,
  isValid: boolean,
  setFocused: SetState<boolean>,
): React.FocusEventHandler<HTMLInputElement> => (event) => {
  setFocused(true);

  if (props.onFocus) {
    const newEvent = {
      ...event,
      component: {
        value: event.target.value,
        name: props.name,
        isValid,
      },
    };

    props.onFocus(newEvent);
  }
};

export const createKeyDownHandler = (
  props: InputProps,
): React.KeyboardEventHandler<HTMLInputElement> => (event) => {
  if (props.onEnterPress && event.key === 'Enter') {
    const newEvent = {
      ...event,
      component: {
        value: event.currentTarget.value,
        name: props.name,
      },
    };

    props.onEnterPress(newEvent);
  }
};
