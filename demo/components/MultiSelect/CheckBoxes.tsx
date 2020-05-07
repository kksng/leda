import * as React from 'react';
import * as L from '../../../leda';
import { getWordEnding } from '../../../leda/utils';

export const CheckBoxes = (args: any): React.ReactElement => {
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
        maxTags={3}
        shouldKeepSuggestions
        // sortSuggestions={(a, b) => (a ?? 1) > (b ?? 0) ? 1 : -1}
        shouldSelectedGoFirst
        canSelectAll
        selectAllItem={<L.Span _txt-success>SelectAll</L.Span>}
        _width-40
        hasClearButton
        onChange={ev => {
          console.log('ev.component.selectedValue', ev.component.selectedValue);
          console.log('ev.component.deselectedValues', ev.component.deselectedValues);
          console.log('ev.component.value', ev.component.value);
          setValue(ev.component.value as string[]);
        }}
        isOpen
        hasCheckBoxes
        // itemRender={({ componentProps, Element, elementProps }) => {
        //   const { onClick } = elementProps;
        //   const { isSelected } = componentProps;
        //   return (
        //     <L.Div _flex-row onClick={onClick}>
        //       <L.CheckBox
        //         _margin-left
        //         value={!!isSelected}
        //         // заменить label на div, чтобы при клике на чекбокс фокус не переходил из мультиселекта и не закрывался список
        //         labelRender={({ elementProps }) => <div {...elementProps} />}
        //       />
        //       <Element {...elementProps} _width-100/>
        //     </L.Div>
        //   )
        // }}
        tagsUnionRender={({ elementProps, componentProps, Element }) => {
          const { value } = componentProps;
          const word = getWordEnding({ count: value?.length ?? 0, one: 'раз', two: 'раза', five: 'раз' });
          return (
            <Element {...elementProps}>
              всем привет {value?.length} {word}
            </Element>
          )
        }}
        value={value}
      >
      </L.MultiSelect>
    </L.Div>
  );
};
