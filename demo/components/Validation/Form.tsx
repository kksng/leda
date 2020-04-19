/* eslint-disable react/prop-types */
import * as React from 'react';
import * as L from '../../../leda';
import { StoryProps } from '../../types';

export const Form = (props: StoryProps) => (
  <L.Div _box _inner>
    <L.Div>
      <L.Div _inner>
        <L.DateRange
          isRequired
          form="form1"
          name="Input1"
          requiredMessage={['Я обязательный!', 'Я вообще-то тоже!']}
          placeholder="form1 Input1"
        />
      </L.Div>
      <L.Div _inner>
        <L.Input
          isRequired
          form="form1"
          name="Input2"
          placeholder="form1 Input2"
        />
      </L.Div>
      <L.Div _inner>
        <L.Input
          isRequired
          form="form2"
          name="Input1"
          placeholder="form2 Input1"
        />
      </L.Div>
      <L.Div _inner>
        <L.Input
          isRequired
          form="form2"
          name="Input2"
          placeholder="form2 Input2"
        />
      </L.Div>
      <L.Div _inner>
        <L.Button
          form="form1"
          _warning
        >
          Submit form1
        </L.Button>
        {' '}
        <L.Button
          form="form2"
          _warning
        >
          Submit form2
        </L.Button>
        {' '}
        <L.Button
          form={['form1', 'form2']}
          _warning
        >
          Submit both
        </L.Button>
      </L.Div>
    </L.Div>
  </L.Div>
);
