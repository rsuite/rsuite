import React, { useEffect, useState } from 'react';
import { Form, Input, ConfigProvider } from 'antd';
import { Actions, BillingToggle, FieldFrame } from '../components';
import { emailValid, errors, fieldId, initialValues, passwordValid } from '../domain';
import { usernameAvailable } from '../api';
import type { AdapterProps, Values } from '../types';

export default function Adapter({ attach, onSubmit }: AdapterProps) {
  const [form] = Form.useForm<Values>();
  const [billing, setBilling] = useState(false);
  useEffect(
    () =>
      attach({
        readValues: () => form.getFieldsValue(true),
        engine: 'Ant Design Form',
        stateOwnership:
          'Form instance and Form.List own values and array operations; application owns conditional visibility.',
        validationOwnership:
          'Form.Item rules and validation requests; shared domain predicates and transport belong to application.'
      }),
    [attach, form]
  );
  const field = (
    path: Array<string | number>,
    label: string,
    kind: keyof typeof errors,
    type = 'text',
    preserve = true
  ) => {
    const name = path.join('.');
    return (
      <FieldFrame name={name} key={name}>
        <Form.Item
          name={path[0] === 'contacts' ? path.slice(1) : path}
          label={label}
          htmlFor={fieldId(name)}
          preserve={preserve}
          dependencies={kind === 'confirmation' ? ['password'] : undefined}
          rules={[
            {
              validator: async (_, value) => {
                const valid =
                  kind === 'email' || kind === 'contact'
                    ? emailValid(value)
                    : kind === 'password'
                      ? passwordValid(value)
                      : kind === 'confirmation'
                        ? !!value && value === form.getFieldValue('password')
                        : kind === 'company'
                          ? !!value
                          : !!value && (await usernameAvailable(value));
                if (!valid) throw new Error(errors[kind]);
              }
            }
          ]}
        >
          <Input id={fieldId(name)} type={type} />
        </Form.Item>
      </FieldFrame>
    );
  };
  return (
    <ConfigProvider theme={{ token: { fontFamily: 'Arial, sans-serif' } }}>
      <Form
        form={form}
        initialValues={initialValues()}
        layout="vertical"
        validateTrigger="onBlur"
        noValidate
        aria-label="Account"
        onFinish={onSubmit}
      >
        {field(['profile', 'email'], 'Email', 'email')}
        {field(['password'], 'Password', 'password', 'password')}
        {field(['confirmation'], 'Confirm password', 'confirmation', 'password')}
        {field(['username'], 'Username', 'username')}
        <Form.List name="contacts">
          {(rows, { add, remove }) => (
            <>
              {rows.map(row => (
                <div data-contact-row key={row.key}>
                  {field(
                    ['contacts', row.name, 'email'],
                    `Contact ${row.name + 1} email`,
                    'contact'
                  )}
                  <button
                    type="button"
                    disabled={rows.length === 1}
                    onClick={() => remove(row.name)}
                  >
                    Remove contact {row.name + 1}
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => add({ email: '' })}>
                Add contact
              </button>
            </>
          )}
        </Form.List>
        <BillingToggle checked={billing} onChange={setBilling} />
        {billing && field(['company'], 'Company', 'company', 'text', false)}
        <Actions
          reset={() => {
            form.resetFields();
            setBilling(false);
          }}
        />
      </Form>
    </ConfigProvider>
  );
}
