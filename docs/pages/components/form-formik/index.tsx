import React from 'react';
import DefaultPage from '@/components/layout/Page';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button, NumberInput, Input, Stack, VStack, Form, DatePicker, Rate } from 'rsuite';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const sandboxDependencies = {
  formik: '^2.4.5',
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
        Stack,
        VStack,
        Form,
        Yup,
        useFormik
      }}
      sandboxDependencies={sandboxDependencies}
    />
  );
}
