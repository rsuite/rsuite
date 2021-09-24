import React from 'react';
import ru from 'date-fns/locale/ru';
import CustomProvider from '../CustomProvider';
import FormattedDate from '../FormattedDate';
import { getDOMNode } from '@test/testUtils';
import { format } from '../../utils/dateUtils';
import ruRU from '../../locales/ru_RU';

function formatDate(date, formatStr) {
  return format(date, formatStr, {
    locale: ru
  });
}

describe('FormattedDate', () => {
  it('Should render formatted date ', () => {
    const domNode = getDOMNode(
      <div>
        <CustomProvider locale={ruRU}>
          <div>
            <FormattedDate date={new Date('2020-01-01')} formatStr="MMM dd, yyyy" />
          </div>
        </CustomProvider>
      </div>
    );
    assert.equal(domNode.innerText, 'янв. 01, 2020');
  });

  it('Should render formatted date by formatDate', () => {
    const domNode = getDOMNode(
      <div>
        <CustomProvider formatDate={formatDate}>
          <div>
            <FormattedDate date={new Date('2020-01-01')} formatStr="MMM dd, yyyy" />
          </div>
        </CustomProvider>
      </div>
    );
    assert.equal(domNode.innerText, 'янв. 01, 2020');
  });

  it('Should render default formatted date', () => {
    const domNode = getDOMNode(
      <div>
        <FormattedDate date={new Date('2020-01-01')} formatStr="MMM dd, yyyy" />
      </div>
    );
    assert.equal(domNode.innerText, 'Jan 01, 2020');
  });
});
