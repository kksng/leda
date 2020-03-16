import * as React from 'react';
import * as L from '../../../leda';
import { StateButtonGroup } from '../StateButtonGroup';
import { useEventSpy } from '../../useEventSpy';
import { validate } from '../../../leda/components/Validation';

// eslint-disable-next-line
export const Customization = (anyProps: any) => {
  const [props, setProps] = React.useState({});
  const [value, setValue] = React.useState('');
  const [count, setCount] = React.useState<number>(0);

  const { update, EventInfo } = useEventSpy();

  return (
    <L.Div _box _inner _demoBg>
      <L.Input
        placeholder="Type only capitals..."
        _width30
        value={value}
        onChange={(event) => {
          update('Change', event);
          setValue(event.component.value);
          console.log(event.currentTarget?.value);
        }}
        validator={(currentValue) => currentValue.length < count}
        form="form1"
        invalidMessage={`Length must be less than ${count}`}
        name="pattern-case"
        letterCase="upper"
        {...props}
      />

      <br />
      <br />
      <L.Button onClick={() => setCount(count + 1)}>Count {count}</L.Button>
      <L.Button onClick={() => validate('form1', 'pattern-case')}>Validate</L.Button>
      <br />
      <br />
      <StateButtonGroup
        data={[
          { text: 'Icon left', props: { ...props, inputRender: ({ Element, elementProps }: any) => (<><L.I _icon20 _iSearch /><Element {...elementProps} /></>) } },
          { text: 'Text left', props: { ...props, inputRender: ({ Element, elementProps }: any) => <>от <Element {...elementProps} /></> } },
        ]}
        setProps={setProps}
      />
      {'  '}
      <StateButtonGroup
        data={[
          { text: 'Icon right', props: { ...props, inputRender: ({ Element, elementProps }: any) => (<><Element {...elementProps} /><L.I _icon20 _iSearch /></>) } },
          { text: 'Text right', props: { ...props, inputRender: ({ Element, elementProps }: any) => <><Element {...elementProps} /> RUB</> } },
        ]}
        setProps={setProps}
      />
      <br />
      <EventInfo />
    </L.Div>
  );
};
