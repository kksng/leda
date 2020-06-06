import React from 'react';
import {
  render,
  fireEvent,
} from '@testing-library/react';
import { ButtonGroup } from './index';


describe('Check ButtonGroup snapshots collection', () => {
  test('is ButtonGroup render right?', () => {
    const { container, queryAllByRole } = render(<ButtonGroup name="buttonGroup" data={['Petya', 'Vasya', 'Oleg']} />);

    expect(queryAllByRole('button'))
      .toHaveLength(3);

    expect(container.firstChild)
      .toMatchSnapshot();
  });
  test('is ButtonGroup without data render right?', () => {
    const { container, queryAllByRole } = render(<ButtonGroup name="buttonGroup" />);

    expect(queryAllByRole('button'))
      .toHaveLength(0);

    expect(container.firstChild)
      .toMatchSnapshot();
  });
});
describe('Check ButtonGroup work mode collection', () => {
  test('is ButtonGroup with RadioTypeMode render right?', () => {
    const { container } = render(<ButtonGroup name="buttonGroup" data={['one', 'two', 'three']} />);

    expect(container.querySelectorAll('.first'))
      .toHaveLength(1);

    expect(container.querySelectorAll('.last'))
      .toHaveLength(1);

    expect(container.querySelectorAll('.button-group-item'))
      .toHaveLength(3);
  });
  test('is ButtonGroup with CheckboxTypeMode render right?', () => {
    const { container } = render(<ButtonGroup type="checkbox" name="buttonGroup" data={['one', 'two', 'three']} />);

    expect(container.querySelectorAll('.first'))
      .toHaveLength(1);

    expect(container.querySelectorAll('.last'))
      .toHaveLength(1);

    expect(container.querySelectorAll('.button-group-item'))
      .toHaveLength(3);

    expect(container.querySelectorAll('div[type="checkbox"]'))
      .toHaveLength(1);
  });
  test('is ButtonGroup with RadioTypeMode selected right?', () => {
    const onClick = jest.fn();
    const { container } = render(<ButtonGroup name="buttonGroup" data={['one', 'two', 'three']} onClick={onClick} />);
    const buttons = container.querySelectorAll('.button-group-item');

    buttons.forEach((b) => {
      fireEvent.click(b);
    });
    expect(onClick)
      .toHaveBeenCalledTimes(3);

    expect(container.querySelectorAll('.button-group-item.active.last'))
      .toHaveLength(1);
  });
  test('is ButtonGroup with CheckboxTypeMode selected right?', () => {
    const onClick = jest.fn();
    const { container } = render(<ButtonGroup type="checkbox" name="buttonGroup" data={['one', 'two', 'three']} onClick={onClick} />);
    const buttons = container.querySelectorAll('.button-group-item');

    buttons.forEach((b) => {
      fireEvent.click(b);
    });
    expect(onClick)
      .toHaveBeenCalledTimes(3);

    expect(container.querySelectorAll('.button-group-item.active'))
      .toHaveLength(3);
  });
});
describe('Check ButtonGroup value property variation set', () => {
  test('is ButtonGroup with Number value render right?', () => {
    const { getAllByText } = render(<ButtonGroup name="buttonGroup" data={[1, 2, 3]} />);

    expect(getAllByText('1'))
      .toHaveLength(1);

    expect(getAllByText('2'))
      .toHaveLength(1);

    expect(getAllByText('3'))
      .toHaveLength(1);
  });
  test('is ButtonGroup with String value render right?', () => {
    const { getAllByText } = render(<ButtonGroup name="buttonGroup" data={['a', 'b', 'c']} />);

    expect(getAllByText('a'))
      .toHaveLength(1);

    expect(getAllByText('b'))
      .toHaveLength(1);

    expect(getAllByText('c'))
      .toHaveLength(1);
  });
  test('is ButtonGroup with Object value render right?', () => {
    const { getAllByText } = render(<ButtonGroup name="buttonGroup" textField="key" data={[{ key: 'a' }, { key: 'b' }, { key: 'c' }]} />);

    expect(getAllByText('a'))
      .toHaveLength(1);

    expect(getAllByText('b'))
      .toHaveLength(1);

    expect(getAllByText('c'))
      .toHaveLength(1);
  });
});
describe('Check ButtonGroup defaultValue set', () => {
  test('is ButtonGroup in RadioTypeMode with right defaultValue render good if data is String?', () => {
    const { container } = render(<ButtonGroup type="radio" defaultValue="1" name="buttonGroup" data={['1', '2', '3']} />);

    expect(container.querySelectorAll('.active'))
      .toHaveLength(1);
  });
  test('is ButtonGroup in RadioTypeMode with right defaultValue render good if data is Object?', () => {
    const { container } = render(<ButtonGroup type="radio" defaultValue={{ key: 'a' }} name="buttonGroup" textField="key" data={[{ key: 'a' }, { key: 'b' }, { key: 'c' }]} />);

    expect(container.querySelectorAll('.active'))
      .toHaveLength(1);
  });
  test('is ButtonGroup in CheckboxTypeMode with right dafaultValue render good if data is String?', () => {
    const { container } = render(<ButtonGroup type="checkbox" defaultValue={['a', 'b']} name="buttonGroup" data={['a', 'b', 'c']} />);

    expect(container.querySelectorAll('.active'))
      .toHaveLength(2);
  });
  test('is ButtonGroup in CheckboxTypeMode with right dafaultValue render good if data is Object?', () => {
    const { container } = render(<ButtonGroup type="checkbox" defaultValue={[{ key: 'a' }]} textField="key" name="buttonGroup" data={[{ key: 'a' }, { key: 'b' }, { key: 'c' }]} />);

    expect(container.querySelectorAll('.active'))
      .toHaveLength(1);
  });
});
describe('Check ButtonGroup attributes set collection', () => {
  test('is ButtonGroup render right with different atributes?', () => {
    const { container, rerender } = render(<ButtonGroup _primary data={['a', 'b', 'c']} />);

    expect(container.querySelectorAll('.primary'))
      .toHaveLength(1);

    rerender(<ButtonGroup _secondary data={['a', 'b', 'c']} />);

    expect(container.querySelectorAll('.secondary'))
      .toHaveLength(1);

    rerender(<ButtonGroup _success data={['a', 'b', 'c']} />);

    expect(container.querySelectorAll('.success'))
      .toHaveLength(1);

    rerender(<ButtonGroup _warning data={['a', 'b', 'c']} />);

    expect(container.querySelectorAll('.warning'))
      .toHaveLength(1);

    rerender(<ButtonGroup _danger data={['a', 'b', 'c']} />);

    expect(container.querySelectorAll('.danger'))
      .toHaveLength(1);
  });
});
describe('Check ButtongGroup correnct events handling', () => {
  test('is ButtonGroup in RadioTypeMode onClick and onChange handling right?', () => {
    const onClick = jest.fn();
    const onChange = jest.fn();
    const { container } = render(<ButtonGroup data={['a', 'b', 'c']} onClick={onClick} onChange={onChange} />);

    fireEvent.click(container.querySelectorAll('.button-group-item.first')[0]);

    expect(onClick)
      .toHaveBeenCalledTimes(1);

    expect(onClick)
      .toHaveBeenLastCalledWith(expect.any(Object));

    expect(onChange)
      .lastCalledWith(expect.objectContaining({
        component: expect.objectContaining({
          value: 'a',
        }),
      }));
  });
  test('is ButtonGroup in CheckboxTypeMode onClick and onChange handling right?', () => {
    const onClick = jest.fn();
    const onChange = jest.fn();
    const { container } = render(<ButtonGroup type="checkbox" data={['a', 'b', 'c']} onClick={onClick} onChange={onChange} />);
    const firstButton = container.querySelectorAll('.button-group-item.first')[0];
    const lastButton = container.querySelectorAll('.button-group-item.last')[0];

    fireEvent.click(firstButton);
    fireEvent.click(lastButton);

    expect(onClick)
      .toHaveBeenCalledTimes(2);

    expect(onClick)
      .toHaveBeenLastCalledWith(expect.any(Object));

    expect(onChange)
      .lastCalledWith(expect.objectContaining({
        component: expect.objectContaining({
          value: ['a', 'c'],
        }),
      }));
  });
});
