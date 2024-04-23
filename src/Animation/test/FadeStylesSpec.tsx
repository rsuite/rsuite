import React from 'react';
import { render, screen } from '@testing-library/react';
import Fade from '../Fade';
import '../styles/fade.less';

describe('Animation.Fade', () => {
  it('Should pointer events be disabled', () => {
    const { rerender } = render(
      <Fade>
        <div>test</div>
      </Fade>
    );

    expect(screen.getByText('test')).to.have.style('pointer-events', 'none');

    rerender(
      <Fade in>
        <div>test</div>
      </Fade>
    );

    expect(screen.getByText('test')).to.have.style('pointer-events', 'auto');
  });
});
