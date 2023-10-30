import React from 'react';
import { render } from '@testing-library/react';
import Carousel from '../index';
import { toRGB } from '@test/testUtils';

import '../styles/index.less';

describe('Carousel styles', () => {
  it('Should render correct style ', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Carousel ref={instanceRef} />);

    expect(instanceRef.current).to.have.style('background-color', toRGB('#8e8e93'));
  });
});
