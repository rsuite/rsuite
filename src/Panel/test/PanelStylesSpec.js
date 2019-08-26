import React from 'react';
import ReactDOM from 'react-dom';
import Panel from '../index';
import {
  createTestContainer,
  getDOMNode,
  getStyle,
  toRGB,
  inChrome,
  itChrome
} from '@test/testUtils';

import '../styles/index';

describe('Panel styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Panel ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    inChrome && assert.equal(getStyle(dom, 'borderRadius'), '6px', 'Panel border-radius');
    assert.equal(getStyle(dom, 'overflow'), 'hidden', 'Panel overflow');
  });

  itChrome('Should render the correct border', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Panel ref={instanceRef} bordered />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'border'), `1px solid ${toRGB('#e5e5ea')}`);
  });
});
