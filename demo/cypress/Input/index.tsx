import * as React from 'react';
import * as L from '../../../leda';
import { useEventSpy } from '../../useEventSpy';

export const Input = (attrs: any) => {
    const [value, setValue] = React.useState('');
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('');
    const { update, EventInfo } = useEventSpy();
    const [count, setCount] = React.useState<number>(0);
    const handleChange = (ev) => { setValue2(ev.component.value); };
    const testFunction = (event: {}) => {
        console.log(event);
    };
    const inputRender = ({ Element, elementProps }) => (
        <>
            <L.Span
                style={{ display: 'inline-block', padding: '5px' }}
                onClick={console.log}
            >
                from
        </L.Span>
            <Element {...elementProps} />
            <L.Span
                style={{ display: 'inline-block', padding: '5px' }}
                _txt-success
                onClick={console.log}
            >
                €
        </L.Span>
        </>
    );

    const wrapperRender = ({ Element, elementProps }) => (
        <Element
            {...elementProps}
            data-some-attribute="hello world"
        />
    );

    return (
        <L.Div _box _inner _demoBg>
            <br />
            <L.Input
                _width30
                placeholder="Type only capitals..."
                hasClearButton
                value={value}
                onChange={(event) => {
                    update('Change', event);
                    setValue(event.component.value);
                    console.log(event.currentTarget?.value);
                    testFunction(event);
                }}
                form="form1"
                invalidMessage={`Email`}
                name="UpperInput"
                letterCase="upper"
                forbiddenSymbols='numbers'
                maxLength={count}
                validator='email'
            />
            <br />
            <br />
            <br />
            <L.Button onClick={() => setCount(count + 1)}>+ 1, сейчас: {count}</L.Button>
            <L.Button onClick={() => setCount(count - 1)}>- 1, сейчас {count}</L.Button>
            <br />

            <L.Input
                _width30
                name="LowerInput"
                form="AwesomeInput"
                value={value1}
                forbiddenSymbols={/[s-z]/}
                invalidMessage="invalidMessage"
                requiredMessage="requiredMessage"
                onChange={(ev) => {
                    setValue1(ev.component.value);
                }}
                placeholder="Type lowercase email"
                hasClearButton
                letterCase="lower"
                onFocus={testFunction}
                onEnterPress={testFunction}
                onBlur={testFunction}
                isRequired
                validator={[
                    {
                        validator: 'email',
                    },
                    {
                        validator: /[p-s]/,
                        invalidMessage: 'Wrong chars',
                    },
                    {
                        validator: (val: string | number) => (val.toString().length > 10),
                        invalidMessage: 'Minimum 10 symbols',
                    },
                ]}
            />
            <br />
            <br />
            <L.Input
                name="RegExpInput"
                form="AwesomeInput"
                allowedSymbols={/[A-S]/}
                isRequired
            />
            <br />
            <br />
            <L.Input
                name="PredefinedSymbolsInput"
                allowedSymbols="numbers"
                form="AwesomeInput"
                wrapperRender={wrapperRender}
                inputRender={inputRender}
            />
            <br />
            <L.Button
                form="AwesomeInput"
                onClick={(ev) => console.log('awesome form submit ev', ev)}
                onValidationFail={(ev) => console.log('awesome form fail ev', ev)}
            >
                Validate an awesome input
            </L.Button>
            <br />
            <L.Input
                name="DisabledInput"
                form="AwesomeInput"
                defaultValue="Wow, u r so gud"
                isDisabled
            />
            <br />
            <L.Input
                form='OneInputForm'
                name='BasicInput'
                isRequired
                onChange={handleChange}
                value={value2}
            />
            <br />
            <L.Button form='OneInputForm'
            >
                Validate OneInputForm
            </L.Button>

        </L.Div>
    );
};
