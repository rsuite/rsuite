import React from 'react';
import Uploader from '../index';
import { render } from '@testing-library/react';
import { getStyle, toRGB } from '@test/testUtils';

import '../styles/index.less';

describe('Uploader styles', () => {
  it('Should render the correct styles', () => {
    const ref = React.createRef();

    render(<Uploader action="" ref={ref} />);

    const button = ref.current.root.querySelector('.rs-uploader-trigger-btn');
    assert.equal(
      getStyle(button, 'backgroundColor'),
      toRGB('#f7f7fa'),
      'Uploader trigger button background-color'
    );
  });
});
