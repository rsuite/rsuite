import React from 'react';
import DefaultPage from '@/components/Page';
import { Button, InputNumber, Input, Form, DatePicker, Rate } from 'rsuite';
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
        InputNumber,
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
