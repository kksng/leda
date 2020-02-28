import * as React from 'react';
import { CustomRender, CustomEventHandler, SomeObject } from '../../commonTypes';
import { DivProps } from '../../components/Div';
import { LiProps } from '../../components/Li';
import { UlProps } from '../../components/Ul';
import { COMPONENTS_NAMESPACES } from '../../constants';
import { GlobalDefaultTheme, PartialGlobalDefaultTheme } from '../../utils/useTheme';
import { MultiSelectValue } from '../../components/MultiSelect/types';

export type Value = SomeObject | string | number | null;

export interface SuggestionTarget {
  target: {
    value: SomeObject | string | number | GroupedSomeObject,
  },
}

export interface SuggestionListProps {
  boundingContainerRef?: React.RefObject<HTMLElement | { wrapper: HTMLElement | null }>,
  canSelectAll?: boolean,
  canSelectGroup?: boolean,
  compareObjectsBy?: ((suggestionListItem: SomeObject) => any) | string,
  data?: Value[],
  groupLabelRender?: CustomRender<{}, {}, LiProps>,
  groupWrapperRender?: CustomRender<{}, {}, DivProps>,
  hasCheckBoxes?: boolean,
  highlightedSuggestion?: Value,
  selectedSuggestion?: Value,
  isLoading?: boolean,
  isOpen: boolean,
  itemRender?: CustomRender<SuggestionItemProps, {}, LiProps>,
  listRender?: CustomRender<SuggestionListProps, {}, UlProps>,
  noSuggestionsRender?: CustomRender<SuggestionListProps, {}, NoSuggestionsProps>,
  onClick?: CustomEventHandler<React.MouseEvent<HTMLElement> & SuggestionTarget>,
  placeholder?: string,
  resultedData: Value[] | GroupedSomeObject[],
  shouldAllowEmpty: boolean,
  textField?: string,
  theme?: PartialGlobalDefaultTheme[typeof COMPONENTS_NAMESPACES.suggestionList],
  value: string | number | SomeObject | null | (string[] | number[] | SomeObject[] | GroupedSomeObject[]),
}

export interface SuggestionItemProps {
  hasCheckBoxes?: boolean,
  isChosen?: boolean,
  isPlaceholder: boolean,
  isHighlighted?: boolean,
  isScrollTarget: boolean,
  isSelected?: boolean,
  isSemi?: boolean,
  item: string | number | SomeObject | null,
  itemRender?: CustomRender<SuggestionItemProps, {}, LiProps>,
  onClick?: CustomEventHandler<React.MouseEvent<HTMLElement> & SuggestionTarget>,
  suggestionRef: React.MutableRefObject<HTMLElement | null>,
  text: string | number,
  textField?: string,
  theme: GlobalDefaultTheme[typeof COMPONENTS_NAMESPACES.suggestionList],
}

export interface NoSuggestionsProps {
  className?: string,
}

export interface GroupedSomeObject {
  key: string,
  dataItems: SomeObject[],
  isSelected?: boolean,
}

export interface GetSuggestionItemProps {
  compareObjectsBy?: ((suggestionListItem: SomeObject) => any) | string,
  highlightedSuggestion?: Value,
  isGroupLabel?: boolean,
  placeholder?: string,
  selectedSuggestion?: Value,
  suggestion: Value | GroupedSomeObject,
  textField?: string,
}

export interface SuggestionItemComputedProps {
  isScrollTarget: boolean,
  isPlaceholder: boolean,
  isHighlighted?: boolean,
  isSelected?: boolean,
  item: string | number | SomeObject | null,
  key: string,
  text: string | number,
}
