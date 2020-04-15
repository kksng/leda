import * as React from 'react';
import { Story } from '../Story';
import { DataTypes } from './DataTypes';
import { EmptyValues } from './EmptyValues';
import { Filterable } from './Filterable';
import { GroupedObjectsData } from './GroupedObjectsData';
import { BoundingElementRef } from './BoundingElementRef';
import { CompareObjectsBy } from './CompareObjectsBy';
import { SearchFields } from './SearchFields';

export const DropDownSelect = () => (
  <Story title="DropDownSelect">
    <DataTypes title="Разные типы data" />
    <Filterable title="Режим фильтрации" />
    <EmptyValues title="Выбор пустого значения" />
    <GroupedObjectsData title="Сгруппированные списки" />
    <BoundingElementRef title="Позиционирование" />
    <CompareObjectsBy title="Сравнение" />
    <SearchFields title="Поиск по полям объекта" />
  </Story>
);
