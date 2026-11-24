import Schema from '../../Schema';
import type { FormInstance } from '..';

export type Values = { name: string };
export type Adapter = 'schema' | 'resolver';
export type Method = 'check' | 'checkForField' | 'checkAsync' | 'checkForFieldAsync' | 'submit';
export const methods: Method[] = [
  'check',
  'checkForField',
  'checkAsync',
  'checkForFieldAsync',
  'submit'
];

export function invoke(method: Method, form: FormInstance) {
  if (method === 'checkForField' || method === 'checkForFieldAsync') {
    return form[method]('name');
  }
  return form[method]();
}

export function configuration(
  phase: string,
  inputs: { phase: string; data: Values }[],
  valid = true
) {
  const record = (value: string, data: Values) => {
    inputs.push({ phase, data });
    return valid && value === phase && data.name === phase;
  };
  return {
    model: Schema.Model({
      name: Schema.Types.StringType().addRule(
        (value, data) => record(value, data as Values),
        'Invalid'
      )
    }),
    resolver: (data: Record<string, any>) => ({
      errors: record(data.name, data as Values) ? {} : { name: 'Invalid' }
    })
  };
}
