import React from 'react';
import IntlContext from '../IntlContext';
import FormattedDate from '../FormattedDate';
import { getDOMNode } from '@test/testUtils';
import format from 'date-fns/format';
import ru from 'date-fns/locale/ru';

function formatDate(data, formatStr) {
  return format(data, formatStr, {
    locale: ru
  });
}

describe('FormattedDate', () => {
  it('Should render formatted date ', () => {
    const domNode = getDOMNode(
      <div>
        <IntlContext.Provider value={{ formatDate }}>
          <div>
            <FormattedDate date={new Date('2020-01-01')} formatStr="MMM DD, YYYY" />
          </div>
        </IntlContext.Provider>
      </div>
    );
    assert.equal(domNode.innerText, 'янв. 01, 2020');
  });

  it('Should render default formatted date', () => {
    const domNode = getDOMNode(
      <div>
        <FormattedDate date={new Date('2020-01-01')} formatStr="MMM DD, YYYY" />
      </div>
    );
    assert.equal(domNode.innerText, 'Jan 01, 2020');
  });
});
