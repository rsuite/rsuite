import React from 'react';
import { testStandardProps } from '@test/utils';
import Timeline from '../Timeline';
import { render, screen } from '@testing-library/react';

describe('Timeline', () => {
  testStandardProps(<Timeline />);

  it('Should output a Timeline', () => {
    const { container } = render(<Timeline />);
    expect(container.firstChild).to.have.class('rs-timeline');
  });

  it('Should output a div', () => {
    const { container } = render(<Timeline as={'div'} />);
    expect(container.firstChild).to.have.tagName('DIV');
  });

  it('Should be endless', () => {
    const { container } = render(<Timeline endless />);
    expect(container.firstChild).to.have.class('rs-timeline-endless');
  });

  it('Should have a with-time className', () => {
    const { container } = render(
      <Timeline>
        <Timeline.Item time="2018-03-01 16:27:42" />
      </Timeline>
    );
    expect(container.firstChild).to.have.class('rs-timeline-with-time');
  });

  it('Should have a custom align', () => {
    const { container } = render(<Timeline align="left" />);
    expect(container.firstChild).to.have.class('rs-timeline-align-left');
  });

  describe('Active item', () => {
    it('Should mark the last item as active by default', () => {
      render(
        <Timeline>
          <Timeline.Item>First item</Timeline.Item>
          <Timeline.Item>Second item</Timeline.Item>
          <Timeline.Item data-testid="last-item">Third item</Timeline.Item>
        </Timeline>
      );
      expect(screen.getByTestId('last-item')).to.have.class('rs-timeline-item-active');
    });

    it('Should mark the item indicated by `isItemActive` as active', () => {
      render(
        <Timeline isItemActive={index => index === 1}>
          <Timeline.Item>First item</Timeline.Item>
          <Timeline.Item data-testid="second-item">Second item</Timeline.Item>
          <Timeline.Item>Third item</Timeline.Item>
        </Timeline>
      );

      expect(screen.getByTestId('second-item')).to.have.class('rs-timeline-item-active');
    });

    it('Should mark the first item as active with `Timeline.ACTIVE_FIRST`', () => {
      render(
        <Timeline isItemActive={Timeline.ACTIVE_FIRST}>
          <Timeline.Item data-testid="first-item">First item</Timeline.Item>
          <Timeline.Item>Second item</Timeline.Item>
          <Timeline.Item>Third item</Timeline.Item>
        </Timeline>
      );
      expect(screen.getByTestId('first-item')).to.have.class('rs-timeline-item-active');
    });

    it('Should mark the last item as active with `Timeline.ACTIVE_LAST`', () => {
      render(
        <Timeline isItemActive={Timeline.ACTIVE_LAST}>
          <Timeline.Item>First item</Timeline.Item>
          <Timeline.Item>Second item</Timeline.Item>
          <Timeline.Item data-testid="last-item">Third item</Timeline.Item>
        </Timeline>
      );
      expect(screen.getByTestId('last-item')).to.have.class('rs-timeline-item-active');
    });
  });
});
