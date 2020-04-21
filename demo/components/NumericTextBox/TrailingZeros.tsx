/* eslint-disable react/prop-types, no-console */
import * as React from 'react';
import * as L from '../../../leda';
import { StateButtonGroup } from '../StateButtonGroup';
import { useEventSpy } from '../../useEventSpy';

export const TrailingZeros = (args: any) => {
  const [props, setProps] = React.useState<{ shouldTrimTrailingZeros?: boolean }>({});

  const { update, EventInfo } = useEventSpy(['formattedValue']);

  return (
    <L.Div _demoStory>
      <L.NumericTextBox
        format="#.####"
        name="numer"
        data-test="numerictextbox"
        max={20000000000000}
        min={-100000000000}
        step={1}
        shouldTrimTrailingZeros={false}
        invalidMessage="Число не должно быть отрицательным!"
        requiredMessage="Обязательное поле!"
        onChange={ev => {
          update('Change', ev);
          console.log('Change ev.component.value', ev.component.value);
        }}
        onBlur={ev => {
          update('Blur', ev);
        }}
        onFocus={ev => {
          console.log('focus ev', ev);
          update('Focus', ev);
        }}
        form="foobar"
        isRequired
        placeholder="Gimme ur number!"
        inputRender={({ Element, elementProps }) => (
          <>
            <L.Span _numericTextBoxPrefix>от</L.Span>
            <Element {...elementProps} />
            <L.Span _numericTextBoxSuffix>Рублей</L.Span>
          </>
        )}
        _width30
        {...props}
      />
      <br />
        <L.Switcher onClick={() => { setProps({ ...props, shouldTrimTrailingZeros: !props.shouldTrimTrailingZeros }); }}>Удалить нули</L.Switcher>
      <br />
      <br />
      <L.Button onClick={() => { setProps({}); }}>Defaults</L.Button>
      {'  '}

      <br />
      <br />
      <StateButtonGroup
        data={[
          { text: 'Icon left', props: { ...props, prefixRender: ({ elementProps }: any) => (<L.I {...elementProps} _iSearch />) } },
          { text: 'Text left', props: { ...props, prefixRender: ({ elementProps }: any) => <L.Span {...elementProps}>от</L.Span> } },
        ]}
        setProps={setProps}
      />
      {'  '}
      <StateButtonGroup
        data={[
          { text: 'Icon right', props: { ...props, suffixRender: ({ elementProps }: any) => (<L.I {...elementProps} _iSearch />) } },
          { text: 'Text right', props: { ...props, suffixRender: ({ elementProps }: any) => <L.Span {...elementProps}>RUB</L.Span> } },
        ]}
        setProps={setProps}
      />
      <EventInfo />
    </L.Div>
  );
};
