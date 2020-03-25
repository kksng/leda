import * as React from 'react';
import {
  getClassNames, useTheme, bindFunctionalRef, useProps,
} from '../../utils';
import { useValidation } from '../Validation';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { TextareaProps, TextareaRefCurrent } from './types';
import {
  createBlurHandler, createChangeHandler, createFocusHandler, createKeyDownHandler, createResetHandler,
} from './handlers';
import { useCustomElements } from './hooks';
import { getValue } from './helpers';


export const Textarea = React.forwardRef((props: TextareaProps, ref: React.Ref<TextareaRefCurrent>): React.ReactElement => {
  const {
    children,
    className,
    defaultValue,
    form,
    invalidMessage,
    invalidMessageRender,
    isDisabled,
    isRequired,
    isValid: isValidProp,
    name,
    onBlur,
    onChange,
    onEnterPress,
    onFocus,
    placeholder,
    requiredMessage,
    shouldValidateUnmounted,
    theme: themeProp,
    validator,
    value: valueProp,
    wrapperRender,
    ...restProps
  } = useProps<TextareaProps>(props);

  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const [value, setValue] = React.useState(defaultValue || '');

  const {
    isValid, validateCurrent, InvalidMessage,
  } = useValidation(props, {
    value,
  }, {
    reset: createResetHandler({
      props, setValue, value: defaultValue || '',
    }),
  });

  const handleChange = createChangeHandler(props, setValue);

  const handleBlur = createBlurHandler(props, validateCurrent, setIsFocused);

  const handleFocus = createFocusHandler(props, isValid, setIsFocused);

  const handleKeyDown = createKeyDownHandler(props);

  const theme = useTheme(themeProp, COMPONENTS_NAMESPACES.textarea);

  const wrapperClassNames = getClassNames(
    theme.wrapper,
    className,
  );

  const textareaClassNames = getClassNames(
    theme.input,
    { [theme.inputFocused]: isFocused },
    { [theme.inputInvalid]: !isValid },
    { [theme.inputDisabled]: isDisabled },
  );

  const { Wrapper } = useCustomElements(props);

  return (
    <Wrapper
      className={wrapperClassNames}
    >
      <textarea
        {...restProps}
        aria-invalid={!isValid}
        aria-required={isRequired}
        className={textareaClassNames}
        disabled={isDisabled}
        form={form}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        placeholder={placeholder}
        ref={ref && ((component) => bindFunctionalRef(component, ref, component && {
          wrapper: component.closest(`.${theme.wrapper}`),
          input: component,
        }))}
        value={getValue(valueProp, value)}
      />
      {!isFocused && !isDisabled && <InvalidMessage />}
    </Wrapper>
  );
}) as React.FC<TextareaProps>;

Textarea.displayName = 'Textarea';
