import React from 'react';
import { render } from '@testing-library/react';
import Tag from '../index';
import { getDOMNode, getStyle, toRGB, inChrome } from '@test/testUtils';

import '../styles/index.less';

describe('Tag styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Tag ref={instanceRef}>Text</Tag>);
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'backgroundColor'), toRGB('#f7f7fa'), 'Tag background-color');
    inChrome && assert.equal(getStyle(dom, 'padding'), '2px 8px', 'Tag padding');
    assert.equal(getStyle(dom, 'fontSize'), '12px', 'Tag font-size');
    assert.equal(getStyle(dom, 'height'), '24px', 'Tag height');
  });
});
