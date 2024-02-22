import React from 'react';
import DefaultPage from '@/components/Page';
import { Button, InputNumber, Input, Stack, Form, DatePicker, Rate } from 'rsuite';
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
        InputNumber,
        Button,
        DatePicker,
        Rate,
        Stack,
        Form,
        Yup,
        useFormik
      }}
      sandboxDependencies={sandboxDependencies}
    />
  );
}
