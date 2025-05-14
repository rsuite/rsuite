import React from 'react';
import Radio from '../index';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { toRGB } from '@test/utils';

import '../styles/index.less';

describe('Radio styles', () => {
  it('Should render the correct border', () => {
    const { container } = render(<Radio />);

    const inner = container.querySelector('.rs-radio-inner') as HTMLElement;

    expect(window.getComputedStyle(inner, '::before').border).to.equal(
      `1px solid ${toRGB('#d9d9d9')}`
    );
  });

  it('Should render checked style even in disabled state', () => {
    const { container } = render(<Radio checked disabled />);

    const inner = container.querySelector('.rs-radio-inner') as HTMLElement;

    expect(window.getComputedStyle(inner, '::before').backgroundColor).to.equal(toRGB('#3498ff'));
  });
});
