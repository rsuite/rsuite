import React from 'react';
import { ChakraProvider, Field, Input, defaultSystem } from '@chakra-ui/react';
import { HelperForm, type FieldViewProps } from './helper-engine';
import { fieldId } from '../domain';
import type { AdapterProps } from '../types';
function View({ name, label, value, error, type, onChange, onBlur, inputRef }: FieldViewProps) {
  return (
    <Field.Root invalid={!!error} required>
      <Field.Label htmlFor={fieldId(name)}>{label}</Field.Label>
      <Input
        id={fieldId(name)}
        name={name}
        type={type}
        value={value}
        ref={inputRef}
        onChange={event => onChange(event.currentTarget.value)}
        onBlur={onBlur}
      />
      <Field.ErrorText>{error}</Field.ErrorText>
    </Field.Root>
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
    <form noValidate aria-label="Account" onSubmit={onSubmit}>
      {children}
    </form>
  );
}
export default function Adapter(props: AdapterProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <HelperForm {...props} View={View} FormView={FormView} library="Chakra UI" />
    </ChakraProvider>
  );
}
