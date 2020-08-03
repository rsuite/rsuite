import React from 'react';
import ReactDOM from 'react-dom';
import Form from '../index';
import Button from '../../Button';
import FormControlLabel from '../../FormControlLabel';
import { createTestContainer, getDOMNode, getStyle } from '@test/testUtils';

import '../styles/index';

describe('Form styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Form ref={instanceRef} layout="inline">
        <Button>Text</Button>
        <FormControlLabel>Text</FormControlLabel>
      </Form>,
      createTestContainer()
    );
    const dom = instanceRef.current.root;
    const buttonDom = dom.children[0];
    const controlLabelDom = dom.children[1];
    assert.equal(getStyle(buttonDom, 'verticalAlign'), 'top', 'Button vertical-align');
    assert.equal(
      getStyle(controlLabelDom, 'verticalAlign'),
      'top',
      'FormControlLabel vertical-align'
    );
    assert.equal(getStyle(controlLabelDom, 'marginTop'), '8px', 'FormControlLabel margin-top');
  });
});
