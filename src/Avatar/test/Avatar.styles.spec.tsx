import React from 'react';
import Avatar from '../index';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { toRGB } from '@test/utils';

import '../styles/index.scss';

describe('Avatar styles', () => {
  it('Should render the correct background', () => {
    const { container } = render(<Avatar />);

    expect(container.firstChild).to.have.style('background-color', toRGB('#d9d9d9'));
  });
});
