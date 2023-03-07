import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/commonCases';
import AvatarGroup from '../AvatarGroup';
import Avatar from '../../Avatar';

describe('AvatarGroup', () => {
  testStandardProps(<AvatarGroup />);

  it('Should change the size of all avatars', () => {
    render(
      <AvatarGroup size="xs" data-testid="group">
        <Avatar data-testid="avatar">A</Avatar>
        <Avatar>B</Avatar>
      </AvatarGroup>
    );

    expect(screen.getByTestId('avatar')).to.have.class('rs-avatar-xs');
  });

  it('Should set the spacing between the avatars', () => {
    render(
      <AvatarGroup spacing={10} data-testid="group">
        <Avatar>A</Avatar>
        <Avatar>A</Avatar>
        <Avatar>B</Avatar>
        {[<Avatar key={1}>C</Avatar>, <Avatar key={2}>D</Avatar>]}
      </AvatarGroup>
    );

    // eslint-disable-next-line testing-library/no-node-access
    const avatars = screen.getByTestId('group').querySelectorAll('.rs-avatar');

    assert.equal((avatars[0] as HTMLElement).style.marginRight, '10px');
    assert.equal((avatars[1] as HTMLElement).style.marginRight, '10px');
    assert.equal((avatars[2] as HTMLElement).style.marginRight, '10px');
    assert.equal((avatars[3] as HTMLElement).style.marginRight, '10px');
  });

  it('Should be stack', () => {
    render(<AvatarGroup stack data-testid="group" />);
    assert.include(screen.getByTestId('group').className, 'rs-avatar-group-stack');
  });
});
