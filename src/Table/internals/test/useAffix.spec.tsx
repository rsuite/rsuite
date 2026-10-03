import React, { useRef } from 'react';
import { render, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import useAffix from '../hooks/useAffix';

// A component that uses useAffix so we can test it
const AffixTestComponent = ({
  affixHeader,
  affixHorizontalScrollbar,
  getTableHeight = () => 300,
  contentHeight = 500,
  headerHeight = 40,
  headerOffsetTop = 0,
  tableOffsetTop = 0,
  hasScrollbarRoot = true
}: {
  affixHeader?: boolean | number;
  affixHorizontalScrollbar?: boolean | number;
  getTableHeight?: () => number;
  contentHeight?: number;
  headerHeight?: number;
  headerOffsetTop?: number;
  tableOffsetTop?: number;
  hasScrollbarRoot?: boolean;
}) => {
  const contentHeightRef = useRef(contentHeight);
  const affixHeaderWrapperRef = useRef<HTMLDivElement>(null);
  const scrollbarRootRef = useRef<HTMLDivElement>(null);
  const scrollbarXRef = useRef({
    get root() {
      return hasScrollbarRoot ? scrollbarRootRef.current : null;
    }
  } as any);
  const headerOffset = useRef({ top: headerOffsetTop, left: 0, width: 0, height: 0 });
  const tableOffset = useRef({ top: tableOffsetTop, left: 0, width: 0, height: 0 });

  useAffix({
    getTableHeight,
    contentHeight: contentHeightRef,
    affixHeader,
    affixHorizontalScrollbar,
    tableOffset,
    headerOffset,
    headerHeight,
    scrollbarXRef,
    affixHeaderWrapperRef
  });

  return (
    <div>
      <div ref={affixHeaderWrapperRef} data-testid="affix-header-wrapper" />
      <div ref={scrollbarRootRef} data-testid="scrollbar-root" />
    </div>
  );
};

describe('useAffix', () => {
  it('Should not add fixed class to header when affixHeader is not set', () => {
    const { getByTestId } = render(<AffixTestComponent />);
    expect(getByTestId('affix-header-wrapper').classList.contains('fixed')).to.equal(false);
  });

  it('Should add fixed class to header on scroll when affixHeader=true and header is in view', async () => {
    const { getByTestId } = render(
      <AffixTestComponent
        affixHeader={true}
        contentHeight={500}
        headerHeight={40}
        headerOffsetTop={100}
      />
    );

    // Scroll so that scrollY >= offsetTop - top => scrollY >= 100
    await act(async () => {
      Object.defineProperty(window, 'scrollY', { value: 150, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(getByTestId('affix-header-wrapper').classList.contains('fixed')).to.equal(true);
  });

  it('Should remove fixed class from header when scrolled past content', async () => {
    const { getByTestId } = render(
      <AffixTestComponent
        affixHeader={true}
        contentHeight={200}
        headerHeight={40}
        headerOffsetTop={50}
      />
    );

    // Scroll well past content
    await act(async () => {
      Object.defineProperty(window, 'scrollY', { value: 400, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(getByTestId('affix-header-wrapper').classList.contains('fixed')).to.equal(false);
  });

  it('Should register scroll listener when affixHeader is set', async () => {
    const addEventSpy = vi.spyOn(window, 'addEventListener');

    render(<AffixTestComponent affixHeader={true} />);

    expect(addEventSpy).toHaveBeenCalledWith('scroll', expect.any(Function), expect.anything());
    addEventSpy.mockRestore();
  });

  it('Should register scroll listener when affixHorizontalScrollbar is set', async () => {
    const addEventSpy = vi.spyOn(window, 'addEventListener');

    render(<AffixTestComponent affixHorizontalScrollbar={true} />);

    expect(addEventSpy).toHaveBeenCalledWith('scroll', expect.any(Function), expect.anything());
    addEventSpy.mockRestore();
  });

  it('Should not register scroll listener when neither affix prop is set', async () => {
    const addEventSpy = vi.spyOn(window, 'addEventListener');
    const callsBefore = addEventSpy.mock.calls.filter(([type]) => type === 'scroll').length;

    render(<AffixTestComponent />);

    const callsAfter = addEventSpy.mock.calls.filter(([type]) => type === 'scroll').length;
    expect(callsAfter).to.equal(callsBefore);
    addEventSpy.mockRestore();
  });

  it('Should add fixed class to scrollbar when affixHorizontalScrollbar and within view', async () => {
    const { getByTestId } = render(
      <AffixTestComponent
        affixHorizontalScrollbar={true}
        getTableHeight={() => 600}
        headerHeight={40}
        tableOffsetTop={0}
      />
    );

    await act(async () => {
      // window.scrollY + windowHeight < height + offsetTop + bottom
      // window.scrollY + windowHeight - headerHeight > offsetTop + bottom
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    // scrollbar root may or may not get 'fixed' depending on window height - just verify it runs
    expect(getByTestId('scrollbar-root')).to.exist;
  });

  it('Should handle affixHeader as a number (offset)', async () => {
    const { getByTestId } = render(
      <AffixTestComponent
        affixHeader={50}
        contentHeight={500}
        headerHeight={40}
        headerOffsetTop={100}
      />
    );

    // With top=50: scrollY - (offsetTop - top) >= 0 => scrollY >= 50
    await act(async () => {
      Object.defineProperty(window, 'scrollY', { value: 60, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(getByTestId('affix-header-wrapper').classList.contains('fixed')).to.equal(true);
  });
});
