import React from 'react';
import TagGroup from '../TagGroup';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import '../../TagGroup/styles/index.scss';
import '../../Tag/styles/index.scss';

describe('TagGroup styles', () => {
  it('Should render the correct styles', () => {
    render(<TagGroup>Group</TagGroup>);

    expect(screen.getByText('Group')).to.have.style('gap', '10px');
  });
});
