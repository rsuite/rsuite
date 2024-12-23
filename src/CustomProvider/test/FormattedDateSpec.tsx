import React from 'react';
import { render } from '@testing-library/react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import CustomProvider from '../CustomProvider';
import FormattedDate from '../FormattedDate';

import ruRU from '../../locales/ru_RU';

function formatDate(date, formatStr) {
  return format(date, formatStr, {
    locale: ru
  });
}

describe('FormattedDate', () => {
  it('Should render formatted date ', () => {
    const { container } = render(
      <div>
        <CustomProvider locale={ruRU}>
          <div>
            <FormattedDate date={new Date('2020-01-01')} formatStr="MMM dd, yyyy" />
          </div>
        </CustomProvider>
      </div>
    );

    expect(container.firstChild).to.have.text('янв. 01, 2020');
  });

  it('Should render formatted date by formatDate', () => {
    const { container } = render(
      <div>
        <CustomProvider formatDate={formatDate}>
          <div>
            <FormattedDate date={new Date('2020-01-01')} formatStr="MMM dd, yyyy" />
          </div>
        </CustomProvider>
      </div>
    );

    expect(container.firstChild).to.have.text('янв. 01, 2020');
  });

  it('Should render default formatted date', () => {
    const { container } = render(
      <div>
        <FormattedDate date={new Date('2020-01-01')} formatStr="MMM dd, yyyy" />
      </div>
    );

    expect(container.firstChild).to.have.text('Jan 01, 2020');
  });
});
