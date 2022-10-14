import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CheckPicker from '../index';
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

describe('CheckPicker styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    render(<CheckPicker data={data} ref={instanceRef} open />);
    const menuItemLabel = document.body.querySelector(
      '.rs-picker-check-menu-items .rs-checkbox-checker label'
    );
    inChrome && assert.equal(getStyle(menuItemLabel, 'padding'), '8px 12px 8px 38px');
  });

  it('Should change the width of the virtualized list', done => {
    const { getByRole } = render(
      <CheckPicker
        data={data}
        style={{ width: 400 }}
        virtualized
        onOpen={() => {
          expect(getByRole('listbox').firstChild.firstChild).to.style('width', '400px');
          done();
        }}
      />
    );

    fireEvent.click(getByRole('combobox'));
  });
});
