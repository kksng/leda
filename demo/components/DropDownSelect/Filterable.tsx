import * as React from 'react';
import * as L from '../../../leda';
import { SomeObject } from '../../../leda/commonTypes';
import { StateButtonGroup } from '../StateButtonGroup';

// eslint-disable-next-line
export const Filterable = (args: SomeObject): React.ReactElement => {
  const [props, setProps] = React.useState({});
  const [value, setValue] = React.useState('Berlin');

  return (
    <L.Div _box _inner _demoBg>
      <L.DropDownSelect
        name="DDS"
        data={[
          'London',
          'Islamabad',
          'Berlin',
          'Washington',
          'Paris',
          'Rome',
          'Tokyo',
          'Budapest',
          'Ottawa',
          'Moscow',
          'Costa Ricco',
        ]}
        placeholder="Choose a city..."
        hasClearButton
        value={value}
        onChange={(ev: L.DropDownSelectTypes.ChangeEvent<string>) => {
          setValue(ev.component.value);
        }}
        onFilterChange={(ev) => {
          console.log('onFilterChange ev.component.value', ev.component.value);
        }}
        shouldFilterValues
        _width40
        {...props}
      >
      </L.DropDownSelect>
      <br />
      <br />
      <L.P>Режим фильтрации</L.P>
      <StateButtonGroup
        data={[
          {
            text: 'Smart',
            props: { filterRule: 'smart' },
          },
          {
            text: 'StartsWith',
            props: { filterRule: 'startsWith' },
          },
          {
            text: 'Includes',
            props: {
              filterRule: 'includes',
            },
          },
        ]}
        setProps={setProps}
      />
    </L.Div>
  );
};
