import * as React from 'react';
import { isNil } from 'lodash';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { SuggestionList } from '../../src/SuggestionList';
import {
  bindFunctionalRef,
  mergeClassNames, mergeState, useTheme,
} from '../../utils';
import { Div } from '../Div';
import { useValidation } from '../Validation';
import {
  createBlurHandler,
  createChangeHandler,
  createClearIconClickHandler,
  createFilterChangeHandler,
  createFocusHandler,
  createIconClickHandler,
  createKeyDownHandler,
  createResetHandler,
} from './handlers';
import { filterData, getComponentClassNames, getInputValue } from './helpers';
import { useCorrectSuggestionsInControlledMode, useCustomElements, useSyncedHighlightedValue } from './hooks';
import {
  DropDownSelectProps, DropDownSelectRefCurrent, DropDownSelectState, Value,
} from './types';
import { Span } from '../Span';
import { GroupedSomeObject } from '../../src/SuggestionList/types';
import { groupData } from '../MultiSelect/helpers';

export const DropDownSelect = React.forwardRef((props: DropDownSelectProps, ref: React.Ref<DropDownSelectRefCurrent>): React.ReactElement | null => {
  const {
    boundingContainerRef,
    className,
    compareObjectsBy,
    data,
    defaultValue = null,
    filterRule,
    filterValue: filterValueProp,
    form,
    groupBy,
    hasClearButton,
    iconRender,
    inputRender,
    invalidMessage,
    invalidMessageRender,
    isDisabled = false,
    isLoading = false,
    isOpen: isOpenProp,
    isRequired = false,
    isValid: isValidProp,
    itemRender,
    listRender,
    name,
    noSuggestionsRender,
    onBlur,
    onChange,
    onFilterChange,
    onFocus,
    placeholder,
    requiredMessage,
    shouldAllowEmpty = false,
    shouldFilterValues = false,
    shouldValidateUnmounted,
    textField,
    theme: themeProp,
    validator,
    value: valueProp,
    wrapperRender,
    ...restProps
  } = mergeClassNames<DropDownSelectProps>(props);

  const [state, setState] = React.useState<DropDownSelectState>({
    filterValue: null,
    highlightedSuggestion: defaultValue ?? null,
    selectedSuggestion: defaultValue ?? null,
    isFocused: false,
    isOpen: false,
    value: defaultValue,
  });

  const [resultedData, setResultedData] = React.useState<Value[] | GroupedSomeObject[]>([]);
  // выибраем между контролируемым режимом и неконтролируемым
  const { isFocused, highlightedSuggestion, selectedSuggestion } = state;
  const isOpen = isNil(isOpenProp) ? state.isOpen : isOpenProp;
  const value = valueProp === undefined ? state.value : valueProp;
  const filterValue = isNil(filterValueProp) ? state.filterValue : filterValueProp;

  const theme = useTheme(themeProp, COMPONENTS_NAMESPACES.dropDownSelect);

  const {
    isValid, validateCurrent, InvalidMessage,
  } = useValidation(props, state, {
    reset: createResetHandler({
      props, setState, value: defaultValue,
    }),
  });

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const {
    inputWrapperClassNames,
    selectIconClassNames,
    wrapperClassNames,
  } = getComponentClassNames({
    theme, className, isDisabled, isFocused, isOpen, isValid,
  });

  const handlerData = {
    props, state, setState, inputRef, validate: validateCurrent, value,
  };

  const handleChange = createChangeHandler(handlerData);
  const handleBlur = createBlurHandler(handlerData);
  const handleFocus = createFocusHandler(handlerData);
  const handleIconClick = createIconClickHandler(handlerData);
  const handleKeyDown = createKeyDownHandler(handlerData);
  const handleFilterChange = createFilterChangeHandler(handlerData);
  const handleClearIconClick = createClearIconClickHandler(handlerData);

  useSyncedHighlightedValue({
    filterValue, shouldFilterValues, setState, data,
  });

  useCorrectSuggestionsInControlledMode({ setState, valueProp });

  const {
    Wrapper,
    Input,
    Icon,
  } = useCustomElements(props, state);

  const shouldRenderClearIcon = !isDisabled && hasClearButton && (value !== null || filterValue !== null);

  const suggestionListData = shouldFilterValues
    ? filterData(data, filterValue, textField, filterRule)
    : data;

  // group suggestion list items if required
  React.useEffect((): void => {
    // grouping data
    setResultedData(groupData(suggestionListData, groupBy));
  }, [groupBy, suggestionListData]);

  return (
    <Wrapper
      className={wrapperClassNames}
      ref={ref && ((component) => bindFunctionalRef(component, ref, component && {
        wrapper: component.wrapper,
        input: inputRef.current,
      }))}
    >
      <Div className={inputWrapperClassNames}>
        <Input
          {...restProps}
          aria-invalid={!isValid}
          aria-required={isRequired}
          className={theme.input}
          disabled={isDisabled}
          form={form}
          name={name}
          onBlur={handleBlur}
          onChange={handleFilterChange}
          onClick={() => setState(mergeState({ isOpen: true }))}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={isNil(value) ? placeholder : ''}
          readOnly={!shouldFilterValues}
          ref={inputRef}
          value={getInputValue(value, filterValue, shouldFilterValues, textField)}
        />
        {shouldRenderClearIcon && (
          <Span
            className={theme.clearIcon}
            onClick={handleClearIconClick}
          />
        )}
        <Icon className={selectIconClassNames} onMouseDown={(ev) => ev.preventDefault()} onClick={handleIconClick} />
      </Div>
      <SuggestionList
        boundingContainerRef={boundingContainerRef}
        compareObjectsBy={compareObjectsBy}
        data={suggestionListData}
        resultedData={resultedData}
        highlightedSuggestion={highlightedSuggestion}
        isLoading={isLoading}
        isOpen={isDisabled ? false : isOpen}
        itemRender={itemRender}
        listRender={listRender}
        noSuggestionsRender={noSuggestionsRender}
        onClick={handleChange}
        placeholder={placeholder}
        selectedSuggestion={selectedSuggestion}
        shouldAllowEmpty={shouldAllowEmpty}
        textField={textField}
        theme={theme}
        value={value}
      />
      {!isDisabled && !isLoading && !isOpen && !isFocused && <InvalidMessage />}
    </Wrapper>
  );
}) as <T extends Value>(props: DropDownSelectProps<T>, ref?: React.Ref<DropDownSelectRefCurrent>) => React.ReactElement;

(DropDownSelect as React.FC<DropDownSelectProps>).displayName = 'DropDownSelect';
