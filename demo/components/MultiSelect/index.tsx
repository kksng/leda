import * as React from 'react';
import { Story } from '../Story';
import { DataTypes } from './DataTypes';
import { Controlled } from './Controlled';
import { Customization } from './Customization';
import { GroupedData } from './GroupedData';
import { CompareObjectsBy } from './CompareObjectsBy';
import { CheckBoxes } from './CheckBoxes';
import { NoInput } from './NoInput';

export const MultiSelect = (): React.ReactElement => (
  <Story title="MultiSelect">
    <Controlled title="Контролируемый режим" />
    <CheckBoxes title="Чекбоксы" />
    <CompareObjectsBy title="Сравнение" />
    <DataTypes title="Разные типы data" />
    <Customization title="Кастомизация" />
    <GroupedData title="Сгруппированные списки" />
    <NoInput title="shouldHideInput" />
  </Story>
);
