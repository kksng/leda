import * as React from 'react';
import { Story } from '../Story';
import { BasicUsage } from './BasicUsage';
import { ControlledDate } from './ControlledDate';
import { MinMax } from './MinMax';
import { Validation } from './Validation';
import { NameArray } from './NameArray';
import { Positioned } from './Positioned';
import { Customization } from './Customization';

export const DateRange = () => (
  <Story title="DateRange">
    <BasicUsage title="Простейшее использование" />
    <NameArray title="Name as [string, string]"/>
    <ControlledDate title="Контролирование только date" />
    <MinMax title="Ограничение даты min-max" />
    <Validation title="Валидация" />
    <Positioned title="Позиционирование" />
    <Customization title="Кастомизация" />
  </Story>
);
