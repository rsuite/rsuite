import React from 'react';
import NumberInput from '../index';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { toRGB } from '@test/utils';
import '../styles/index.scss';

describe('NumberInput styles', () => {
  it('Should render the correct styles', () => {
    const { container } = render(<NumberInput />);

    expect(container.firstChild).to.have.style('background-color', toRGB('#fff'));
    expect(container.firstChild).to.have.style('border', `1px solid ${toRGB('#e5e5ea')}`);
    expect(container.firstChild).to.have.style('height', '36px');
  });
});
