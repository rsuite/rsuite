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
          <Pagination pages={2} activePage={1} first last next prev />
        </CustomProvider>
      </div>
    );

    assert.equal(node.querySelectorAll('.rs-pagination-btn')[0].title, '第一页');
  });

  it('Should render correct placeholder', () => {
    const node = getDOMNode(
      <div>
        <CustomProvider locale={zhCN}>
          <TreePicker />
          <CheckTreePicker data={[]} />
        </CustomProvider>
      </div>
    );

    assert.equal(node.querySelectorAll('.rs-picker-toggle-placeholder')[0].innerText, '选择');
    assert.equal(node.querySelectorAll('.rs-picker-toggle-placeholder')[1].innerText, '选择');
  });

  it('Should render formatted date', () => {
    const node = getDOMNode(
      <div>
        <CustomProvider locale={ruRU}>
          <Calendar defaultValue={new Date('05/01/2021')} />
        </CustomProvider>
      </div>
    );
    assert.equal(node.querySelector('.rs-calendar-header-title').innerText, 'мая, 2021');
  });
});
