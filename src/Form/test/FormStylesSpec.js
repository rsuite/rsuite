import React from 'react';
import ReactDOM from 'react-dom';
import Form from '../index';
import Button from '../../Button';
import ControlLabel from '../../ControlLabel';
import { createTestContainer, getDOMNode, getStyle } from '@test/testUtils';

import '../styles/index';

describe('Form styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Form ref={instanceRef} layout="inline">
        <Button>Text</Button>
        <ControlLabel>Text</ControlLabel>
      </Form>,
      createTestContainer()
    );
    const dom = getDOMNode(instanceRef.current);
    const buttonDom = dom.children[0];
    const controlLabelDom = dom.children[1];
    assert.equal(getStyle(buttonDom, 'verticalAlign'), 'top', 'Button vertical-align');
    assert.equal(getStyle(controlLabelDom, 'verticalAlign'), 'top', 'ControlLabel vertical-align');
    assert.equal(getStyle(controlLabelDom, 'marginTop'), '8px', 'ControlLabel margin-top');
  });
});
