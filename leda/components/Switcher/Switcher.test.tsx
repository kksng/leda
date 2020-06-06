import React from 'react';
import {
  render,
  fireEvent,
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { Switcher } from './index';


describe('Check Switcher spanpshot collection', () => {
  test('is Switcher render right?', () => {
    const { container, getByText } = render(<Switcher>Switch</Switcher>);
    const wrapper = container.querySelectorAll('.switcher-wrapper')[0];
    const handler = container.querySelectorAll('.switcher-handle')[0];
    const label = container.querySelectorAll('.switcher-label')[0];

    expect(wrapper)
      .toBeInTheDocument();

    expect(handler)
      .toBeInTheDocument();

    expect(label)
      .toBeInTheDocument();

    expect(getByText('Switch'))
      .toBeInTheDocument();

    expect(container.firstChild)
      .toMatchSnapshot();
  });
  test('is Switcher render right if value set True and False?', () => {
    const enabled = true;
    const disabled = false;
    const { container, rerender } = render(<Switcher value={enabled}>Switch</Switcher>);
    const wrapper = container.querySelectorAll('.switcher-wrapper')[0];

    expect(wrapper)
      .toBeInTheDocument();

    expect(wrapper)
      .toHaveClass('active');

    expect(container.firstChild)
      .toMatchSnapshot();

    rerender(<Switcher value={disabled}>Switch</Switcher>);

    expect(wrapper)
      .not
      .toHaveClass('active');

    expect(container.firstChild)
      .toMatchSnapshot();
  });
});
describe('Check Switcher attributes test collection', () => {
  test('is Switcher with isDisabled work right?', () => {
    const { container } = render(<Switcher isDisabled>Switch</Switcher>);
    const wrapper = container.querySelectorAll('.switcher-wrapper')[0];

    expect(wrapper)
      .toHaveClass('disabled');
  });
  test('is Switcher with children elements render right?', () => {
    const { container, debug } = render(<Switcher><div className="lvl1"><span className="lvl2">Switch</span></div></Switcher>);
    const childrenA = container.querySelectorAll('div.lvl1');
    const childrenB = container.querySelectorAll('span.lvl2');

    expect(childrenA)
      .toHaveLength(1);

    expect(childrenB)
      .toHaveLength(1);
  });
});
describe('Check Switcher event handler collection', () => {
  test('is Switcher onChange event handler work right?', () => {
    const validName = 'switcher';
    const onChange = jest.fn();
    const disabled = false;
    const enabled = true;
    const { container } = render(<Switcher name={validName} value={disabled} onChange={onChange}>Switcher</Switcher>);
    const wrapper = container.querySelectorAll('.switcher-wrapper')[0];    
    const label = container.querySelectorAll('.switcher-label')[0];

    expect(label)
      .not
      .toHaveClass('active');

    fireEvent.click(wrapper);

    expect(onChange)
      .lastCalledWith(expect.objectContaining({
        component: expect.objectContaining({
          name: validName,
          value: enabled,
        }),
      }));
  });
});
