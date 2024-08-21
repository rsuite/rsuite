import React from 'react';
import { render } from '@testing-library/react';
import InputNumber from '../index';
import { getStyle, toRGB, inChrome } from '@test/utils';

import '../styles/index.less';

describe('InputNumber styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();

    const { container } = render(<InputNumber ref={instanceRef} />);
    expect(getStyle(container.firstChild as Element, 'backgroundColor')).to.equal(toRGB('#fff'));
    inChrome &&
      expect(getStyle(container.firstChild as Element, 'border')).to.equal(
        `1px solid ${toRGB('#e5e5ea')}`,
        'InputNumber border-color'
      );
    expect(getStyle(container.firstChild as Element, 'height')).to.equal('36px');
  });
});
