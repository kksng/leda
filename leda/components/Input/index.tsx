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
  createResetHandler,
} from './handlers';
import { getValue } from './helpers';

// как валидировать инпуты: ../Validation/validation.md

export const Input = React.forwardRef((props: InputProps, ref: React.Ref<InputRefCurrent>): React.ReactElement => {
  const {
    allowedSymbols,
    className,
    defaultValue,
    forbiddenSymbols,
    form,
    hasClearButton,
    inputRender,
    invalidMessage,
    isDisabled,
    isRequired,
    isValid: isValidProp,
    letterCase,
    maxLength,
    name,
    onBlur, // exclude from restProps
    onChange,
    onEnterPress,
    onFocus,
    requiredMessage,
    shouldValidateUnmounted,
    theme: themeProp,
    validationMessageRender,
    validator,
    value: valueProp,
    wrapperRender,
    invalidMessageRender,
    ...restProps
  } = mergeClassNames<InputProps>(props);

  const [value, setValue] = React.useState<string>(defaultValue || '');

  const {
    isValid, validateCurrent, InvalidMessage,
  } = useValidation(props, {
    value,
  }, {
    reset: createResetHandler({
      props, setValue, value: defaultValue || '',
    }),
  });

  const theme = useTheme(themeProp, COMPONENTS_NAMESPACES.input);

  const [isFocused, setFocused] = React.useState(false);

  const state = { value, isFocused, isValid };

  const handleBlur = createBlurHandler(props, state, setFocused, validateCurrent);

  const handleChange = createChangeHandler(props, state, setValue);

  const handleFocus = createFocusHandler(props, state, setFocused);

  const handleClearValue = createClearHandler(props, state, setValue);

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

  // todo: fix hasClearButton in controlled mode
  const shouldRenderClearButton = value && value.length > 0 && hasClearButton;

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
          value={getValue(valueProp, value)}
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
      {!isFocused && !isDisabled && (
        <InvalidMessage />
      )}
    </Wrapper>
  );
}) as React.FC<InputProps>;

Input.displayName = 'Input';
