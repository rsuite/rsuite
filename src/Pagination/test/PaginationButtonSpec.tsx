/* eslint-disable react/prop-types */
import React, { Ref } from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import PaginationButton, { PaginationButtonProps } from '../PaginationButton';
import Sinon from 'sinon';

describe('PaginationButton', () => {
  it('Should render a <button>', () => {
    const title = 'Test';
    const instance = getDOMNode(<PaginationButton eventKey="">{title}</PaginationButton>);
    assert.equal(instance.tagName, 'BUTTON');
    assert.equal(instance.textContent, title);
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<PaginationButton eventKey="" disabled />);
    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should be active', () => {
    const instance = getDOMNode(<PaginationButton eventKey="" active />);
    assert.ok(instance.className.match(/\bactive\b/));
  });

  it('Should call onSelect callback with correct eventKey', () => {
    const onSelect = Sinon.spy();
    const instance = getDOMNode(<PaginationButton onSelect={onSelect} eventKey={10} />);
    ReactTestUtils.Simulate.click(instance);

    expect(onSelect).to.have.been.calledWith(10);
  });

  it('Should call onClick callback', () => {
    const onClick = Sinon.spy();
    const instance = getDOMNode(<PaginationButton onClick={onClick} eventKey={10} />);
    ReactTestUtils.Simulate.click(instance);

    expect(onClick).to.have.been.calledOnce;
  });

  it('Custom elements can get the active prop', () => {
    const Button = React.forwardRef(({ active }: PaginationButtonProps, ref: Ref<HTMLElement>) => {
      return <span ref={ref}>{active ? 'active' : 'inactive'}</span>;
    });
    Button.displayName = 'Button';
    const activeInstance = getDOMNode(<PaginationButton eventKey="" active as={Button} />);
    const inactiveInstance = getDOMNode(
      <PaginationButton eventKey="" active={false} as={Button} />
    );
    assert.equal(activeInstance.textContent, 'active');
    assert.equal(inactiveInstance.textContent, 'inactive');
  });

  it('Custom elements can get the eventKey prop', () => {
    const Button = React.forwardRef(function Button(
      { eventKey, ...rest }: PaginationButtonProps,
      ref: Ref<HTMLElement>
    ) {
      return (
        <span ref={ref} {...(rest as any)}>
          {eventKey}
        </span>
      );
    });
    const instance = getDOMNode(<PaginationButton eventKey={1} as={Button} />);
    assert.equal(instance.textContent, '1');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<PaginationButton eventKey="" className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<PaginationButton eventKey="" style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<PaginationButton eventKey="" classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
