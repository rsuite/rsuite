import React from 'react';
import { testStandardProps } from '@test/utils';
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

    expect(screen.getByRole('progressbar')).to.have.attr(
      'style',
      '--rs-progress-line-stroke: 10%;'
    );
  });

  it('Should have a height', () => {
    render(<ProgressLine strokeWidth={10} />);

    const style = screen.getByRole('progressbar').getAttribute('style');
    expect(style).to.be.match(/--rs-progress-line-trail-size: 10px/);
    expect(style).to.be.match(/--rs-progress-line-size: 10px/);
  });

  it('Should have a background color', () => {
    render(<ProgressLine strokeColor="#ff0000" />);

    const style = screen.getByRole('progressbar').getAttribute('style');

    expect(style).to.be.match(/--rs-progress-line-color: #ff0000/);
  });

  it('Should render info', () => {
    render(<ProgressLine />);

    expect(screen.getByRole('progressbar').querySelector('.rs-progress-line-info')).to.exist;
  });

  it('Should not render info', () => {
    render(<ProgressLine showInfo={false} />);

    expect(screen.getByRole('progressbar').querySelector('.rs-progress-line-info')).to.not.exist;
  });

  it('Should render a status', () => {
    render(<ProgressLine status="success" />);

    expect(screen.getByRole('progressbar')).to.have.attr('data-status', 'success');
  });

  it('Should be vertical', () => {
    render(<ProgressLine vertical />);

    expect(screen.getByRole('progressbar')).to.have.class('rs-progress-line-vertical');
  });

  it('Should have striped effect', () => {
    render(<ProgressLine striped />);

    expect(screen.getByRole('progressbar')).to.have.class('rs-progress-line-striped');
  });

  it('Should have correct percent placement', () => {
    render(<ProgressLine percentPlacement="start" />);

    expect(screen.getByRole('progressbar')).to.have.attribute('data-placement', 'start');
  });

  it('Should have inside percent placement', () => {
    render(<ProgressLine percentPlacement="insideCenter" />);

    expect(screen.getByRole('progressbar')).to.have.attribute('data-placement', 'insideCenter');
  });

  it('Should have border radius', () => {
    render(<ProgressLine radius={10} />);

    // Check if the CSS variable is set correctly
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).to.have.style('--rs-progress-line-radius', '10px');
  });

  it('Should have trail color', () => {
    render(<ProgressLine trailColor="#cccccc" />);

    const style = screen.getByRole('progressbar').getAttribute('style');
    expect(style).to.be.match(/--rs-progress-line-trail-color: #cccccc/);
  });

  it('Should have trail width', () => {
    render(<ProgressLine trailWidth={8} />);

    const style = screen.getByRole('progressbar').getAttribute('style');
    expect(style).to.be.match(/--rs-progress-line-trail-size: 8px/);
  });

  it('Should have active status', () => {
    render(<ProgressLine status="active" />);

    expect(screen.getByRole('progressbar')).to.have.attr('data-status', 'active');
  });

  it('Should have fail status', () => {
    render(<ProgressLine status="fail" />);

    expect(screen.getByRole('progressbar')).to.have.attr('data-status', 'fail');
  });

  it('Should show icon for success status', () => {
    render(<ProgressLine status="success" />);

    const infoElement = screen.getByRole('progressbar').querySelector('.rs-progress-line-info');
    expect(infoElement).to.exist;
    // 验证图标元素存在，不再检查特定的文本内容
    expect(infoElement?.firstChild).to.exist;
  });

  it('Should show icon for fail status', () => {
    render(<ProgressLine status="fail" />);

    const infoElement = screen.getByRole('progressbar').querySelector('.rs-progress-line-info');
    expect(infoElement).to.exist;
    // 验证图标元素存在，不再检查特定的文本内容
    expect(infoElement?.firstChild).to.exist;
  });

  it('Should not show icon for active status', () => {
    render(<ProgressLine status="active" />);

    const infoElement = screen.getByRole('progressbar').querySelector('.rs-progress-line-info');
    expect(infoElement).to.exist;
    // 验证显示的是百分比而不是图标
    expect(infoElement).to.have.text('0%');
  });

  it('Should have end percent placement', () => {
    render(<ProgressLine percentPlacement="end" />);

    expect(screen.getByRole('progressbar')).to.have.attribute('data-placement', 'end');
  });

  it('Should have insideStart percent placement', () => {
    render(<ProgressLine percentPlacement="insideStart" />);

    expect(screen.getByRole('progressbar')).to.have.attribute('data-placement', 'insideStart');
  });

  it('Should have insideEnd percent placement', () => {
    render(<ProgressLine percentPlacement="insideEnd" />);

    expect(screen.getByRole('progressbar')).to.have.attribute('data-placement', 'insideEnd');
  });

  it('Should place info inside when using inside placement', () => {
    render(<ProgressLine percentPlacement="insideCenter" />);

    const strokeElement = screen.getByRole('progressbar').querySelector('.rs-progress-line-stroke');
    expect(strokeElement).to.exist;
    expect(strokeElement?.querySelector('.rs-progress-line-info')).to.exist;
  });

  it('Should place info outside when using external placement', () => {
    render(<ProgressLine percentPlacement="end" />);

    const strokeElement = screen.getByRole('progressbar').querySelector('.rs-progress-line-stroke');
    const progressBar = screen.getByRole('progressbar');

    expect(strokeElement).to.exist;
    expect(strokeElement?.querySelector('.rs-progress-line-info')).to.not.exist;
    expect(progressBar.querySelector('.rs-progress-line-info')).to.exist;
  });

  it('Should render custom info content using renderInfo', () => {
    const customContent = 'Custom Content';
    render(
      <ProgressLine
        percent={50}
        renderInfo={() => <span className="custom-info">{customContent}</span>}
      />
    );

    const infoElement = screen.getByRole('progressbar').querySelector('.rs-progress-line-info');
    expect(infoElement).to.exist;
    expect(infoElement?.textContent).to.equal(customContent);
  });

  it('Should render custom info content with status using renderInfo', () => {
    render(
      <ProgressLine
        percent={50}
        status="success"
        renderInfo={(percent, status) => (
          <span className="custom-info">{`${percent}-${status}`}</span>
        )}
      />
    );

    const infoElement = screen.getByRole('progressbar').querySelector('.rs-progress-line-info');
    expect(infoElement).to.exist;
    expect(infoElement?.textContent).to.equal('50-success');
  });

  describe('Sections', () => {
    it('Should render multiple sections', () => {
      const sections = [
        { percent: 30, color: 'red' },
        { percent: 40, color: 'blue' }
      ];

      render(<ProgressLine sections={sections} />);

      const progressBar = screen.getByRole('progressbar');
      const sectionsContainer = progressBar.querySelector('.rs-progress-line-sections');
      expect(sectionsContainer).to.exist;

      const sectionElements = sectionsContainer?.querySelectorAll(
        '.rs-progress-line-stroke.rs-progress-line-section'
      );
      expect(sectionElements).to.have.length(2);
    });

    it('Should calculate total percent from sections', () => {
      const sections = [
        { percent: 30, color: 'red' },
        { percent: 40, color: 'blue' }
      ];

      render(<ProgressLine sections={sections} />);

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).to.have.attr('aria-valuenow', '70');

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
      expect(firstSectionStyle).to.include('background: red');
    });

    it('Should render section labels', () => {
      const sections = [{ percent: 30, color: 'red', label: 'Section 1' }];

      render(<ProgressLine sections={sections} />);

      const sectionsContainer = screen
        .getByRole('progressbar')
        .querySelector('.rs-progress-line-sections');
      const sectionElement = sectionsContainer?.querySelector(
        '.rs-progress-line-stroke.rs-progress-line-section'
      );

      expect(sectionElement).to.have.text('Section 1');
    });
  });
});
