import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import {
  render,
} from '@testing-library/react';
import * as L from '../../index';

const data = [
  { id: 'todo', labelText: 'To do' },
  { id: 'wip', labelText: 'In progress' },
  { id: 'done', labelText: 'Done' },
];

const customData = [
  { txt: '1', status: 'success' },
  { txt: '2', status: 'danger' },
  { txt: '3', status: 'progress' },
  { txt: '4' },
];

describe('StatusBar SNAPSHOTS', () => {
  it('should render', () => {
    const statusBar = (
      <L.StatusBar
        data={data}
        textField="labelText"
        value={data[0]}
      />
    );
    const wrapper = mount(statusBar);

    expect(wrapper.find('Span')).toHaveLength(6);

    expect(wrapper.find('.first .statusbar-icon').first().hasClass('progress')).toBeTruthy();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('L.StatusBar HANDLERS', () => {
  it('should trigger onClick', () => {
    const onClick = jest.fn();
    const statusBar = (
      <L.StatusBar
        onClick={onClick}
        data={data}
        textField="labelText"
        value={data[0]}
      />
    );
    const wrapper = mount(statusBar);

    wrapper.find('span.statusbar-icon').first().props().onClick?.({ target: {} } as React.MouseEvent);

    expect(onClick).toHaveBeenCalled();
  });
});

describe('L.StatusBar ATTRIBUTES', () => {
  it('should add progress class to current item', () => {
    const statusBar = (
      <L.StatusBar
        data={data}
        textField="labelText"
        value={data[0]}
      />
    );
    const wrapper = mount(statusBar);

    expect(wrapper.find('.first .statusbar-icon').first().hasClass('progress')).toBeTruthy();
  });

  it('should give first an last item suitable className', () => {
    const statusBar = (
      <L.StatusBar
        data={data}
        textField="labelText"
        value={data[0]}
      />
    );
    const wrapper = mount(statusBar);

    expect(wrapper.find('.statusbar-status-item').first().hasClass('first')).toBeTruthy();

    expect(wrapper.find('.statusbar-status-item').last().hasClass('last')).toBeTruthy();
  });

  it('should add success className to all items before current', () => {
    const statusBar = (
      <L.StatusBar
        data={data}
        textField="labelText"
        value={data[1]}
      />
    );
    const wrapper = mount(statusBar);

    expect(wrapper.find('span.success')).toHaveLength(1);

    expect(wrapper.find('div.statusbar-status-item span.statusbar-icon').first().hasClass('success')).toBeTruthy();

    expect(wrapper.find('div.statusbar-status-item span.statusbar-icon').at(1).hasClass('progress')).toBeTruthy();
  });

  it('should take typeField form data', () => {
    const { container, debug } = render(
      <L.StatusBar
        data={customData as L.StatusBarTypes.StatusItem[]}
        textField="txt"
        typeField="status"
      />,
    );
    debug();

    expect(container.querySelectorAll('.first .success')).toHaveLength(1);
    expect(container.querySelectorAll('.danger')).toHaveLength(1);
    expect(container.querySelectorAll('.progress')).toHaveLength(1);
    expect(container.querySelector('.last .statusbar-icon')).not.toHaveClass('progress');
    expect(container.querySelector('.last .statusbar-icon')).not.toHaveClass('danger');
    expect(container.querySelector('.last .statusbar-icon')).not.toHaveClass('success');
  });
});
