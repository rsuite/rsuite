import React from 'react';
import ReactDOM from 'react-dom';
import Table from '../index';
import {
  createTestContainer,
  getDOMNode,
  getStyle,
  toRGB,
  getDefaultPalette
} from '@test/testUtils';

import '../styles/index';

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
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Table data={data}>
        <Column>
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey="id" />
        </Column>
      </Table>,
      createTestContainer()
    );
    const dom = document.querySelector('.rs-table');
    assert.equal(getStyle(dom, 'backgroundColor'), toRGB('#fff'), 'Table background-color');
    assert.equal(getStyle(dom, 'position'), 'relative', 'Table position');
  });
});
