import React from 'react';
import Content from '../index';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import '../styles/index.less';

describe('Content styles', () => {
  it('Should render the correct styles', () => {
    render(<Content>Title</Content>);

    expect(screen.getByText('Title')).to.have.style('flex', '1 1 auto');
  });
});
