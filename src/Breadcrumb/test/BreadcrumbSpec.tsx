import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { act, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/commonCases';
import sinon from 'sinon';
import Breadcrumb from '../Breadcrumb';

afterEach(() => {
  sinon.restore();
});

describe('Breadcrumb', () => {
  testStandardProps(<Breadcrumb />);

  it('Should apply id to the wrapper nav element', () => {
    const { container } = render(<Breadcrumb id="custom-id" />);

    expect(container.firstChild).to.have.tagName('NAV');
    expect(container.firstChild).to.have.id('custom-id');
  });

  it('Should have breadcrumb class', () => {
    const { container } = render(<Breadcrumb />);

    expect(container.firstChild).to.have.class('rs-breadcrumb');
  });

  it('Should automatically collapse if there are more than 5 items', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item>1</Breadcrumb.Item>
        <Breadcrumb.Item>2</Breadcrumb.Item>
        <Breadcrumb.Item>3</Breadcrumb.Item>
        <Breadcrumb.Item>4</Breadcrumb.Item>
        <Breadcrumb.Item>5</Breadcrumb.Item>
        <Breadcrumb.Item>6</Breadcrumb.Item>
      </Breadcrumb>
    );

    expect(screen.getByRole('navigation')).to.have.text('1/.../6');
  });

  it('Should call onExpand callback', () => {
    const onExpand = sinon.spy();
    render(
      <Breadcrumb onExpand={onExpand}>
        <Breadcrumb.Item>1</Breadcrumb.Item>
        <Breadcrumb.Item>2</Breadcrumb.Item>
        <Breadcrumb.Item>3</Breadcrumb.Item>
        <Breadcrumb.Item>4</Breadcrumb.Item>
        <Breadcrumb.Item>5</Breadcrumb.Item>
        <Breadcrumb.Item>6</Breadcrumb.Item>
      </Breadcrumb>
    );

    act(() => {
      ReactTestUtils.Simulate.click(screen.getByText('...'));
    });

    expect(onExpand).to.have.been.calledOnce;
  });

  it('Should have a default separator', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item>1</Breadcrumb.Item>
        <Breadcrumb.Item>2</Breadcrumb.Item>
      </Breadcrumb>
    );

    expect(screen.getByText('/')).to.exist;
    expect(screen.getByRole('navigation')).to.have.text('1/2');
  });

  it('Should have a custom separator', () => {
    render(
      <Breadcrumb separator={<span>-</span>}>
        <Breadcrumb.Item>1</Breadcrumb.Item>
        <Breadcrumb.Item>2</Breadcrumb.Item>
      </Breadcrumb>
    );

    expect(screen.getByText('-')).to.exist;
    expect(screen.getByRole('navigation')).to.have.text('1-2');
  });

  it('Should not get "children with the same key" warning when generating items with array.map', () => {
    sinon.spy(console, 'error');

    const items = [{ text: 'Home', href: '/' }, { text: 'Current Page' }];

    render(
      <Breadcrumb>
        {items.map((item, index) => (
          <Breadcrumb.Item key={index} href={item.href} active={!item.href}>
            {item.text}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );

    expect(console.error).not.to.have.been.calledWith(
      sinon.match(/Warning: Encountered two children with the same key/)
    );
  });
});
