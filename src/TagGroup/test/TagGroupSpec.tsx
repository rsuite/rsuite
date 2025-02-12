import React from 'react';
import TagGroup from '../TagGroup';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('TagGroup', () => {
  testStandardProps(<TagGroup />);

  it('Should output a TagGroup', () => {
    render(<TagGroup>Group</TagGroup>);

    expect(screen.getByText('Group')).to.have.property('tagName', 'DIV');
    expect(screen.getByText('Group')).to.have.class('rs-tag-group');
  });
});
