import * as React from 'react';
import { getText } from '../../src/SuggestionList/helpers';
import { useElement } from '../../utils';
import { Div } from '../Div';
import { Span } from '../Span';
import { filterData } from './helpers';
import {
  CustomElements, DropDownSelectProps, DropDownSelectState, Value,
} from './types';

export const useSyncedHighlightedValue = ({
  filterValue,
  shouldFilterValues,
  mergeState,
  data,
}: {
  filterValue: string | null,
  shouldFilterValues: boolean,
  mergeState: React.Dispatch<Partial<DropDownSelectState>>,
  data: DropDownSelectProps['data'],
}): void => {
  React.useEffect((): void => {
    if (shouldFilterValues && data && filterValue) {
      const filteredData = filterData(data, filterValue) || [];
      // обновляем highlighted value
      mergeState({
        highlightedSuggestion: getText(filteredData[0]) || null,
      });
    }
  }, [data, shouldFilterValues, filterValue, mergeState]);
};

export const useCustomElements = (props: DropDownSelectProps, state: DropDownSelectState): CustomElements => {
  const {
    wrapperRender, inputRender, iconRender,
  } = props;

  const Wrapper = useElement(
    'Wrapper',
    Div,
    wrapperRender,
    props,
    state,
  );

  const Input = useElement(
    'Input',
    'input' as unknown as React.FC<React.InputHTMLAttributes<HTMLInputElement>>,
    inputRender,
    props,
    state,
  );

  const Icon = useElement(
    'Icon',
    Span,
    iconRender,
    props,
    state,
  );

  return {
    Wrapper,
    Input,
    Icon,
  };
};

export const useCorrectSuggestionsInControlledMode = ({
  mergeState,
  valueProp,
}: {
  mergeState: React.Dispatch<Partial<DropDownSelectState>>,
  valueProp?: Value,
}) => {
  React.useEffect(() => {
    if (valueProp !== undefined) {
      mergeState({
        highlightedSuggestion: valueProp,
        selectedSuggestion: valueProp,
      });
    }
  }, [mergeState, valueProp]);
};
