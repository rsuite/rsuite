import React from 'react';
import { render } from '@testing-library/react';
import Panel from '../index';
import { getDOMNode, getStyle, toRGB, inChrome, itChrome } from '@test/testUtils';

import '../styles/index.less';

describe('Panel styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Panel ref={instanceRef} />);
    const dom = getDOMNode(instanceRef.current);
    inChrome && assert.equal(getStyle(dom, 'borderRadius'), '6px', 'Panel border-radius');
    assert.equal(getStyle(dom, 'overflow'), 'hidden', 'Panel overflow');
  });

  itChrome('Should render the correct border', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Panel ref={instanceRef} bordered />);
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'border'), `1px solid ${toRGB('#e5e5ea')}`);
  });
});
