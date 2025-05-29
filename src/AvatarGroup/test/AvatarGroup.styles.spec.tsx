import React from 'react';
import AvatarGroup from '../index';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import '../styles/index.less';

describe('AvatarGroup styles', () => {
  it('Should wrap children automatically', () => {
    render(<AvatarGroup />);

    expect(screen.getByRole('group')).to.have.style('flex-wrap', 'wrap');
  });

  it('Should set the spacing between the avatars', () => {
    render(<AvatarGroup spacing={10} />);

    expect(screen.getByRole('group')).to.have.style('gap', '10px');
  });
});
