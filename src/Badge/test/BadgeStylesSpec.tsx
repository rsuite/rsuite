import React from 'react';
import { render } from '@testing-library/react';
import Badge from '../index';
import { getStyle, itChrome, toRGB } from '@test/testUtils';

import '../styles/index.less';

describe('Badge styles', () => {
  it('Independent should render correct style ', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Badge ref={instanceRef} />);
    const dom = instanceRef.current as HTMLDivElement;
    assert.equal(getStyle(dom, 'width'), '8px');
    assert.equal(getStyle(dom, 'width'), getStyle(dom, 'height'));
  });

  // @description Can't get border-radius value in other browser except chrome
  itChrome('Independent should render correct border-radius ', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Badge ref={instanceRef} />);
    const dom = instanceRef.current as HTMLDivElement;
    assert.equal(getStyle(dom, 'borderRadius'), '4px');
  });

  it('Should render correct color', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Badge ref={instanceRef} />);
    const dom = instanceRef.current as HTMLDivElement;
    assert.equal(getStyle(dom, 'color'), toRGB('#fff'));
  });

  it('Should render correct background color', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    const background = '#4caf50';
    render(<Badge ref={instanceRef} style={{ background }} />);
    const dom = instanceRef.current as HTMLDivElement;
    assert.equal(getStyle(dom, 'backgroundColor'), toRGB(background));
  });

  it('Color Badge content should render the correct color', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(
      <Badge color="cyan" ref={instanceRef}>
        Red
      </Badge>
    );
    const content = (instanceRef.current as HTMLDivElement).querySelector(
      '.rs-badge-content'
    ) as HTMLElement;
    assert.equal(
      getStyle(content, 'backgroundColor'),
      toRGB('#00bcd4'),
      'Color badge background-color'
    );
  });

  it('Color Badge independent should render the correct color', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Badge color="cyan" ref={instanceRef} />);
    const dom = instanceRef.current as HTMLDivElement;
    assert.equal(
      getStyle(dom, 'backgroundColor'),
      toRGB('#00bcd4'),
      'Color badge background-color'
    );
  });
});
