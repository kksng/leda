import * as React from 'react';
import { isNil } from 'lodash';
import { COMPONENTS_NAMESPACES } from '../../constants';
import {
  bindFunctionalRef, getClassNames, useElement, useProps, useTheme, useValue,
} from '../../utils';
import { Div } from '../Div';
import { NumericTextBox } from '../NumericTextBox';
import { Span } from '../Span';
import {
  createNumericChangeHandler,
} from './handlers';
import {
  getPlaceholder, getRequired, getDisabled, getName, getControlledValue,
} from './helpers';
import { NumericRangeProps, NumericRangeRefCurrent, NumericRangeState } from './types';

export const NumericRange = React.forwardRef((props: NumericRangeProps, ref?: React.Ref<NumericRangeRefCurrent>): React.ReactElement => {
  const {
    className,
    form,
    format,
    inputsRender,
    isDisabled,
    isRequired: isRequiredProp,
    isValid,
    max,
    min,
    name: nameProp,
    onBlur,
    onChange,
    onFocus,
    placeholder: placeholderProp,
    step,
    theme: themeProp,
    thousandsSeparator,
    value: valueProp,
    wrapperRender,
    ...restProps
  } = useProps<NumericRangeProps>(props);
  // вернет value из props или value из state, функция setUncontrolledState сработает только в неконтролируемом режиме
  const [value, setUncontrolledValue] = useValue<NumericRangeState['value']>(getControlledValue(valueProp), [null, null]);

  const theme = useTheme(themeProp, COMPONENTS_NAMESPACES.numericRange);

  const placeholder = getPlaceholder(placeholderProp);

  const required = getRequired(isRequiredProp);

  const disabled = getDisabled(isDisabled);

  const name = getName(nameProp);

  const commonProps = {
    form,
    format,
    step,
    onBlur,
    onFocus,
    isValid,
    thousandsSeparator,
  };

  const handleChange = createNumericChangeHandler({
    value,
    setValue: setUncontrolledValue,
    name: nameProp,
    onChange,
    format,
    thousandsSeparator,
  });

  const wrapperClassNames = getClassNames(
    theme.wrapper,
    className,
  );

  const Wrapper = useElement(
    'Wrapper',
    Div,
    wrapperRender,
    props,
    { value },
  );

  return (
    <Wrapper
      {...restProps}
      className={wrapperClassNames}
      ref={ref && ((component) => {
        const inputs = component && component.wrapper && component.wrapper.querySelectorAll('input');

        bindFunctionalRef(component, ref, component && {
          wrapper: component.wrapper,
          inputFrom: inputs && inputs[0],
          inputTo: inputs && inputs[1],
        });
      })}
    >
      <NumericTextBox
        inputRender={Array.isArray(inputsRender) ? inputsRender[0] : undefined}
        isDisabled={disabled[0]}
        isRequired={required[0]}
        max={isNil(value[1]) ? max : value[1]}
        min={min}
        name={name[0]}
        onChange={handleChange('from')}
        placeholder={placeholder[0]}
        theme={theme.to}
        value={value[0]}
        {...commonProps}
      />
      <Span className={theme.delimiter}>&mdash;</Span>
      <NumericTextBox
        inputRender={Array.isArray(inputsRender) ? inputsRender[0] : undefined}
        isDisabled={disabled[1]}
        isRequired={required[1]}
        max={max}
        min={isNil(value[0]) ? min : value[0]}
        name={name[1]}
        onChange={handleChange('to')}
        placeholder={placeholder[1]}
        theme={theme.from}
        value={value[1]}
        {...commonProps}
      />
    </Wrapper>
  );
}) as React.FC<NumericRangeProps>;

NumericRange.displayName = 'NumericRange';
