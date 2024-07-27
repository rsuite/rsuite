import React from 'react';
import { render } from '@testing-library/react';
import InputNumber from '../index';
import { getStyle, toRGB, inChrome } from '@test/utils';

import '../styles/index.less';

describe('InputNumber styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();

    const { container } = render(<InputNumber ref={instanceRef} />);
    assert.equal(
      getStyle(container.firstChild as Element, 'backgroundColor'),
      toRGB('#fff'),
      'InputNumber background-color'
    );
    inChrome &&
      assert.equal(
        getStyle(container.firstChild as Element, 'border'),
        `1px solid ${toRGB('#e5e5ea')}`,
        'InputNumber border-color'
      );
    assert.equal(getStyle(container.firstChild as Element, 'height'), '36px', 'InputNumber height');
  });
});
