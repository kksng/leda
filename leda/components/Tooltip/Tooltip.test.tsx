import React from 'react';
import { render } from '@testing-library/react';
import { I } from '../I';
import { Tooltip } from './index';

describe('Tooltip SNAPSHOTS', () => {
  it('should render', () => {
    const wrapper = render((
      <Tooltip title="test">test</Tooltip>
    ));

    expect(wrapper).toMatchSnapshot();
  });

  it('should render isOpened state', () => {
    const wrapper = render((
      <Tooltip title="test" isOpen>test</Tooltip>
    ));

    expect(wrapper).toMatchSnapshot();
  });
});

describe('Tooltip ATTRIBUTES', () => {
  it('should accept jsx in title', () => {
    render((
      <Tooltip title={<span style={{ color: 'blue' }}>test</span>} />
    ));

    expect(document.querySelectorAll('span')).toHaveLength(1);
  });

  describe('position prop', () => {
    it('should be top by default', () => {
      render((
        <Tooltip title="test">Test</Tooltip>
      ));

      expect(document.querySelector('.tooltip.top')).toBeInTheDocument();
    });

    it('should be right', () => {
      render((
        <Tooltip title="test" position="right">test</Tooltip>
      ));

      expect(document.querySelector('.tooltip.right')).toBeInTheDocument();
    });

    it('should be bottom', () => {
      render((
        <Tooltip title="test" position="bottom">test</Tooltip>
      ));

      expect(document.querySelector('.tooltip.bottom')).toBeInTheDocument();
    });

    it('should be left', () => {
      render((
        <Tooltip title="test" position="left">test</Tooltip>
      ));

      expect(document.querySelector('.tooltip.left')).toBeInTheDocument();
    });
  });

  it('should have children prop', () => {
    render((
      <Tooltip title="test">
        <div className="level-0" style={{ float: 'right' }}>
          <span className="level-1">test</span>
        </div>
      </Tooltip>
    ));

    expect(document.querySelector('div.level-0')).toBeInTheDocument();

    expect(document.querySelector('div.level-0')).toHaveStyle('float: right');

    expect(document.querySelector('span.level-1')).toBeInTheDocument();

    expect(document.querySelector('span.level-1')).toHaveTextContent('test');
  });

  it('should wrap element', () => {
    render((
      <Tooltip title="test" position="top">
        <I _iSearch />
      </Tooltip>
    ));

    expect(document.querySelectorAll('i')).toHaveLength(1);
  });

  it('should wrap elements', () => {
    render((
      <Tooltip title="test" position="top">
        <I _iSearch />
        <I _iSearch />
      </Tooltip>
    ));

    expect(document.querySelectorAll('i')).toHaveLength(2);
  });
});
