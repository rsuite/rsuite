import React from 'react';
import Stack from '../Stack';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import '../styles/index.less';

describe('Stack Styles', () => {
  it('Should render a default gap', () => {
    render(<Stack>Test</Stack>);

    expect(screen.getByText('Test')).to.have.style('gap', '6px');
  });
});
