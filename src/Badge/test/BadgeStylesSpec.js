import React from 'react';
import ReactDOM from 'react-dom';
import Badge from '../index';
import { createTestContainer, getStyle, itChrome, toRGB } from '@test/testUtils';

import '../styles/index.less';

describe('Badge styles', () => {
  it('Independent should render correct style ', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Badge ref={instanceRef} />, createTestContainer());
    const dom = instanceRef.current;
    assert.equal(getStyle(dom, 'width'), '8px');
    assert.equal(getStyle(dom, 'width'), getStyle(dom, 'height'));
  });

  // @description Can't get border-radius value in other browser except chrome
  itChrome('Independent should render correct border-radius ', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Badge ref={instanceRef} />, createTestContainer());
    const dom = instanceRef.current;
    assert.equal(getStyle(dom, 'borderRadius'), '4px');
  });

  it('Should render correct color', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Badge ref={instanceRef} />, createTestContainer());
    const dom = instanceRef.current;
    assert.equal(getStyle(dom, 'color'), toRGB('#fff'));
  });

  it('Should render correct background color', () => {
    const instanceRef = React.createRef();
    const background = '#4caf50';
    ReactDOM.render(<Badge ref={instanceRef} style={{ background }} />, createTestContainer());
    const dom = instanceRef.current;
    assert.equal(getStyle(dom, 'backgroundColor'), toRGB(background));
  });

  it('Color Badge content should render the correct color', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Badge color="cyan" ref={instanceRef}>
        Red
      </Badge>,
      createTestContainer()
    );
    const content = instanceRef.current.querySelector('.rs-badge-content');
    assert.equal(
      getStyle(content, 'backgroundColor'),
      toRGB('#00bcd4'),
      'Color badge background-color'
    );
  });

  it('Color Badge independent should render the correct color', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Badge color="cyan" ref={instanceRef} />, createTestContainer());
    const dom = instanceRef.current;
    assert.equal(
      getStyle(dom, 'backgroundColor'),
      toRGB('#00bcd4'),
      'Color badge background-color'
    );
  });
});
