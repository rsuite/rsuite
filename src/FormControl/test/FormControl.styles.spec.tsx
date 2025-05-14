import React from 'react';
import FormControl from '../index';
import Form from '../../Form';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { toRGB } from '@test/utils';
import '../../Input/styles/index.less';
import '../styles/index.less';

describe('Form control styles', () => {
  it('Should render the correct styles', () => {
    render(
      <Form>
        <FormControl name="name" />
      </Form>
    );

    expect(screen.getByTestId('form-control-wrapper')).to.have.style('position', 'relative');
    expect(screen.getByRole('textbox')).to.have.style('border', `1px solid ${toRGB('#e5e5ea')}`);
  });
});
