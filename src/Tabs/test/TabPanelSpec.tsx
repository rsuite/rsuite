import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import TabPanel from '../TabPanel';

describe('TabPanel', () => {
  testStandardProps(<TabPanel />);

  it('Should render a TabPanel', () => {
    render(<TabPanel active />);
    expect(screen.queryByRole('tabpanel')).to.be.exist;
    expect(screen.queryByRole('tabpanel')).to.have.class('rs-tab-panel');
  });

  it('Should be hidden when active is false', () => {
    render(<TabPanel active={false} />);
    expect(screen.queryByRole('tabpanel', { hidden: true })).to.have.attr('hidden');
  });

  it('Should tabIndex is 0 when active is true', () => {
    render(<TabPanel active />);
    expect(screen.queryByRole('tabpanel')).to.have.attr('tabIndex', '0');
  });
});
