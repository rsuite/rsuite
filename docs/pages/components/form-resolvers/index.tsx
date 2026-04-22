import React from 'react';
import DefaultPage from '@/components/layout/Page';
import { Button, Input, Form } from 'rsuite';

const sandboxDependencies = {
  yup: '^1.3.3',
  zod: '^3.22.0',
  joi: '^17.12.0',
  ajv: '^8.12.0',
  'ajv-formats': '^3.0.1',
  superstruct: '^2.0.2',
  vest: '^5.0.0',
  valibot: '^0.30.0',
  'class-validator': '^0.14.1',
  'class-transformer': '^0.5.1',
  'io-ts': '^2.2.21',
  'fp-ts': '^2.16.2',
  typanion: '^3.14.0',
  '@sinclair/typebox': '^0.32.0',
  'nope-validator': '^0.9.0'
};

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Button,
        Input,
        Form
      }}
      sandboxDependencies={sandboxDependencies}
    />
  );
}
