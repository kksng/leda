import React from 'react';
import { COMPONENTS_NAMESPACES } from '../../constants';
import {
  mergeClassNames, getClassNames, bindFunctionalRef, useTheme, useElement,
} from '../../utils';
import { useValidation } from '../Validation';
import { PasswordProps, PasswordRefCurrent } from './types';
import { Div } from '../Div';
import { Span } from '../Span';
import * as handlers from './handlers';
import * as hooks from './hooks';

export const Password = React.forwardRef((props: PasswordProps, ref: React.Ref<PasswordRefCurrent>): React.ReactElement => {
  const {
    className,
    defaultValue,
    form,
    hasClearButton,
    inputRender,
    isDisabled,
    isRequired,
    name,
    passwordEvaluator,
    passwordEvaluationRender,
    passwordRulesRender,
    passwordVisibilityRender,
    wrapperRender,
    minPasswordEvaluationLength = 4,
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
    ...restProps
  } = mergeClassNames(props);

  const [isFocused, setFocused] = React.useState(false);

  const [isVisible, setIsVisible] = React.useState(true);

  const [evaluationMessage, setEvaluationMessage] = React.useState<string>();

  const [value, setValue] = React.useState<string>(defaultValue || '');

  const currentValue = valueProp ?? value;

  const {
    isValid, validateCurrent, InvalidMessage,
  } = useValidation(props, {
    value: currentValue,
  }, {
    reset: hooks.useReset(props, setValue),
  });

  const handleBlur = handlers.useBlurHandler(props, setFocused, validateCurrent);

  const handleChange = handlers.useChangeHandler(props, minPasswordEvaluationLength, setEvaluationMessage, setValue);

  const handleFocus = handlers.useFocusHandler(props, isValid, setFocused);

  const handleMouseDown = handlers.useMouseDownHandler(props, setValue);

  const handleKeyDown = handlers.useKeyDownHandler(props);

  const handleMaskClick = () => {
    setIsVisible((isVisibleState) => !isVisibleState);
  };

  const theme = useTheme(themeProp, COMPONENTS_NAMESPACES.password);

  const state = {
    isFocused, isVisible, evaluationMessage, value: currentValue, isValid,
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

  const PasswordEvaluation = useElement(
    'PasswordEvaluation',
    Div,
    passwordEvaluationRender ?? (() => (
      <div>
        {evaluationMessage}
      </div>
    )),
    props,
    state,
  );

  const PasswordRules = useElement(
    'PasswordRules',
    Span,
    passwordRulesRender ?? (() => (
      <div>
        Не меньше 5 символов и со знаком препинания &mdash; нам важна ваша безопасность.
      </div>
    )),
    props,
    state,
  );

  const VisibleIcon = useElement(
    'VisibleIcon',
    'i' as unknown as React.FC<React.HTMLAttributes<HTMLElement>>,
    passwordVisibilityRender ?? (() => (
      <i
        className={isVisible ? theme.maskIcon : theme.unmaskIcon}
        onClick={handleMaskClick}
      />
    )),
    props,
    state,
  );

  const shouldRenderClearButton = hasClearButton && 0 < currentValue.length;

  const wrapperClassNames = getClassNames(
    className,
    theme.wrapper,
  );

  const inputClassNames = getClassNames(
    theme.passwordWrapper,
    {
      [theme.passwordWrapperFocused]: isFocused,
      [theme.passwordWrapperDisabled]: isDisabled,
      [theme.passwordWrapperInvalid]: !isValid,
    },
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
          className={theme.password}
          disabled={isDisabled}
          form={form}
          name={name}
          type={isVisible ? 'password' : undefined}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          value={currentValue}
        />
        {
          shouldRenderClearButton && (
            <i
              className={theme.closeIcon}
              onMouseDown={handleMouseDown}
            />
          )
        }
        <VisibleIcon />
      </Div>
      {
        isDisabled || (!isValid && (
          <InvalidMessage />
        )) || (currentValue.length < minPasswordEvaluationLength ? (
          <PasswordRules />
        ) : (
          <PasswordEvaluation />
        ))
      }
    </Wrapper>
  );
}) as React.FC<PasswordProps>;

Password.displayName = 'Password';
