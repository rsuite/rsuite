import React from 'react';
import { render } from '@testing-library/react';
import Carousel from '../index';
import { getDOMNode, getStyle, toRGB } from '@test/testUtils';

import '../styles/index.less';

describe('Carousel styles', () => {
  it('Should render correct style ', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Carousel ref={instanceRef} />);
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'backgroundColor'), toRGB('#8e8e93'), 'Carousel background-color');
  });
});
