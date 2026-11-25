import React from 'react';
import AvatarGroup from '../AvatarGroup';
import Avatar from '../../Avatar';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('AvatarGroup', () => {
  testStandardProps(<AvatarGroup />);

  it('Should change the size of all avatars', () => {
    render(
      <AvatarGroup size="xs">
        <Avatar>A</Avatar>
        <Avatar>B</Avatar>
      </AvatarGroup>
    );

    expect(screen.getByText('A')).to.have.attr(
      'style',
      '--rs-avatar-size: var(--rs-avatar-size-xs);'
    );
    expect(screen.getByText('B')).to.have.attr(
      'style',
      '--rs-avatar-size: var(--rs-avatar-size-xs);'
    );
  });

  it('Should be stack', () => {
    render(<AvatarGroup stack />);

    expect(screen.getByRole('group')).to.have.class('rs-avatar-group-stack');
  });
});
