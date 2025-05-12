import React from 'react';
import Col from '../Col';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import '../../Grid/styles/index.less';
import '../../Col/styles/index.less';

describe('Col styles', () => {
  it('Should render the correct styles', () => {
    render(<Col span={1}>Col</Col>);

    expect(screen.getByText('Col')).to.have.style('padding', '0px 6px');
  });
});
