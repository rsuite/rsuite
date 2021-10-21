import React from 'react';
import { render } from '@testing-library/react';
import TagGroup from '../index';
import { getStyle, itChrome } from '@test/testUtils';

describe('TagGroup styles', () => {
  itChrome('Should render the correct styles', () => {
    const instanceRef = React.createRef();

    render(<TagGroup ref={instanceRef} />);
    assert.equal(getStyle(instanceRef.current, 'margin'), '-10px 0px 0px -10px', 'TagGroup margin');
  });
});
