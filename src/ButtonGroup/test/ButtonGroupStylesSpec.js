import React from 'react';
import ReactDOM from 'react-dom';
import ButtonGroup from '../index';
import Button from '../../Button';
import { createTestContainer, getDOMNode, getStyle, itChrome } from '@test/testUtils';

import '../styles/index';

describe('Button Group styles', () => {
  it('Should render the correct width', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <ButtonGroup justified ref={instanceRef}>
        <Button>Text</Button>
        <Button>Text2</Button>
      </ButtonGroup>,
      createTestContainer()
    );
    const buttons = getDOMNode(instanceRef.current).children;

    assert.equal(getStyle(buttons[0], 'width'), getStyle(buttons[1], 'width'));
  });

  itChrome('Should render the correct padding', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <ButtonGroup size="lg" ref={instanceRef}>
        <Button>Text</Button>
      </ButtonGroup>,
      createTestContainer()
    );
    const buttons = getDOMNode(instanceRef.current).children;

    assert.equal(getStyle(buttons[0], 'padding'), '10px 16px');
  });
});
