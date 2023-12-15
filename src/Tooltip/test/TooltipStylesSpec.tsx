import React from 'react';
import { render } from '@testing-library/react';
import Tooltip from '../Tooltip';
import { getDOMNode, getStyle, toRGB, inChrome } from '@test/utils';

import '../styles/index.less';

describe('Tooltip styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(
      <Tooltip ref={instanceRef} visible>
        Text
      </Tooltip>
    );
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'fontSize'), '12px', 'Tooltip font-size');
    assert.equal(
      getStyle(dom, 'backgroundColor'),
      toRGB('#272c36'),
      'Tooltip inner background-color'
    );
    inChrome && assert.equal(getStyle(dom, 'padding'), '2px 10px', 'Tooltip inner padding');
  });
});
