import React from 'react';
import CustomProvider from '../CustomProvider';
import Pagination from '../../Pagination';
import Calendar from '../../Calendar';
import { getDOMNode } from '@test/testUtils';
import zhCN from '../../locales/zh_CN';
import ruRU from '../../locales/ru_RU';
import TreePicker from '../../TreePicker';
import CheckTreePicker from '../../CheckTreePicker';

describe('CustomProvider', () => {
  it('Should render the correct local language', () => {
    const node = getDOMNode(
      <div>
        <CustomProvider locale={zhCN}>
          <Pagination pages={2} activePage={1} first last next prev total={0} />
        </CustomProvider>
      </div>
    );

    assert.equal((node.querySelectorAll('.rs-pagination-btn')[0] as HTMLElement).title, '第一页');
  });

  it('Should render correct placeholder', () => {
    const node = getDOMNode(
      <div>
        <CustomProvider locale={zhCN}>
          <TreePicker data={[]} />
          <CheckTreePicker data={[]} />
        </CustomProvider>
      </div>
    );

    assert.equal(node.querySelectorAll('.rs-picker-toggle-placeholder')[0].textContent, '选择');
    assert.equal(node.querySelectorAll('.rs-picker-toggle-placeholder')[1].textContent, '选择');
  });

  it('Should render formatted date', () => {
    const node = getDOMNode(
      <div>
        <CustomProvider locale={ruRU}>
          <Calendar defaultValue={new Date('05/01/2021')} />
        </CustomProvider>
      </div>
    );
    assert.equal(
      (node.querySelector('.rs-calendar-header-title') as HTMLElement).textContent,
      'мая, 2021'
    );
  });

  // TODO: This is a side-effect test, which will affect the style check test.
  it('Should be rendered as a dark theme', () => {
    getDOMNode(
      <div>
        <CustomProvider theme="dark">
          <div />
        </CustomProvider>
      </div>
    );

    assert.include(document.body.classList.toString(), 'rs-theme-dark');
    document.body.classList.remove('rs-theme-dark');
  });
});
