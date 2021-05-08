import React from 'react';
import CustomProvider from '../CustomProvider';
import Pagination from '../../Pagination';
import Calendar from '../../Calendar';
import { getDOMNode } from '@test/testUtils';
import zhCN from '../../locales/zh_CN';
import ruRU from '../../locales/ru_RU';

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
