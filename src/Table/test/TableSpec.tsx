import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from '../Table';
import CustomProvider from '../../CustomProvider';
import zhCN from '../../locales/zh_CN';

describe('Table', () => {
  it('Should custom empty message', () => {
    render(<Table locale={{ emptyMessage: 'No data' }} />);
    expect(screen.getByText('No data')).to.exist;
  });

  it('Should custom loading message', () => {
    render(<Table locale={{ loading: 'Loading...' }} loading />);
    expect(screen.getByText('Loading...')).to.exist;
  });

  describe('CustomProvider', () => {
    it('Should render empty message in CustomProvider', () => {
      render(
        <CustomProvider locale={zhCN}>
          <Table />
        </CustomProvider>
      );

      expect(screen.getByText('数据为空')).to.exist;
    });

    it('Should render loading message in CustomProvider', () => {
      render(
        <CustomProvider locale={zhCN}>
          <Table loading />
        </CustomProvider>
      );

      expect(screen.getByText('加载中...')).to.exist;
    });

    it('Should override empty message in CustomProvider', () => {
      render(
        <CustomProvider locale={zhCN}>
          <Table locale={{ emptyMessage: 'No data' }} />
        </CustomProvider>
      );

      expect(screen.getByText('No data')).to.exist;
    });

    it('Should override loading message in CustomProvider', () => {
      render(
        <CustomProvider locale={zhCN}>
          <Table locale={{ loading: 'Loading...' }} loading />
        </CustomProvider>
      );

      expect(screen.getByText('Loading...')).to.exist;
    });
  });
});
