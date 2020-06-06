import * as React from 'react';
import * as L from '../../../leda';

export const MaskedInput = (): React.ReactElement => {
  const [cardValue, setCardValue] = React.useState<string>('');

  const [phoneValue, setPhoneValue] = React.useState<string | null>('8002000600');

  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);

  const testFunction = (event: {}) => {
    console.log(event);
  };

  const inputRender = ({ elementProps, Element }) => (
    <>
      <L.Span style={{ padding: '5px' }}>телефон</L.Span>
      <Element {...elementProps} />
    </>
  ); 

  const wrapperRender = ({ elementProps, Element }) => (
    <Element {...elementProps} 
    data-some-attribute="hello world"
    style={{ border: '4px solid green' }} />
  ); 

  return (
    <L.Div _demoStory>
      <L.Span>Номер телефона (не контролируемый)</L.Span>
      <L.MaskedInput
        defaultValue="8005553535"
        mask="+7 (###)-###-##-##"
        name="PhoneMask"
        placeholder="введи" 
        onFocus={testFunction}
        onEnterPress={testFunction}
        onBlur={testFunction}
        onChange={(event) => {
          setPhoneValue(event.component.value);
          testFunction(event);
        }}
        wrapperRender={wrapperRender}
        inputRender={inputRender}
      />
      <L.Span>СНИЛС (контролируемый)</L.Span>
      <L.MaskedInput
        name="CardMask"
        mask="###-###-### ##"
        placeholder="___-___-___ __"
        value={cardValue}
        placeholderChar="$" 
        onChange={(event) => setCardValue(event.component.value)}
      />
      <L.Span>Номер телефона (неконтролируемый)</L.Span>
      <L.MaskedInput
        name="DisabledMask"
        mask="+7 (###)-###-##-##"
        placeholderChar="$" 
        defaultValue="9876543210"
        onChange={(event) => setPhoneValue(event.component.value)}
        isDisabled={isDisabled}
      />
      <br />
      <br />
      <L.Switcher value={isDisabled} onChange={(event) => setIsDisabled(event.component.value)}>
        Toggle isDisabled
      </L.Switcher>
    </L.Div>
  );
};
