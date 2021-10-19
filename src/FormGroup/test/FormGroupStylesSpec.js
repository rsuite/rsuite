import React from 'react';
import { render } from '@testing-library/react';
import FormGroup from '../index';

import { getStyle } from '@test/testUtils';

import '../styles/index.less';
import FormControl from '../../FormControl/index';
import Form from '../../Form/index';

describe('FormGroup styles', () => {
  it('Form layout horizontal Should render the correct styles', () => {
    const inputInstanceRef = React.createRef();
    render(
      <Form layout="horizontal" ref={inputInstanceRef}>
        <FormGroup>
          <FormControl name="name" />
        </FormGroup>
      </Form>
    );
    const dom = inputInstanceRef.current.root;
    const formControlWrapperDom = dom.querySelector('.rs-form-control-wrapper');
    assert.equal(getStyle(formControlWrapperDom, 'float'), 'left', 'FormControl wrapper float');
  });
});
