import React from 'react';
import { renderToString } from 'react-dom/server.browser';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ProgressLine from '../ProgressLine';
import CustomProvider from '../../CustomProvider';
import '../styles/index.scss';

const placements = ['start', 'end', 'insideStart', 'insideEnd', 'insideCenter'] as const;
const sections = [
  { percent: 30, color: 'red', label: 'Stage one' },
  { percent: 40, color: 'blue', label: 'Stage two' }
];

afterEach(cleanup);

describe('ProgressLine progress feedback', () => {
  for (const vertical of [false, true]) {
    for (const status of [undefined, 'active'] as const) {
      it.each([undefined, 0, 30, 100])(
        `omits unknown percentage %s with vertical ${vertical} and status ${status}`,
        percent => {
          const { getByRole } = render(
            <ProgressLine
              indeterminate
              percent={percent}
              vertical={vertical}
              status={status}
              aria-label="Uploading"
            />
          );
          const bar = getByRole('progressbar', { name: 'Uploading' });
          expect(bar).not.toHaveAttribute('aria-valuenow');
          expect(bar).toHaveAttribute('aria-valuemin', '0');
          expect(bar).toHaveAttribute('aria-valuemax', '100');
          expect(bar).toHaveClass('rs-progress-line-indeterminate');
          expect(bar.querySelector('.rs-progress-line-info')).toBeNull();
          const stroke = bar.querySelector<HTMLElement>('.rs-progress-line-stroke')!;
          expect(stroke.style.width).toBe('100%');
          expect(stroke.style.height).toBe('100%');
        }
      );
    }

    it.each([0, 30, 100])(`keeps known percentage %s with vertical ${vertical}`, percent => {
      const { getByRole } = render(<ProgressLine percent={percent} vertical={vertical} />);
      const bar = getByRole('progressbar');
      expect(bar).toHaveAttribute('aria-valuenow', String(percent));
      expect(bar.querySelector('.rs-progress-line-info')).toHaveTextContent(`${percent}%`);
    });
  }

  it.each(placements)('omits the default unknown percentage at %s', percentPlacement => {
    const { getByRole } = render(
      <ProgressLine indeterminate percent={30} percentPlacement={percentPlacement} showInfo />
    );
    expect(getByRole('progressbar').querySelector('.rs-progress-line-info')).toBeNull();
  });

  it.each(placements)('preserves custom unknown-progress content at %s', percentPlacement => {
    const renderInfo = vi.fn(() => <span>Preparing files</span>);
    const { getByRole } = render(
      <ProgressLine
        indeterminate
        percent={30}
        status="active"
        percentPlacement={percentPlacement}
        renderInfo={renderInfo}
      />
    );
    const info = getByRole('progressbar').querySelector('.rs-progress-line-info')!;
    expect(info).toHaveTextContent('Preparing files');
    expect(renderInfo).toHaveBeenCalledWith(30, 'active');
    expect(Boolean(info.closest('.rs-progress-line-stroke'))).toBe(
      percentPlacement.startsWith('inside')
    );
  });

  it.each(['success', 'fail'] as const)(
    'preserves the explicit %s status icon when progress is unknown',
    status => {
      const { getByRole } = render(<ProgressLine indeterminate status={status} />);
      const bar = getByRole('progressbar');
      const info = bar.querySelector('.rs-progress-line-info')!;
      expect(bar).toHaveAttribute('data-status', status);
      expect(info.querySelector('svg')).not.toBeNull();
      expect(info.textContent).not.toContain('%');
    }
  );

  it('keeps showInfo=false in control of custom content and status icons', () => {
    const renderInfo = vi.fn(() => 'Preparing files');
    const { getByRole } = render(
      <ProgressLine indeterminate showInfo={false} status="fail" renderInfo={renderInfo} />
    );
    expect(getByRole('progressbar').querySelector('.rs-progress-line-info')).toBeNull();
    expect(renderInfo).not.toHaveBeenCalled();
  });

  it('updates known and unknown feedback without retaining a stale percentage', () => {
    const { getByRole, rerender } = render(<ProgressLine percent={25} />);
    const bar = getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '25');
    expect(bar.querySelector('.rs-progress-line-info')).toHaveTextContent('25%');
    rerender(<ProgressLine percent={25} indeterminate />);
    expect(bar).not.toHaveAttribute('aria-valuenow');
    expect(bar.querySelector('.rs-progress-line-info')).toBeNull();
    rerender(<ProgressLine percent={72} indeterminate />);
    expect(bar).not.toHaveAttribute('aria-valuenow');
    expect(bar.querySelector('.rs-progress-line-info')).toBeNull();
    rerender(<ProgressLine percent={72} />);
    expect(bar).toHaveAttribute('aria-valuenow', '72');
    expect(bar.querySelector('.rs-progress-line-info')).toHaveTextContent('72%');
  });

  it('omits unknown section totals while retaining section labels and the known total', () => {
    const { getByRole, rerender } = render(<ProgressLine sections={sections} indeterminate />);
    const bar = getByRole('progressbar');
    expect(bar).not.toHaveAttribute('aria-valuenow');
    expect(bar.querySelector('.rs-progress-line-info')).toBeNull();
    expect(bar.querySelectorAll('.rs-progress-line-section')).toHaveLength(2);
    expect(bar).toHaveTextContent('Stage one');
    expect(bar).toHaveTextContent('Stage two');
    rerender(<ProgressLine sections={sections} />);
    expect(bar).toHaveAttribute('aria-valuenow', '70');
  });

  it('preserves caller-provided ARIA values, text and naming', () => {
    const { getByRole } = render(
      <ProgressLine
        indeterminate
        aria-label="Uploading"
        aria-valuemin={10}
        aria-valuemax={90}
        aria-valuenow={42}
        aria-valuetext="Preparing files"
      />
    );
    const bar = getByRole('progressbar', { name: 'Uploading' });
    expect(bar).toHaveAttribute('aria-valuemin', '10');
    expect(bar).toHaveAttribute('aria-valuemax', '90');
    expect(bar).toHaveAttribute('aria-valuenow', '42');
    expect(bar).toHaveAttribute('aria-valuetext', 'Preparing files');
  });

  it.each([false, true])('renders correct server feedback for indeterminate=%s', indeterminate => {
    const host = document.createElement('div');
    host.innerHTML = renderToString(<ProgressLine percent={30} indeterminate={indeterminate} />);
    const bar = host.querySelector('[role="progressbar"]')!;
    if (indeterminate) {
      expect(bar).not.toHaveAttribute('aria-valuenow');
      expect(bar.querySelector('.rs-progress-line-info')).toBeNull();
    } else {
      expect(bar).toHaveAttribute('aria-valuenow', '30');
      expect(bar.querySelector('.rs-progress-line-info')).toHaveTextContent('30%');
    }
  });

  it('honors indeterminate component defaults', () => {
    const { getByRole } = render(
      <CustomProvider components={{ ProgressLine: { defaultProps: { indeterminate: true } } }}>
        <ProgressLine />
      </CustomProvider>
    );
    expect(getByRole('progressbar')).not.toHaveAttribute('aria-valuenow');
    expect(getByRole('progressbar').querySelector('.rs-progress-line-info')).toBeNull();
  });

  it('uses the section total for the default percentage', () => {
    const { getByRole } = render(<ProgressLine sections={sections} />);
    const bar = getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '70');
    expect(bar.querySelector('.rs-progress-line-info')).toHaveTextContent('70%');
  });

  it('uses the section total instead of an overridden percent prop', () => {
    const { getByRole } = render(<ProgressLine sections={sections} percent={80} />);
    expect(getByRole('progressbar').querySelector('.rs-progress-line-info')).toHaveTextContent(
      '70%'
    );
  });

  it('passes the section total and status to the custom renderer', () => {
    const renderInfo = vi.fn((percent: number) => `${percent} complete`);
    const { getByRole } = render(
      <ProgressLine sections={sections} percent={80} status="active" renderInfo={renderInfo} />
    );
    expect(renderInfo).toHaveBeenCalledWith(70, 'active');
    expect(getByRole('progressbar').querySelector('.rs-progress-line-info')).toHaveTextContent(
      '70 complete'
    );
  });

  it('uses zero for an empty section list', () => {
    const { getByRole } = render(<ProgressLine sections={[]} percent={80} />);
    const bar = getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '0');
    expect(bar.querySelector('.rs-progress-line-info')).toHaveTextContent(/^0%$/);
  });

  it('updates displayed progress when switching between sections and percent', () => {
    const { getByRole, rerender } = render(<ProgressLine sections={sections} percent={80} />);
    const bar = getByRole('progressbar');
    expect(bar.querySelector('.rs-progress-line-info')).toHaveTextContent('70%');
    rerender(<ProgressLine percent={45} />);
    expect(bar).toHaveAttribute('aria-valuenow', '45');
    expect(bar.querySelector('.rs-progress-line-info')).toHaveTextContent('45%');
  });

  it('preserves custom unknown-progress content for sections', () => {
    const renderInfo = vi.fn(() => 'Preparing files');
    const { getByRole } = render(
      <ProgressLine
        indeterminate
        sections={sections}
        percent={80}
        status="active"
        renderInfo={renderInfo}
      />
    );
    expect(renderInfo).toHaveBeenCalledWith(70, 'active');
    expect(getByRole('progressbar').querySelector('.rs-progress-line-info')).toHaveTextContent(
      'Preparing files'
    );
  });
});
