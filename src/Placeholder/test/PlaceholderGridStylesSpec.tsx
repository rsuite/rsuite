import React from 'react';
import { render } from '@testing-library/react';
import PlaceholderGrid from '../PlaceholderGrid';
import { getDOMNode, getStyle, inChrome } from '@test/testUtils';

import '../styles/index.less';

describe('PlaceholderGrid styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<PlaceholderGrid ref={instanceRef} />);
    const dom = getDOMNode(instanceRef.current);
    const theFirstColDom = dom.querySelector('.rs-placeholder-grid-col:first-child') as HTMLElement;
    const theSecondColDom = dom.querySelector(
      '.rs-placeholder-grid-col:nth-child(2)'
    ) as HTMLElement;
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
