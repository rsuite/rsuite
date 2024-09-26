import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import Form from '../Form';
import FormControl from '../../FormControl';

describe('Form', () => {
  testStandardProps(<Form />);

  it('Should render a Form', () => {
    render(<Form aria-label="form">My Form</Form>);

    expect(screen.getByRole('form')).to.have.tagName('FORM');
    expect(screen.getByRole('form')).to.have.text('My Form');
  });

  it('Should be horizontal', () => {
    render(<Form aria-label="form" layout="horizontal" />);
    expect(screen.getByRole('form')).to.have.class('rs-form-horizontal');
  });

  it('Should be inline', () => {
    render(<Form aria-label="form" layout="inline" />);
    expect(screen.getByRole('form')).to.have.class('rs-form-inline');
  });

  it('Should be disabled', () => {
    render(
      <Form aria-label="form" disabled>
        <button type="submit">submit</button>
      </Form>
    );

    expect(screen.getByRole('form')).to.have.class('rs-form-disabled');
  });

  it('Should be readOnly', () => {
    render(<Form aria-label="form" readOnly />);

    expect(screen.getByRole('form')).to.have.class('rs-form-readonly');
  });

  it('Should be plaintext', () => {
    render(<Form aria-label="form" plaintext />);

    expect(screen.getByRole('form')).to.have.class('rs-form-plaintext');
  });

  it('Should have a value', () => {
    const values = {
      name: 'abc',
      email: 'aa@ss.com'
    };
    render(
      <Form formValue={values}>
        <FormControl name="name" />
        <FormControl name="email" />
      </Form>
    );

    expect(screen.getAllByRole('textbox')[0]).to.have.value(values.name);
    expect(screen.getAllByRole('textbox')[1]).to.have.value(values.email);
  });

  it('Should have a default values', () => {
    const values = {
      name: 'abc',
      email: 'aa@ss.com'
    };
    render(
      <Form formDefaultValue={values}>
        <FormControl name="name" />
        <FormControl name="email" />
      </Form>
    );

    expect(screen.getAllByRole('textbox')[0]).to.have.value(values.name);
    expect(screen.getAllByRole('textbox')[1]).to.have.value(values.email);
  });
});
