import React from 'react';
import IntlProvider from '../IntlProvider';
import Pagination from '../../Pagination';
import { getDOMNode } from '@test/testUtils';
import zhCN from '../locales/zh_CN';

describe('IntlProvider', () => {
  it('Should render the correct local language', () => {
    const domNode = getDOMNode(
      <div>
        <IntlProvider locale={zhCN}>
          <Pagination pages={2} activePage={1} first last next prev />
        </IntlProvider>
      </div>
    );
    assert.equal(domNode.querySelectorAll('li span')[0].title, '第一页');
  });
});
