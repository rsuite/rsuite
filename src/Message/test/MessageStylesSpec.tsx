import React from 'react';
import { render } from '@testing-library/react';
import Message from '../index';
import { getDOMNode, getStyle, toRGB } from '@test/testUtils';

import '../styles/index.less';

describe('Message styles', () => {
  it('Should render the correct background color', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Message ref={instanceRef} />);
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'backgroundColor'), toRGB('#f0f9ff'));
  });

  it('Icon should render the correct color', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Message showIcon type="info" ref={instanceRef} />);
    const icon = getDOMNode(instanceRef.current).querySelector('.rs-icon') as HTMLElement;
    assert.equal(getStyle(icon, 'color'), toRGB('#2196f3'));
  });
});
