import React from 'react';
import { render, screen } from '@testing-library/react';
import FormControl from '../index';
import Form from '../../Form';
import { toRGB, itChrome } from '@test/utils';

import '../../Input/styles/index.less';
import '../styles/index.less';

describe('Form control styles', () => {
  itChrome('Should render the correct styles', () => {
    render(
      <Form>
        <FormControl name="name" />
      </Form>
    );

    expect(screen.getByTestId('form-control-wrapper')).to.have.style('position', 'relative');
    expect(screen.getByRole('textbox')).to.have.style('border', `1px solid ${toRGB('#e5e5ea')}`);
  });
});
