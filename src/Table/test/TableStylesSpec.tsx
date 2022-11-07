import React from 'react';
import { render } from '@testing-library/react';
import Table from '../index';
import { getStyle } from '@test/testUtils';

import '../styles/index.less';

const data = [
  {
    id: 1
  },
  {
    id: 2
  }
];

const { Column, HeaderCell, Cell } = Table;

describe('Table styles', () => {
  it('Should render the correct styles', () => {
    render(
      <Table data={data}>
        <Column>
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey="id" />
        </Column>
      </Table>
    );
    const dom = document.querySelector('.rs-table') as HTMLElement;
    // assert.equal(getStyle(dom, 'backgroundColor'), toRGB('#fff'), 'Table background-color');
    assert.equal(getStyle(dom, 'position'), 'relative', 'Table position');
  });
});
