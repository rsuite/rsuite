import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from '../index';
import { createTestContainer, getDOMNode, getStyle, toRGB } from '@test/testUtils';

import '../styles/index';

describe('Carousel styles', () => {
  it('Should render correct style ', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Carousel ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'backgroundColor'), toRGB('#8e8e93'), 'Carousel background-color');
  });
});
