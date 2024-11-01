import React from 'react';
import { render } from '@testing-library/react';
import Timeline from '../index';
import { getStyle } from '@test/utils';

import '../styles/index.less';

describe('Timeline styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Timeline ref={instanceRef} />);
    const dom = instanceRef.current as Element;
    assert.equal(getStyle(dom, 'listStyleType'), 'none', 'Timeline list-style');
  });
});
