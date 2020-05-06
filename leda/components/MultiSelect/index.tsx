import * as React from 'react';
import { isNil } from 'lodash';
import {
  MultiSelectComponent, MultiSelectProps, MultiSelectRefCurrent, Value,
} from './types';
import {
  bindFunctionalRef, getClassNames, getIsEmptyAndRequired, useElement, useProps, useTheme,
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
import { filterData, getShouldUniteTags, getValue } from './helpers';
import { createCheckBoxesRender } from './renders';
import { Span } from '../Span';

export const MultiSelect = React.forwardRef((props: MultiSelectProps, ref: React.Ref<MultiSelectRefCurrent>): React.ReactElement => {
  const {
    className,
    compareObjectsBy,
    data,
    defaultValue,
    filterRule,
    form,
    groupBy,
    hasCheckBoxes,
    hasClearButton,
    inputRender,
    invalidMessage,
    invalidMessageRender,
    isDisabled,
    isLoading,
    isOpen,
    isRequired,
    isValid: isValidProp,
    itemRender,
    listRender,
    maxSelected,
    maxTags,
    name,
    noSuggestionsRender,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    requiredMessage,
    shouldHideInput,
    shouldKeepSuggestions,
    shouldSelectedGoFirst,
    shouldValidateUnmounted,
    sortSuggestions,
    tagRender,
    tagsUnionRender,
    textField,
    theme: themeProp,
    validator,
    value: valueProp,
    wrapperRender,
    ...restProps
  } = useProps(props);

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

  const handleKeyDown = createKeyDownHandler(props, {
    filterValue,
    handleSelect,
    highlightedSuggestion,
    setFocused,
    setHighlightedSuggestion,
    value,
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
    [theme.inputWrapperRequired]: getIsEmptyAndRequired(value, isRequired),
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

  const TagsUnionElement = useElement(
    'TagUnion',
    Div,
    tagsUnionRender || multiSelectRenders.tagsUnionRender,
    props,
    state,
  );

  const filteredData = filterData({
    compareObjectsBy,
    data,
    filterRule,
    filterValue,
    shouldKeepSuggestions,
    textField,
    value,
  });

  const isMaxItemsSelected = !isNil(maxSelected) && value.length === maxSelected;

  const selectedSuggestions = shouldKeepSuggestions ? value : undefined;

  const shouldUniteTags = getShouldUniteTags({ maxTags, value });

  const checkBoxesRender = createCheckBoxesRender({ theme });

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
        {shouldUniteTags && (
          <>
            <TagsUnionElement className={theme.tagsUnion}>
              Выбрано {value.length}
            </TagsUnionElement>
            {hasClearButton && (
              <Span
                className={theme.clearIcon}
                onClick={handleClear}
              />
            )}
          </>
        )}
        {!shouldUniteTags && (
          <TagsContainer
            value={value}
            theme={theme}
            onTagClick={handleSelect}
            onClearIconClick={handleClear}
            onMouseDown={handleMouseDown}
            textField={textField}
            hasClearButton={hasClearButton}
          >
            <TagItem />
          </TagsContainer>
        )}
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
            if (shouldHideInput) return;
            setFilterValue(ev.target.value);
          }}
          onKeyDown={handleKeyDown}
          style={(isMaxItemsSelected || shouldHideInput)
            ? {
              position: 'absolute',
              opacity: 0,
              height: 0,
              width: 0,
            }
            : undefined}
        />
      </Div>
      {!isMaxItemsSelected && (
        <SuggestionList
          compareObjectsBy={compareObjectsBy}
          data={filteredData}
          groupBy={groupBy}
          highlightedSuggestion={highlightedSuggestion}
          isLoading={isLoading}
          isOpen={isNil(isOpen) ? isFocused : isOpen}
          itemRender={hasCheckBoxes ? checkBoxesRender : itemRender}
          listRender={listRender}
          noSuggestionsRender={noSuggestionsRender}
          onClick={handleSelect}
          selectedSuggestion={selectedSuggestions}
          shouldAllowEmpty={false}
          shouldSelectedGoFirst={shouldSelectedGoFirst}
          sortSuggestions={sortSuggestions}
          textField={textField}
          theme={theme}
          value={value}
        />
      )}
      {!isFocused && !isDisabled && (
        <InvalidMessage />
      )}
    </Wrapper>
  );
}) as MultiSelectComponent;

MultiSelect.displayName = 'MultiSelect';
