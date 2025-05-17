import React from 'react';
import Container from '../index';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

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
    expect(dom).to.have.style('display', 'flex');
  });
});
