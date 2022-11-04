import React from 'react';
import { render } from '@testing-library/react';
import FormControlLabel from '../index';
import { getDOMNode, getStyle } from '@test/testUtils';

import '../styles/index.less';

describe('FormControlLabel styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLLabelElement>();
    render(<FormControlLabel ref={instanceRef}>Title</FormControlLabel>);
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'marginBottom'), '4px');
  });
});
