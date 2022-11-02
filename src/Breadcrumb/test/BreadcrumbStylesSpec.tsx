import React from 'react';
import { render } from '@testing-library/react';
import Breadcrumb from '../index';
import { getStyle, itChrome } from '@test/testUtils';

import '../styles/index.less';

describe('Breadcrumb styles', () => {
  itChrome('Should render correct padding', () => {
    const instanceRef = React.createRef<HTMLOListElement>();

    render(<Breadcrumb ref={instanceRef} />);
    assert.equal(getStyle(instanceRef.current as HTMLElement, 'padding'), '0px');
  });
});
