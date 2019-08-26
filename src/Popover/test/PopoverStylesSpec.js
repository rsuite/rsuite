import React from 'react';
import ReactDOM from 'react-dom';
import Popover from '../index';
import {
  createTestContainer,
  getDOMNode,
  getStyle,
  toRGB,
  getDefaultPalette
} from '@test/testUtils';

import '../styles/index';

describe('Popover styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Popover ref={instanceRef} visible>
        Text
      </Popover>,
      createTestContainer()
    );
    const dom = getDOMNode(instanceRef.current);

    assert.equal(getStyle(dom, 'backgroundColor'), toRGB('#fff'), 'Popover background-color');
  });
});
