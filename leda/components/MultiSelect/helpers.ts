import { filterSuggestionByRule, checkIsTheSameObject } from '../../utils';
import { getText } from '../../src/SuggestionList/helpers';
import {
  FilterDataParams, MultiSelectProps, Value,
} from './types';
import { GroupedSomeObject } from '../../src/SuggestionList/types';
import { SomeObject } from '../../commonTypes';

export const filterData = ({
  compareObjectsBy,
  data,
  filterRule,
  filterValue,
  textField,
  value: values,
}: FilterDataParams): MultiSelectProps['data'] => {
  if (!data) return undefined;

  const filteredData = (data as Value[])
    // убираем все значения, которые уже выбраны
    .filter((item) => !values.find((value) => checkIsTheSameObject({ obj1: item, obj2: value, compareObjectsBy })))
    // и фильтруем по filterValue
    .filter((item) => filterSuggestionByRule(getText(item, textField), filterValue || '', filterRule));

  if (filteredData.length === 0) return undefined;

  return filteredData as Value[];
};

export const groupData = (data: Value[] | undefined, groupBy: ((option: Value) => string | undefined) | undefined): Value[] | GroupedSomeObject[] => {
  // used to keep track of key and indexes in the result array
  const indexByKey = new Map();
  let currentResultIndex = 0;
  return data?.reduce((accumulator: Value[] | GroupedSomeObject[], dataItem: Value) => {
    const key = groupBy ? groupBy(dataItem) : undefined;
    if (key) {
      if (indexByKey.get(key) === undefined) {
        indexByKey.set(key, currentResultIndex);
        accumulator.push({
          key,
          dataItems: [],
        });
        currentResultIndex += 1;
      }
      const item = (accumulator as GroupedSomeObject[]).findIndex((elem) => elem.key === key);
      if (item !== -1) {
        (accumulator[item] as GroupedSomeObject).dataItems.push(dataItem as SomeObject);
      }
    } else {
      (accumulator as Value[]).push(dataItem);
    }
    return accumulator;
  }, []) ?? [];
};

export const getValue = (valueProp: Value[] | null | undefined, valueState: Value[]): Value[] => {
  if (valueProp === undefined) return valueState;

  if (valueProp === null) return [];

  return valueProp;
};
