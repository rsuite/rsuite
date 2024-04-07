import React from 'react';
import { render, screen } from '@testing-library/react';
import AvatarGroup from '../index';

import '../styles/index.less';

describe('AvatarGroup styles', () => {
  it('Should wrap children automatically', () => {
    render(<AvatarGroup />);

    expect(screen.getByRole('group')).to.have.style('flex-wrap', 'wrap');
  });
});
