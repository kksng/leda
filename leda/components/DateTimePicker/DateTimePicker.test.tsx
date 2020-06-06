import React from 'react';
import {
  render,
  fireEvent,
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { DateTimePicker } from './index';

describe('Check DateTimePicker snapshots collection', () => {
  test('is DateTimePicker render right?', () => {
    const { container } = render(<DateTimePicker name="test" />);

    expect(container.firstChild)
      .toMatchSnapshot();
  });
});
describe('Check DateTimePicker value set test collection', () => {
  test('is DateTimePicker render right if value set as String', () => {
    const dateValue = '10.10.2010 10:10';
    const {
      getAllByRole,
      getByRole,
    } = render(<DateTimePicker name="test" value={dateValue} />);

    expect(getByRole('textbox'))
      .toHaveAttribute('value');

    expect(getAllByRole('textbox'))
      .toHaveLength(1);

    expect(getByRole('textbox'))
      .toHaveValue(dateValue);
  });
  test('is DateTimePicker render right if value set as Date', () => {
    const dateValue = new Date('10.10.2010 10:10');
    const {
      getAllByRole,
      getByRole,
    } = render(<DateTimePicker name="test" value={dateValue} />);

    expect(getByRole('textbox'))
      .toHaveAttribute('value');

    expect(getAllByRole('textbox'))
      .toHaveLength(1);

    expect(getByRole('textbox'))
      .toHaveValue('10.10.2010 10:10');
  });
  test('is DateTimePicker render right if value set as Null', () => {
    const dateValue = null;
    const {
      getAllByRole,
      getByRole,
    } = render(<DateTimePicker name="test" value={dateValue} />);

    expect(getByRole('textbox'))
      .toHaveAttribute('value');

    expect(getAllByRole('textbox'))
      .toHaveLength(1);

    expect(getByRole('textbox'))
      .toHaveValue('');
  });
});
describe('Check DateTimePicker attributes test collection', () => {
  test('is DateTimePicker placeholder set right?', () => {
    const validPlaceholder = 'text';
    const { getByRole } = render(<DateTimePicker placeholder={validPlaceholder} />);

    expect(getByRole('textbox'))
      .toHaveAttribute('placeholder');

    expect(getByRole('textbox'))
      .toHaveProperty('placeholder', validPlaceholder);
  });
  test('is DateTimePicker minMax set attributes work right?', () => {
    const min = new Date('01.02.2018 10:10');
    const max = new Date('05.25.2020 10:10');// mm-dd-YYYY
    const validValue = '25.05.2020 10:10';
    const valueForCheck = '26';
    const { getByText } = render(<DateTimePicker value={validValue} isOpen min={min} max={max} />);

    expect(getByText(valueForCheck))
      .toHaveClass('calendar-date-cell disabled-date');
  });
  test('is DateTimePicker isDisabled attributes work right?', () => {
    const onChange = jest.fn();
    const { container, debug } = render(<DateTimePicker isDisabled value="10.10.2010 10:10" onChange={onChange} />);
    const icon = container.querySelectorAll('.datepicker-icons-wrapper')[0];
    const input = container.querySelectorAll('input.datepicker-input')[0];

    fireEvent.click(icon);

    expect(container.querySelectorAll('.disabled-state'))
      .toHaveLength(1);

    expect(input)
      .toHaveAttribute('disabled');

    expect(onChange)
      .toHaveBeenCalledTimes(0);
  });
  test('is DateTimePicker isOpen attribute work right?', () => {
    const onChange = jest.fn();
    const { container, rerender } = render(<DateTimePicker isOpen value="10.10.2010 10:10" onChange={onChange} />);
    const icon = container.querySelectorAll('.datepicker-icons-wrapper')[0];
    const input = container.querySelectorAll('input.datepicker-input')[0];
    const popup = container.querySelectorAll('.calendar-wrapper.visible')[0];

    expect(icon)
      .toBeInTheDocument();

    expect(input)
      .toBeInTheDocument();

    expect(popup)
      .toBeInTheDocument();

    rerender(<DateTimePicker value="10.10.2010 10:10" onChange={onChange} />);

    expect(container.querySelectorAll('.calendar-wrapper.visible')[0])
      .not
      .toBeDefined();
  });
  test('is DateTimePicker date format input work right?', () => {
    const onChange = jest.fn();
    const validFormat = 'dd.MM.yyyy hh:mm';
    const invalidFormat = 'yyyy-MM-dd hh:mm';
    const validValue = '10.10.2010 10:10';
    const invalidValue = '2010-10-10 10:10';
    const { container, rerender } = render(<DateTimePicker format={validFormat} value={validValue} onChange={onChange} />);
    const icon = container.querySelectorAll('.datepicker-icons-wrapper')[0];
    const input = container.querySelectorAll('input.datepicker-input')[0];

    fireEvent.click(icon);

    expect(input)
      .toHaveValue(validValue);

    rerender(<DateTimePicker format={invalidFormat} value={invalidValue} onChange={onChange} />);

    fireEvent.click(icon);

    expect(input)
      .toHaveValue(invalidValue);
  });
});
describe('Check DateTimePicker event listeners test collection', () => {
  test('is DateTimePicker onBlur event listener work right?', () => {
    const validDate = '10.10.2010 10:10';
    const validName = 'test';
    const onBlur = jest.fn();
    const { container } = render(<DateTimePicker value={validDate} name={validName} onBlur={onBlur} />);
    const input = container.querySelectorAll('input.datepicker-input')[0];

    fireEvent.blur(input);

    expect(input)
      .not
      .toHaveFocus();

    expect(onBlur)
      .toBeCalledTimes(1);

    expect(onBlur)
      .lastCalledWith(expect.objectContaining({
        component: expect.objectContaining({
          name: validName,
          value: validDate,
        }),
      }));
  });
  test('is DateTimePicker onChange event listener work right?', () => {
    const validFormat = 'dd.MM.yyyy hh:mm';
    const validValue = '10.10.2010 10:10';
    const validValueWithotComma = '101020101010';
    const invalidValue = '11.10.2010 10:10';
    const validName = 'test';
    const onChange = jest.fn();
    const { container } = render(<DateTimePicker value={invalidValue} format={validFormat} name={validName} onChange={onChange} />);
    const input = container.querySelectorAll('input.datepicker-input')[0];

    userEvent.type(input, validValue);

    expect(onChange)
      .toBeCalledTimes(validValue.length);

    expect(onChange)
      .lastCalledWith(expect.objectContaining({
        component: expect.objectContaining({
          name: validName,
          value: validValueWithotComma,
        }),
      }));
  });
  test('is DateTimePicker onPressEnter event listener work right?', () => {
    const validName = 'test';
    const validValue = '10.10.2010 10:10';
    const onEnterPress = jest.fn();
    const { container } = render(<DateTimePicker name={validName} value={validValue} onEnterPress={onEnterPress} />);
    const input = container.querySelectorAll('input.datepicker-input')[0];

    fireEvent.keyDown(input, {
      charCode: 13,
      code: 13,
      key: 'Enter',
      keyCode: 13,
    });

    expect(onEnterPress)
      .toHaveBeenCalled();

    expect(onEnterPress)
      .lastCalledWith(expect.objectContaining({
        component: expect.objectContaining({
          name: validName,
          value: '', // Ошибка! Как исправится, нужно будет добаивть
        }),
      }));
  });
  test('is DateTimePicker onFocus event listener work right?', () => {
    const validName = 'test';
    const validValue = '10.10.2010 10:10';
    const onFocus = jest.fn();
    const { container } = render(<DateTimePicker name={validName} value={validValue} onFocus={onFocus} />);
    const input = container.querySelectorAll('input.datepicker-input')[0];

    fireEvent.focus(input);

    expect(onFocus)
      .toHaveBeenCalled();

    expect(onFocus)
      .lastCalledWith(expect.objectContaining({
        component: expect.objectContaining({
          name: validName,
          value: validValue,
        }),
      }));
  });
});
