import React from 'react';
import { render } from '@testing-library/react';
import Tag from '../index';
import { toRGB } from '@test/utils';

import '../styles/index.less';

describe('Tag styles', () => {
  it('Should render the correct styles', () => {
    const { container } = render(<Tag>Text</Tag>);

    expect(container.firstChild).to.have.style('background-color', toRGB('#f7f7fa'));
    expect(container.firstChild).to.have.style('padding', '2px 8px');
    expect(container.firstChild).to.have.style('font-size', '12px');
    expect(container.firstChild).to.have.style('height', '24px');
  });
});
