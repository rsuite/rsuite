import React from 'react';
import { render } from '@testing-library/react';
import Divider from '../index';
import { getStyle, toRGB, inChrome } from '@test/testUtils';

import '../styles/index.less';

describe('Divider styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Divider ref={instanceRef} />);

    const element = instanceRef.current as HTMLElement;
    assert.equal(getStyle(element, 'backgroundColor'), toRGB('#e5e5ea'), 'Divider background');
    assert.equal(getStyle(element, 'height'), '1px', 'Divider height');
    inChrome && assert.equal(getStyle(element, 'margin'), '24px 0px', 'Divider margin');
  });
});
