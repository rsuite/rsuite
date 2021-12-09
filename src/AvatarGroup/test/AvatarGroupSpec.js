import React from 'react';
import AvatarGroup from '../AvatarGroup';
import Avatar from '../../Avatar';
import { getDOMNode } from '@test/testUtils';

describe('AvatarGroup', () => {
  it('Should change the size of all avatars', () => {
    const instance = getDOMNode(
      <AvatarGroup size="xs">
        <Avatar>A</Avatar>
        <Avatar>B</Avatar>
      </AvatarGroup>
    );
    assert.equal(instance.querySelectorAll('.rs-avatar-xs').length, 2);
  });

  it('Should set the spacing between the avatars', () => {
    const instance = getDOMNode(
      <AvatarGroup spacing={10}>
        <Avatar>A</Avatar>
        <Avatar>B</Avatar>
      </AvatarGroup>
    );

    const avatars = instance.querySelectorAll('.rs-avatar');

    assert.equal(avatars[0].style.marginRight, '10px');
    assert.equal(avatars[1].style.marginRight, '10px');
  });

  it('Should be stack', () => {
    const instance = getDOMNode(<AvatarGroup stack />);
    assert.include(instance.className, 'rs-avatar-group-stack');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<AvatarGroup style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<AvatarGroup classPrefix="custom-prefix" />);
    assert.include(instance.className, 'custom-prefix');
  });
});
