import React from 'react';
import { render } from '@testing-library/react';
import StepItem from '../StepItem';
import { getDOMNode, getStyle, itChrome } from '@test/testUtils';

import '../styles/index.less';

describe('StepItem styles', () => {
  itChrome('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<StepItem ref={instanceRef} />);
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'paddingLeft'), '40px', 'StepItem padding-left');
  });
});
