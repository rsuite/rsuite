import React from 'react';
import Badge from '../index';
import { render } from '@testing-library/react';
import { getStyle, toRGB } from '@test/utils';

import '../styles/index.less';

describe('Badge styles', () => {
  it('Should render independent badge with fixed height and width', () => {
    const { container } = render(<Badge />);

    expect(container.firstChild).to.have.style('width', '10px');
    expect(container.firstChild).to.have.style('height', '10px');
  });

  it('Should render independent badge with border-radius', () => {
    const { container } = render(<Badge />);
    expect(container.firstChild).to.have.style('border-radius', '50%');
  });

  it('Should render correct color', () => {
    const { container } = render(<Badge />);

    expect(container.firstChild).to.have.style('color', toRGB('#fff'));
  });

  it('Should render correct background color', () => {
    const background = '#4caf50';
    const { container } = render(<Badge style={{ background }} />);

    expect(container.firstChild).to.have.style('background-color', toRGB(background));
  });

  it('Should render correct color when color is preset', () => {
    const { container } = render(<Badge color="cyan">Red</Badge>);

    expect(
      getStyle(container.querySelector('.rs-badge-content') as HTMLElement, 'backgroundColor')
    ).to.equal(toRGB('#00bcd4'));
  });

  it('Color Badge independent should render the correct color', () => {
    const { container } = render(<Badge color="cyan" />);

    expect(getStyle(container.firstChild as HTMLElement, 'backgroundColor')).to.equal(
      toRGB('#00bcd4')
    );
  });

  it('Should render badge with correct CSS variables', () => {
    const { container } = render(<Badge />);
    const badgeElement = container.querySelector('.rs-badge') as HTMLElement;

    expect(getStyle(badgeElement, '--rs-badge-offset-x')).to.equal('5%');
    expect(getStyle(badgeElement, '--rs-badge-offset-y')).to.equal('5%');
    expect(getStyle(badgeElement, '--rs-badge-translate')).to.equal('40%');
  });

  it('Should render circle badge with correct translate variable', () => {
    const { container } = render(<Badge className="rs-badge-circle" />);
    const badgeElement = container.querySelector('.rs-badge-circle') as HTMLElement;

    expect(getStyle(badgeElement, '--rs-badge-translate')).to.equal('30%');
  });

  it('Should render independent badge with inline-flex display', () => {
    const { container } = render(<Badge />);
    const badgeElement = container.firstChild as HTMLElement;

    expect(badgeElement).to.have.style('display', 'inline-flex');
  });
});
