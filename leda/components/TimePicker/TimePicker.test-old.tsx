// @ts-nocheck
import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { advanceTo } from 'jest-date-mock';
import { TimePicker } from './index';
import { fixJSON } from '../../utils';

beforeAll(() => {
  // установим текущую дату на 27.05.2018, чтобы дата в снапшотах не обновлялась
  advanceTo(new Date(2018, 5, 27, 12, 30, 0));
});

describe.skip('TimePicker SNAPSHOTS', () => {
  it('should render', () => {
    const wrapper = mount(<TimePicker />);

    const wrapperJSON = toJson(wrapper);

    expect(fixJSON(wrapperJSON)).toMatchSnapshot();
  });

  it('should render controllable mode', () => {
    const wrapper = mount(<TimePicker value={new Date('1998-03-16')} />);

    expect(wrapper.props().value).toEqual(new Date('1998-03-16'));

    let wrapperJSON = toJson(wrapper);

    expect(fixJSON(wrapperJSON)).toMatchSnapshot();

    wrapper.setProps({ value: new Date('1985-10-31') });

    expect(wrapper.props().value).toEqual(new Date('1985-10-31'));

    wrapperJSON = toJson(wrapper);

    expect(fixJSON(wrapperJSON)).toMatchSnapshot();
  });

  it('should render opened state', () => {
    const wrapper = mount(<TimePicker value={new Date('2018-11-02')} show />);

    const wrapperJSON = toJson(wrapper);

    expect(fixJSON(wrapperJSON)).toMatchSnapshot();
  });

  it('should render disabled state', () => {
    const wrapper = mount(<TimePicker disabled />);

    const wrapperJSON = toJson(wrapper);

    expect(fixJSON(wrapperJSON)).toMatchSnapshot();
  });
});

describe.skip('TimePicker HANDLERS', () => {
  it('should call onBlur from inside', () => {
    const onBlurHandler = jest.fn();
    const wrapper = mount(<TimePicker name="pipicker" onBlur={onBlurHandler} />);
    wrapper.find('.k-timepicker')
      .getDOMNode()
      .addEventListener(
        'blur',
        (ev) => wrapper
          .props()
          .onBlur({ target: { name: ev.target.name, value: new Date('1998-03-16') } }),
      );

    wrapper.find('input').getDOMNode().dispatchEvent(new Event('blur', { bubbles: true }));

    expect(onBlurHandler).toHaveBeenCalled();

    expect(onBlurHandler).toHaveBeenCalledWith({ target: { value: new Date('1998-03-16'), name: 'pipicker' } });
  });

  it('should call onChange from inside, should change event', () => {
    const onChangeHandler = jest.fn();
    const wrapper = mount(<TimePicker name="pipicker" onChange={onChangeHandler} />);

    wrapper.find('input')
      .getDOMNode()
      .addEventListener(
        'change',
        (ev) => wrapper
          .props()
          .onChange({ target: { name: ev.target.name, value: new Date('1998-03-16') } }),
      );

    wrapper.find('input').getDOMNode().dispatchEvent(new Event('change'));

    wrapper.update();

    const [[event]] = onChangeHandler.mock.calls;

    expect(event.target.value).toEqual(new Date('1998-03-16'));

    expect(event.target.name).toEqual(wrapper.props().name);
  });

  it('should call onFocus from inside', () => {
    const onFocusHandler = jest.fn();
    const wrapper = mount(<TimePicker name="pipicker" onFocus={onFocusHandler} />);
    // передадим пустой объект, представляющий собой "эвент"
    wrapper.find('.k-header').props().onFocus({ target: { value: 'text' } });

    expect(onFocusHandler).toHaveBeenCalled();

    expect(onFocusHandler).toHaveBeenCalledWith({ target: { value: 'text' } });
  });
});

describe.skip('TimePicker ATTRIBUTES', () => {
  describe('className prop', () => {
    const wrapper = mount(<TimePicker _box>default</TimePicker>);

    it('should have className', () => {
      expect(wrapper.find('TimePicker').at(1).hasClass('box')).toBeTruthy();
    });

    it('should change classes through props', () => {
      wrapper.setProps({ active: true, box: false });

      expect(wrapper.find('TimePicker').at(1).hasClass('box')).toBeFalsy();

      expect(wrapper.find('TimePicker').at(1).hasClass('active')).toBeTruthy();
    });

    it('className should not change prop-classes', () => {
      wrapper.setProps({ className: 'testClass' });

      expect(wrapper.find('TimePicker').at(1).hasClass('box')).toBeFalsy();

      expect(wrapper.find('TimePicker').at(1).hasClass('active')).toBeTruthy();

      expect(wrapper.find('TimePicker').at(0).hasClass('testClass')).toBeTruthy();
    });
  });

  describe('format prop', () => {
    it('should accept different formats', () => {
      const wrapper = mount(<TimePicker format="t" value={new Date('2018-11-02T04:20:00')} />);

      let wrapperJSON = toJson(wrapper);

      expect(wrapper.find('input').props().value).toEqual('4:20 AM');

      expect(fixJSON(wrapperJSON)).toMatchSnapshot();

      wrapper.setProps({ format: 'T' });

      expect(wrapper.find('input').props().value).toEqual('4:20:00 AM');

      wrapperJSON = toJson(wrapper);

      expect(fixJSON(wrapperJSON)).toMatchSnapshot();

      wrapper.setProps({ format: 'HH:mm a' });

      expect(wrapper.find('input').props().value).toEqual('04:20 AM');

      wrapperJSON = toJson(wrapper);

      expect(fixJSON(wrapperJSON)).toMatchSnapshot();
    });
  });

  it('should accept different formatPlacehoders', () => {
    const wrapper = mount(<TimePicker format="t" formatPlaceholder="wide" />);

    let wrapperJSON = toJson(wrapper);

    expect(fixJSON(wrapperJSON)).toMatchSnapshot();

    wrapper.setProps({ formatPlaceholder: 'narrow' });

    wrapperJSON = toJson(wrapper);

    expect(fixJSON(wrapperJSON)).toMatchSnapshot();

    wrapper.setProps({ formatPlaceholder: 'short' });

    wrapperJSON = toJson(wrapper);

    expect(fixJSON(wrapperJSON)).toMatchSnapshot();

    wrapper.setProps({ formatPlaceholder: 'formatPattern' });

    wrapperJSON = toJson(wrapper);

    expect(fixJSON(wrapperJSON)).toMatchSnapshot();
  });

  it('should limit value by min', () => {
    const wrapper = mount(<TimePicker min={new Date('1999-01-01')} show />);

    expect(wrapper.find('TimeSelector').props().min.getTime()).toEqual(915148800000);

    const wrapperJSON = toJson(wrapper);

    expect(fixJSON(wrapperJSON)).toMatchSnapshot();
  });

  it('should limit value by max', () => {
    const wrapper = mount(<TimePicker max={new Date('2020-12-31')} show />);

    expect(wrapper.find('TimeSelector').props().max.getTime()).toEqual(1609372800000);

    const wrapperJSON = toJson(wrapper);

    expect(fixJSON(wrapperJSON)).toMatchSnapshot();
  });

  it('should render defaultValue', () => {
    const wrapper = mount(<TimePicker defaultValue={new Date('2020-12-31')} show />);

    expect(wrapper.find('TimeSelector').props().value.getTime()).toEqual(1609372800000);
  });

  it('should accept custom steps', () => {
    const wrapper = mount(<TimePicker format="HH:mm:ss" steps={{ hour: 2, minute: 10, second: 30 }} show />);

    expect(wrapper.find('TimeList').first().props().step).toEqual(2);

    expect(wrapper.find('TimeList').at(1).props().step).toEqual(10);

    expect(wrapper.find('TimeList').last().props().step).toEqual(30);

    const wrapperJSON = toJson(wrapper);

    expect(fixJSON(wrapperJSON)).toMatchSnapshot();
  });

  it('should accept style', () => {
    const wrapper = mount(<TimePicker style={{ color: 'red' }} show />);

    expect(wrapper.find('TimePicker').last().props().style).toEqual({ color: 'red' });

    const wrapperJSON = toJson(wrapper);

    expect(fixJSON(wrapperJSON)).toMatchSnapshot();
  });
});
