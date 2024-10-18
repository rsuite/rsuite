import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomProvider from '../CustomProvider';
import Pagination from '../../Pagination';
import Calendar from '../../Calendar';
import zhCN from '../../locales/zh_CN';
import ruRU from '../../locales/ru_RU';
import TreePicker from '../../TreePicker';
import CheckTreePicker from '../../CheckTreePicker';
import Button from '../../Button';
import AddOutline from '@rsuite/icons/AddOutline';

describe('CustomProvider', () => {
  it('Should render the correct local language', () => {
    render(
      <div>
        <CustomProvider locale={zhCN}>
          <Pagination pages={2} activePage={1} first last next prev total={0} />
        </CustomProvider>
      </div>
    );

    expect(screen.getAllByRole('button')[0]).to.have.attribute('title', '第一页');
  });

  it('Should render correct placeholder', () => {
    render(
      <div>
        <CustomProvider locale={zhCN}>
          <TreePicker data={[]} />
          <CheckTreePicker data={[]} />
        </CustomProvider>
      </div>
    );

    expect(screen.getAllByRole('combobox')[0]).to.have.text('选择');
    expect(screen.getAllByRole('combobox')[1]).to.have.text('选择');
  });

  it('Should render formatted date', () => {
    render(
      <div>
        <CustomProvider locale={ruRU}>
          <Calendar defaultValue={new Date('05/01/2021')} />
        </CustomProvider>
      </div>
    );
    expect(screen.getByText('мая, 2021')).to.exist;
  });

  // TODO: This is a side-effect test, which will affect the style check test.
  it('Should be rendered as a dark theme', () => {
    render(
      <div>
        <CustomProvider theme="dark">
          <div />
        </CustomProvider>
      </div>
    );

    expect(document.body.classList.contains('rs-theme-dark')).to.be.true;

    document.body.classList.remove('rs-theme-dark');
  });

  it('Should be to disable the ripple effect', () => {
    render(
      <>
        <Button data-testid="btn-1">has ripple effect</Button>
        <CustomProvider disableRipple>
          <Button data-testid="btn-2">no ripple effect</Button>
        </CustomProvider>
      </>
    );

    expect(screen.getByRole('button', { name: 'has ripple effect' })).to.contain('.rs-ripple');
    expect(screen.getByRole('button', { name: 'no ripple effect' })).to.not.contain('.rs-ripple');
  });

  it('Should render the correct class prefix', () => {
    render(
      <CustomProvider classPrefix="my-">
        <AddOutline />
      </CustomProvider>
    );

    expect(screen.getByLabelText('add outline')).to.have.class('my-icon');
  });

  it('Should render the correct class prefix for icon', () => {
    render(
      <CustomProvider classPrefix="my-" iconClassPrefix="hy-">
        <AddOutline />
      </CustomProvider>
    );

    expect(screen.getByLabelText('add outline')).to.have.class('hy-icon');
  });
});
