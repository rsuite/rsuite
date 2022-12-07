import React from 'react';
import { render } from '@testing-library/react';
import FormHelpText from '../index';
import { getDOMNode, getStyle, toRGB } from '@test/testUtils';

import '../styles/index.less';

describe('FormHelpText styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLElement>();
    render(<FormHelpText ref={instanceRef} />);
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'display'), 'block', 'FormHelpText display');
    assert.equal(getStyle(dom, 'color'), toRGB('#8e8e93'), 'FormHelpText color');

    expect(dom).to.have.style('font-size', '12px');
    expect(dom).to.have.style('line-height', '20px');
  });
});
