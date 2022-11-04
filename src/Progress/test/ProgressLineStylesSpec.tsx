import React from 'react';
import { render } from '@testing-library/react';
import ProgressLine from '../ProgressLine';
import { getDOMNode, getStyle, toRGB, inChrome } from '@test/testUtils';

import '../styles/index.less';

describe('ProgressLine styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<ProgressLine ref={instanceRef} />);
    const dom = getDOMNode(instanceRef.current);
    const outerDom = dom.querySelector('.rs-progress-line-outer') as HTMLElement;
    const innerDom = dom.querySelector('.rs-progress-line-inner') as HTMLElement;
    const infoDom = dom.querySelector('.rs-progress-info') as HTMLElement;
    assert.equal(getStyle(dom, 'fontSize'), '16px', 'ProgressLine font-size');
    assert.equal(getStyle(dom, 'height'), '36px', 'ProgressLine height');
    inChrome &&
      assert.equal(getStyle(outerDom, 'borderRadius'), '5px', 'ProgressLine outer border-radius');
    assert.equal(
      getStyle(innerDom, 'backgroundColor'),
      toRGB('#e5e5ea'),
      'ProgressLine inner border-radius'
    );
    inChrome &&
      assert.equal(getStyle(infoDom, 'paddingLeft'), '12px', 'ProgressLine inner padding-left');
  });
});
