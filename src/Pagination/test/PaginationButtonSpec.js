/* eslint-disable react/prop-types */
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { innerText, getDOMNode } from '@test/testUtils';
import PaginationButton from '../PaginationButton';

describe('PaginationButton', () => {
  it('Should render a <button>', () => {
    const title = 'Test';
    const instance = getDOMNode(<PaginationButton>{title}</PaginationButton>);
    assert.equal(instance.tagName, 'BUTTON');
    assert.equal(innerText(instance), title);
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<PaginationButton disabled />);
    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should be active', () => {
    const instance = getDOMNode(<PaginationButton active />);
    assert.ok(instance.className.match(/\bactive\b/));
  });

  it('Should call onSelect callback', done => {
    const doneOp = eventKey => {
      if (eventKey === 10) {
        done();
      }
    };
    const instance = getDOMNode(<PaginationButton onSelect={doneOp} eventKey={10} />);
    ReactTestUtils.Simulate.click(instance);
  });

  it('Should call onClick callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<PaginationButton onClick={doneOp} eventKey={10} />);
    ReactTestUtils.Simulate.click(instance);
  });

  it('Custom elements can get the active prop', () => {
    const Button = React.forwardRef(({ active }, ref) => {
      return <span ref={ref}>{active ? 'active' : 'inactive'}</span>;
    });
    Button.displayName = 'Button';
    const activeInstance = getDOMNode(<PaginationButton active as={Button} />);
    const inactiveInstance = getDOMNode(<PaginationButton active={false} as={Button} />);
    assert.equal(activeInstance.innerText, 'active');
    assert.equal(inactiveInstance.innerText, 'inactive');
  });

  it('Custom elements can get the eventKey prop', () => {
    const Button = React.forwardRef(function Button({ eventKey, ...rest }, ref) {
      return (
        <span ref={ref} {...rest}>
          {eventKey}
        </span>
      );
    });
    const instance = getDOMNode(<PaginationButton eventKey={1} as={Button} />);
    assert.equal(instance.innerText, '1');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<PaginationButton className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<PaginationButton style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<PaginationButton classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
