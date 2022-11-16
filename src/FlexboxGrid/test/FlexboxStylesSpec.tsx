import React from 'react';
import { render } from '@testing-library/react';
import Flexbox from '../index';
import { getDOMNode, getStyle, inChrome } from '@test/testUtils';

import '../styles/index.less';

describe('Flexbox styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Flexbox ref={instanceRef} />);
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'display'), 'flex', 'Flexbox display');
    inChrome &&
      assert.equal(
        getStyle(getDOMNode(instanceRef.current), 'flexFlow'),
        'row wrap',
        'Flexbox flex-flow'
      );
  });

  it('Should render the correct aligned', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Flexbox ref={instanceRef} align="top" />);
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'alignItems'), 'flex-start');
  });
});
