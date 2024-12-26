import React from 'react';
import { testStandardProps, getStyle } from '@test/utils';
import { render, screen } from '@testing-library/react';
import ProgressLine from '../ProgressLine';

describe('Progress - Line', () => {
  testStandardProps(<ProgressLine />);

  it('Should render a Line', () => {
    render(<ProgressLine />);

    expect(screen.getByRole('progressbar')).to.have.class('rs-progress-line');
  });

  it('Should have a percentage', () => {
    render(<ProgressLine percent={10} />);

    const progress = screen
      .getByRole('progressbar')
      .querySelector('.rs-progress-line-bg') as HTMLDivElement;

    expect(getStyle(progress, 'width')).to.equal('10%');
  });

  it('Should have a height', () => {
    render(<ProgressLine strokeWidth={10} />);

    expect(screen.getByRole('progressbar').querySelector('.rs-progress-line-bg')).to.have.style(
      'height',
      '10px'
    );
  });

  it('Should have a background color', () => {
    render(<ProgressLine strokeColor="#ff0000" />);

    expect(screen.getByRole('progressbar').querySelector('.rs-progress-line-bg')).to.have.style(
      'background-color',
      'rgb(255, 0, 0)'
    );
  });

  it('Should render info', () => {
    render(<ProgressLine />);

    expect(screen.getByRole('progressbar').querySelector('.rs-progress-info')).to.exist;
  });

  it('Should not render info', () => {
    render(<ProgressLine showInfo={false} />);

    expect(screen.getByRole('progressbar').querySelector('.rs-progress-info')).to.not.exist;
  });

  it('Should render a status', () => {
    render(<ProgressLine status="success" />);

    expect(screen.getByRole('progressbar')).to.have.class('rs-progress-line-success');
  });

  it('Should be vertical', () => {
    render(<ProgressLine vertical />);

    expect(screen.getByRole('progressbar')).to.have.class('rs-progress-line-vertical');
  });
});
