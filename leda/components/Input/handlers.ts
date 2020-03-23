import * as React from 'react';
import { CustomEventHandler, SetState } from '../../commonTypes';
import { InputProps } from './types';
import { isSymbolAllowed, isSymbolForbidden, transformToCase } from './helpers';

export const createChangeHandler = (
  props: InputProps,
  setValue: SetState<string>,
): CustomEventHandler<React.ChangeEvent<HTMLInputElement>> => (event) => {
  if (props.maxLength && props.maxLength < event.target.value.length) return;

  if (isSymbolForbidden(event.target.value, props.forbiddenSymbols)) return;

  if (!isSymbolAllowed(event.target.value, props.allowedSymbols)) return;

  const newValue = props.letterCase ? transformToCase(event.target.value, props.letterCase) : event.target.value;

  if (props.value === undefined) {
    setValue(newValue);
  }

  props.onChange?.({
    ...event,
    component: {
      value: newValue,
      name: props.name,
    },
  });
};

export const createClearHandler = (
  props: InputProps,
  setValue: SetState<string>,
): CustomEventHandler<React.MouseEvent<HTMLInputElement>> => (event) => {
  event.preventDefault();

  if (props.value === undefined) {
    setValue('');
  }

  props.onChange?.({
    ...event,
    component: {
      value: '',
      name: props.name,
    },
  });
};

export const createBlurHandler = (
  props: InputProps,
  setFocused: SetState<boolean>,
  validate: () => boolean,
): React.FocusEventHandler<HTMLInputElement> => (event) => {
  setFocused(false);

  const newValid = validate();

  props.onBlur?.({
    ...event,
    component: {
      value: event.target.value,
      name: props.name,
      isValid: newValid,
    },
  });
};

export const createFocusHandler = (
  props: InputProps,
  isValid: boolean,
  setFocused: SetState<boolean>,
): React.FocusEventHandler<HTMLInputElement> => (event) => {
  setFocused(true);

  props.onFocus?.({
    ...event,
    component: {
      value: event.target.value,
      name: props.name,
      isValid,
    },
  });
};

export const createKeyDownHandler = (
  props: InputProps,
): React.KeyboardEventHandler<HTMLInputElement> => (event) => {
  if (event.key === 'Enter') {
    props.onEnterPress?.({
      ...event,
      component: {
        value: event.currentTarget.value,
        name: props.name,
      },
    });
  }
};
