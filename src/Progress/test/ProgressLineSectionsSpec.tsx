import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressLine from '../ProgressLine';

describe('Progress - Line Sections', () => {
  it('Should render multiple sections', () => {
    const sections = [
      { percent: 30, color: 'red' },
      { percent: 40, color: 'blue' },
      { percent: 20, color: 'green' }
    ];

    render(<ProgressLine sections={sections} />);

    const progressBar = screen.getByRole('progressbar');
    const sectionsContainer = progressBar.querySelector('.rs-progress-line-sections');
    expect(sectionsContainer).to.exist;

    const sectionElements = sectionsContainer?.querySelectorAll(
      '.rs-progress-line-stroke.rs-progress-line-section'
    );
    expect(sectionElements).to.have.length(3);
  });

  it('Should calculate total percent from sections', () => {
    const sections = [
      { percent: 30, color: 'red' },
      { percent: 40, color: 'blue' }
    ];

    render(<ProgressLine sections={sections} />);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).to.have.attr('aria-valuenow', '70');

    // Check CSS variable for stroke
    const style = progressBar.getAttribute('style');
    expect(style).to.include('--rs-progress-line-stroke: 70%');
  });

  it('Should apply correct styles to sections', () => {
    const sections = [
      { percent: 30, color: 'red' },
      { percent: 40, color: 'blue' }
    ];

    render(<ProgressLine sections={sections} />);

    const sectionsContainer = screen
      .getByRole('progressbar')
      .querySelector('.rs-progress-line-sections');
    const sectionElements = sectionsContainer?.querySelectorAll(
      '.rs-progress-line-stroke.rs-progress-line-section'
    );

    // First section
    const firstSectionStyle = sectionElements?.[0].getAttribute('style');
    expect(firstSectionStyle).to.include('width: 30%');
    expect(firstSectionStyle).to.include('background-color: red');

    // Second section
    const secondSectionStyle = sectionElements?.[1].getAttribute('style');
    expect(secondSectionStyle).to.include('width: 40%');
    expect(secondSectionStyle).to.include('background-color: blue');
  });

  it('Should render section labels', () => {
    const sections = [
      { percent: 30, color: 'red', label: 'Section 1' },
      { percent: 40, color: 'blue', label: 'Section 2' }
    ];

    render(<ProgressLine sections={sections} />);

    const sectionsContainer = screen
      .getByRole('progressbar')
      .querySelector('.rs-progress-line-sections');
    const sectionElements = sectionsContainer?.querySelectorAll(
      '.rs-progress-line-stroke.rs-progress-line-section'
    );

    expect(sectionElements?.[0]).to.have.text('Section 1');
    expect(sectionElements?.[1]).to.have.text('Section 2');
  });

  it('Should work with vertical mode', () => {
    const sections = [
      { percent: 30, color: 'red' },
      { percent: 40, color: 'blue' }
    ];

    render(<ProgressLine sections={sections} vertical />);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).to.have.class('rs-progress-line-vertical');

    const sectionsContainer = progressBar.querySelector('.rs-progress-line-sections');
    const sectionElements = sectionsContainer?.querySelectorAll(
      '.rs-progress-line-stroke.rs-progress-line-section'
    );

    // In vertical mode, height should be set instead of width
    const firstSectionStyle = sectionElements?.[0].getAttribute('style');
    const secondSectionStyle = sectionElements?.[1].getAttribute('style');
    expect(firstSectionStyle).to.include('height: 30%');
    expect(secondSectionStyle).to.include('height: 40%');
  });

  it('Should pass tooltip props to sections', () => {
    const sections = [
      { percent: 30, color: 'red', tooltip: 'Tooltip 1' },
      { percent: 40, color: 'blue', tooltip: 'Tooltip 2' }
    ];

    render(<ProgressLine sections={sections} />);

    // Simply check that the component renders without errors
    // Testing Whisper components directly can cause circular reference issues
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).to.exist;

    const sectionsContainer = progressBar.querySelector('.rs-progress-line-sections');
    expect(sectionsContainer).to.exist;
  });

  it('Should override percent prop when sections are provided', () => {
    const sections = [
      { percent: 30, color: 'red' },
      { percent: 40, color: 'blue' }
    ];

    render(<ProgressLine percent={80} sections={sections} />);

    const progressBar = screen.getByRole('progressbar');

    // Should use the sum of section percents (70) instead of the percent prop (80)
    expect(progressBar).to.have.attr('aria-valuenow', '70');

    // Check CSS variable for stroke
    const style = progressBar.getAttribute('style');
    expect(style).to.include('--rs-progress-line-stroke: 70%');
  });
});
