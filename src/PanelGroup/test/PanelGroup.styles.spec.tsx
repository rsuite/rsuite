import React from 'react';
import PanelGroup from '../index';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import '../styles/index.scss';

describe('PanelGroup styles', () => {
  it('Should render the correct styles', () => {
    const { container } = render(<PanelGroup />);

    expect(container.firstChild).to.have.style('border-radius', '6px');
  });
});
