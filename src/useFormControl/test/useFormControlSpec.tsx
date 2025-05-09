import React, { useState } from 'react';
import sinon from 'sinon';
import Toggle from '@/Toggle';
import Schema from '@/Schema';
import Form from '@/Form';
import { render, fireEvent, screen } from '@testing-library/react';
import { FormProvider, FormValueProvider } from '@/Form/FormContext';
import { useFormControl } from '../useFormControl';

// Test wrapper component
interface TestComponentProps {
  name: string;
  value?: any;
  checkTrigger?: any;
  errorMessage?: React.ReactNode;
  checkAsync?: boolean;
  shouldResetWithUnmount?: boolean;
  rule?: any;
  contextValue?: any;
  formValue?: any;
  accepter?: React.ElementType;
  id?: string;
  checked?: boolean;
}

function TestComponent({
  name,
  value,
  checkTrigger,
  errorMessage,
  checkAsync,
  shouldResetWithUnmount,
  rule,
  accepter,
  id
}: TestComponentProps) {
  const {
    value: fieldValue,
    error,
    plaintext,
    readOnly,
    disabled,
    onChange,
    onBlur,
    onCheck,
    setValue
  } = useFormControl({
    name,
    value,
    checkTrigger,
    errorMessage,
    checkAsync,
    shouldResetWithUnmount,
    rule
  });

  return (
    <div data-testid="test-component">
      {accepter === Toggle ? (
        <Toggle
          data-testid="test-toggle"
          checked={!!fieldValue}
          onChange={(checked, e) => onChange(checked, e)}
          onBlur={() => onBlur()}
          id={id}
        />
      ) : (
        <input
          data-testid="test-input"
          value={fieldValue || ''}
          onChange={e => onChange(e.target.value, e)}
          onBlur={() => onBlur()}
          id={id}
          aria-invalid={!!error}
          aria-errormessage={error ? `${id || 'field'}-error-message` : undefined}
        />
      )}
      <button data-testid="check-button" onClick={() => onCheck(fieldValue)}>
        Check
      </button>
      <button data-testid="set-value-button" onClick={() => setValue('programmatic-value', true)}>
        Set Value
      </button>
      {error && (
        <div data-testid="error-message" role="alert" id={`${id || 'field'}-error-message`}>
          {error}
        </div>
      )}
      <div data-testid="field-value">{fieldValue}</div>
      <div data-testid="plaintext">{String(plaintext)}</div>
      <div data-testid="readonly">{String(readOnly)}</div>
      <div data-testid="disabled">{String(disabled)}</div>
    </div>
  );
}

// Form context wrapper for testing
interface FormWrapperProps {
  children: React.ReactNode;
  formValue?: any;
  [key: string]: any;
}

function FormWrapper({ children, formValue = {}, ...contextProps }: FormWrapperProps) {
  return (
    <FormProvider value={contextProps}>
      <FormValueProvider value={formValue}>{children}</FormValueProvider>
    </FormProvider>
  );
}

describe('useFormControl', () => {
  it('Should throw error when used outside Form context', () => {
    sinon.spy(console, 'error');
    render(<TestComponent name="name" />);

    expect(console.error).to.have.been.calledWith(
      '<useFormControl> must be used inside a component decorated with <Form>. And need to update React to 16.6.0 +.'
    );
  });

  it('Should correctly use field value from context', () => {
    const formValue = { name: 'test-value' };

    render(
      <FormWrapper formValue={formValue} onFieldChange={() => {}}>
        <TestComponent name="name" />
      </FormWrapper>
    );

    expect(screen.getByTestId('field-value').textContent).to.equal('test-value');
  });

  it('Should prioritize controlled value passed as prop', () => {
    const formValue = { name: 'test-value' };

    render(
      <FormWrapper formValue={formValue} onFieldChange={() => {}}>
        <TestComponent name="name" value="controlled-value" />
      </FormWrapper>
    );

    expect(screen.getByTestId('field-value').textContent).to.equal('controlled-value');
  });

  it('Should call onFieldChange when value changes', () => {
    const onFieldChange = sinon.spy();

    render(
      <FormWrapper onFieldChange={onFieldChange}>
        <TestComponent name="name" />
      </FormWrapper>
    );

    fireEvent.change(screen.getByTestId('test-input'), { target: { value: 'new-value' } });

    expect(onFieldChange).to.have.been.calledWith('name', 'new-value', sinon.match.any);
  });

  it('Should call checkFieldForNextValue when value changes and checkTrigger is change', () => {
    const checkFieldForNextValue = sinon.spy();

    render(
      <FormWrapper
        onFieldChange={() => {}}
        checkFieldForNextValue={checkFieldForNextValue}
        checkTrigger="change"
      >
        <TestComponent name="name" />
      </FormWrapper>
    );

    fireEvent.change(screen.getByTestId('test-input'), { target: { value: 'new-value' } });

    expect(checkFieldForNextValue).to.have.been.called;
  });

  it('Should call checkFieldForNextValue when blur occurs and checkTrigger is blur', () => {
    const checkFieldForNextValue = sinon.spy();

    render(
      <FormWrapper
        onFieldChange={() => {}}
        checkFieldForNextValue={checkFieldForNextValue}
        checkTrigger="blur"
      >
        <TestComponent name="name" />
      </FormWrapper>
    );

    fireEvent.blur(screen.getByTestId('test-input'));

    expect(checkFieldForNextValue).to.have.been.called;
  });

  it('Should not call checkFieldForNextValue when checkTrigger is null', () => {
    const checkFieldForNextValue = sinon.spy();

    render(
      <FormWrapper
        onFieldChange={() => {}}
        checkFieldForNextValue={checkFieldForNextValue}
        checkTrigger={null}
      >
        <TestComponent name="name" />
      </FormWrapper>
    );

    fireEvent.change(screen.getByTestId('test-input'), { target: { value: 'new-value' } });
    fireEvent.blur(screen.getByTestId('test-input'));

    expect(checkFieldForNextValue).to.not.have.been.called;
  });

  it('Should call checkFieldAsyncForNextValue when checkAsync is true', () => {
    const checkFieldAsyncForNextValue = sinon.spy();

    render(
      <FormWrapper
        onFieldChange={() => {}}
        checkFieldAsyncForNextValue={checkFieldAsyncForNextValue}
        checkTrigger="change"
      >
        <TestComponent name="name" checkAsync={true} />
      </FormWrapper>
    );

    fireEvent.change(screen.getByTestId('test-input'), { target: { value: 'new-value' } });

    expect(checkFieldAsyncForNextValue).to.have.been.called;
  });

  it('Should correctly display error message', () => {
    const formError = { name: 'error-message' };

    render(
      <FormWrapper onFieldChange={() => {}} formError={formError} errorFromContext={true}>
        <TestComponent name="name" />
      </FormWrapper>
    );

    expect(screen.getByTestId('error-message').textContent).to.equal('error-message');
  });

  it('Should call removeFieldValue when component unmounts and shouldResetWithUnmount is true', () => {
    const removeFieldValue = sinon.spy();
    const { unmount } = render(
      <FormWrapper onFieldChange={() => {}} removeFieldValue={removeFieldValue}>
        <TestComponent name="name" shouldResetWithUnmount={true} />
      </FormWrapper>
    );

    unmount();

    expect(removeFieldValue).to.have.been.calledWith('name');
  });

  it('Should allow manually calling onCheck for form validation', () => {
    const checkFieldForNextValue = sinon.spy();

    render(
      <FormWrapper onFieldChange={() => {}} checkFieldForNextValue={checkFieldForNextValue}>
        <TestComponent name="name" />
      </FormWrapper>
    );

    fireEvent.click(screen.getByTestId('check-button'));

    expect(checkFieldForNextValue).to.have.been.called;
  });

  it('Should correctly access nested values when name contains dot notation path', () => {
    const formValue = { user: { name: 'nested-value' } };

    render(
      <FormWrapper formValue={formValue} onFieldChange={() => {}} nestedField={true}>
        <TestComponent name="user.name" />
      </FormWrapper>
    );

    expect(screen.getByTestId('field-value').textContent).to.equal('nested-value');
  });

  // Tests for Toggle component (uses checked instead of value)
  describe('Use `checked` instead of `value` with Toggle', () => {
    it('Should handle Toggle component correctly', () => {
      const formValue = { toggle: true };

      render(
        <FormWrapper formValue={formValue} onFieldChange={() => {}}>
          <TestComponent name="toggle" accepter={Toggle} />
        </FormWrapper>
      );

      expect(screen.getByTestId('test-toggle')).to.have.class('rs-toggle-checked');
    });

    it('Should override checked value when explicitly provided', () => {
      const formValue = { toggle: true };
      const onChange = sinon.spy();

      render(
        <FormWrapper formValue={formValue} onFieldChange={onChange}>
          <TestComponent name="toggle" accepter={Toggle} value={false} />
        </FormWrapper>
      );

      expect(screen.getByTestId('test-toggle')).to.not.have.class('rs-toggle-checked');
    });

    it('Should call onChange with boolean for Toggle', () => {
      const onFieldChange = sinon.spy();

      render(
        <FormWrapper onFieldChange={onFieldChange}>
          <TestComponent name="toggle" accepter={Toggle} />
        </FormWrapper>
      );

      fireEvent.click(screen.getByTestId('test-toggle'));

      expect(onFieldChange).to.be.calledWith('toggle', true, sinon.match.any);
    });
  });

  // Tests for nested fields
  describe('Nested Fields', () => {
    it('Should handle array index in nested paths', () => {
      const formValue = { user: { hobbies: ['reading', 'coding'] } };

      render(
        <FormWrapper formValue={formValue} onFieldChange={() => {}} nestedField={true}>
          <TestComponent name="user.hobbies.1" />
        </FormWrapper>
      );

      expect(screen.getByTestId('field-value').textContent).to.equal('coding');
    });

    it('Should update nested field values correctly', () => {
      const updatedValue = { user: { hobbies: ['reading', 'coding'] } };
      const onFieldChange = (name, value) => {
        if (name === 'user.hobbies.1') {
          updatedValue.user.hobbies[1] = value;
        }
      };

      render(
        <FormWrapper formValue={updatedValue} onFieldChange={onFieldChange} nestedField={true}>
          <TestComponent name="user.hobbies.1" />
        </FormWrapper>
      );

      fireEvent.change(screen.getByTestId('test-input'), { target: { value: 'gaming' } });

      expect(updatedValue.user.hobbies[1]).to.equal('gaming');
    });
  });

  // Tests for error states and ARIA attributes
  describe('Accessibility', () => {
    it('Should set aria-invalid when there is an error', () => {
      render(
        <FormWrapper
          onFieldChange={() => {}}
          errorFromContext={true}
          formError={{ name: 'Error message' }}
        >
          <TestComponent name="name" id="test-id" />
        </FormWrapper>
      );

      expect(screen.getByTestId('test-input')).to.have.attr('aria-invalid', 'true');
      expect(screen.getByTestId('test-input')).to.have.attr(
        'aria-errormessage',
        'test-id-error-message'
      );
      expect(screen.getByRole('alert')).to.have.attr('id', 'test-id-error-message');
    });

    it('Should properly connect error message with input via aria attributes', () => {
      render(
        <FormWrapper onFieldChange={() => {}}>
          <TestComponent name="name" id="test-id" errorMessage="Custom error" />
        </FormWrapper>
      );

      expect(screen.getByTestId('test-input')).to.have.attr('aria-invalid', 'true');
      expect(screen.getByTestId('test-input')).to.have.attr(
        'aria-errormessage',
        'test-id-error-message'
      );
      expect(screen.getByRole('alert')).to.have.text('Custom error');
    });
  });

  // Tests for checkTrigger=null
  describe('checkTrigger=null', () => {
    it('Should not call onCheck when checkTrigger is null', () => {
      const checkFieldForNextValue = sinon.spy();

      render(
        <FormWrapper
          onFieldChange={() => {}}
          checkFieldForNextValue={checkFieldForNextValue}
          checkTrigger={null}
        >
          <TestComponent name="name" />
        </FormWrapper>
      );

      // Trigger change event
      fireEvent.change(screen.getByTestId('test-input'), { target: { value: 'new-value' } });

      // Trigger blur event
      fireEvent.blur(screen.getByTestId('test-input'));

      // Check that validation was not triggered on change or blur
      expect(checkFieldForNextValue).to.not.have.been.called;
    });
  });

  // Tests for setValue method
  describe('setValue method', () => {
    it('Should update field value and call onFieldChange when setValue is called', () => {
      const onChange = sinon.spy();
      const App = () => {
        const [formValue, setFormValue] = useState<{ name?: string }>({ name: '' });

        return (
          <Form
            formValue={formValue}
            onChange={nextValue => {
              onChange(nextValue);
              setFormValue(nextValue);
            }}
          >
            <TestComponent name="name" />
          </Form>
        );
      };

      render(<App />);

      // Call setValue programmatically
      fireEvent.click(screen.getByTestId('set-value-button'));

      expect(onChange).to.have.been.calledWith({ name: 'programmatic-value' });
      expect(screen.getByTestId('test-input')).to.have.value('programmatic-value');
    });

    it('Should trigger validation when setValue is called with shouldValidate=true', () => {
      const checkFieldForNextValue = sinon.spy();
      const onFieldChange = sinon.spy();

      render(
        <FormWrapper onFieldChange={onFieldChange} checkFieldForNextValue={checkFieldForNextValue}>
          <TestComponent name="name" />
        </FormWrapper>
      );

      // Call setValue with validation
      fireEvent.click(screen.getByTestId('set-value-button'));

      // Check if onFieldChange was called
      expect(onFieldChange).to.have.been.calledWith('name', 'programmatic-value');

      // Check if validation was triggered
      expect(checkFieldForNextValue).to.have.been.called;
    });

    it('Should not trigger validation when checkTrigger is null', () => {
      const checkFieldForNextValue = sinon.spy();

      render(
        <FormWrapper
          onFieldChange={() => {}}
          checkFieldForNextValue={checkFieldForNextValue}
          checkTrigger={null}
        >
          <TestComponent name="name" />
        </FormWrapper>
      );

      // Call setValue with validation
      fireEvent.click(screen.getByTestId('set-value-button'));

      // Check that validation was not triggered
      expect(checkFieldForNextValue).to.not.have.been.called;
    });
  });

  // Tests for validation with schema
  describe('Validation with Schema', () => {
    it('Should validate using rule', async () => {
      const { StringType } = Schema.Types;
      const rule = StringType().isRequired('Field is required');
      const checkFieldForNextValue = sinon.spy();

      render(
        <FormWrapper
          onFieldChange={() => {}}
          checkFieldForNextValue={checkFieldForNextValue}
          checkTrigger="blur"
        >
          <TestComponent name="name" rule={rule} />
        </FormWrapper>
      );

      // Trigger validation on blur
      fireEvent.blur(screen.getByTestId('test-input'));

      expect(checkFieldForNextValue).to.have.been.called;
    });

    it('Should validate async rule', async () => {
      const { StringType } = Schema.Types;
      const rule = StringType().addRule(
        () => new Promise(resolve => setTimeout(() => resolve(true), 100)) as any,
        'Error'
      );
      const checkFieldAsyncForNextValue = sinon.spy();

      render(
        <FormWrapper
          onFieldChange={() => {}}
          checkFieldAsyncForNextValue={checkFieldAsyncForNextValue}
          checkTrigger="blur"
        >
          <TestComponent name="name" rule={rule} checkAsync={true} />
        </FormWrapper>
      );

      fireEvent.blur(screen.getByTestId('test-input'));

      expect(checkFieldAsyncForNextValue).to.have.been.called;
    });

    it('Should use checkFieldAsyncForNextValue when setValue is called with shouldValidate=true and checkAsync=true', () => {
      const checkFieldAsyncForNextValue = sinon.spy();
      const onFieldChange = sinon.spy();

      render(
        <FormWrapper
          onFieldChange={onFieldChange}
          checkFieldAsyncForNextValue={checkFieldAsyncForNextValue}
        >
          <TestComponent name="name" checkAsync={true} />
        </FormWrapper>
      );

      // Call setValue with validation
      fireEvent.click(screen.getByTestId('set-value-button'));

      // Check if validation was triggered with async method
      expect(checkFieldAsyncForNextValue).to.have.been.called;
    });
  });
});
