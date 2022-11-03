import React from 'react';
import { render } from '@testing-library/react';
import Container from '../index';
import { getDOMNode, getStyle } from '@test/testUtils';

import '../styles/index.less';

describe('Container styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(
      <Container ref={instanceRef}>
        <span>Title</span>
      </Container>
    );
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'display'), 'flex');
  });
});
