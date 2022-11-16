import React from 'react';
import { render } from '@testing-library/react';
import FormControl from '../index';
import Form from '../../Form';
import { getDOMNode, getStyle, toRGB, inChrome } from '@test/testUtils';

import '../../Input/styles/index.less';
import '../styles/index.less';

describe('Form control styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    render(
      <Form>
        <FormControl ref={instanceRef} name="name" />
      </Form>
    );
    const dom = getDOMNode(instanceRef.current);
    const inputDom = dom.querySelector('.rs-input') as HTMLInputElement;

    assert.equal(getStyle(dom, 'position'), 'relative');
    inChrome && assert.equal(getStyle(inputDom, 'border'), `1px solid ${toRGB('#e5e5ea')}`);
  });
});
