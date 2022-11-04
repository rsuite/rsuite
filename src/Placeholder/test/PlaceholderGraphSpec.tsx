import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import PlaceholderGraph from '../PlaceholderGraph';

describe('PlaceholderGraph', () => {
  testStandardProps(<PlaceholderGraph />);

  it('Should render a PlaceholderGraph', () => {
    const instance = getDOMNode(<PlaceholderGraph />);

    assert.equal(instance.tagName, 'DIV');
    assert.equal(instance.className, 'rs-placeholder rs-placeholder-graph');
  });

  it('Height should be 100px', () => {
    const instance = getDOMNode(<PlaceholderGraph height={100} />);

    assert.equal(instance.style.height, '100px');
  });

  it('Width should be 100px', () => {
    const instance = getDOMNode(<PlaceholderGraph width={100} />);

    assert.equal(instance.style.width, '100px');
  });

  it('Should has animation', () => {
    const instance = getDOMNode(<PlaceholderGraph active />);

    assert.include(Array.from(instance.classList), 'rs-placeholder-active');
  });
});
