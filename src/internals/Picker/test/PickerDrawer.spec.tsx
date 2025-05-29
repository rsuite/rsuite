import React from 'react';
import PickerDrawer from '../PickerDrawer';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('PickerDrawer', () => {
  it('Should render a drawer', () => {
    render(<PickerDrawer open speaker={<div>Test</div>} />);

    expect(screen.getByRole('dialog')).to.have.class('rs-drawer');
  });

  it('Should render a drawer with bottom placement', () => {
    render(<PickerDrawer open speaker={<div>Test</div>} />);

    expect(screen.getByRole('dialog')).to.have.class('rs-drawer-bottom');
  });
});
