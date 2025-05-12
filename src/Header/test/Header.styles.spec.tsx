import React from 'react';
import Header from '../index';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import '../styles/index.less';

describe('Header styles', () => {
  it('Should render the correct styles', () => {
    render(<Header>header</Header>);
    expect(screen.getByText('header')).to.have.style('flex', '0 0 auto');
  });
});
