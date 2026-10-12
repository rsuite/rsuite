import React from 'react';
import { describe, expect, it } from 'vitest';
import getTotalByColumns from '../utils/getTotalByColumns';
import Column from '../Column';
import Cell from '../Cell';
import HeaderCell from '../HeaderCell';

describe('getTotalByColumns', () => {
  const makeCol = (props: any) => (
    <Column {...props}>
      <HeaderCell>H</HeaderCell>
      <Cell dataKey="x" />
    </Column>
  );

  it('Should sum fixed widths of multiple columns', () => {
    const cols = [makeCol({ width: 100 }), makeCol({ width: 200 }), makeCol({ width: 50 })];
    const { totalWidth, totalFlexGrow } = getTotalByColumns(cols);
    expect(totalWidth).to.equal(350);
    expect(totalFlexGrow).to.equal(0);
  });

  it('Should sum flexGrow values', () => {
    const cols = [makeCol({ flexGrow: 1 }), makeCol({ flexGrow: 2 })];
    const { totalFlexGrow, totalWidth } = getTotalByColumns(cols);
    expect(totalFlexGrow).to.equal(3);
    expect(totalWidth).to.equal(0);
  });

  it('Should handle a mix of fixed and flex columns', () => {
    const cols = [makeCol({ width: 100 }), makeCol({ flexGrow: 1 })];
    const { totalWidth, totalFlexGrow } = getTotalByColumns(cols);
    expect(totalWidth).to.equal(100);
    expect(totalFlexGrow).to.equal(1);
  });

  it('Should handle a single plain object column', () => {
    const col = makeCol({ width: 80 });
    const { totalWidth, totalFlexGrow } = getTotalByColumns(col);
    expect(totalWidth).to.equal(80);
    expect(totalFlexGrow).to.equal(0);
  });

  it('Should handle a single flexGrow plain object column', () => {
    const col = makeCol({ flexGrow: 2 });
    const { totalWidth, totalFlexGrow } = getTotalByColumns(col);
    expect(totalWidth).to.equal(0);
    expect(totalFlexGrow).to.equal(2);
  });
});
