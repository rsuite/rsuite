import React from 'react';
import PanelGroup from '../index';
import { render } from '@testing-library/react';
import '../styles/index.less';

describe('PanelGroup styles', () => {
  it('Should render the correct styles', () => {
    const { container } = render(<PanelGroup />);

    expect(container.firstChild).to.have.style('border-radius', '6px');
  });
});
