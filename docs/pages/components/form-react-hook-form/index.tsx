import React from 'react';
import DefaultPage from '@/components/layout/Page';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button, NumberInput, Input, Form, DatePicker, Rate } from 'rsuite';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const sandboxDependencies = {
  'react-hook-form': '^7.50.1',
  yup: '^1.3.3'
};

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Input,
        NumberInput,
        Button,
        DatePicker,
        Rate,
        Form,
        Yup,
        Controller,
        yupResolver,
        useForm
      }}
      sandboxDependencies={sandboxDependencies}
    />
  );
}
