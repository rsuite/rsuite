import React from 'react';
import { describe, expect, it } from 'vitest';
import getColumnProps from '../utils/getColumnProps';
import Column from '../Column';
import Cell from '../Cell';
import HeaderCell from '../HeaderCell';

describe('getColumnProps', () => {
  it('Should return props from a plain Column element', () => {
    const col = (
      <Column width={100} align="center">
        <HeaderCell>H</HeaderCell>
        <Cell dataKey="name" />
      </Column>
    );

    const props = getColumnProps(col);
    expect(props.width).to.equal(100);
    expect(props.align).to.equal('center');
  });

  it('Should merge default props from a custom column', () => {
    const CustomColumn = React.forwardRef((props: any, ref: any) => {
      return <Column ref={ref} sortable align="left" width={200} {...props} />;
    });
    CustomColumn.displayName = 'CustomColumn';

    const col = (
      <CustomColumn align="right">
        <HeaderCell>H</HeaderCell>
        <Cell dataKey="id" />
      </CustomColumn>
    );

    const props = getColumnProps(col);
    // own props should override defaults
    expect(props.align).to.equal('right');
    // default from CustomColumn should be present
    expect(props.sortable).to.equal(true);
  });

  it('Should return empty object for default props when column type has no render', () => {
    const col = (
      <Column width={50}>
        <HeaderCell>H</HeaderCell>
        <Cell dataKey="x" />
      </Column>
    );
    const props = getColumnProps(col);
    expect(props.width).to.equal(50);
  });
});
