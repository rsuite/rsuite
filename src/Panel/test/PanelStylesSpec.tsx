import React from 'react';
import { render, screen } from '@testing-library/react';
import Panel from '../index';
import { toRGB, inChrome, itChrome } from '@test/utils';

import '../styles/index.less';

describe('Panel styles', () => {
  it('Should render the correct styles', () => {
    render(<Panel data-testid="panel" />);
    inChrome && expect(screen.getByTestId('panel')).to.have.style('border-radius', '6px');
    expect(screen.getByTestId('panel')).to.have.style('overflow', 'hidden');
  });

  itChrome('Should render the correct border', () => {
    render(<Panel data-testid="panel" bordered />);
    expect(screen.getByTestId('panel')).to.have.style('border', `1px solid ${toRGB('#e5e5ea')}`);
  });

  it('Should not have top padding when header is set', () => {
    render(
      <Panel collapsible expanded header="Title">
        Text
      </Panel>
    );

    expect(screen.getByRole('region')).to.have.style('padding-top', '0px');
  });
});
