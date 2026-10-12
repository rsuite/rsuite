import React from 'react';
import { describe, expect, it } from 'vitest';
import getTableColumns from '../utils/getTableColumns';
import Column from '../Column';
import ColumnGroup from '../ColumnGroup';
import Cell from '../Cell';
import HeaderCell from '../HeaderCell';

describe('getTableColumns', () => {
  const makeCol = (key: string, width = 100) => (
    <Column key={key} width={width}>
      <HeaderCell>{key}</HeaderCell>
      <Cell dataKey={key} />
    </Column>
  );

  it('Should return plain columns unchanged', () => {
    const cols = [makeCol('a'), makeCol('b')];
    const result = getTableColumns(cols);
    expect(result).to.have.length(2);
  });

  it('Should filter out null/undefined children', () => {
    const cols = [makeCol('a'), null, undefined, makeCol('b')];
    const result = getTableColumns(cols);
    expect(result).to.have.length(2);
  });

  it('Should unwrap React.Fragment', () => {
    const cols = (
      <React.Fragment>
        {makeCol('x')}
        {makeCol('y')}
      </React.Fragment>
    );
    const result = getTableColumns(cols);
    expect(result).to.have.length(2);
  });

  it('Should flatten nested arrays', () => {
    const cols = [[makeCol('a'), makeCol('b')], makeCol('c')];
    const result = getTableColumns(cols);
    expect(result).to.have.length(3);
  });

  it('Should expand ColumnGroup children and set groupCount on first child', () => {
    const group = (
      <ColumnGroup header="Group" key="g">
        {makeCol('a')}
        {makeCol('b')}
      </ColumnGroup>
    );

    const result = getTableColumns([group]) as React.ReactElement<any>[];

    expect(result).to.have.length(2);
    // First column in group should have groupCount = 2
    expect(result[0].props.groupCount).to.equal(2);
    expect(result[0].props.groupHeader).to.equal('Group');
    // Second column should not have groupCount
    expect(result[1].props.groupCount).to.equal(undefined);
  });

  it('Should inherit align and verticalAlign from ColumnGroup when column does not set them', () => {
    const group = (
      <ColumnGroup header="G" align="center" verticalAlign="middle" key="g">
        {makeCol('a')}
      </ColumnGroup>
    );

    const result = getTableColumns([group]) as React.ReactElement<any>[];
    expect(result[0].props.align).to.equal('center');
    expect(result[0].props.verticalAlign).to.equal('middle');
  });

  it('Should prefer column own align over ColumnGroup align', () => {
    const group = (
      <ColumnGroup header="G" align="center" key="g">
        <Column width={100} align="left">
          <HeaderCell>a</HeaderCell>
          <Cell dataKey="a" />
        </Column>
      </ColumnGroup>
    );

    const result = getTableColumns([group]) as React.ReactElement<any>[];
    expect(result[0].props.align).to.equal('left');
  });

  it('Should handle a single (non-array) column', () => {
    const result = getTableColumns(makeCol('solo'));
    expect(result).to.have.length(1);
  });
});
