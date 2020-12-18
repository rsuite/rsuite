import React from 'react';
import CustomProvider from '../CustomProvider';
import Pagination from '../../Pagination';
import { getDOMNode } from '@test/testUtils';
import zhCN from '../../locales/zh_CN';

describe('CustomProvider', () => {
  it('Should render the correct local language', () => {
    const domNode = getDOMNode(
      <div>
        <CustomProvider locale={zhCN}>
          <Pagination pages={2} activePage={1} first last next prev />
        </CustomProvider>
      </div>
    );

    assert.equal(domNode.querySelectorAll('.rs-pagination-btn')[0].title, '第一页');
  });
});
