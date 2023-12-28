import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressLine from '../ProgressLine';
import { toRGB } from '@test/utils';

import '../styles/index.less';

describe('ProgressLine styles', () => {
  it('Should render the correct styles', () => {
    render(<ProgressLine />);

    const progressBar = screen.getByRole('progressbar');
    const lineOuter = progressBar.querySelector('.rs-progress-line-outer') as HTMLElement;
    const lineInner = progressBar.querySelector('.rs-progress-line-inner') as HTMLElement;
    const info = progressBar.querySelector('.rs-progress-info') as HTMLElement;

    expect(progressBar).to.have.style('font-size', '16px');
    expect(progressBar).to.have.style('height', '36px');
    expect(lineOuter).to.have.style('border-radius', '5px');
    expect(lineInner).to.have.style('background-color', toRGB('#e5e5ea'));
    expect(info).to.have.style('padding-left', '12px');
  });
});
