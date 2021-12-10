import React from 'react';
import AvatarGroup from '../AvatarGroup';
import Avatar from '../../Avatar';
import { render } from '@testing-library/react';

describe('AvatarGroup', () => {
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

    assert.equal(avatars[0].style.marginRight, '10px');
    assert.equal(avatars[1].style.marginRight, '10px');
    assert.equal(avatars[2].style.marginRight, '10px');
    assert.equal(avatars[3].style.marginRight, '10px');
  });

  it('Should be stack', () => {
    const { getByTestId } = render(<AvatarGroup stack data-testid="group" />);
    assert.include(getByTestId('group').className, 'rs-avatar-group-stack');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const { getByTestId } = render(<AvatarGroup style={{ fontSize }} data-testid="group" />);
    assert.equal(getByTestId('group').style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const { getByTestId } = render(<AvatarGroup classPrefix="custom-prefix" data-testid="group" />);
    assert.include(getByTestId('group').className, 'custom-prefix');
  });
});
