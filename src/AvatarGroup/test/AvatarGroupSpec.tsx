import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import AvatarGroup from '../AvatarGroup';
import Avatar from '../../Avatar';

describe('AvatarGroup', () => {
  testStandardProps(<AvatarGroup />);

  it('Should change the size of all avatars', () => {
    render(
      <AvatarGroup size="xs">
        <Avatar>A</Avatar>
        <Avatar>B</Avatar>
      </AvatarGroup>
    );

    expect(screen.getByText('A')).to.have.class('rs-avatar-xs');
    expect(screen.getByText('B')).to.have.class('rs-avatar-xs');
  });

  it('Should set the spacing between the avatars', () => {
    render(<AvatarGroup spacing={10} />);

    expect(screen.getByRole('group')).to.have.style('gap', '10px');
  });

  it('Should be stack', () => {
    render(<AvatarGroup stack />);

    expect(screen.getByRole('group')).to.have.class('rs-avatar-group-stack');
  });
});
