import React from 'react';
import Divider from '../index';
import { render } from '@testing-library/react';
import { toRGB } from '@test/utils';

import '../styles/index.less';

describe('Divider styles', () => {
  it('Should render the correct styles', () => {
    const { container } = render(<Divider />);

    expect(container.firstChild).to.have.style('background-color', toRGB('#e5e5ea'));
    expect(container.firstChild).to.have.style('height', '1px');
    expect(container.firstChild).to.have.style('margin', '24px 0px');
  });
});
