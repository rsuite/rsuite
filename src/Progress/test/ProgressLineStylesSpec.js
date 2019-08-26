import React from 'react';
import ReactDOM from 'react-dom';
import ProgressLine from '../ProgressLine';
import { createTestContainer, getDOMNode, getStyle, toRGB, inChrome } from '@test/testUtils';

import '../styles/index';

describe('ProgressLine styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<ProgressLine ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    const outerDom = dom.querySelector('.rs-progress-line-outer');
    const innerDom = dom.querySelector('.rs-progress-line-inner');
    const infoDom = dom.querySelector('.rs-progress-info');
    assert.equal(getStyle(dom, 'fontSize'), '16px', 'ProgressLine font-size');
    assert.equal(getStyle(dom, 'height'), '36px', 'ProgressLine height');
    inChrome &&
      assert.equal(getStyle(outerDom, 'borderRadius'), '5px', 'ProgressLine outer border-radius');
    assert.equal(
      getStyle(innerDom, 'backgroundColor'),
      toRGB('#e5e5ea'),
      'ProgressLine inner border-radius'
    );
    inChrome &&
      assert.equal(getStyle(infoDom, 'paddingLeft'), '12px', 'ProgressLine inner padding-left');
  });
});
