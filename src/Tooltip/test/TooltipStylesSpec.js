import React from 'react';
import ReactDOM from 'react-dom';
import Tooltip from '../index';
import { createTestContainer, getDOMNode, getStyle, toRGB, inChrome } from '@test/testUtils';

import '../styles/index.less';

describe('Tooltip styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Tooltip ref={instanceRef} visible>
        Text
      </Tooltip>,
      createTestContainer()
    );
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'fontSize'), '12px', 'Tooltip font-size');
    assert.equal(
      getStyle(dom, 'backgroundColor'),
      toRGB('#272c36'),
      'Tooltip inner background-color'
    );
    inChrome && assert.equal(getStyle(dom, 'padding'), '2px 10px', 'Tooltip inner padding');
  });
});
