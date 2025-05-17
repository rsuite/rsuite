import React from 'react';
import Drawer from '../index';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('Drawer.Actions', () => {
  testStandardProps(<Drawer.Actions />);

  it('Should render a drawer actions', () => {
    const title = 'Test';
    const { container } = render(<Drawer.Actions>{title}</Drawer.Actions>);
    expect(container.firstChild).to.have.text(title);
    expect(container.firstChild).to.have.class('rs-drawer-actions');
  });
});
