import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import Table from '../Table';
import CustomProvider from '../../CustomProvider';
import zhCN from '../../locales/zh_CN';

describe('Table SSR', () => {
  it('Should preserve provider locale, dimensions and RTL without document', () => {
    const html = renderToString(
      <CustomProvider
        rtl
        locale={zhCN}
        components={{ Table: { defaultProps: { width: 300, height: 200, loadAnimation: false } } }}
      >
        <Table data={[]}>
          <Table.Column width={100}>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.Cell dataKey="name" />
          </Table.Column>
        </Table>
      </CustomProvider>
    );

    expect(html).toContain('数据为空');
    expect(html).toContain('width:300px;height:200px');
    expect(html).toContain('right:0');
    expect(html).not.toContain('rs-table-loader-wrapper');
  });

  it('Should preserve instance defaults and loading locale precedence', () => {
    const html = renderToString(
      <CustomProvider
        locale={zhCN}
        components={{ Table: { defaultProps: { height: 200, loading: false } } }}
      >
        <Table height={150} loading locale={{ loading: 'Instance loading' }} />
      </CustomProvider>
    );

    expect(html).toContain('height:150px');
    expect(html).toContain('aria-busy="true"');
    expect(html).toContain('Instance loading');
  });
});
