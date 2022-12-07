import React from 'react';
import { render } from '@testing-library/react';
import ButtonToolbar from '../ButtonToolbar';
import { getDOMNode, getStyle } from '@test/testUtils';

import '../styles/index.less';

describe('ButtonToolbar styles', () => {
  it('Should render the correct vertical align', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<ButtonToolbar ref={instanceRef} />);
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'line-height'), '0px');
  });
});
