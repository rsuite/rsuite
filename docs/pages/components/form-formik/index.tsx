import React from 'react';
import DefaultPage from '@/components/Page';
import { Button, ButtonGroup, ButtonToolbar, InputNumber, Input, Stack, Form } from 'rsuite';
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
        ButtonGroup,
        ButtonToolbar,
        Stack,
        Form,
        Yup,
        useFormik
      }}
      sandboxDependencies={sandboxDependencies}
    />
  );
}
