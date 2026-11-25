import React from 'react';
import { I18nProvider } from 'react-aria-components/I18nProvider';
import { TextField, Label, Input, FieldError, Form } from '@heroui/react';
import { HelperForm, type FieldViewProps } from './helper-engine';
import { fieldId } from '../domain';
import type { AdapterProps } from '../types';
import '../heroui.css';
function View({ name, label, value, error, type, onChange, onBlur, inputRef }: FieldViewProps) {
  return (
    <TextField
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      isRequired
      isInvalid={!!error}
      validationBehavior="aria"
    >
      <Label htmlFor={fieldId(name)}>{label}</Label>
      <Input id={fieldId(name)} type={type} ref={inputRef} />
      <FieldError>{error}</FieldError>
    </TextField>
  );
}
function FormView({
  children,
  onSubmit
}: {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}) {
  return (
    <Form validationBehavior="aria" aria-label="Account" onSubmit={onSubmit}>
      {children}
    </Form>
  );
}
export default function Adapter(props: AdapterProps) {
  return (
    <I18nProvider locale={props.direction === 'rtl' ? 'ar-AE' : 'en-US'}>
      <HelperForm {...props} View={View} FormView={FormView} library="HeroUI" />
    </I18nProvider>
  );
}
