// @ts-nocheck
import { mount } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { DateTimePicker } from './index';
import { fixJSON } from '../../utils';
import { Button } from '../Button';

describe.skip('DateTimePicker SNAPSHOTS', () => {
  it('should render', () => {
    const wrapper = mount(<DateTimePicker />);

    const wrapperJSON = toJson(wrapper);

    expect(fixJSON(wrapperJSON)).toMatchSnapshot();
  });

  it('should render controllable mode', () => {
    const wrapper = mount(<DateTimePicker value={new Date('1998-03-16T04:20z')} />);
    let wrapperJSON = toJson(wrapper);

    expect(wrapper.state().value).toEqual(new Date('1998-03-16T04:20z'));

    expect(wrapper.find('DateTimePicker').last().props().value).toEqual(new Date('1998-03-16T04:20z'));

    expect(fixJSON(wrapperJSON)).toMatchSnapshot();

    wrapper.setProps({ value: new Date('1985-10-31T04:20z') });

    expect(wrapper.state().value).toEqual(new Date('1985-10-31T04:20z'));

    expect(wrapper.find('DateTimePicker').last().props().value).toEqual(new Date('1985-10-31T04:20z'));

    wrapperJSON = toJson(wrapper);

    expect(fixJSON(wrapperJSON)).toMatchSnapshot();
  });
});

describe.skip('DateTimePicker HANDLERS', () => {
  it('should call onChange from inside, should change event', () => {
    const onChangeHandler = jest.fn();
    const wrapper = mount(<DateTimePicker name="pipicker" onChange={onChangeHandler} />);

    wrapper.find('DateTimePicker').last().props().change({ sender: { value: () => (new Date('1998-03-16T04:20z')) } });

    expect(onChangeHandler).toHaveBeenCalledWith({ target: { value: new Date('1998-03-16T04:20z'), name: 'pipicker' } });
  });

  it('should call onBlur from inside, should change event', () => {
    const onBlurHandler = jest.fn();
    const wrapper = mount(<DateTimePicker name="pipicker" value={new Date('1998-03-16T04:20z')} onBlur={onBlurHandler} />);

    wrapper.find('input').getDOMNode().dispatchEvent(new Event('blur'));

    const [[event]] = onBlurHandler.mock.calls;

    expect(event.target.value).toEqual('16.03.1998 7:20');

    expect(event.target.name).toEqual('pipicker');
  });

  it('should call onOpen from inside, should change event', () => {
    const onOpenHandler = jest.fn();
    const wrapper = mount(<DateTimePicker name="pipicker" onOpen={onOpenHandler} />);

    wrapper.find('DateTimePicker').last().props().open({ sender: { value: () => (new Date('1998-03-16T04:20z')) } });

    expect(onOpenHandler).toHaveBeenCalled();
  });

  it('should call onClose from inside, should change event', () => {
    const onCloseHandler = jest.fn();
    const wrapper = mount(<DateTimePicker name="pipicker" onClose={onCloseHandler} />);

    wrapper.find('DateTimePicker').last().props().close({ sender: { value: () => (new Date('1998-03-16T04:20z')) } });

    expect(onCloseHandler).toHaveBeenCalled();
  });
});

describe.skip('DateTimePicker ATTRIBUTES', () => {
  describe('className prop', () => {
    const wrapper = mount(<DateTimePicker _box>default</DateTimePicker>);

    it('should have className', () => {
      expect(wrapper.find('DateTimePicker').last().hasClass('box')).toBeTruthy();
    });

    it('should change classes through props', () => {
      wrapper.setProps({ active: true, box: false });

      expect(wrapper.find('DateTimePicker').last().hasClass('box')).toBeFalsy();

      expect(wrapper.find('DateTimePicker').last().hasClass('active')).toBeTruthy();
    });

    it('className should not change prop-classes', () => {
      wrapper.setProps({ className: 'testClass' });

      expect(wrapper.find('DateTimePicker').last().hasClass('box')).toBeFalsy();

      expect(wrapper.find('DateTimePicker').last().hasClass('active')).toBeTruthy();

      expect(wrapper.find('DateTimePicker').first().hasClass('testClass')).toBeTruthy();
    });
  });

  describe('format prop', () => {
    it('should accept different formats', () => {
      const wrapper = mount(<DateTimePicker format="dd.MM.yyyy h:mm" timeFormat="h:mm" value={new Date('2018-11-02T04:20z')} />);

      let wrapperJSON = toJson(wrapper);

      expect(wrapper.find('input').getDOMNode().value).toEqual('02.11.2018 7:20');

      expect(fixJSON(wrapperJSON)).toMatchSnapshot();

      wrapper.setProps({ format: 'dd h:mm:ss', timeFormat: 'hh:mm:ss' });

      expect(wrapper.find('input').getDOMNode().value).toEqual('02 7:20:00');

      wrapperJSON = toJson(wrapper);

      expect(fixJSON(wrapperJSON)).toMatchSnapshot();

      wrapper.setProps({ format: 'dd.MM hh:mm' });

      expect(wrapper.find('input').getDOMNode().value).toEqual('02.11 07:20');

      wrapperJSON = toJson(wrapper);

      expect(fixJSON(wrapperJSON)).toMatchSnapshot();

      wrapper.setProps({ format: 'MM h:mm' });

      expect(wrapper.find('input').getDOMNode().value).toEqual('11 7:20');

      wrapperJSON = toJson(wrapper);

      expect(fixJSON(wrapperJSON)).toMatchSnapshot();

      wrapper.setProps({ format: 'yyyy, hh:mm' });

      expect(wrapper.find('input').getDOMNode().value).toEqual('2018, 07:20');

      wrapperJSON = toJson(wrapper);

      expect(fixJSON(wrapperJSON)).toMatchSnapshot();

      wrapper.setProps({ format: 'yyyy h:mm' });

      expect(wrapper.find('input').getDOMNode().value).toEqual('2018 7:20');

      wrapperJSON = toJson(wrapper);

      expect(fixJSON(wrapperJSON)).toMatchSnapshot();

      wrapper.setProps({ format: 'dd.MM.yy, hh:mm' });

      expect(wrapper.find('input').getDOMNode().value).toEqual('02.11.18, 07:20');

      wrapperJSON = toJson(wrapper);

      expect(fixJSON(wrapperJSON)).toMatchSnapshot();
    });
  });

  /** todo: невозможно протестировать, реакт видит только пустой input, протестировать другим тестинговым фреймворком
  it('should disable dates in calendar', () => {
  });

  it('should display time with intervals in timer', () => {
  });

  it('should have min value in calendar', () => {
  });

  it('should have max value in calendar', () => {
  });

  it('should accept start prop in calendar', () => {
  });

  it('should display weekNumber in calendar', () => {

  });
*/
});


describe.skip('DateTimePicker VALIDATION', () => {
  it('should be invalid if isRequired and empty', async () => {
    const onBlurHandler = jest.fn();
    const wrapper = mount(<DateTimePicker form="test" name="tiny" onBlur={onBlurHandler} isRequired />);

    expect(wrapper.state().isValid).toBeTruthy();

    wrapper.find('input').getDOMNode().dispatchEvent(new Event('blur'));

    // так как onBlur в валидации работает ассинхронно, нужно подождать
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(onBlurHandler).toHaveBeenCalled();

    const [[event]] = onBlurHandler.mock.calls;

    expect(event.target.value).toEqual('');

    expect(event.target.name).toEqual('tiny');

    expect(event.target.isValid).toBeFalsy();

    expect(wrapper.state().isValid).toBeFalsy();

    const [dateTimePicker] = wrapper.instance().dateTimeRef.current.widgetInstance.wrapper;

    expect(dateTimePicker.classList).toContain('danger');
  });

  it('should be invalid if isRequired and empty when submit', () => {
    const form = (
      <div>
        <DateTimePicker form="test" name="picker" onBlur={jest.fn()} isRequired />
        <Button form="test">Submit</Button>
      </div>
    );
    const wrapper = mount(form);

    wrapper.find('a').props().onClick({ preventDefault: () => {} });

    const [dateTimePicker] = wrapper.instance().children;

    expect(dateTimePicker.classList).toContain('danger');
  });
});
