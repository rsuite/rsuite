import React from 'react';
import { render } from '@testing-library/react';
import Breadcrumb from '../index';
import { getStyle, itChrome } from '@test/testUtils';

import '../styles/index.less';

describe('Breadcrumb styles', () => {
  itChrome('Should render correct padding', () => {
    const instanceRef = React.createRef();

    render(<Breadcrumb ref={instanceRef} />);
    assert.equal(getStyle(instanceRef.current, 'padding'), '0px');
  });
});
