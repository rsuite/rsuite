import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import PlaceholderParagraph from '../PlaceholderParagraph';

describe('PlaceholderParagraph', () => {
  testStandardProps(<PlaceholderParagraph />);

  it('Should render a PlaceholderParagraph', () => {
    const instance = getDOMNode(<PlaceholderParagraph />);

    assert.equal(instance.tagName, 'DIV');
    assert.equal(instance.className, 'rs-placeholder rs-placeholder-paragraph');
  });

  it('Should render 5 rows', () => {
    const instance = getDOMNode(<PlaceholderParagraph rows={5} />);

    assert.equal((instance.lastElementChild as HTMLElement).children.length, 5);
  });

  it('Height of rows should be 50px', () => {
    const instance = getDOMNode(<PlaceholderParagraph rowHeight={50} />);

    assert.equal(
      ((instance.lastElementChild as HTMLElement).lastElementChild as HTMLElement).style.height,
      '50px'
    );
  });

  it('Should has a 50px gap between rows', () => {
    const instance = getDOMNode(<PlaceholderParagraph rowMargin={50} />);

    assert.equal(
      ((instance.lastElementChild as HTMLElement).lastElementChild as HTMLElement).style.marginTop,
      '50px'
    );
  });

  it('Should render graph', () => {
    const instance = getDOMNode(<PlaceholderParagraph graph />);

    assert.include(
      Array.from((instance.firstElementChild as HTMLElement).classList),
      'rs-placeholder-paragraph-graph'
    );
  });

  it('Should render circle graph', () => {
    const instance = getDOMNode(<PlaceholderParagraph graph="circle" />);

    assert.include(
      Array.from((instance.firstElementChild as HTMLElement).classList),
      'rs-placeholder-paragraph-graph-circle'
    );
  });

  it('Should render image graph', () => {
    const instance = getDOMNode(<PlaceholderParagraph graph="image" />);

    assert.include(
      Array.from((instance.firstElementChild as HTMLElement).classList),
      'rs-placeholder-paragraph-graph-image'
    );
  });

  it('Should has animation', () => {
    const instance = getDOMNode(<PlaceholderParagraph active />);

    assert.include(Array.from(instance.classList), 'rs-placeholder-active');
  });
});
