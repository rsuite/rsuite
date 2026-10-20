import type { Values } from './types';
export const errors = {
  email: 'Enter a valid email',
  password: 'Use at least eight characters',
  confirmation: 'Passwords must match',
  username: 'Choose an available username',
  contact: 'Enter a valid contact email',
  company: 'Company is required'
};
export const initialValues = (): Values => ({
  profile: { email: 'seed@example.com' },
  password: 'initial123',
  confirmation: 'initial123',
  username: 'ready',
  contacts: [{ email: 'first@example.com' }]
});
export const emailValid = (value: unknown) =>
  typeof value === 'string' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
export const passwordValid = (value: unknown) => typeof value === 'string' && value.length >= 8;
export const fieldId = (name: string) => 'field-' + name.replace(/[^a-z0-9]/gi, '-');
