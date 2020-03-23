import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { innerText, getDOMNode } from '@test/testUtils';
import PaginationButton from '../PaginationButton';

describe('PaginationButton', () => {
  it('Should render a li', () => {
    const title = 'Test';
    const instance = getDOMNode(<PaginationButton>{title}</PaginationButton>);
    assert.equal(instance.tagName, 'LI');
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
    ReactTestUtils.Simulate.click(instance.querySelector('a'));
  });

  it('Should call onClick callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<PaginationButton onClick={doneOp} eventKey={10} />);
    ReactTestUtils.Simulate.click(instance.querySelector('a'));
  });

  it('Should output a custom item', () => {
    const instance = getDOMNode(
      <PaginationButton
        renderItem={() => {
          return <span>custom</span>;
        }}
      />
    );
    assert.include(instance.querySelector('span').innerText, 'custom');
  });

  it('Custom elements can get the active prop', () => {
    const activeInstance = getDOMNode(
      <PaginationButton
        active
        componentClass={({ active }) => {
          return <span>{active ? 'active' : 'inactive'}</span>;
        }}
      />
    );
    const inactiveInstance = getDOMNode(
      <PaginationButton
        active={false}
        componentClass={({ active }) => {
          return <span>{active ? 'active' : 'inactive'}</span>;
        }}
      />
    );
    assert.equal(activeInstance.querySelector('span').innerText, 'active');
    assert.equal(inactiveInstance.querySelector('span').innerText, 'inactive');
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
