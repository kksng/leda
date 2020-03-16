/* eslint-disable import/no-extraneous-dependencies */

import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import * as L from '../leda';
import {
  AutoComplete, ButtonGroup, CheckBox, DatePicker, DateRange,
  DropDown, DropDownSelect, Input, A, Loader, MaskedInput, Modal,
  MultiSelect, Notifications, NumericRange, NumericTextBox,
  Pagination, Radio, ProgressBar, Slider, StatusBar, StickyPanel, Switcher,
  Tabs, Tags, DropZone, Textarea, DateTimePicker, TimePicker,
  DateTimeRange, TimeRange, DropDownLink, Currency, Rating,
  Div, Table, Dl, FileUpload, HTMLTags, Validation, Navigation,
  Collapsible, Collapse, VStepper, Button, Tooltip, FileDrop, Password,
} from './components';

export const Demo = hot(() => (
  <L.Div style={{ color: 'black' }} _wrapper>
    <Navigation />
    <L.Div _container>
      <L.Div _row _demoMainTitle _noGutters>
        <L.H1 _colMd12>Demo sandbox</L.H1>
        <L.P _colMd12>
          Специально созданная страница для тестирования компонентов, дебага и написания кода
        </L.P>
      </L.Div>
      <HTMLTags />
      <A />
      <AutoComplete />
      <Button />
      <ButtonGroup />
      <CheckBox />
      <Collapse />
      <Collapsible />
      <Currency />
      <DatePicker />
      <DateRange />
      <DateTimePicker />
      <DateTimeRange />
      <Div />
      <Dl />
      <DropDown />
      <DropDownLink />
      <DropDownSelect />
      <DropZone />
      <FileDrop />
      <FileUpload />
      <Input />
      <Loader />
      <MaskedInput />
      <Modal />
      <MultiSelect />
      <Notifications />
      <NumericRange />
      <NumericTextBox />
      <Pagination />
      <Password />
      <ProgressBar />
      <Radio />
      <Rating />
      <Slider />
      <StatusBar />
      <StickyPanel />
      <Switcher />
      <Table />
      <Tabs />
      <Tags />
      <Textarea />
      <TimePicker />
      <TimeRange />
      <Tooltip />
      <Validation />
      <VStepper />
    </L.Div>
  </L.Div>
));
