import React from 'react';
import { render, screen } from '@testing-library/react';
import { getGrayScale } from '@test/utils';
import Dropdown from '../Dropdown';
import '../styles/index.less';

describe('Dropdown styles', () => {
  it('Should render the correct styles', () => {
    render(
      <Dropdown title="Default">
        <Dropdown.Item>1</Dropdown.Item>
        <Dropdown.Item>2</Dropdown.Item>
      </Dropdown>
    );

    expect(screen.getByRole('button')).to.have.style('position', 'relative');
    expect(screen.getByRole('button')).to.have.style('padding', '8px 32px 8px 12px');
    expect(screen.getByRole('button')).to.have.contain('.rs-icon[aria-label="arrow down line"]');
  });

  it('Should render a Button in default appearance', () => {
    render(<Dropdown title="Dropdown" />);

    expect(screen.getByRole('button')).to.have.style('background-color', getGrayScale('B050'));
  });

  it('Should have 12px right padding given `noCaret=true`', () => {
    render(<Dropdown title="Dropdown" noCaret />);

    expect(screen.getByRole('button')).to.have.style('padding-right', '12px');
  });
});
