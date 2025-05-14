import React from 'react';
import Form from '../Form';
import FormControl from '../../FormControl';
import CustomProvider from '../../CustomProvider';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('Form', () => {
  testStandardProps(<Form />, {
    hasClassPrefix: false
  });

  it('Should render a Form', () => {
    render(<Form aria-label="form">My Form</Form>);

    expect(screen.getByRole('form')).to.have.tagName('FORM');
    expect(screen.getByRole('form')).to.have.text('My Form');
  });

  it('Should be horizontal', () => {
    render(<Form aria-label="form" layout="horizontal" />);
    expect(screen.getByRole('form')).to.have.contain('.rs-form-stack-horizontal');
  });

  it('Should be inline', () => {
    render(<Form aria-label="form" layout="inline" />);
    expect(screen.getByRole('form')).to.have.contain('.rs-form-stack-inline');
  });

  it('Should be disabled', () => {
    render(
      <Form aria-label="form" disabled>
        <button type="submit">submit</button>
      </Form>
    );

    expect(screen.getByRole('form')).to.have.attr('data-disabled', 'true');
  });

  it('Should be readOnly', () => {
    render(<Form aria-label="form" readOnly />);

    expect(screen.getByRole('form')).to.have.attr('data-readonly', 'true');
  });

  it('Should be plaintext', () => {
    render(<Form aria-label="form" plaintext />);

    expect(screen.getByRole('form')).to.have.attr('data-plaintext', 'true');
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

  it('Should have default layout as vertical in CustomProvider', () => {
    render(
      <CustomProvider
        components={{
          Form: {
            defaultProps: { layout: 'vertical' }
          }
        }}
      >
        <Form aria-label="form">
          <FormControl name="name" />
        </Form>
      </CustomProvider>
    );

    expect(screen.getByRole('form')).to.have.contain('.rs-form-stack-vertical');
  });
});
