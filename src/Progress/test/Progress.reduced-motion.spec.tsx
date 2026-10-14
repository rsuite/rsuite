import React from 'react';
import { renderToString } from 'react-dom/server.browser';
import { act, cleanup, render } from '@testing-library/react';
import { commands } from '@vitest/browser/context';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import ProgressLine, { ProgressLineProps } from '../ProgressLine';
import ProgressCircle from '../../ProgressCircle';
import CustomProvider from '../../CustomProvider';
import '../styles/index.scss';
import '../../ProgressCircle/styles/index.scss';

const initialPreference = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ? 'reduce'
  : 'no-preference';
const policies = [undefined, true, false];
const preferences = ['reduce', 'no-preference'] as const;
const sections = [
  { percent: 30, color: 'red', label: 'Stage one' },
  { percent: 40, color: 'blue', label: 'Stage two' }
];
const lineVariants: { name: string; props: ProgressLineProps }[] = [
  { name: 'plain', props: {} },
  { name: 'active', props: { status: 'active' } },
  { name: 'striped active', props: { status: 'active', striped: true } },
  { name: 'indeterminate', props: { indeterminate: true } },
  { name: 'indeterminate active', props: { indeterminate: true, status: 'active' } },
  { name: 'sections', props: { sections, status: 'active', striped: true } }
];

beforeEach(() => commands.setMotionPreference('no-preference'));
afterEach(async () => {
  cleanup();
  await commands.setMotionPreference(initialPreference);
});

function expectLineMotion(bar: HTMLElement, reduced: boolean, props: ProgressLineProps) {
  const { vertical, indeterminate, status, striped } = props;
  const trail = bar.querySelector(':scope > .rs-progress-line-outer > .rs-progress-line-trail')!;
  const strokes = trail.querySelectorAll<HTMLElement>(
    ':scope > .rs-progress-line-stroke, :scope > .rs-progress-line-sections > .rs-progress-line-stroke'
  );
  expect(strokes).toHaveLength(props.sections ? props.sections.length : 1);
  for (const stroke of strokes) {
    const style = getComputedStyle(stroke);
    expect(style.transitionDuration.split(',').some(value => parseFloat(value) > 0)).toBe(!reduced);
    expect(stroke.getBoundingClientRect().width).toBeGreaterThan(0);
    expect(stroke.getBoundingClientRect().height).toBeGreaterThan(0);
    const before = getComputedStyle(stroke, '::before');
    const after = getComputedStyle(stroke, '::after');
    const direction = vertical ? '-vertical' : '';
    const beforeAnimation = indeterminate
      ? `progress-indeterminate${direction}`
      : status === 'active'
        ? `progress-active${direction}`
        : 'none';
    expect(before.animationName).toBe(reduced ? 'none' : beforeAnimation);
    expect(after.animationName).toBe(
      !reduced && striped && status === 'active' ? `progress-stripe${direction}` : 'none'
    );
    if (striped) expect(after.backgroundImage).toContain('linear-gradient');
    if (indeterminate) {
      expect(before.content).not.toBe('none');
      expect(before.display).not.toBe('none');
      expect(parseFloat(before.width)).toBeGreaterThan(0);
      expect(parseFloat(before.height)).toBeGreaterThan(0);
      expect(before.opacity).toBe('1');
      expect(before.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
      if (reduced) {
        expect(before.transform).toBe('none');
        expect(before.willChange).toBe('auto');
      }
    }
  }
  expect(bar).toHaveAccessibleName('Uploading');
  if (!indeterminate) expect(bar).toHaveAttribute('aria-valuenow', props.sections ? '70' : '40');
  if (props.sections) {
    expect(bar).toHaveTextContent('Stage one');
    expect(bar).toHaveTextContent('Stage two');
  }
}

function expectCircleMotion(bar: HTMLElement, reduced: boolean, sectioned = false) {
  const strokes = bar.querySelectorAll<SVGPathElement>(
    ':scope > .rs-progress-circle-svg > .rs-progress-circle-stroke'
  );
  expect(strokes).toHaveLength(sectioned ? 2 : 1);
  for (const stroke of strokes) {
    const style = getComputedStyle(stroke);
    expect(style.transitionDuration.split(',').some(value => parseFloat(value) > 0)).toBe(!reduced);
    expect(parseFloat(style.strokeDasharray)).toBeGreaterThan(0);
    expect(parseFloat(style.strokeWidth)).toBeGreaterThan(0);
    expect(style.stroke).not.toBe('none');
    expect(stroke.getAttribute('d')).toBeTruthy();
  }
  expect(bar).toHaveAccessibleName('Uploading');
  expect(bar).toHaveAttribute('aria-valuenow', sectioned ? '70' : '40');
  expect(bar.querySelector(':scope > .rs-progress-circle-info')).toHaveTextContent(
    sectioned ? '70%' : '40%'
  );
}

const line = (props: ProgressLineProps = {}) => (
  <ProgressLine percent={40} aria-label="Uploading" {...props} />
);
const circle = (sectioned = false) => (
  <ProgressCircle
    percent={40}
    sections={sectioned ? sections : undefined}
    gapDegree={60}
    gapPosition="bottom"
    aria-label="Uploading"
  />
);
const wrap = (content: React.ReactNode, reduceMotion?: boolean) => (
  <CustomProvider reduceMotion={reduceMotion}>
    <div style={{ width: 240, height: 180 }}>{content}</div>
  </CustomProvider>
);

describe('Progress reduced motion', () => {
  for (const preference of preferences) {
    for (const vertical of [false, true]) {
      describe.each(lineVariants)(
        `line $name vertical=${vertical} system=${preference}`,
        variant => {
          it.each(policies)('honors provider %s while retaining feedback', async policy => {
            await commands.setMotionPreference(preference);
            const props = { ...variant.props, vertical };
            const { getByRole } = render(wrap(line(props), policy));
            expectLineMotion(getByRole('progressbar'), policy ?? preference === 'reduce', props);
          });
        }
      );
    }
    for (const sectioned of [false, true]) {
      it.each(policies)(
        `circle sections=${sectioned} system=${preference} honors provider %s`,
        async policy => {
          await commands.setMotionPreference(preference);
          const { getByRole } = render(wrap(circle(sectioned), policy));
          expectCircleMotion(
            getByRole('progressbar'),
            policy ?? preference === 'reduce',
            sectioned
          );
        }
      );
    }
    for (const kind of ['line', 'circle'] as const) {
      it.each(policies)(
        `${kind} server markup system=${preference} honors provider %s`,
        async policy => {
          await commands.setMotionPreference(preference);
          const props = { indeterminate: true, status: 'active' } as const;
          const host = document.createElement('div');
          host.innerHTML = renderToString(wrap(kind === 'line' ? line(props) : circle(), policy));
          document.body.appendChild(host);
          try {
            const bar = host.querySelector<HTMLElement>('[role="progressbar"]')!;
            if (kind === 'line') expectLineMotion(bar, policy ?? preference === 'reduce', props);
            else expectCircleMotion(bar, policy ?? preference === 'reduce');
          } finally {
            host.remove();
          }
        }
      );
    }
  }

  for (const kind of ['line', 'circle'] as const) {
    const props = { indeterminate: true, status: 'active', striped: true } as const;
    const content = () => (kind === 'line' ? line(props) : circle());
    const check = (bar: HTMLElement, reduced: boolean) =>
      kind === 'line' ? expectLineMotion(bar, reduced, props) : expectCircleMotion(bar, reduced);

    it(`${kind} responds to system changes without a provider`, async () => {
      const { getByRole } = render(<div style={{ width: 240, height: 180 }}>{content()}</div>);
      check(getByRole('progressbar'), false);
      await act(() => commands.setMotionPreference('reduce'));
      check(getByRole('progressbar'), true);
      await act(() => commands.setMotionPreference('no-preference'));
      check(getByRole('progressbar'), false);
    });

    it(`${kind} responds to provider changes and resumes system policy`, async () => {
      await commands.setMotionPreference('reduce');
      const { getByRole, rerender } = render(wrap(content(), false));
      check(getByRole('progressbar'), false);
      rerender(wrap(content(), true));
      check(getByRole('progressbar'), true);
      rerender(wrap(content(), false));
      check(getByRole('progressbar'), false);
      rerender(wrap(content()));
      check(getByRole('progressbar'), true);
    });

    it(`${kind} uses the nearest provider inside custom info`, () => {
      const nested = (
        <CustomProvider reduceMotion={false}>
          <div style={{ width: 120, height: 80 }}>{content()}</div>
        </CustomProvider>
      );
      const outer =
        kind === 'line' ? (
          line({ ...props, renderInfo: () => nested })
        ) : (
          <ProgressCircle percent={40} aria-label="Uploading" renderInfo={() => nested} />
        );
      const { getAllByRole } = render(wrap(outer, true));
      const [outerBar, innerBar] = getAllByRole('progressbar');
      if (kind === 'line') expectLineMotion(outerBar, true, props);
      else {
        expect(
          getComputedStyle(
            outerBar.querySelector(':scope > .rs-progress-circle-svg > .rs-progress-circle-stroke')!
          ).transitionDuration
        ).toBe('0s');
      }
      check(innerBar, false);
    });

    it(`${kind} keeps provider policy in control of the motion attribute`, () => {
      const control =
        kind === 'line' ? (
          line({ ...props, 'data-rs-motion': 'allow' } as ProgressLineProps)
        ) : (
          <ProgressCircle percent={40} aria-label="Uploading" data-rs-motion="allow" />
        );
      const { getByRole } = render(wrap(control, true));
      check(getByRole('progressbar'), true);
    });
  }

  it('updates known line percentages immediately under reduced motion', () => {
    const { getByRole, rerender } = render(wrap(line(), true));
    const bar = getByRole('progressbar');
    const stroke = bar.querySelector<HTMLElement>('.rs-progress-line-stroke')!;
    const initialWidth = stroke.getBoundingClientRect().width;
    rerender(wrap(line({ percent: 80 }), true));
    expect(bar).toHaveAttribute('aria-valuenow', '80');
    expect(stroke.style.width).toBe('80%');
    expect(getComputedStyle(stroke).transitionDuration).toBe('0s');
    expect(stroke.getBoundingClientRect().width).toBeGreaterThan(initialWidth);
  });

  it('updates circle paths immediately under reduced motion', () => {
    const { getByRole, rerender } = render(wrap(circle(), true));
    const bar = getByRole('progressbar');
    const stroke = bar.querySelector<SVGPathElement>('.rs-progress-circle-stroke')!;
    const initialLength = parseFloat(getComputedStyle(stroke).strokeDasharray);
    rerender(wrap(<ProgressCircle percent={80} gapDegree={60} aria-label="Uploading" />, true));
    expect(bar).toHaveAttribute('aria-valuenow', '80');
    expect(getComputedStyle(stroke).transitionDuration).toBe('0s');
    expect(parseFloat(getComputedStyle(stroke).strokeDasharray)).toBeGreaterThan(initialLength);
  });
});
