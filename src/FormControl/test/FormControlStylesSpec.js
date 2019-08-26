import React from 'react';
import ReactDOM from 'react-dom';
import FormControl from '../index';
import Form from '../../Form';
import { createTestContainer, getDOMNode, getStyle, toRGB, inChrome } from '@test/testUtils';

import '../styles/index';

describe('Form control styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Form>
        <FormControl ref={instanceRef} />
      </Form>,
      createTestContainer()
    );
    const dom = getDOMNode(instanceRef.current);
    const inputDom = dom.querySelector('.rs-input');

    assert.equal(getStyle(dom, 'position'), 'relative', 'FormControl wrapper position');
    inChrome &&
      assert.equal(
        getStyle(inputDom, 'border'),
        `1px solid ${toRGB('#e5e5ea')}`,
        'FormControl wrapper position'
      );
  });
});
