import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CheckPicker from '../index';
import { getStyle, inChrome } from '@test/testUtils';
import getWidth from 'dom-lib/getWidth';
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

describe('CheckPicker styles', () => {
  it('Should render the correct styles', () => {
    render(<CheckPicker data={data} open />);
    const menuItemLabel = document.body.querySelector(
      '.rs-picker-check-menu-items .rs-checkbox-checker label'
    ) as HTMLElement;
    inChrome && assert.equal(getStyle(menuItemLabel, 'padding'), '8px 12px 8px 38px');
  });

  it('Should change the width of the virtualized list', () => {
    render(<CheckPicker data={data} style={{ width: 400 }} virtualized />);

    fireEvent.click(screen.getByRole('combobox'));

    expect(
      getWidth((screen.getByRole('listbox').firstChild as HTMLElement).firstChild as HTMLElement)
    ).to.equal(400);
  });
});
