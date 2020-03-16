import React from 'react';
import { COMPONENTS_NAMESPACES } from '../../constants';
import {
  mergeClassNames, getClassNames, bindFunctionalRef, useTheme, useElement,
} from '../../utils';
import { useValidation } from '../Validation';
import { InputProps, InputRefCurrent } from './types';
import { Div } from '../Div';
import {
  createBlurHandler,
  createChangeHandler,
  createClearHandler,
  createFocusHandler,
  createKeyDownHandler,
} from './handlers';
import { getValue } from './helpers';
import { useReset } from './hooks';

export const Input = React.forwardRef((props: InputProps, ref: React.Ref<InputRefCurrent>): React.ReactElement => {
  const {
    className,
    defaultValue,
    form,
    hasClearButton,
    inputRender,
    isDisabled,
    isRequired,
    name,
    isValid: isValidProp,
    theme: themeProp,
    value: valueProp,
    allowedSymbols,
    forbiddenSymbols,
    invalidMessage,
    letterCase,
    maxLength,
    onBlur,
    onChange,
    onEnterPress,
    onFocus,
    requiredMessage,
    shouldValidateUnmounted,
    validationMessageRender,
    validator,
    wrapperRender,
    invalidMessageRender,
    ...restProps
  } = mergeClassNames<InputProps>(props);

  const [isFocused, setFocused] = React.useState(false);

  const [valueState, setValue] = React.useState(defaultValue || '');

  const value = getValue(valueProp, valueState);

  const {
    isValid, validateCurrent, InvalidMessage,
  } = useValidation(props, {
    value,
  }, {
    reset: useReset(props, setValue),
  });

  const theme = useTheme(themeProp, COMPONENTS_NAMESPACES.input);

  const handleBlur = createBlurHandler(props, setFocused, validateCurrent);

  const handleChange = createChangeHandler(props, setValue);

  const handleFocus = createFocusHandler(props, isValid, setFocused);

  const handleClearValue = createClearHandler(props, setValue);

  const handleKeyDown = createKeyDownHandler(props);

  const wrapperClassNames = getClassNames(
    className,
    theme.wrapper,
  );

  const inputClassNames = getClassNames(
    theme.inputWrapper,
    {
      [theme.inputWrapperFocused]: isFocused,
      [theme.inputWrapperDisabled]: isDisabled,
      [theme.inputWrapperInvalid]: !isValid,
    },
  );

  const shouldRenderClearButton = hasClearButton && 0 < value.length;

  const state = {
    value, isFocused, isValid,
  };

  const Wrapper = useElement(
    'Wrapper',
    Div,
    wrapperRender,
    props,
    state,
  );

  const InputElement = useElement(
    'Input',
    'input' as unknown as React.FC<React.InputHTMLAttributes<HTMLInputElement>>,
    inputRender,
    props,
    state,
  );

  return (
    <Wrapper
      className={wrapperClassNames}
      ref={ref && ((component) => bindFunctionalRef(component, ref, component && component.wrapper && {
        wrapper: component.wrapper,
        input: component.wrapper.querySelector('input'),
      }))}
    >
      <Div
        className={inputClassNames}
      >
        <InputElement
          {...restProps}
          aria-invalid={!isValid}
          aria-required={isRequired}
          className={theme.input}
          disabled={isDisabled}
          form={form}
          name={name}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          value={value}
        />
        {
          shouldRenderClearButton && (
            <i
              className={theme.closeIcon}
              onMouseDown={handleClearValue}
            />
          )
        }
      </Div>
      {
        !isFocused && !isDisabled && (
          <InvalidMessage />
        )
      }
    </Wrapper>
  );
}) as React.FC<InputProps>;

Input.displayName = 'Input';
