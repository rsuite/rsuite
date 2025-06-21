import React from 'react';
import Breadcrumb from '../index';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import '../styles/index.scss';

describe('Breadcrumb styles', () => {
  it('Should render correct padding', () => {
    const { container } = render(<Breadcrumb />);

    expect(container.firstChild).to.have.style('padding', '0px');
  });
});
