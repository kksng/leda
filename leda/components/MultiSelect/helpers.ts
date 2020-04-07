import { filterSuggestionByRule, checkIsTheSameObject } from '../../utils';
import { getText } from '../../src/SuggestionList/helpers';
import {
  FilterDataParams, MultiSelectProps, Value,
} from './types';


export const filterData = ({
  compareObjectsBy,
  data,
  filterRule,
  filterValue,
  shouldKeepSuggestions,
  textField,
  value: values,
}: FilterDataParams): MultiSelectProps['data'] => {
  if (!data) return undefined;

  const suggestions = (() => {
    if (shouldKeepSuggestions) return data;

    return data
      // убираем все значения, которые уже выбраны
      .filter((item) => !values.find((value) => checkIsTheSameObject({ obj1: item, obj2: value, compareObjectsBy })));
  })();

  // и фильтруем по filterValue
  const filteredData = suggestions.filter((item) => filterSuggestionByRule(getText(item, textField), filterValue || '', filterRule));

  if (filteredData.length === 0) return undefined;

  return filteredData;
};

export const getValue = (valueProp: Value[] | null | undefined, valueState: Value[]): Value[] => {
  if (valueProp === undefined) return valueState;

  if (valueProp === null) return [];

  return valueProp;
};
