import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Timeline from '../Timeline';
import { render, screen } from '@testing-library/react';

describe('Timeline', () => {
  testStandardProps(<Timeline />);

  it('Should output a Timeline', () => {
    const instance = getDOMNode(<Timeline />);
    assert.ok(instance.className.match(/\brs-timeline\b/));
  });

  it('Should output a div', () => {
    const instance = getDOMNode(<Timeline as={'div'} />);
    assert.equal(instance.tagName, 'DIV');
  });

  it('Should be endless', () => {
    const instance = getDOMNode(<Timeline endless />);
    assert.ok(instance.className.match(/\bendless\b/));
  });

  it('Should have a with-time className', () => {
    const instance = getDOMNode(
      <Timeline>
        <Timeline.Item time="2018-03-01 16:27:42" />
      </Timeline>
    );
    assert.ok(instance.className.match(/\brs-timeline-with-time\b/));
  });

  it('Should have a custom align', () => {
    const instance = getDOMNode(<Timeline align="left" />);
    assert.ok(instance.className.match(/\brs-timeline-align-left\b/));
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
