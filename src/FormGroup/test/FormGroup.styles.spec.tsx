import React from 'react';
import FormGroup from '../index';
import FormControl from '../../FormControl/index';
import Form from '../../Form/index';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import '../../FormControl/styles/index.scss';
import '../styles/index.scss';

describe('FormGroup styles', () => {
  it('Form layout horizontal Should render the correct styles', () => {
    render(
      <Form layout="horizontal">
        <FormGroup>
          <FormControl name="name" />
        </FormGroup>
      </Form>
    );

    expect(screen.getByTestId('form-control-wrapper')).to.have.style('float', 'inline-start');
  });
});
