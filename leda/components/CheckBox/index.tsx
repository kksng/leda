import * as React from 'react';
import {
  bindFunctionalRef, mergeClassNames, getClassNames, useTheme, useElement, generateId, useValue,
} from '../../utils';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { Span } from '../Span';
import { createChangeHandler } from './handlers';
import { CheckBoxProps, CheckBoxRefCurrent } from './types';
import { LedaContext } from '../LedaProvider';

export const CheckBox = React.forwardRef((props: CheckBoxProps, ref?: React.Ref<CheckBoxRefCurrent>): React.ReactElement => {
  const { underscoreClassesTransform } = React.useContext(LedaContext);

  const {
    children,
    className,
    defaultValue = false,
    id,
    inputRender,
    isDisabled,
    name,
    onChange,
    theme: themeProp,
    value: valueProp,
    wrapperRender,
    ...restProps
  } = mergeClassNames<CheckBoxProps>(props, { underscoreClassesTransform });

  const theme = useTheme(props.theme, COMPONENTS_NAMESPACES.checkBox);

  const [value, setUncontrolledValue] = useValue(valueProp, defaultValue);

  const { renders: { [COMPONENTS_NAMESPACES.checkBox]: checkBoxRenders } } = React.useContext(LedaContext);

  const Wrapper = useElement(
    'Wrapper',
    Span,
    wrapperRender || checkBoxRenders.wrapperRender,
    props,
  );

  const Input = useElement(
    'Input',
    'input' as unknown as React.FC<React.InputHTMLAttributes<HTMLInputElement>>,
    inputRender || checkBoxRenders.inputRender,
    props,
  );

  const labelClassNames = getClassNames(theme.label, className);

  const checkBoxId = id || `checkbox-${generateId()}`;

  const handleChange = createChangeHandler(props, setUncontrolledValue);

  return (
    <Wrapper
      ref={ref && ((component) => {
        const wrapper = component ? (component.wrapper || component as unknown as HTMLElement) : null;

        return bindFunctionalRef(component, ref, component && wrapper && {
          wrapper,
          input: wrapper.firstElementChild as HTMLInputElement,
          label: wrapper.firstElementChild ? wrapper.firstElementChild.nextElementSibling as HTMLLabelElement : null,
        });
      })}
    >
      <Input
        {...restProps}
        id={checkBoxId}
        onChange={handleChange}
        type="checkbox"
        name={name}
        className={theme.input}
        disabled={isDisabled}
        checked={value}
      />
      <label
        htmlFor={checkBoxId}
        className={labelClassNames}
      >
        {children}
      </label>
    </Wrapper>
  );
}) as React.FC<CheckBoxProps>;

CheckBox.displayName = 'CheckBox';
