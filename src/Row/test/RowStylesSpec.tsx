import React from 'react';
import { render } from '@testing-library/react';
import Row from '../index';
import { getDOMNode, getStyle, itChrome } from '@test/testUtils';

import '../styles/index.less';

describe('Row styles', () => {
  itChrome('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Row ref={instanceRef} />);
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'margin'), '0px -5px', 'Row margin');
  });
});
