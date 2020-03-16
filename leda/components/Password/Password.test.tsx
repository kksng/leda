import React from 'react';
import {
  fireEvent, render, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Password } from './index';

describe('Password SNAPSHOTS', () => {
  it('should render basic usage', () => {
    const wrapper = render((
      <Password onChange={jest.fn()} />
    ));

    expect(wrapper).toMatchSnapshot();
  });

  it('should render value in controllable mode', () => {
    const wrapper = render((
      <Password onChange={jest.fn()} value="test value" />
    ));

    expect(screen.getByRole('textbox')).toHaveValue('test value');

    expect(wrapper).toMatchSnapshot();

    wrapper.rerender((
      <Password onChange={jest.fn()} value="new test value" />
    ));

    expect(screen.getByRole('textbox')).toHaveValue('new test value');

    expect(wrapper).toMatchSnapshot();
  });

  describe('should render different component states', () => {
    it('should render disabled', () => {
      const wrapper = render((
        <Password onChange={jest.fn()} isDisabled />
      ));

      expect(screen.getByRole('textbox')).toBeDisabled();

      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe('Password HANDLERS', () => {
  it('should test onBlur', () => {
    const handleBlur = jest.fn();

    render((
      <Password onBlur={handleBlur} />
    ));

    screen.getByRole('textbox').focus();
    screen.getByRole('textbox').blur();

    expect(handleBlur).toBeCalled();
  });

  it('should test onChange', () => {
    const handleChange = jest.fn();
    const name = 'name';
    const value = 'value';
    const eventMatcher = expect.objectContaining({
      component: expect.objectContaining({
        value, name,
      }),
      target: expect.objectContaining({
        value,
      }),
    });

    render((
      <Password onChange={handleChange} name={name} />
    ));

    userEvent.type(screen.getByRole('textbox'), value);

    expect(handleChange).lastCalledWith(eventMatcher);
  });

  it('should test onEnterPress', () => {
    const handleEnterPress = jest.fn();

    render((
      <Password name="auto" value="text" onEnterPress={handleEnterPress} />
    ));

    fireEvent.keyDown(screen.getByRole('textbox'), {
      key: 'Enter',
    });

    expect(handleEnterPress).toBeCalledTimes(1);
  });
});

describe('Password ATTRIBUTES', () => {
  it('should have className, change classes through props and className should not change prop-classes', () => {
    const wrapper = render((
      <Password onBlur={jest.fn()} _box />
    ));

    expect(document.querySelector('div.password-wrapper')).toHaveClass('box');

    wrapper.rerender((
      <Password onBlur={jest.fn()} _active />
    ));

    expect(document.querySelector('div.password-wrapper')).not.toHaveClass('box');

    expect(document.querySelector('div.password-wrapper')).toHaveClass('active');

    wrapper.rerender((
      <Password onBlur={jest.fn()} _active className="testClass" />
    ));

    expect(document.querySelector('div.password-wrapper')).not.toHaveClass('box');

    expect(document.querySelector('div.password-wrapper')).toHaveClass('active');
    expect(document.querySelector('div.password-wrapper')).toHaveClass('testClass');
  });

  it('should have maxLength limit', () => {
    const handleChange = jest.fn();

    render((
      <Password onChange={handleChange} maxLength={5} onBlur={jest.fn()} />
    ));

    userEvent.type(screen.getByRole('textbox'), 'value', {
      allAtOnce: true,
    });

    expect(handleChange).toBeCalledTimes(1);

    userEvent.type(screen.getByRole('textbox'), 'new value', {
      allAtOnce: true,
    });

    expect(handleChange).toBeCalledTimes(1);
  });
});

describe('Password VALIDATION', () => {
  it('should be invalid if component is isRequired, value is empty and onBlur was called', () => {
    render((
      <Password isRequired form="form" name="name" />
    ));

    screen.getByRole('textbox').focus();
    screen.getByRole('textbox').blur();

    expect(document.querySelector('div.password-element-wrapper')).toHaveClass('danger');
  });

  it('should be invalid if value passes validation and vice versa', () => {
    const validator = (value: string): boolean => value.length > 2;

    render((
      <Password isRequired name="name" form="form" invalidMessage="value length must be more than 2" validator={validator} />
    ));

    screen.getByRole('textbox').focus();

    userEvent.type(screen.getByRole('textbox'), 'a');

    screen.getByRole('textbox').blur();

    expect(document.querySelector('div.password-element-wrapper')).toHaveClass('danger');
  });
});
