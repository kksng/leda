import * as React from 'react';
import * as L from '../../../leda';

export const CheckBoxes = (args): React.ReactElement => {
  const [value, setValue] = React.useState<string[]>(['London', 'Paris']);

  return (
    <L.Div _box _inner _demoBg>
      <L.MultiSelect
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
        ]}
        shouldKeepSuggestions
        _width40
        isOpen={true}
        onChange={ev => {
          console.log('ev.component.selectedValue', ev.component.selectedValue);
          console.log('ev.component.value', ev.component.value);
          setValue(ev.component.value as string[]);
        }}
        itemRender={({ Element, elementProps }) => {
          const { isSelected, onClick } = elementProps;
          return (
            <L.Div _flex-row>
              <L.CheckBox value={!!isSelected} onClick={onClick} _margin-left/>
              <Element {...elementProps} _width-100/>
            </L.Div>
          )
        }}
        value={value}
      >
      </L.MultiSelect>
    </L.Div>
  );
};
