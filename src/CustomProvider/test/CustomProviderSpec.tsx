import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CustomProvider from '../CustomProvider';
import Pagination from '../../Pagination';
import Calendar from '../../Calendar';
import zhCN from '../../locales/zh_CN';
import ruRU from '../../locales/ru_RU';
import faIR from '../../locales/fa_IR';

import TreePicker from '../../TreePicker';
import CheckTreePicker from '../../CheckTreePicker';
import Button from '../../Button';

describe('CustomProvider', () => {
  it('Should render the correct local language', () => {
    render(
      <CustomProvider locale={zhCN}>
        <Pagination pages={2} activePage={1} first last next prev total={0} />
      </CustomProvider>
    );

    expect(screen.getAllByRole('button')[0]).to.have.attribute('title', '第一页');
  });

  it('Should render correct placeholder', () => {
    render(
      <CustomProvider locale={zhCN}>
        <TreePicker data={[]} />
        <CheckTreePicker data={[]} />
      </CustomProvider>
    );

    expect(screen.getAllByRole('combobox')[0]).to.have.text('选择');
    expect(screen.getAllByRole('combobox')[1]).to.have.text('选择');
  });

  it('Should render formatted date', () => {
    render(
      <CustomProvider locale={ruRU}>
        <Calendar defaultValue={new Date('05/01/2021')} />
      </CustomProvider>
    );

    expect(screen.getByRole('button', { name: 'Select month' })).to.have.text('мая, 2021');
  });

  // TODO: This is a side-effect test, which will affect the style check test.
  it('Should be rendered as a dark theme', () => {
    render(
      <CustomProvider theme="dark">
        <div />
      </CustomProvider>
    );

    expect(document.body.classList.contains('rs-theme-dark')).to.be.true;

    document.body.classList.remove('rs-theme-dark');
  });

  it('Should be to disable the ripple effect', () => {
    render(
      <>
        <Button>btn 1</Button>
        <CustomProvider disableRipple>
          <Button>btn 2</Button>
        </CustomProvider>
      </>
    );

    expect(screen.getByRole('button', { name: 'btn 1' })).to.contain('.rs-ripple');
    expect(screen.getByRole('button', { name: 'btn 2' })).to.not.contain('.rs-ripple');
  });

  it('Should render the correct local language with intlDateTimeFormat', () => {
    const { rerender } = render(
      <CustomProvider locale={faIR}>
        <Calendar defaultValue={new Date('2024-06-24')} />
      </CustomProvider>
    );

    expect(screen.getByRole('button', { name: 'Select month' })).to.have.text('جون, 2024');
    expect(screen.getByRole('gridcell', { name: 'می 26, 2024' })).to.have.text('26');

    rerender(
      <CustomProvider locale={faIR} intlDateTimeFormat>
        <Calendar defaultValue={new Date('2024-06-24')} />
      </CustomProvider>
    );

    expect(screen.getByRole('button', { name: 'Select month' })).to.have.text('تیر ۱۴۰۳');
    expect(screen.getByRole('gridcell', { name: '۶ خرداد ۱۴۰۳' })).to.have.text('۶');

    fireEvent.click(screen.getByRole('button', { name: 'Select month' }));

    expect(screen.getByRole('rowheader', { name: '۱۴۰۲' })).to.exist;
    expect(screen.getByRole('gridcell', { name: 'تیر ۱۴۰۳' })).to.have.text('۴');
  });
});
