import React from 'react';
import { render } from '@testing-library/react';
import { getStyle, itChrome } from '@test/testUtils';
import TagGroup from '../TagGroup';

import '../../Tag/styles/index.less';

describe('TagGroup styles', () => {
  itChrome('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();

    render(<TagGroup ref={instanceRef} />);
    assert.equal(
      getStyle(instanceRef.current as HTMLElement, 'margin'),
      '-10px 0px 0px -10px',
      'TagGroup margin'
    );
  });
});
