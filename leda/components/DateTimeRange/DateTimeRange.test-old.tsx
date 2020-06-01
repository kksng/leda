// @ts-nocheck
import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { DateTimeRange } from './index';
import { fixJSON } from '../../utils';

describe.skip('DateTimeRange SNAPSHOTS', () => {
  it('should render', () => {
    const wrapper = mount(<DateTimeRange onRangeChange={jest.fn()} />);
    const wrapperJSON = toJson(wrapper);

    expect(fixJSON(wrapperJSON)).toMatchSnapshot();
  });

  it('should render controllable mode', () => {
    const wrapper = mount(<DateTimeRange name="range" fromValue={new Date('1995-10-31T04:20z')} toValue={new Date('1998-03-16T16:20z')} onRangeChange={jest.fn()} />);

    const fromTime = (Wrapper) => Wrapper.props().fromValue.getTime();

    const toTime = (Wrapper) => Wrapper.props().toValue.getTime();

    const getWrapperJSON = (Wrapper) => toJson(Wrapper);

    expect(wrapper.state().fromValue.getTime()).toEqual(fromTime(wrapper));

    expect(wrapper.state().toValue.getTime()).toEqual(toTime(wrapper));

    expect(wrapper.find('DateTimePicker').at(1).props().value.getTime()).toEqual(fromTime(wrapper));

    expect(wrapper.find('DateTimePicker').last().props().value.getTime()).toEqual(toTime(wrapper));

    expect(fixJSON(getWrapperJSON(wrapper))).toMatchSnapshot();

    wrapper.setProps({ fromValue: new Date('2000-02-05T22:10z'), toValue: new Date('2007-07-20T10:05z') });

    expect(wrapper.state().fromValue.getTime()).toEqual(fromTime(wrapper));

    expect(wrapper.state().toValue.getTime()).toEqual(toTime(wrapper));

    wrapper.update();

    expect(wrapper.find('DateTimePicker').at(1).props().value.getTime()).toEqual(fromTime(wrapper));

    expect(wrapper.find('DateTimePicker').last().props().value.getTime()).toEqual(toTime(wrapper));

    expect(fixJSON(getWrapperJSON(wrapper))).toMatchSnapshot();
  });
});

describe.skip('DateTimeRange HANDLERS', () => {
  it('should call onFromChange if first DateTimePicker has changed, set toMin and fromValue', () => {
    const wrapper = mount(<DateTimeRange onRangeChange={jest.fn()} />);

    wrapper.find('DateTimePicker').first().props().onChange({ target: { value: new Date('1998-03-16T17:18z') } });

    expect(wrapper.state().toMin).toEqual(new Date('1998-03-16T17:18z'));
    expect(wrapper.state().fromValue).toEqual(new Date('1998-03-16T17:18z'));
  });

  it('should call onToChange if second DateTimePicker has changed, set fromMax and toValue', () => {
    const wrapper = mount(<DateTimeRange onRangeChange={jest.fn()} />);

    wrapper.find('DateTimePicker').at(2).props().onChange({ target: { value: new Date('2005-11-03T03:08z') } });

    expect(wrapper.state().fromMax).toEqual(new Date('2005-11-03T03:08z'));
    expect(wrapper.state().toValue).toEqual(new Date('2005-11-03T03:08z'));
  });

  it('should call onRangeChange if any DateTimePicker has changed', () => {
    const onRangeChangeHandler = jest.fn();
    const wrapper = mount(<DateTimeRange onRangeChange={onRangeChangeHandler} />);

    wrapper.find('DateTimePicker').first().props().onChange({ target: { value: new Date('1998-03-16T04:20z') } });

    expect(onRangeChangeHandler).toHaveBeenCalled();

    wrapper.find('DateTimePicker').at(2).props().onChange({ target: { value: new Date('2005-11-03T06:22z') } });

    expect(onRangeChangeHandler).toHaveBeenCalledTimes(2);

    expect(wrapper.state().fromValue).toEqual(new Date('1998-03-16T04:20z'));

    expect(wrapper.state().toValue).toEqual(new Date('2005-11-03T06:22z'));
  });

  it('should have correct event format', () => {
    const onRangeChangeHandler = jest.fn();
    const wrapper = mount(<DateTimeRange name="Ranger" onRangeChange={onRangeChangeHandler} />);

    wrapper.find('DateTimePicker').first().props().onChange({ target: { value: new Date('1998-03-16T04:20z') } });

    expect(onRangeChangeHandler).toHaveBeenCalled();

    wrapper.find('DateTimePicker').at(2).props().onChange({ target: { value: new Date('2005-11-03T06:22z') } });

    expect(onRangeChangeHandler).toHaveBeenCalledTimes(2);

    const [, [event]] = onRangeChangeHandler.mock.calls;

    expect(event.from).toBeDefined();

    expect(event.from).toEqual(new Date('1998-03-16T04:20z'));

    expect(event.to).toBeDefined();

    expect(event.to).toEqual(new Date('2005-11-03T06:22z'));

    expect(event.target.name).toEqual('Ranger');
  });
});

describe.skip('DateTimeRange ATTRIBUTES', () => {
  it('should convert rangeMin to fromMin and toMin', () => {
    const wrapper = mount(<DateTimeRange rangeMin={new Date('1995-10-31T04:20z')} onRangeChange={jest.fn()} />);

    expect(wrapper.find('DateTimePicker').first().props().min).toEqual(new Date('1995-10-31T04:20z'));

    expect(wrapper.find('DateTimePicker').at(2).props().min).toEqual(new Date('1995-10-31T04:20z'));
  });

  it('should convert rangeMax to fromMax and toMax', () => {
    const wrapper = mount(<DateTimeRange rangeMax={new Date('2000-10-31T18:48z')} onRangeChange={jest.fn()} />);

    expect(wrapper.find('DateTimePicker').first().props().max).toEqual(new Date('2000-10-31T18:48z'));

    expect(wrapper.find('DateTimePicker').at(2).props().max).toEqual(new Date('2000-10-31T18:48z'));
  });
});
