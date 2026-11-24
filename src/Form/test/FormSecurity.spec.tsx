import React from 'react';
import { act, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Form from '../Form';
import FormControl from '../../FormControl';
import type { FormInstance } from '../hooks/useFormRef';

const canary = '__rsuite_form_security_canary__';
const fieldName = `constructor.prototype.${canary}`;

function withPrototypeCanary(callback: () => void) {
  const descriptor = Object.getOwnPropertyDescriptor(Object.prototype, canary);
  Object.defineProperty(Object.prototype, canary, {
    value: 'preserved',
    configurable: true,
    enumerable: false
  });

  try {
    callback();
  } finally {
    if (descriptor) {
      Object.defineProperty(Object.prototype, canary, descriptor);
    } else {
      Reflect.deleteProperty(Object.prototype, canary);
    }
  }
}

describe('Form field path safety', () => {
  it('Should preserve prototype properties when clearing a field error', () => {
    const ref = React.createRef<FormInstance>();
    render(<Form ref={ref} />);
    expect(ref.current?.cleanErrorForField).to.be.a('function');

    withPrototypeCanary(() => {
      act(() => ref.current?.cleanErrorForField(fieldName));

      expect(Object.getOwnPropertyDescriptor(Object.prototype, canary)?.value).to.equal(
        'preserved'
      );
    });
  });

  it('Should preserve prototype properties when resetting an unmounted field', () => {
    const onChange = vi.fn();
    const props = { formDefaultValue: { safe: 'value' }, onChange };
    const { rerender } = render(
      <Form {...props}>
        <FormControl name={fieldName} shouldResetWithUnmount />
      </Form>
    );

    withPrototypeCanary(() => {
      rerender(<Form {...props} />);

      expect(onChange).toHaveBeenCalledWith({ safe: 'value' });
      expect(Object.getOwnPropertyDescriptor(Object.prototype, canary)?.value).to.equal(
        'preserved'
      );
    });
  });
});
