import React from 'react';
import { render } from '@testing-library/react';
import Grid from '../index';
import { getDOMNode, getStyle, itChrome } from '@test/testUtils';

import '../styles/index.less';

describe('Grid styles', () => {
  itChrome('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Grid ref={instanceRef} />);
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'padding'), '0px 5px');
  });
});
