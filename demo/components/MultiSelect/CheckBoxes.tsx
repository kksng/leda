import * as React from 'react';
import * as L from '../../../leda';
import { getWordEnding } from '../../../leda/utils';

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
        uniteTags={3}
        shouldKeepSuggestions
        _width40
        isOpen={true}
        onChange={ev => {
          console.log('ev.component.selectedValue', ev.component.selectedValue);
          console.log('ev.component.value', ev.component.value);
          setValue(ev.component.value as string[]);
        }}
        itemRender={({ componentProps, Element, elementProps }) => {
          const { onClick } = elementProps;
          const { isSelected } = componentProps;
          return (
            <L.Div _flex-row>
              <L.CheckBox value={!!isSelected} onClick={onClick} _margin-left/>
              <Element {...elementProps} _width-100/>
            </L.Div>
          )
        }}
        tagsUnionRender={({ elementProps, Element }) => {
          const { theme, value } = elementProps;
          const word = getWordEnding({ count: value.length, one: 'раз', two: 'раза', five: 'раз' });
          return (
            <div className={theme.tagsUnion}>
              всем привет {value.length} {word}
            </div>
          )
        }}
        value={value}
      >
      </L.MultiSelect>
    </L.Div>
  );
};
