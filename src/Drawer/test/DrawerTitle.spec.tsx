import React from 'react';
import Drawer from '../index';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('Drawer.Title', () => {
  testStandardProps(<Drawer.Title />);

  it('Should render a drawer title', () => {
    const title = 'Test';
    const { container } = render(<Drawer.Title>{title}</Drawer.Title>);
    expect(container.firstChild).to.have.class('rs-drawer-title');
    expect(container.firstChild).to.have.text(title);
  });
});
