import React from 'react';
import kebabCase from 'lodash/kebabCase';
import Badge from '../Badge';
import { testStandardProps } from '@test/utils';
import { render, screen } from '@testing-library/react';

describe('Badge', () => {
  testStandardProps(<Badge />, {
    colors: ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
  });

  it('Should render independent', () => {
    const { container } = render(<Badge />);
    expect(container.firstChild).to.have.class('rs-badge-independent');
  });

  it('Should render content', () => {
    const content = 'NEW+';
    render(<Badge content={content} />);

    expect(screen.getByText(content)).to.exist;
  });

  it('Should be invisible', () => {
    const { container } = render(<Badge invisible />);
    expect(container.firstChild).to.have.class('rs-badge-hidden');
  });

  it('Should be outline', () => {
    const { container } = render(<Badge outline />);
    expect(container.firstChild).to.have.class('rs-badge-outline');
  });

  it('Should render number content', () => {
    const content = '999';
    render(<Badge content={content} />);

    expect(screen.getByText(content)).to.exist;
  });

  it('Should render default maxCount', () => {
    render(<Badge content={999} />);

    expect(screen.getByText('99+')).to.exist;
  });

  it('Should render customized maxCount', () => {
    const maxCount = 200;
    render(<Badge content={999} maxCount={maxCount} />);

    expect(screen.getByText(`${maxCount}+`)).to.exist;
  });

  it('Should render wrapper button', () => {
    const { container } = render(
      <Badge>
        <button>Test</button>
      </Badge>
    );

    expect(container.firstChild).to.have.class('rs-badge-wrapper');
  });

  it('Should have a custom offset', () => {
    const { container } = render(<Badge offset={[10, 10]} />);

    expect(container.firstChild).to.have.style('--rs-badge-offset-x', '10px');
    expect(container.firstChild).to.have.style('--rs-badge-offset-y', '10px');
  });

  it('Should have a custom color', () => {
    const color = '#ff0000';
    const { container } = render(<Badge color={color} />);

    expect(container.firstChild).to.have.style('--rs-badge-bg', color);
  });

  it('Should render specified shape', () => {
    const { container, rerender } = render(
      <Badge shape="circle">
        <button>Test</button>
      </Badge>
    );

    expect(container.firstChild).to.have.class('rs-badge-circle');

    rerender(
      <Badge shape="rectangle">
        <button>Test</button>
      </Badge>
    );

    expect(container.firstChild).to.have.class('rs-badge-rectangle');
  });

  it('Should render compact', () => {
    const { container } = render(<Badge compact />);
    expect(container.firstChild).to.have.class('rs-badge-compact');
  });

  it('Should render placement', () => {
    const placements: any = ['topStart', 'topEnd', 'bottomStart', 'bottomEnd'];

    placements.forEach(placement => {
      const { container } = render(
        <Badge placement={placement}>
          <button>Test</button>
        </Badge>
      );
      expect(container.firstChild).to.have.class(`rs-badge-${kebabCase(placement)}`);
    });
  });
});
