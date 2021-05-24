import React from 'react';
import ReactDOM from 'react-dom';
import Message from '../index';
import { createTestContainer, getDOMNode, getStyle, toRGB } from '@test/testUtils';

import '../styles/index.less';

describe('Message styles', () => {
  it('Should render the correct background color', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Message description="Informational" ref={instanceRef} />,
      createTestContainer()
    );
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'backgroundColor'), toRGB('#f0f9ff'));
  });

  it('Icon should render the correct color', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Message showIcon type="info" description="Informational" ref={instanceRef} />,
      createTestContainer()
    );
    const icon = getDOMNode(instanceRef.current).querySelector('.rs-icon');
    assert.equal(getStyle(icon, 'color'), toRGB('#2196f3'));
  });
});
