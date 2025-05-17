import React from 'react';
import ProgressCircle from '../ProgressCircle';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('ProgressCircle - Sections', () => {
  it('Should render multiple sections', () => {
    const sections = [
      { percent: 30, color: 'red' },
      { percent: 40, color: 'blue' }
    ];

    render(<ProgressCircle sections={sections} />);

    const progressBar = screen.getByRole('progressbar');
    const sectionElements = progressBar.querySelectorAll('.rs-progress-circle-stroke');
    expect(sectionElements).to.have.length(2);
  });

  it('Should calculate total percent from sections', () => {
    const sections = [
      { percent: 30, color: 'red' },
      { percent: 40, color: 'blue' }
    ];

    render(<ProgressCircle sections={sections} />);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).to.have.attr('aria-valuenow', '70');
    expect(progressBar.querySelector('.rs-progress-circle-info')).to.have.text('70%');
  });

  it('Should apply correct colors to sections', () => {
    const sections = [
      { percent: 30, color: 'red' },
      { percent: 40, color: 'blue' }
    ];

    render(<ProgressCircle sections={sections} />);

    const sectionElements = screen
      .getByRole('progressbar')
      .querySelectorAll('.rs-progress-circle-stroke');

    // First section should have red color
    expect(sectionElements[0]).to.have.style('stroke', 'rgb(255, 0, 0)');

    // Second section should have blue color
    expect(sectionElements[1]).to.have.style('stroke', 'rgb(0, 0, 255)');
  });

  it('Should handle sections with total percent greater than 100', () => {
    const sections = [
      { percent: 60, color: 'red' },
      { percent: 60, color: 'blue' }
    ];

    render(<ProgressCircle sections={sections} />);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).to.have.attr('aria-valuenow', '100');
    expect(progressBar.querySelector('.rs-progress-circle-info')).to.have.text('100%');
  });

  it('Should work with custom renderInfo function', () => {
    const sections = [
      { percent: 30, color: 'red' },
      { percent: 40, color: 'blue' }
    ];

    render(<ProgressCircle sections={sections} renderInfo={percent => `Total: ${percent}%`} />);

    const infoElement = screen.getByRole('progressbar').querySelector('.rs-progress-circle-info');
    expect(infoElement).to.exist;
    expect(infoElement?.textContent).to.equal('Total: 70%');
  });

  it('Should work with gapDegree and gapPosition', () => {
    const sections = [
      { percent: 30, color: 'red' },
      { percent: 40, color: 'blue' }
    ];

    render(<ProgressCircle sections={sections} gapDegree={90} gapPosition="bottom" />);

    const progressBar = screen.getByRole('progressbar');
    const sectionElements = progressBar.querySelectorAll('.rs-progress-circle-stroke');

    // Should still render both sections
    expect(sectionElements).to.have.length(2);

    // Should have correct total percent
    expect(progressBar).to.have.attr('aria-valuenow', '70');
  });
});
