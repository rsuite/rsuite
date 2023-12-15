import React from 'react';
import Uploader from '../index';
import { render, screen } from '@testing-library/react';
import { toRGB } from '@test/utils';
import { UploaderInstance } from '../Uploader';

import '../styles/index.less';

describe('Uploader styles', () => {
  it('Should render the correct styles', () => {
    const ref = React.createRef<UploaderInstance>();

    render(<Uploader action="" ref={ref} />);

    expect(screen.getByRole('button')).to.have.style('background-color', toRGB('#f7f7fa'));
  });
});
