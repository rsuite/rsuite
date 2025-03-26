import React from 'react';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import TimelineItem from '../TimelineItem';

describe('TimelineItem', () => {
  testStandardProps(<TimelineItem />);

  it('Should output a TimelineItem', () => {
    const { container } = render(<TimelineItem />);
    expect(container.firstChild).to.have.class('rs-timeline-item');
    expect(container.querySelector('.rs-timeline-item-dot')).to.have.class('rs-timeline-item-dot');
    expect(container.querySelector('.rs-timeline-item-tail')).to.have.class(
      'rs-timeline-item-tail'
    );
  });

  it('Should render a dot', () => {
    const { container } = render(<TimelineItem dot={<i>test</i>} />);
    expect(container.firstChild).to.have.text('test');
  });

  it('Should render a time', () => {
    const time = '2019-10-21';
    const { container } = render(<TimelineItem time={time} />);
    expect(container.firstChild).to.have.text(time);
  });

  it('Should output the last item', () => {
    const { container } = render(<TimelineItem last />);
    expect(container.firstChild).to.have.class('rs-timeline-item-last');
  });

  describe('Internal', () => {
    it('Should have "rs-timeline-item-active" className when `INTERNAL_active=true`', () => {
      const { container } = render(<TimelineItem INTERNAL_active />);

      expect(container.firstChild).to.have.class('rs-timeline-item-active');
    });
  });
});
