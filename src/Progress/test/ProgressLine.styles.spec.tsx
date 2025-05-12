import React from 'react';
import ProgressLine from '../ProgressLine';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { toRGB } from '@test/utils';

import '../styles/index.less';

describe('ProgressLine styles', () => {
  it('Should render the correct styles', () => {
    render(<ProgressLine />);

    const progressBar = screen.getByRole('progressbar');
    const lineOuter = progressBar.querySelector('.rs-progress-line-outer') as HTMLElement;
    const lineInner = progressBar.querySelector('.rs-progress-line-trail') as HTMLElement;

    expect(progressBar).to.have.style('font-size', '16px');
    expect(lineOuter).to.have.style('border-radius', '4px');
    expect(lineInner).to.have.style('background-color', toRGB('#e5e5ea'));
  });
});
