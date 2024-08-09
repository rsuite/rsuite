import React from 'react';
import { testStandardProps } from '@test/utils';
import User from '@rsuite/icons/legacy/User';
import IconButton from '../IconButton';
import { render } from '@testing-library/react';

describe('IconButton', () => {
  testStandardProps(<IconButton />);

  it('Should output a button', () => {
    const { container } = render(<IconButton />);

    expect(container.firstChild).to.have.class('rs-btn-icon');
    expect(container.firstChild).to.have.tagName('BUTTON');
  });

  it('Should output a icon', () => {
    const { container } = render(<IconButton icon={<User />} />);
    //eslint-disable-next-line
    expect(container.querySelector('.rs-icon')).to.exist;
  });
});
