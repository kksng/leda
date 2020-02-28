import * as React from 'react';
import isNil from 'lodash/isNil';
import { SomeObject } from '../../../leda/commonTypes';
import * as L from '../../../leda';
import { useEventSpy } from '../../useEventSpy';
import { getPluralForm } from '../../../leda/utils/helpers';

const MSData = [
  {
    city: 'Salvador', id: 1, attr: 'value1', groupName: 'Brazil',
  },
  {
    city: 'Rio de Janeiro', id: 2, attr: 'value2', groupName: 'Brazil',
  },
  {
    city: 'Berlin', id: 3, attr: 'value3', groupName: 'Germany',
  },
  {
    city: 'Munich', id: 4, attr: 'value4', groupName: 'Germany',
  },
  {
    city: 'Milan', groupName: 'Italy', id: 5, attr: 'value5',
  },
  {
    city: 'Rome', groupName: 'Italy', id: 6, attr: 'value6',
  },
  { city: 'London', attr: 'value7', id: 77 },
  { city: 'Islamabad', id: 7, attr: 'value7' },
  { city: 'Washington', id: 8, attr: 'value8' },
  { city: 'Paris', id: 9, attr: 'value9' },
  { city: 'Tokyo', id: 10, attr: 'value10' },
  { city: 'Budapest', id: 11, attr: 'value11' },
];

export const GroupedData = (args: SomeObject): React.ReactElement => {
  const [props, setProps] = React.useState({});
  const [isOpen, setIsOpen] = React.useState<boolean | undefined>();
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { update, EventInfo } = useEventSpy(['selectedValue', 'deselectedValues']);

  return (
    <L.Div _box _inner _demoBg>
      <L.MultiSelect
        data={MSData}
        data-test="multiselect"
        defaultValue={[MSData[6]]}
        _width40
        onChange={(ev) => update('Change', ev)}
        onBlur={(ev) => update('Blur', ev)}
        onFocus={(ev) => update('Focus', ev)}
        placeholder="Choose cities you would like to visit!"
        isOpen={isOpen}
        canSelectGroup
        compareObjectsBy="id"
        isLoading={isLoading}
        isRequired
        canSelectAll
        hasCheckBoxes
        maxVisibleTags={3}
        shouldOpenWhenMaxSelectedReached
        requiredMessage="Обязательное поле!"
        name="multi-pulti"
        form="multi-select-form"
        hasClearButton
        isDisabled={isDisabled}
        groupBy={(data: any) => data.groupName}
        textField="city"
        tagsContainerRender={({
          Element,
          componentProps,
          elementProps,
          componentState,
        }) => {
          const isMaxTagsSelected = !isNil(componentProps.maxVisibleTags) && elementProps.value.length >= componentProps.maxVisibleTags;
          return (
            <Element
              {...elementProps}
              value={isMaxTagsSelected ? `Выбрано ${componentState.value.length} ${getPluralForm({
                count: componentState.value.length,
                one: 'значение',
                two: 'значения',
                five: 'значений',
              })}` : componentState.value}
            />
          );
        }}
      >
      </L.MultiSelect>
      <br />
      <br />
      <L.Button _warning={isDisabled} onClick={() => setIsDisabled(!isDisabled)}>Toggle isDisabled</L.Button>
      {' '}
      <L.Button _warning={isLoading} onClick={() => setIsLoading(!isLoading)}>Toggle isLoading</L.Button>
      {' '}
      <L.Button _warning={isOpen} onClick={() => setIsOpen(isOpen ? undefined : true)}>Toggle isOpen</L.Button>
      <br />
      <br />
      <EventInfo />
    </L.Div>
  );
};
