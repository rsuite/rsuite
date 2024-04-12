import React from 'react';
import { render, screen } from '@testing-library/react';
import Form from '../index';
import Button from '../../Button';
import FormControlLabel from '../../FormControlLabel';

import '../styles/index.less';

describe('Form styles', () => {
  it('Should render the correct styles', () => {
    render(
      <Form layout="inline">
        <Button>Button</Button>
        <FormControlLabel>Label</FormControlLabel>
      </Form>
    );

    expect(screen.getByRole('button')).to.have.style('vertical-align', 'top');
    expect(screen.getByText('Label')).to.have.style('vertical-align', 'top');
    expect(screen.getByText('Label')).to.have.style('margin-top', '8px');
  });
});
