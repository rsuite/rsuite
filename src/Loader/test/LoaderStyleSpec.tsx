import React from 'react';
import { render } from '@testing-library/react';
import Loader from '../Loader';
import { getDOMNode, getStyle, toRGB, inChrome } from '@test/testUtils';

import '../styles/index.less';

describe('Loader styles', () => {
  it('Should render correct toggle styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Loader ref={instanceRef} />);
    const dom = getDOMNode(instanceRef.current);
    const spinDom = dom.querySelector('.rs-loader-spin') as HTMLElement;

    assert.equal(getStyle(dom, 'height'), '18px', 'Loader height');
    inChrome &&
      assert.equal(
        window.getComputedStyle(spinDom, '::before').border,
        `3px solid ${toRGB('#f7f7facc')}`,
        'Loader spin before border'
      );
    inChrome &&
      assert.equal(
        window.getComputedStyle(spinDom, '::after').borderColor,
        `${toRGB('#a6a6a6')} ${toRGB('#0000')} ${toRGB('#0000')}`,
        'Loader spin after border-color'
      );
  });
});
