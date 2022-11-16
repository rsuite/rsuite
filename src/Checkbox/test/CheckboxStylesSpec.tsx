import React from 'react';
import { render } from '@testing-library/react';
import Checkbox from '../Checkbox';
import { getDOMNode, toRGB, itChrome } from '@test/testUtils';

import '../styles/index.less';

describe('Checkbox styles', () => {
  itChrome('Should render the correct border', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Checkbox ref={instanceRef} />);
    const innerDom = getDOMNode(instanceRef.current).querySelector(
      '.rs-checkbox-inner'
    ) as HTMLElement;
    assert.equal(
      window.getComputedStyle(innerDom, '::before').border,
      `1px solid ${toRGB('#d9d9d9')}`
    );
  });
});
