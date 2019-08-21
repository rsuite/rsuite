import React from 'react';
import ReactDOM from 'react-dom';
import FormGroup from '../index';

import { createTestContainer, getDOMNode, getStyle } from '@test/testUtils';

import '../styles/index';
import FormControl from '../../FormControl/index';
import Form from '../../Form/index';

describe('FormGroup styles', () => {
  it('Form layout horizontal Should render the correct styles', () => {
    const inputInstanceRef = React.createRef();
    ReactDOM.render(
      <Form layout="horizontal" ref={inputInstanceRef}>
        <FormGroup>
          <FormControl />
        </FormGroup>
      </Form>,
      createTestContainer()
    );
    const dom = getDOMNode(inputInstanceRef.current);
    const formControlWrapperDom = dom.querySelector('.rs-form-control-wrapper');
    assert.equal(getStyle(formControlWrapperDom, 'float'), 'left', 'FormControl wrapper float');
  });
});
