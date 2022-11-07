import React from 'react';
import { render } from '@testing-library/react';
import TagPicker from '../index';
import { getStyle, inChrome } from '@test/testUtils';

import '../styles/index.less';

const data = [
  {
    label: 'Eugenia',
    value: 'Eugenia',
    role: 'Master'
  },
  {
    label: <span>Kariane</span>,
    value: 'Kariane',
    role: 'Master'
  },
  {
    label: 'Louisa',
    value: 'Louisa',
    role: 'Master'
  }
];

describe('TagPicker styles', () => {
  it('Should render the correct styles', () => {
    render(<TagPicker data={data} open />);
    const itemLabel = document.body.querySelector(
      '.rs-picker-check-menu-items .rs-checkbox-checker label'
    ) as HTMLElement;
    inChrome && assert.equal(getStyle(itemLabel, 'padding'), '8px 12px 8px 38px');
  });
});
