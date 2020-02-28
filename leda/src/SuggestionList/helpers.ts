import * as React from 'react';
import { isObject } from 'lodash';
import { SomeObject } from '../../commonTypes';
import { GetSuggestionItemProps, SuggestionItemComputedProps, GroupedSomeObject } from './types';
import { checkIsTheSameObject } from '../../utils';

export const getText = (suggestion?: string | number | SomeObject | null, textField?: string): string => {
  if (!suggestion) return '';

  if (!textField) return suggestion.toString();

  return isObject(suggestion) ? (suggestion[textField] as string | number | undefined || '').toString() : suggestion.toString();
};

export const scrollToSuggestion = (
  containerRef: React.MutableRefObject<HTMLElement | null>,
  suggestionRef: React.MutableRefObject<HTMLElement | null>,
): void => {
  if (!containerRef.current || !suggestionRef.current) return;

  const suggestionRect = suggestionRef.current.getBoundingClientRect();

  const containerRect = containerRef.current.getBoundingClientRect();

  const padding = 2;

  const offset = (() => {
    if (suggestionRect.top < containerRect.top) {
      return suggestionRect.top - containerRect.top - padding;
    }
    if (containerRect.bottom < suggestionRect.bottom) {
      return suggestionRect.bottom - containerRect.bottom + padding;
    }
    return 0;
  })();

  if (offset) containerRef.current.scrollBy?.(0, offset);
};

export const getSuggestionItemProps = ({
  compareObjectsBy,
  suggestion,
  textField,
  placeholder,
  highlightedSuggestion,
  selectedSuggestion,
  isGroupLabel,
}: GetSuggestionItemProps): SuggestionItemComputedProps => {
  const text = isGroupLabel ? getText((suggestion as GroupedSomeObject)?.key, textField) : getText(suggestion, textField);

  const isPlaceholder = text === placeholder;
  const isHighlighted = checkIsTheSameObject({
    compareObjectsBy,
    obj1: suggestion,
    obj2: highlightedSuggestion,
  });
  const isSelected = checkIsTheSameObject({
    compareObjectsBy,
    obj1: suggestion,
    obj2: selectedSuggestion,
  });

  // является ли текущий элемент целью scrollToSuggestion
  const isScrollTarget = highlightedSuggestion ? isHighlighted : isSelected;

  const key = isObject(suggestion) ? JSON.stringify(suggestion) : suggestion as string;

  const item = suggestion === placeholder ? null : suggestion;

  return {
    text,
    isHighlighted,
    isPlaceholder,
    isSelected,
    isScrollTarget,
    key,
    item,
  };
};
