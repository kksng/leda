import * as React from 'react';
import * as L from '../../../leda';
import { SomeObject } from '../../../leda/commonTypes';

// eslint-disable-next-line
export const SearchFields = (args: SomeObject): React.ReactElement => {

  return (
    <L.Div _box _inner _demoBg>
      <L.DropDownSelect
        data={[
          { country: 'England', capital: 'London' },
          { country: 'Germany', capital: 'Berlin' },
          { country: 'France', capital: 'Paris' },
          { country: 'Sweden', capital: 'Stockholm' },
          { country: 'Spain', capital: 'Madrid' },
        ]}
        searchFields={['capital']}
        textField="country"
        shouldFilterValues
        itemRender={({ Element, elementProps, componentProps }: any) => {
          return (
            <L.Div>
              <Element {...elementProps} {...componentProps} />
              <L.Small _txtSmall _marginLeft _txtGray>{componentProps.item.capital}</L.Small>
            </L.Div>
          );
        }}
        _width30
      />
    </L.Div>
  );
};
