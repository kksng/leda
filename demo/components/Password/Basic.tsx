import * as React from 'react';
import * as L from '../../../leda';

// eslint-disable-next-line
export const Basic = (anyProps: any) => {
  const [value, setValue] = React.useState('');

  console.log('value', value);

  return (
    <L.Div _box _inner _demoBg>
      <L.Password
        _width30
        form="form1"
        name="pattern-case"
        placeholder="type password"
        value={value}
        onChange={(event) => {
          setValue(event.component.value);
        }}
      />
      <br />
      <L.Input
        _width30
        hasClearButton
        form="form1"
        name="pattern-case"
        placeholder="type something"
        value={value}
        onChange={(event) => {
          setValue(event.component.value);
        }}
      />
    </L.Div>
  );
};
