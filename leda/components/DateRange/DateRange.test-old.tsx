// @ts-nocheck
import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import {
  render,
} from '@testing-library/react';
import { DateRange } from './index';
import { fixJSON } from '../../utils';

describe.skip('DateRange SNAPSHOTS', () => {
  it('should render', () => {
    const wrapper = mount(<DateRange name="range" onRangeChange={jest.fn()} />);
    const wrapperJSON = toJson(wrapper);
    expect(fixJSON(wrapperJSON)).toMatchSnapshot();
  });

  it('should render controllable mode', () => {
    const wrapper = mount(<DateRange
      fromValue={new Date('1995-10-31T20:00:00.000Z')}
      toValue={new Date('1998-03-16T20:00:00.000Z')}
      onRangeChange={jest.fn()}
    />);

    const getFromTime = (Wrapper) => Wrapper.props().fromValue.getTime();

    const getToTime = (Wrapper) => Wrapper.props().toValue.getTime();

    const getWrapperJSON = (Wrapper) => toJson(Wrapper);

    expect(wrapper.props().fromValue.getTime()).toEqual(getFromTime(wrapper));

    expect(wrapper.props().toValue.getTime()).toEqual(getToTime(wrapper));

    expect(wrapper.find('input').first().props().value).toEqual('31.10.1995');

    expect(wrapper.find('input').last().props().value).toEqual('16.03.1998');

    expect(fixJSON(getWrapperJSON(wrapper))).toMatchSnapshot();

    wrapper.setProps({ fromValue: new Date('2000-02-05'), toValue: new Date('2007-07-19') });

    wrapper.update();

    expect(wrapper.props().fromValue.getTime()).toEqual(getFromTime(wrapper));

    expect(wrapper.props().toValue.getTime()).toEqual(getToTime(wrapper));

    expect(wrapper.find('input').first().props().value).toEqual('05.02.2000');

    expect(wrapper.find('input').last().props().value).toEqual('19.07.2007');
  });
});

describe.skip('DateRange HANDLERS', () => {
  it('should call onFromChange if first DatePicker has changed, set toMin and fromValue', () => {
    const wrapper = mount(<DateRange onRangeChange={jest.fn()} />);

    wrapper.find('DatePicker').first().props().onChange({ value: new Date('1995-10-31T20:00:00.000Z') });

    expect(wrapper.state().toMin).toEqual(new Date('1995-10-31T20:00:00.000Z'));
    expect(wrapper.state().fromValue).toEqual(new Date('1995-10-31T20:00:00.000Z'));
  });

  it('should call onToChange if second DatePicker has changed, set fromMax and toValue', () => {
    const wrapper = mount(<DateRange onRangeChange={jest.fn()} />);

    wrapper.find('DatePicker').at(2).props().onChange({ value: new Date('1995-10-31T20:00:00.000Z') });

    expect(wrapper.state().fromMax).toEqual(new Date('1995-10-31T20:00:00.000Z'));
    expect(wrapper.state().toValue).toEqual(new Date('1995-10-31T20:00:00.000Z'));
  });

  it('should call onRangeChange if any DatePicker has changed', () => {
    const onRangeChangeHandler = jest.fn();
    const wrapper = mount(<DateRange onRangeChange={onRangeChangeHandler} />);

    wrapper.find('DatePicker').first().props().onChange({ value: new Date('1995-10-31T20:00:00.000Z') });

    expect(onRangeChangeHandler).toHaveBeenCalled();

    wrapper.find('DatePicker').at(2).props().onChange({ value: new Date('1998-03-16T20:00:00.000Z') });

    expect(onRangeChangeHandler).toHaveBeenCalledTimes(2);

    expect(wrapper.state().fromValue).toEqual(new Date('1995-10-31T20:00:00.000Z'));

    expect(wrapper.state().toValue).toEqual(new Date('1998-03-16T20:00:00.000Z'));
  });

  it('should have correct event format', () => {
    const onRangeChangeHandler = jest.fn();
    const wrapper = mount(<DateRange name="Ranger" onRangeChange={onRangeChangeHandler} />);

    wrapper.find('DatePicker').first().props().onChange({ value: new Date('1998-03-16T20:00:00.000Z') });

    expect(onRangeChangeHandler).toHaveBeenCalled();

    wrapper.find('DatePicker').at(2).props().onChange({ value: new Date('2005-11-03T20:00:00.000Z') });

    expect(onRangeChangeHandler).toHaveBeenCalledTimes(2);

    const [, [event]] = onRangeChangeHandler.mock.calls;

    expect(event.from).toBeDefined();

    expect(event.from).toEqual(new Date('1998-03-16T20:00:00.000Z'));

    expect(event.to).toBeDefined();

    expect(event.to).toEqual(new Date('2005-11-03T20:00:00.000Z'));

    expect(event.target.name).toEqual('Ranger');
  });
});

describe('DateRange ATTRIBUTES', () => {
  it.skip('should convert rangeMin to fromMin and toMin', () => {
    const wrapper = mount(<DateRange rangeMin={new Date('1998-03-16T20:00:00.000Z')} onRangeChange={jest.fn()} />);

    expect(wrapper.find('DatePicker').first().props().min).toEqual(new Date('1998-03-16T20:00:00.000Z'));

    expect(wrapper.find('DatePicker').at(2).props().min).toEqual(new Date('1998-03-16T20:00:00.000Z'));
  });

  it.skip('should convert rangeMax to fromMax and toMax', () => {
    const wrapper = mount(<DateRange rangeMax={new Date('1998-03-16T20:00:00.000Z')} onRangeChange={jest.fn()} />);

    expect(wrapper.find('DatePicker').first().props().max).toEqual(new Date('1998-03-16T20:00:00.000Z'));

    expect(wrapper.find('DatePicker').at(2).props().max).toEqual(new Date('1998-03-16T20:00:00.000Z'));
  });

  it('should show requiredMessage when isRequired and invalid', async () => {
    const { container, findAllByText } = render(
      <DateRange
        form="form"
        name="name"
        isRequired
        requiredMessage="REQUIRED"
      />,
    );

    const [inputFrom, inputTo] = document.querySelectorAll('input');

    expect(inputFrom).toBeDefined();
    expect(inputTo).toBeDefined();

    await inputFrom.focus();
    await inputTo.focus();
    await inputTo.blur();

    const query = await findAllByText('REQUIRED');

    expect(query).toHaveLength(2);

    expect(container).toMatchSnapshot();
  });

  it('should show different requiredMessage when isRequired and invalid', async () => {
    const { container, findByText } = render(
      <DateRange
        form="form"
        name="name"
        isRequired
        requiredMessage={['one', 'two']}
      />,
    );

    const [inputFrom, inputTo] = document.querySelectorAll('input');

    expect(inputFrom).toBeDefined();
    expect(inputTo).toBeDefined();

    await inputFrom.focus();
    await inputTo.focus();
    await inputTo.blur();

    await findByText('one');
    await findByText('two');

    expect(container).toMatchSnapshot();
  });
});
