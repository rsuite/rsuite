import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import ProgressCircle from '../ProgressCircle';

describe('Progress - Circle', () => {
  testStandardProps(<ProgressCircle />, {
    customClassName: false
  });

  it('Should render a Circle', () => {
    render(<ProgressCircle />);

    expect(screen.getByRole('progressbar')).to.have.class('rs-progress-circle');
  });

  it('Should have a percentage', () => {
    render(<ProgressCircle percent={10} />);

    expect(screen.getByRole('progressbar')).to.have.text('10%');
  });

  it('Should have a width', () => {
    render(<ProgressCircle trailWidth={0} percent={1} strokeWidth={10} />);

    expect(screen.getByRole('progressbar').querySelector('.rs-progress-trail')).to.have.attr(
      'stroke-width',
      '10'
    );
    expect(screen.getByRole('progressbar').querySelector('.rs-progress-stroke')).to.have.attr(
      'stroke-width',
      '10'
    );
  });

  it('Should have a background color', () => {
    render(<ProgressCircle strokeColor={'#ff0000'} />);

    expect(screen.getByRole('progressbar').querySelector('.rs-progress-stroke')).to.have.style(
      'stroke',
      'rgb(255, 0, 0)'
    );
  });

  it('Should render info', () => {
    render(<ProgressCircle />);

    expect(screen.getByRole('progressbar').querySelector('.rs-progress-circle-info')).to.exist;
  });

  it('Should not render info', () => {
    render(<ProgressCircle showInfo={false} />);

    expect(screen.getByRole('progressbar').querySelector('.rs-progress-circle-info')).to.not.exist;
  });

  it('Should render a status', () => {
    render(<ProgressCircle status="success" />);

    expect(screen.getByRole('progressbar')).to.have.class('rs-progress-circle-success');
  });

  it('Should be able to customize the Path type', () => {
    render(<ProgressCircle strokeLinecap="butt" />);

    expect(screen.getByRole('progressbar').querySelector('.rs-progress-stroke')).to.have.attr(
      'stroke-linecap',
      'butt'
    );
  });

  it('Should render start position by `gapPosition`', () => {
    render(
      <>
        <ProgressCircle gapPosition="top" />
        <ProgressCircle gapPosition="bottom" />
        <ProgressCircle gapPosition="left" />
        <ProgressCircle gapPosition="right" />
      </>
    );

    const progressCircles = screen.getAllByRole('progressbar');

    expect(progressCircles[0].querySelector('.rs-progress-trail')).to.have.attr(
      'd',
      'M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94'
    );
    expect(progressCircles[1].querySelector('.rs-progress-trail')).to.have.attr(
      'd',
      'M 50,50 m 0,47 a 47,47 0 1 1 0,-94 a 47,47 0 1 1 0,94'
    );
    expect(progressCircles[2].querySelector('.rs-progress-trail')).to.have.attr(
      'd',
      'M 50,50 m -47,0 a 47,47 0 1 1 94,0 a 47,47 0 1 1 -94,0'
    );
    expect(progressCircles[3].querySelector('.rs-progress-trail')).to.have.attr(
      'd',
      'M 50,50 m 47,0 a 47,47 0 1 1 -94,0 a 47,47 0 1 1 94,0'
    );
  });
});
