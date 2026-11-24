import React, { useEffect, useMemo, useRef, useState } from 'react';
import Form, { type FormInstance } from 'rsuite/Form';
import { StringType } from 'rsuite/Schema';
import 'rsuite/dist/rsuite.min.css';
import { Actions, BillingToggle, FieldFrame } from '../components';
import { emailValid, errors, fieldId, initialValues, passwordValid } from '../domain';
import { usernameAvailable } from '../api';
import type { AdapterProps, Values } from '../types';

export default function Adapter({ attach, onSubmit }: AdapterProps) {
  const defaults = useMemo(initialValues, []);
  const [values, setValues] = useState<Values>(initialValues);
  const [rows, setRows] = useState(['row-0']);
  const [billing, setBilling] = useState(false);
  const sequence = useRef(0);
  const current = useRef(values);
  current.current = values;
  const form = useRef<FormInstance<Values>>(null);
  const rules = useMemo(
    () => ({
      email: StringType().isRequired(errors.email).addRule(emailValid, errors.email),
      password: StringType().isRequired(errors.password).addRule(passwordValid, errors.password),
      confirmation: StringType()
        .isRequired(errors.confirmation)
        .addRule((value, data) => value === data.password, errors.confirmation),
      username: StringType()
        .isRequired(errors.username)
        .addAsyncRule(value => usernameAvailable(String(value)), errors.username),
      contact: StringType().isRequired(errors.contact).addRule(emailValid, errors.contact),
      company: StringType().isRequired(errors.company)
    }),
    []
  );
  useEffect(
    () =>
      attach({
        readValues: () => current.current,
        engine: 'RSuite Form + schema-typed',
        stateOwnership:
          'Adapter controls values from Form callbacks; application owns array splicing and conditional visibility.',
        validationOwnership:
          'Registered Form.Control schema rules and Form validation requests; domain predicates and async transport belong to application.'
      }),
    [attach]
  );
  const field = (
    name: string,
    label: string,
    rule: typeof rules.email,
    type = 'text',
    reset = false
  ) => (
    <FieldFrame name={name} key={name}>
      <Form.Group controlId={fieldId(name)}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          name={name.replace(/contacts\.(\d+)\./, 'contacts[$1].')}
          type={type}
          rule={rule}
          checkAsync={name === 'username'}
          shouldResetWithUnmount={reset}
          errorPlacement="static"
        />
      </Form.Group>
    </FieldFrame>
  );
  return (
    <Form
      ref={form}
      formDefaultValue={defaults}
      formValue={values}
      onChange={next => setValues(next as Values)}
      nestedField
      checkTrigger="blur"
      noValidate
      aria-label="Account"
      onSubmit={async value => {
        const result = await form.current!.checkAsync();
        if (!result.hasError && value) onSubmit(value);
      }}
    >
      {field('profile.email', 'Email', rules.email)}
      {field('password', 'Password', rules.password, 'password')}
      {field('confirmation', 'Confirm password', rules.confirmation, 'password')}
      {field('username', 'Username', rules.username)}
      {rows.map((key, index) => (
        <div data-contact-row key={key}>
          {field(`contacts.${index}.email`, `Contact ${index + 1} email`, rules.contact)}
          <button
            type="button"
            disabled={rows.length === 1}
            onClick={() => {
              setValues(previous => ({
                ...previous,
                contacts: previous.contacts.filter((_, i) => i !== index)
              }));
              setRows(previous => previous.filter((_, i) => i !== index));
            }}
          >
            Remove contact {index + 1}
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          setValues(previous => ({ ...previous, contacts: [...previous.contacts, { email: '' }] }));
          setRows(previous => [...previous, 'row-' + ++sequence.current]);
        }}
      >
        Add contact
      </button>
      <BillingToggle checked={billing} onChange={setBilling} />
      {billing && field('company', 'Company', rules.company, 'text', true)}
      <Actions
        reset={() => {
          form.current!.reset();
          setBilling(false);
          setRows(['row-0']);
        }}
      />
    </Form>
  );
}
