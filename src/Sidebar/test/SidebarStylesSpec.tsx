import React from 'react';
import { render } from '@testing-library/react';
import { itChrome } from '@test/utils';
import Sidebar from '../index';
import '../styles/index.less';

describe('Sidebar styles', () => {
  itChrome('Should render the correct styles', () => {
    const { container } = render(<Sidebar className="rs-sidebar-collapse" />);

    expect(container.firstChild).to.have.style(
      'transition',
      'flex 0.15s ease-in, width 0.15s ease-in'
    );
  });
});
