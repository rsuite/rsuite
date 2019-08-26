import React from 'react';
import ReactDOM from 'react-dom';
import PlaceholderGrid from '../PlaceholderGrid';
import { createTestContainer, getDOMNode, getStyle, inChrome } from '@test/testUtils';

import '../styles/index';

describe('PlaceholderGrid styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<PlaceholderGrid ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    const theFirstColDom = dom.querySelector('.rs-placeholder-grid-col:first-child');
    const theSecondColDom = dom.querySelector('.rs-placeholder-grid-col:nth-child(2)');
    assert.equal(getStyle(dom, 'display'), 'flex', 'PlaceholderGrid display');
    assert.equal(
      getStyle(theFirstColDom, 'alignItems'),
      'flex-start',
      'The first placeholderGrid col align-items'
    );

    inChrome &&
      assert.equal(
        getStyle(theSecondColDom, 'flex'),
        '1 1 0%',
        'The first placeholderGrid col align-items'
      );
  });
});
