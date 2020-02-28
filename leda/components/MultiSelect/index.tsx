import * as React from 'react';
import { isNil } from 'lodash';
import {
  MultiSelectComponent, MultiSelectProps, MultiSelectRefCurrent, Value,
} from './types';
import {
  bindFunctionalRef, getClassNames, mergeClassNames, useElement, useTheme,
} from '../../utils';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { useValidation } from '../Validation';
import { SuggestionList } from '../../src/SuggestionList';
import {
  createBlurHandler,
  createClearHandler,
  createFocusHandler, createKeyDownHandler,
  createMouseDownHandler,
  createSelectHandler,
  createResetHandler,
} from './handlers';
import { TagsContainer } from './TagsContainer';
import { Div } from '../Div';
import { LedaContext } from '../LedaProvider';
import { Tag } from '../Tags';
import { filterData, getValue, groupData } from './helpers';
import { GroupedSomeObject } from '../../src/SuggestionList/types';

export const MultiSelect = React.forwardRef((props: MultiSelectProps, ref: React.Ref<MultiSelectRefCurrent>): React.ReactElement => {
  const {
    canSelectAll,
    canSelectGroup,
    className,
    compareObjectsBy,
    data,
    defaultValue,
    filterRule,
    form,
    groupBy,
    hasClearButton,
    inputRender,
    invalidMessage,
    invalidMessageRender,
    hasCheckBoxes,
    isDisabled,
    isLoading,
    isOpen,
    isRequired,
    isValid: isValidProp,
    itemRender,
    listRender,
    maxSelected,
    maxVisibleTags,
    name,
    noSuggestionsRender,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    requiredMessage,
    shouldValidateUnmounted,
    shouldOpenWhenMaxSelectedReached,
    tagRender,
    tagsContainerRender,
    textField,
    theme: themeProp,
    validator,
    value: valueProp,
    wrapperRender,
    ...restProps
  } = mergeClassNames(props);

  const [valueState, setValue] = React.useState<Value[]>(defaultValue || []);

  const [filterValue, setFilterValue] = React.useState<string>('');

  const [highlightedSuggestion, setHighlightedSuggestion] = React.useState<Value>(null);

  const value = getValue(valueProp, valueState);

  const theme = useTheme(themeProp, COMPONENTS_NAMESPACES.multiSelect);

  const {
    validateCurrent, isValid, InvalidMessage,
  } = useValidation(props, {
    value: valueState,
  }, {
    reset: createResetHandler({
      props, setValue, value: defaultValue || [],
    }),
  });

  const [isFocused, setFocused] = React.useState<boolean>(false);

  const [resultedData, setResultedData] = React.useState<Value[] | GroupedSomeObject[]>([]);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFocus = createFocusHandler(props, {
    value,
    setFocused,
  });

  const handleBlur = createBlurHandler(props, {
    value,
    setFocused,
    validateCurrent,
    setFilterValue,
  });

  const handleSelect = createSelectHandler(props, {
    value,
    setValue,
    setFocused,
    setFilterValue,
  });

  // group suggestion list items if required
  React.useEffect((): void => {
    const valueForFilterData = getValue(valueProp, valueState);
    // grouping data
    setResultedData(groupData(hasCheckBoxes ? data : filterData({
      compareObjectsBy,
      data,
      filterRule,
      filterValue,
      textField,
      value: valueForFilterData,
    }), groupBy));
  }, [data, groupBy, valueState, valueProp, hasCheckBoxes, compareObjectsBy, filterRule, filterValue, textField]);

  const handleKeyDown = createKeyDownHandler(props, {
    filterValue,
    highlightedSuggestion,
    handleSelect,
    setFocused,
    setHighlightedSuggestion,
    value,
    resultedData,
    canSelectAll,
    hasCheckBoxes,
  });

  const handleClear = createClearHandler(props, {
    setValue,
    value,
  });

  const handleMouseDown = createMouseDownHandler(props, {
    inputRef,
  });

  const wrapperClassNames = getClassNames(className, theme.wrapper);

  const inputWrapperClassNames = getClassNames(theme.inputWrapper, {
    [theme.inputFocused]: isFocused,
    [theme.inputWrapperDisabled]: isDisabled,
    [theme.inputWrapperInvalid]: !isValid,
  });

  const { renders: { [COMPONENTS_NAMESPACES.multiSelect]: multiSelectRenders } } = React.useContext(LedaContext);

  const state = {
    value: valueState,
    isFocused,
    filterValue,
  };

  const Wrapper = useElement(
    'Wrapper',
    Div,
    wrapperRender || multiSelectRenders.wrapperRender,
    props,
    state,
  );

  const Input = useElement(
    'Input',
    'input' as unknown as React.FC<React.InputHTMLAttributes<HTMLInputElement>>,
    inputRender || multiSelectRenders.inputRender,
    props,
    state,
  );

  const TagItem = useElement(
    'TagItem',
    Tag,
    tagRender || multiSelectRenders.tagRender,
    props,
    state,
  );

  const TagsContainerCustomization = useElement(
    'TagsContainerCustomization',
    TagsContainer,
    tagsContainerRender || multiSelectRenders.tagsContainerRender,
    props,
    state,
  );

  const filteredData = hasCheckBoxes ? data : filterData({
    compareObjectsBy,
    data,
    filterRule,
    filterValue,
    textField,
    value,
  });

  const isMaxItemsSelected = !isNil(maxSelected) && value.length >= maxSelected;

  React.useEffect((): void => {
    if (maxSelected && (canSelectAll || canSelectGroup)) {
      console.error("You can't set `maxSelected` and one of `canSelectAll` or `canSelectGroup` together");
    }
  }, [canSelectAll, canSelectGroup, maxSelected]);

  return (
    <Wrapper
      className={wrapperClassNames}
      ref={ref && ((component) => bindFunctionalRef(component, ref, component && {
        wrapper: component.wrapper,
        input: inputRef.current,
      }))}
    >
      <Div
        className={inputWrapperClassNames}
        onMouseDown={handleMouseDown}
      >
        <TagsContainerCustomization
          value={value}
          theme={theme}
          onTagClick={handleSelect}
          onClearIconClick={handleClear}
          onMouseDown={handleMouseDown}
          textField={textField}
          hasClearButton={hasClearButton}
        >
          <TagItem />
        </TagsContainerCustomization>
        <Input
          {...restProps}
          className={theme.input}
          aria-required={isRequired}
          aria-invalid={!isValid}
          placeholder={placeholder}
          disabled={isDisabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          name={name}
          ref={inputRef}
          form={form}
          value={filterValue}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
            setFilterValue(ev.target.value);
          }}
          onKeyDown={handleKeyDown}
          style={isMaxItemsSelected
            ? {
              position: 'absolute',
              opacity: 0,
              height: 0,
              width: 0,
            }
            : undefined}
        />
      </Div>
      {(!isMaxItemsSelected || shouldOpenWhenMaxSelectedReached) && (
        <SuggestionList
          resultedData={resultedData}
          compareObjectsBy={compareObjectsBy}
          data={filteredData}
          hasCheckBoxes={hasCheckBoxes}
          highlightedSuggestion={highlightedSuggestion}
          canSelectAll={canSelectAll}
          canSelectGroup={canSelectGroup}
          isLoading={isLoading}
          isOpen={isNil(isOpen) ? isFocused : isOpen}
          onClick={handleSelect}
          itemRender={itemRender}
          listRender={listRender}
          noSuggestionsRender={noSuggestionsRender}
          shouldAllowEmpty={false}
          textField={textField}
          theme={theme}
          value={value}
        />
      )}
      {!isFocused && !isDisabled && <InvalidMessage />}
    </Wrapper>
  );
}) as MultiSelectComponent;

MultiSelect.displayName = 'MultiSelect';
