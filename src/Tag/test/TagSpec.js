import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';

import Tag from '../Tag';

describe('Tag', () => {
  it('Should output a Tag', () => {
    const instance = getDOMNode(<Tag />);
    assert.equal(instance.className, 'rs-tag rs-tag-default');
  });

  it('Should call onClose callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <Tag closable onClose={doneOp}>
        tag
      </Tag>
    );
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-tag-icon-close'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Tag className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Tag style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Tag classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
