import React from 'react';
import { render } from '@testing-library/react';
import CheckTree from '../index';
import { getStyle, inChrome } from '@test/utils';
import { mockTreeData } from '@test/mocks/data-mock';

const data = mockTreeData([['Master', 'tester0', ['tester1', 'tester2']], 'disabled']);

describe('CheckTree styles', () => {
  it('Should render the correct styles', () => {
    render(<CheckTree virtualized={false} data={data} />);
    const itemLabel = document.body.querySelector(
      '.rs-check-tree .rs-check-tree-node'
    ) as HTMLElement;
    inChrome && assert.equal(getStyle(itemLabel, 'padding'), '0px 0px 0px 12px');
  });
});
