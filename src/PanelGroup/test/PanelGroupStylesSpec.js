import React from 'react';
import { render } from '@testing-library/react';
import PanelGroup from '../index';
import { getDOMNode, getStyle, itChrome } from '@test/testUtils';

import '../styles/index.less';

describe('PanelGroup styles', () => {
  itChrome('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    render(<PanelGroup ref={instanceRef} />);
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'borderRadius'), '6px', 'Panel border-radius');
  });
});
