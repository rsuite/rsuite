import React from 'react';
import { render } from '@testing-library/react';
import Table from '../index';

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
    expect(document.querySelector('.rs-table')).to.have.style('position', 'relative');
  });
});
