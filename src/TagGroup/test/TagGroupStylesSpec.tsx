import React from 'react';
import { render } from '@testing-library/react';
import { itChrome } from '@test/utils';
import TagGroup from '../TagGroup';
import '../../TagGroup/styles/index.less';
import '../../Tag/styles/index.less';

describe('TagGroup styles', () => {
  itChrome('Should render the correct styles', () => {
    const { container } = render(<TagGroup />);

    expect(container.firstChild).to.have.style('margin', '-10px 0px 0px -10px');
  });
});
