// @ts-nocheck
import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { advanceTo } from 'jest-date-mock';
import { DatePicker } from './index';
import { fixJSON } from '../../utils';

beforeAll(() => {
  // установим текущую дату на 27.05.2018, чтобы дата в снапшотах не обновлялась
  advanceTo(new Date(2018, 5, 27, 0, 0, 0));
});

describe.skip('DatePicker SNAPSHOTS', () => {
  it('should render', () => {
    const wrapper = mount(<DatePicker />);

    const wrapperJSON = toJson(wrapper);

    expect(fixJSON(wrapperJSON)).toMatchSnapshot();
  });

  it('should render controllable mode', () => {
    const wrapper = mount(<DatePicker value={new Date('1998-03-16')} />);

    expect(wrapper.props().value).toEqual(new Date('1998-03-16'));

    expect(wrapper.state().value).toEqual(new Date('1998-03-16'));

    let wrapperJSON = toJson(wrapper);

    expect(fixJSON(wrapperJSON)).toMatchSnapshot();

    wrapper.setProps({ value: new Date('1985-10-31') });

    expect(wrapper.props().value).toEqual(new Date('1985-10-31'));

    expect(wrapper.state().value).toEqual(new Date('1985-10-31'));

    wrapperJSON = toJson(wrapper);

    expect(fixJSON(wrapperJSON)).toMatchSnapshot();
  });

  it('should render opened state', () => {
    const wrapper = mount(<DatePicker value={new Date('2018-11-02')} show />);

    const wrapperJSON = toJson(wrapper);

    expect(fixJSON(wrapperJSON)).toMatchSnapshot();
  });

  it('should render disabled state', () => {
    const wrapper = mount(<DatePicker disabled />);

    const wrapperJSON = toJson(wrapper);

    expect(fixJSON(wrapperJSON)).toMatchSnapshot();
  });
});

describe.skip('DatePicker HANDLERS', () => {
  it('should call onBlur from inside', () => {
    const onBlurHandler = jest.fn();
    const wrapper = mount(<DatePicker name="pipicker" onBlur={onBlurHandler} />);

    wrapper.find('.k-header').props().onBlur({ target: { value: new Date('2018-12-14z') } });

    expect(onBlurHandler).toHaveBeenCalled();

    expect(onBlurHandler).toHaveBeenCalledWith({ target: { value: new Date('2018-12-14z'), name: 'pipicker' } });
  });

  it('should call onChange from inside, should change event', () => {
    const onChangeHandler = jest.fn();
    const wrapper = mount(<DatePicker name="pipicker" onChange={onChangeHandler} />);
    wrapper.find('DateInput').props().onChange({ value: new Date('1998-03-16') });

    wrapper.update();

    const [[event]] = onChangeHandler.mock.calls;

    expect(event.target.value).toEqual(new Date('1998-03-16'));

    expect(event.target.name).toEqual(wrapper.props().name);
  });

  it('should call onFocus from inside', () => {
    const onFocusHandler = jest.fn();
    const wrapper = mount(<DatePicker name="pipicker" onFocus={onFocusHandler} />);
    // передадим пустой объект, представляющий собой "эвент"
    wrapper.find('.k-header').props().onFocus({ target: { value: 'text' } });

    expect(onFocusHandler).toHaveBeenCalled();

    expect(onFocusHandler).toHaveBeenCalledWith({ target: { value: 'text' } });
  });
});

describe.skip('DatePicker ATTRIBUTES', () => {
  describe('className prop', () => {
    const wrapper = mount(<DatePicker _box>default</DatePicker>);

    it('should have className', () => {
      expect(wrapper.find('DatePicker').at(1).hasClass('box')).toBeTruthy();
    });

    it('should change classes through props', () => {
      wrapper.setProps({ active: true, box: false });

      expect(wrapper.find('DatePicker').at(1).hasClass('box')).toBeFalsy();

      expect(wrapper.find('DatePicker').at(1).hasClass('active')).toBeTruthy();
    });

    it('className should not change prop-classes', () => {
      wrapper.setProps({ className: 'testClass' });

      expect(wrapper.find('DatePicker').at(1).hasClass('box')).toBeFalsy();

      expect(wrapper.find('DatePicker').at(1).hasClass('active')).toBeTruthy();

      expect(wrapper.find('DatePicker').at(1).hasClass('testClass')).toBeTruthy();
    });
  });

  describe('format prop', () => {
    it('should accept different formats', () => {
      const wrapper = mount(<DatePicker format="d" value={new Date('2018-11-02')} />);

      let wrapperJSON = toJson(wrapper);

      expect(wrapper.find('input').props().value).toEqual('02.11.2018');

      expect(fixJSON(wrapperJSON)).toMatchSnapshot();

      wrapper.setProps({ format: 'D' });

      expect(wrapper.find('input').props().value).toEqual('пятница, 2 ноября 2018 г.');

      wrapperJSON = toJson(wrapper);

      expect(fixJSON(wrapperJSON)).toMatchSnapshot();

      wrapper.setProps({ format: 'm' });

      expect(wrapper.find('input').props().value).toEqual('2 нояб.');

      wrapperJSON = toJson(wrapper);

      expect(fixJSON(wrapperJSON)).toMatchSnapshot();

      wrapper.setProps({ format: 'M' });

      expect(wrapper.find('input').props().value).toEqual('2 ноября');

      wrapperJSON = toJson(wrapper);

      expect(fixJSON(wrapperJSON)).toMatchSnapshot();

      wrapper.setProps({ format: 'y' });

      expect(wrapper.find('input').props().value).toEqual('нояб. 2018 г.');

      wrapperJSON = toJson(wrapper);

      expect(fixJSON(wrapperJSON)).toMatchSnapshot();

      wrapper.setProps({ format: 'Y' });

      expect(wrapper.find('input').props().value).toEqual('ноябрь 2018 г.');

      wrapperJSON = toJson(wrapper);

      expect(fixJSON(wrapperJSON)).toMatchSnapshot();

      wrapper.setProps({ format: 'dd.MM.y, EEEE' });

      expect(wrapper.find('input').props().value).toEqual('02.11.2018, пятница');

      wrapperJSON = toJson(wrapper);

      expect(fixJSON(wrapperJSON)).toMatchSnapshot();
    });
  });

  it('should accept different formatPlacehoders', () => {
    const wrapper = mount(<DatePicker format="d" formatPlaceholder="wide" />);

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
    const wrapper = mount(<DatePicker min={new Date('1999-01-01z')} show onBlur={jest.fn()} />);

    const minTime = wrapper.props().min.getTime();

    // меньше минимума
    wrapper.find('DatePicker').last().props().onBlur({ target: { value: new Date('1998-03-16z') } });

    wrapper.update();
    // значение приняло минимум
    expect(wrapper.find('DatePicker').last().props().value.getTime()).toEqual(minTime);

    const wrapperJSON = toJson(wrapper);

    expect(fixJSON(wrapperJSON)).toMatchSnapshot();
  });

  it('should limit value by max', () => {
    const wrapper = mount(<DatePicker max={new Date('2020-12-31z')} show />);

    const maxTime = wrapper.props().max.getTime();

    // больше максимума
    wrapper.find('DatePicker').last().props().onBlur({ target: { value: new Date('2038-03-16z') } });

    wrapper.update();
    // значение приняло максимум
    expect(wrapper.find('DatePicker').last().props().value.getTime()).toEqual(maxTime);

    const wrapperJSON = toJson(wrapper);

    expect(fixJSON(wrapperJSON)).toMatchSnapshot();
  });
});

describe.skip('DatePicker VALIDATION', () => {
  it('should be invalid if isRequired and empty and have className = danger', async () => {
    const onBlurHandler = jest.fn();
    const wrapper = mount(<DatePicker form="test-form" name="pipicker" onBlur={onBlurHandler} isRequired />);

    expect(wrapper.state().isValid).toBeTruthy();

    wrapper.find('DatePicker').last().props().onBlur({ target: { } });
    // так как onBlur в валидации работает ассинхронно, нужно подождать
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(onBlurHandler).toHaveBeenCalled();

    const [[event]] = onBlurHandler.mock.calls;

    expect(event.target.value).toBeNull();

    expect(event.target.name).toEqual('pipicker');

    expect(wrapper.state().isValid).toBeFalsy();

    expect(wrapper.find('span').first().getDOMNode().classList).toContain('danger');
  });
});
