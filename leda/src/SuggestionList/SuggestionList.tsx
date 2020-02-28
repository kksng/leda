import * as React from 'react';
import { LedaContext } from '../../components/LedaProvider';
import { Loader } from '../../components/Loader';
import { Div, DivRefCurrent } from '../../components/Div';
import { Ul } from '../../components/Ul';
import { COMPONENTS_NAMESPACES } from '../../constants';
import {
  useAdaptivePosition,
  useElement,
  useTheme,
  checkIsTheSameObject,
} from '../../utils';
import { scrollToSuggestion, getSuggestionItemProps } from './helpers';
import { SuggestionItem } from './SuggestionItem';
import { SuggestionListProps, GroupedSomeObject, Value } from './types';
import { NoSuggestions } from './NoSuggestions';

export const SuggestionList = (props: SuggestionListProps): React.ReactElement | null => {
  const {
    resultedData,
    boundingContainerRef,
    canSelectAll,
    canSelectGroup,
    compareObjectsBy,
    data,
    groupLabelRender,
    groupWrapperRender,
    hasCheckBoxes,
    highlightedSuggestion,
    selectedSuggestion,
    isLoading,
    isOpen,
    itemRender,
    listRender,
    noSuggestionsRender,
    onClick,
    placeholder,
    shouldAllowEmpty,
    textField,
    theme: themeProp,
    value,
  } = props;

  const theme = useTheme(themeProp, COMPONENTS_NAMESPACES.suggestionList);

  const { renders: { [COMPONENTS_NAMESPACES.suggestionList]: suggestionRenders } } = React.useContext(LedaContext);

  const List = useElement(
    'List',
    Ul,
    listRender || suggestionRenders.listRender,
    props,
  );

  const GroupLabel = useElement(
    'GroupLabel',
    Div,
    groupLabelRender || suggestionRenders.groupLabelRender,
    props,
  );

  const GroupWrapper = useElement(
    'GroupWrapper',
    Ul,
    groupWrapperRender || suggestionRenders.groupWrapperRender,
    props,
  );

  const NoSuggestionsComponent = useElement(
    'NoSuggestions',
    NoSuggestions,
    noSuggestionsRender || suggestionRenders.noSuggestionsRender,
    props,
  );

  const wrapperRef = React.useRef<DivRefCurrent | null>(null);
  const containerRef = React.useRef<HTMLElement | null>(null);
  const suggestionRef = React.useRef<HTMLElement | null>(null);

  const classMap = React.useMemo(() => ({
    top: theme.containerTop,
    visible: theme.containerVisible,
  }), [theme.containerTop, theme.containerVisible]);

  useAdaptivePosition({
    elRef: wrapperRef,
    isOpen,
    classNames: classMap,
    boundingContainerRef,
  });

  React.useEffect((): void => {
    // скроллим эффективно
    scrollToSuggestion(containerRef, suggestionRef);
  }, [isOpen, value, selectedSuggestion, highlightedSuggestion]);

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <Div className={theme.container} onMouseDown={(ev) => ev.preventDefault()} ref={wrapperRef}>
        <Loader />
      </Div>
    );
  }

  if (!data?.length) {
    return (
      <Div className={theme.container} onMouseDown={(ev) => ev.preventDefault()} ref={wrapperRef}>
        <NoSuggestionsComponent className={theme.noSuggestions} />
      </Div>
    );
  }

  const suggestions: (Value | GroupedSomeObject)[] = placeholder !== undefined && shouldAllowEmpty
    ? [placeholder, ...resultedData]
    : resultedData;

  return (
    <Div className={theme.container} onMouseDown={(ev) => ev.preventDefault()} ref={wrapperRef}>
      <List
        className={theme.list}
        ref={(component) => {
          containerRef.current = component && component.wrapper;
        }}
      >
        {canSelectAll && (() => {
          const text = 'Выбрать все';
          const suggestionsCount = suggestions.reduce((accumulator: number, suggestion) => (
            (suggestion as GroupedSomeObject)?.dataItems
              ? (accumulator + (suggestion as GroupedSomeObject)?.dataItems?.length)
              : (accumulator + 1)), 0);

          const isSemi = (() => {
            if ((value as Value[]).length === 0) return false;

            // all nested checkboxes are checked
            return (value as Value[]).every((elem) => data?.includes(elem));
          })();

          const isHighlighted = checkIsTheSameObject({
            compareObjectsBy,
            obj1: text,
            obj2: highlightedSuggestion,
          });
          const isSelected = checkIsTheSameObject({
            compareObjectsBy,
            obj1: text,
            obj2: selectedSuggestion,
          });

          // является ли текущий элемент целью scrollToSuggestion
          const isScrollTarget = highlightedSuggestion ? isHighlighted : isSelected;

          const isSelectAllChosen = (value as Value[]).length === suggestionsCount;
          return (
            <SuggestionItem
              hasCheckBoxes={hasCheckBoxes}
              isChosen={isSemi}
              isSemi={!isSelectAllChosen && isSemi}
              isHighlighted={isHighlighted}
              isPlaceholder={false}
              isScrollTarget={isScrollTarget}
              item={text === placeholder ? null : text}
              itemRender={itemRender}
              key={text}
              onClick={onClick}
              suggestionRef={suggestionRef}
              text={text}
              textField={textField}
              theme={theme}
            />
          );
        })()}

        {suggestions?.map((suggestion: GroupedSomeObject | Value, index: number) => {
          if ((suggestion as GroupedSomeObject)?.key) {
            const suggestionGroupLabelComputedProps = getSuggestionItemProps({
              compareObjectsBy,
              highlightedSuggestion,
              placeholder,
              selectedSuggestion,
              suggestion,
              textField,
              isGroupLabel: true,
            });
            const isGroupChosen = canSelectGroup && (suggestion as GroupedSomeObject)?.dataItems?.every((elem) => (value as Value[])?.includes(elem));
            const isSemi = (() => {
              if (!canSelectGroup) return false;

              // all nested checkboxes are checked
              return (suggestion as GroupedSomeObject)?.dataItems?.some((elem) => (value as Value[])?.includes(elem));
            })();

            return (
              <GroupWrapper className={theme.group} key={index}>
                <GroupLabel className={theme.groupLabel}>
                  {canSelectGroup
                    ? (
                      <SuggestionItem
                        isChosen={isSemi}
                        isSemi={!isGroupChosen && isSemi}
                        itemRender={itemRender}
                        onClick={onClick}
                        suggestionRef={suggestionRef}
                        textField={textField}
                        theme={theme}
                        hasCheckBoxes={hasCheckBoxes}
                        {...suggestionGroupLabelComputedProps}
                      />
                    ) : (
                      <SuggestionItem
                        itemRender={itemRender}
                        suggestionRef={suggestionRef}
                        textField={textField}
                        theme={theme}
                        hasCheckBoxes={false}
                        {...suggestionGroupLabelComputedProps}
                      />
                    )}
                </GroupLabel>

                {(suggestion as GroupedSomeObject)?.dataItems?.map((dataItem: Value) => {
                  const suggestionItemComputedProps = getSuggestionItemProps({
                    compareObjectsBy,
                    highlightedSuggestion,
                    placeholder,
                    selectedSuggestion,
                    suggestion: dataItem,
                    textField,
                  });

                  const isChosen: boolean | undefined = (value as Value[])?.includes(dataItem);
                  return (
                    <SuggestionItem
                      isChosen={isChosen}
                      itemRender={itemRender}
                      onClick={onClick}
                      suggestionRef={suggestionRef}
                      textField={textField}
                      theme={theme}
                      hasCheckBoxes={hasCheckBoxes}
                      {...suggestionItemComputedProps}
                    />
                  );
                })}
              </GroupWrapper>
            );
          }

          const suggestionItemComputedProps = getSuggestionItemProps({
            compareObjectsBy,
            highlightedSuggestion,
            placeholder,
            selectedSuggestion,
            suggestion,
            textField,
          });

          const isItemChosen: boolean | undefined = hasCheckBoxes && (value as Value[])?.includes(suggestion);
          return (
            <SuggestionItem
              isChosen={isItemChosen}
              itemRender={itemRender}
              onClick={onClick}
              suggestionRef={suggestionRef}
              textField={textField}
              theme={theme}
              hasCheckBoxes={hasCheckBoxes}
              {...suggestionItemComputedProps}
            />
          );
        })}
      </List>
    </Div>
  );
};

SuggestionList.displayName = 'SuggestionList';
