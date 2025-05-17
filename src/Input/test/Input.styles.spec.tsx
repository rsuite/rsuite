import React from 'react';
import Input from '../index';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { toRGB, inChrome } from '@test/utils';

import '../styles/index.less';

describe('Input styles', () => {
  it('Input should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLInputElement>();
    render(<Input ref={instanceRef} />);
    const dom = instanceRef.current as Element;
    inChrome && expect(dom).to.have.style('border', `1px solid ${toRGB('#e5e5ea')}`);
  });
});
