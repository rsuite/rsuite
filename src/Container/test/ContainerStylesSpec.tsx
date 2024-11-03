import React from 'react';
import { render } from '@testing-library/react';
import Container from '../index';
import { getStyle } from '@test/utils';

import '../styles/index.less';

describe('Container styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(
      <Container ref={instanceRef}>
        <span>Title</span>
      </Container>
    );
    const dom = instanceRef.current as Element;
    assert.equal(getStyle(dom, 'display'), 'flex');
  });
});
