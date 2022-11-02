import React from 'react';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/commonCases';
import AvatarGroup from '../AvatarGroup';
import Avatar from '../../Avatar';

describe('AvatarGroup', () => {
  testStandardProps(<AvatarGroup />);

  it('Should change the size of all avatars', () => {
    const { getByTestId } = render(
      <AvatarGroup size="xs" data-testid="group">
        <Avatar>A</Avatar>
        <Avatar>B</Avatar>
      </AvatarGroup>
    );

    assert.equal(getByTestId('group').querySelectorAll('.rs-avatar-xs').length, 2);
  });

  it('Should set the spacing between the avatars', () => {
    const { getByTestId } = render(
      <AvatarGroup spacing={10} data-testid="group">
        <Avatar>A</Avatar>
        <Avatar>A</Avatar>
        <Avatar>B</Avatar>
        {[<Avatar key={1}>C</Avatar>, <Avatar key={2}>D</Avatar>]}
      </AvatarGroup>
    );

    const avatars = getByTestId('group').querySelectorAll('.rs-avatar');

    assert.equal((avatars[0] as HTMLElement).style.marginRight, '10px');
    assert.equal((avatars[1] as HTMLElement).style.marginRight, '10px');
    assert.equal((avatars[2] as HTMLElement).style.marginRight, '10px');
    assert.equal((avatars[3] as HTMLElement).style.marginRight, '10px');
  });

  it('Should be stack', () => {
    const { getByTestId } = render(<AvatarGroup stack data-testid="group" />);
    assert.include(getByTestId('group').className, 'rs-avatar-group-stack');
  });
});
