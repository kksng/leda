import React from 'react';
import { isFunction, isObject } from 'lodash';
import { MaskedInputBaseProps } from './types';
import { mergeClassNames } from '../../utils';
import {
  createBlurHandler,
  createChangeHandler,
  createFocusHandler,
  createKeyDownHandler,
  createPasteHandler,
} from './handlers';
import {
  getValue, maskValue,
} from './helpers';
import { DEFAULT_PLACEHOLDER_CHAR } from './constants';
import { LedaContext } from '../../components/LedaProvider';

export const MaskedInputBase = React.forwardRef((props: MaskedInputBaseProps, ref?: React.Ref<HTMLInputElement | null>) => {
  const { underscoreClassesTransform } = React.useContext(LedaContext);

  const {
    className,
    mask,
    value = '',
    placeholderChar = DEFAULT_PLACEHOLDER_CHAR,
    placeholder,
    isDisabled = false,
    onChange,
    onBlur,
    onFocus,
    onKeyDown,
    onMouseDown,
    ...restProps
  } = mergeClassNames(props, { underscoreClassesTransform });

  const [isFocused, setFocused] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const [inputValue, setInputValue] = React.useState<string>('');

  const handleKeyDown = createKeyDownHandler(props, {
    inputRef,
    isFocused,
  });

  const handlePaste = createPasteHandler(props);

  const handleFocus = createFocusHandler(props, {
    isFocused,
    inputRef,
    setFocused,
    inputValue,
    setInputValue,
  });

  const handleBlur = createBlurHandler(props, {
    setFocused,
    setInputValue,
  });

  const handleChange = createChangeHandler(props, {
    inputValue,
    setInputValue,
  });

  React.useEffect((): void => {
    const newValue = getValue({
      valueProp: value,
      mask,
      inputValue,
      placeholderChar,
      isFocused,
    });

    if (inputRef.current && inputRef.current.value !== newValue) {
      inputRef.current.value = newValue;
    }
  }, [inputValue, isFocused, mask, placeholderChar, value]);

  React.useEffect((): void => {
    if (!value) return;

    const maskedValue = maskValue(value, mask, placeholderChar);

    if (isFocused && inputValue !== maskedValue) {
      setInputValue(maskedValue);
    }
  }, [inputValue, isFocused, mask, placeholderChar, value]);

  return (
    <input
      disabled={isDisabled}
      className={className}
      maxLength={mask.length + 1}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onChange={handleChange}
      placeholder={placeholder}
      value={getValue({
        valueProp: value,
        mask,
        inputValue,
        placeholderChar,
        isFocused,
      })}
      {...restProps}
      ref={(component) => {
        if (isFunction(ref)) ref(component);
        else if (isObject(ref)) {
          // @ts-ignore
          ref.current = component;
        }

        inputRef.current = component;
      }}
      // значение устанавливается через реф, связано с ограничениями React
      // https://github.com/facebook/react/issues/955
      // value={value}
    />
  );
}) as React.FC<MaskedInputBaseProps>;

MaskedInputBase.displayName = 'MaskedInputBase';
