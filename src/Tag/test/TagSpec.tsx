import React from 'react';
import { testStandardProps } from '@test/utils';
import Tag from '../Tag';
import Sinon from 'sinon';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Tag', () => {
  testStandardProps(<Tag />, {
    sizes: ['lg', 'md', 'sm']
  });

  it('Should output a Tag', () => {
    render(<Tag data-testid="tag" />);

    expect(screen.getByTestId('tag')).to.have.class('rs-tag');
    expect(screen.getByTestId('tag')).to.have.class('rs-tag-md');
    expect(screen.getByTestId('tag')).to.have.class('rs-tag-default');
  });

  it('Should call onClose callback', () => {
    const onClose = Sinon.spy();
    render(
      <Tag closable onClose={onClose}>
        tag
      </Tag>
    );

    fireEvent.click(screen.getByRole('button', { name: /Remove/i }));

    expect(onClose).to.have.been.calledOnce;
  });
});
