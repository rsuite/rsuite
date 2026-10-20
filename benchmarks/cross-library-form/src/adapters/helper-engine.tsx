import React, { useEffect, useState } from 'react';
import { useController, useFieldArray, useForm, type Control } from 'react-hook-form';
import { Actions, BillingToggle, FieldFrame } from '../components';
import { emailValid, errors, initialValues, passwordValid } from '../domain';
import { usernameAvailable } from '../api';
import type { AdapterProps, Values } from '../types';

type FieldName =
  | 'profile.email'
  | 'password'
  | 'confirmation'
  | 'username'
  | 'company'
  | `contacts.${number}.email`;
export interface FieldViewProps {
  name: string;
  label: string;
  type: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  inputRef: (element: HTMLInputElement | null) => void;
}
type View = React.ComponentType<FieldViewProps>;
function ControlledField({
  name,
  label,
  control,
  values,
  View
}: {
  name: FieldName;
  label: string;
  control: Control<Values>;
  values: () => Values;
  View: View;
}) {
  const { field, fieldState } = useController({
    name,
    control,
    shouldUnregister: name === 'company',
    rules: {
      validate: async value => {
        if (name === 'profile.email') return emailValid(value) || errors.email;
        if (name === 'password') return passwordValid(value) || errors.password;
        if (name === 'confirmation')
          return (!!value && value === values().password) || errors.confirmation;
        if (name === 'company') return !!value || errors.company;
        if (name === 'username')
          return (!!value && (await usernameAvailable(value))) || errors.username;
        return emailValid(value) || errors.contact;
      }
    }
  });
  return (
    <FieldFrame name={name}>
      <View
        name={name}
        label={label}
        type={['password', 'confirmation'].includes(name) ? 'password' : 'text'}
        value={field.value ?? ''}
        error={fieldState.error?.message}
        onChange={field.onChange}
        onBlur={field.onBlur}
        inputRef={field.ref}
      />
    </FieldFrame>
  );
}
export function HelperForm({
  attach,
  onSubmit,
  View,
  FormView,
  library
}: AdapterProps & {
  View: View;
  FormView: React.ComponentType<{
    children: React.ReactNode;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
  }>;
  library: string;
}) {
  const methods = useForm<Values>({
    defaultValues: initialValues(),
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  });
  const { fields, append, remove } = useFieldArray({ control: methods.control, name: 'contacts' });
  const [billing, setBilling] = useState(false);
  useEffect(
    () =>
      attach({
        readValues: methods.getValues,
        engine: 'React Hook Form composition',
        stateOwnership:
          'React Hook Form useForm/useFieldArray/Controller; application owns conditional visibility.',
        validationOwnership: `React Hook Form Controller validation and async requests; ${library} supplies field/error UI, with shared application predicates/transport.`
      }),
    [attach, methods.getValues, library]
  );
  const field = (name: FieldName, label: string) => (
    <ControlledField
      key={name}
      name={name}
      label={label}
      control={methods.control}
      values={methods.getValues}
      View={View}
    />
  );
  return (
    <FormView onSubmit={methods.handleSubmit(onSubmit)}>
      {field('profile.email', 'Email')}
      {field('password', 'Password')}
      {field('confirmation', 'Confirm password')}
      {field('username', 'Username')}
      {fields.map((row, index) => (
        <div data-contact-row key={row.id}>
          {field(`contacts.${index}.email`, `Contact ${index + 1} email`)}
          <button type="button" disabled={fields.length === 1} onClick={() => remove(index)}>
            Remove contact {index + 1}
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ email: '' })}>
        Add contact
      </button>
      <BillingToggle checked={billing} onChange={setBilling} />
      {billing && field('company', 'Company')}
      <Actions
        reset={() => {
          methods.reset(initialValues());
          setBilling(false);
        }}
      />
    </FormView>
  );
}
