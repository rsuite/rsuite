import React from 'react';
import { getDOMNode } from '@test/testUtils';

import PlaceholderGrid from '../PlaceholderGrid';

describe('PlaceholderGrid', () => {
  it('Should render a PlaceholderGrid', () => {
    const instance = getDOMNode(<PlaceholderGrid />);
    assert.equal(instance.tagName, 'DIV');
    assert.equal(instance.className, 'rs-placeholder rs-placeholder-grid');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<PlaceholderGrid style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<PlaceholderGrid classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should render 10 columns', () => {
    const instance = getDOMNode(<PlaceholderGrid columns={10} />);

    assert.equal(instance.children.length, 10);
  });

  it('Should render 10 rows', () => {
    const instance = getDOMNode(<PlaceholderGrid rows={10} />);

    assert.equal(instance.lastElementChild.children.length, 10);
  });

  it('Height of rows should be 50px', () => {
    const instance = getDOMNode(<PlaceholderGrid rowHeight={50} />);

    assert.equal(instance.lastElementChild.lastElementChild.style.height, '50px');
  });

  it('Should has a 50px gap between rows', () => {
    const instance = getDOMNode(<PlaceholderGrid rowMargin={50} />);

    assert.equal(instance.lastElementChild.lastElementChild.style.marginTop, '50px');
  });

  it('Should render nothing: rows=0', () => {
    const instance = getDOMNode(<PlaceholderGrid rows={0} />);

    assert.equal(instance.lastElementChild.children.length, 0);
  });

  it('Should render nothing: rows=-10', () => {
    const instance = getDOMNode(<PlaceholderGrid rows={-10} />);

    assert.equal(instance.lastElementChild.children.length, 0);
  });

  it('Should render nothing: columns=0', () => {
    const instance = getDOMNode(<PlaceholderGrid columns={0} />);

    assert.equal(instance.children.length, 0);
  });

  it('Should render nothing: columns=-10', () => {
    const instance = getDOMNode(<PlaceholderGrid columns={-10} />);

    assert.equal(instance.children.length, 0);
  });

  it('Should has animation', () => {
    const instance = getDOMNode(<PlaceholderGrid active />);

    assert.include(Array.from(instance.classList), 'rs-placeholder-active');
  });
});
