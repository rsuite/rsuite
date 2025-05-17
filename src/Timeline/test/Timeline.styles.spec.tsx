import React from 'react';
import Timeline from '../index';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import '../styles/index.less';

describe('Timeline styles', () => {
  it('Should render the correct styles', () => {
    const { container } = render(<Timeline />);

    expect(container.firstChild).to.have.style('list-style-type', 'none');
  });
});
