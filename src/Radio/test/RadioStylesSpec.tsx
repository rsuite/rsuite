import React from 'react';
import { render } from '@testing-library/react';
import Radio from '../index';
import { getDOMNode, toRGB, itChrome } from '@test/testUtils';

import '../styles/index.less';

describe('Radio styles', () => {
  itChrome('Should render the correct border', () => {
    const instanceRef = React.createRef();
    render(<Radio ref={instanceRef} />);
    const innerDom = getDOMNode(instanceRef.current).querySelector(
      '.rs-radio-inner'
    ) as HTMLElement;
    assert.equal(
      window.getComputedStyle(innerDom, '::before').border,
      `1px solid ${toRGB('#d9d9d9')}`
    );
  });

  it('Should render checked style even in disabled state', () => {
    const instanceRef = React.createRef();
    render(<Radio ref={instanceRef} checked disabled />);
    const innerDom = getDOMNode(instanceRef.current).querySelector(
      '.rs-radio-inner'
    ) as HTMLElement;
    assert.equal(window.getComputedStyle(innerDom, '::before').backgroundColor, toRGB('#3498ff'));
  });
});
