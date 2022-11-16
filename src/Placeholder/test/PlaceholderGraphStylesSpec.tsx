import React from 'react';
import { render } from '@testing-library/react';
import PlaceholderGraph from '../PlaceholderGraph';
import { getDOMNode, getStyle, toRGB } from '@test/testUtils';

import '../styles/index.less';

describe('PlaceholderGraph styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<PlaceholderGraph ref={instanceRef} />);
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'display'), 'inline-block', 'PlaceholderGraph display');
    assert.equal(
      getStyle(dom, 'backgroundColor'),
      toRGB('#f2f2f5'),
      'PlacePlaceholderGraphholder background-color'
    );
  });
});
