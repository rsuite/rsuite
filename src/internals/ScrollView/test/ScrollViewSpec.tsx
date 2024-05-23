import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ScrollView from '../ScrollView';
import { testStandardProps } from '@test/utils';
import '../styles/index.less';

describe('ScrollView', () => {
  testStandardProps(<ScrollView />);

  it('Should hava a custom scrollbar', () => {
    render(<ScrollView customScrollbar data-testid="custom-scrollbar" />);

    expect(screen.getByTestId('custom-scrollbar')).to.have.class('rs-scroll-view-custom-scrollbar');
  });

  it('Should have a height', () => {
    render(<ScrollView height={100} data-testid="scroll-view" />);

    expect(screen.getByTestId('scroll-view')).to.have.style('height', '100px');
  });

  it('Should have a width', () => {
    render(<ScrollView width={100} data-testid="scroll-view" />);

    expect(screen.getByTestId('scroll-view')).to.have.style('width', '100px');
  });

  it('Should have a shadow class', () => {
    render(<ScrollView scrollShadow data-testid="scroll-shadow" />);

    const scrollView = screen.getByTestId('scroll-shadow');
    expect(scrollView).to.have.class('rs-scroll-view-shadow');
    expect(scrollView).to.not.have.class('rs-scroll-view-shadow-top');
  });

  it('Should have a shadow when scrolling', () => {
    render(
      <ScrollView scrollShadow data-testid="scroll-shadow" height={100}>
        <div style={{ height: 200 }}></div>
      </ScrollView>
    );

    const scrollView = screen.getByTestId('scroll-shadow');

    expect(scrollView).to.have.class('rs-scroll-view-shadow');
    expect(scrollView).to.have.class('rs-scroll-view-shadow-top');

    fireEvent.scroll(scrollView, { target: { scrollTop: 10 } });
    expect(scrollView).to.have.class('rs-scroll-view-shadow-middle');

    fireEvent.scroll(scrollView, { target: { scrollTop: 200 } });
    expect(scrollView).to.have.class('rs-scroll-view-shadow-bottom');
  });
});
