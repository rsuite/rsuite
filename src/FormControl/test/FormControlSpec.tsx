import React, { useState } from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { render, fireEvent, screen } from '@testing-library/react';
import sinon from 'sinon';
import { getDOMNode } from '@test/testUtils';
import Form, { FormInstance } from '../../Form';
import FormControl from '../FormControl';
import FormGroup from '../../FormGroup';
import Schema from '../../Schema';
import Toggle from '../../Toggle';

describe('FormControl', () => {
  it('Should output a input', () => {
    const instance = getDOMNode(
      <Form>
        <FormControl name="username" />
      </Form>
    );

    assert.ok(instance.querySelector('input'));
  });

  it('Should output a textarea', () => {
    const instance = getDOMNode(
      <Form>
        <FormControl name="username" accepter="textarea" />
      </Form>
    );

    assert.ok(instance.querySelector('textarea'));
  });

  it('Should call onChange callback', () => {
    const onChange = sinon.spy();
    const instance = getDOMNode(
      <Form>
        <FormControl name="username" onChange={onChange} />
      </Form>
    );

    ReactTestUtils.Simulate.change(instance.querySelector('input') as HTMLInputElement);
    expect(onChange).to.have.been.calledOnce;
  });

  it('Should be readOnly', () => {
    const instance = getDOMNode(
      <Form readOnly>
        <FormControl name="username" />
      </Form>
    );

    assert.ok(instance.querySelector('input[readonly]'));
  });

  it('Should be readOnly on accepter', () => {
    const Input = sinon.spy(props => <input {...props} />);
    getDOMNode(
      <Form readOnly>
        <FormControl name="username" accepter={Input} />
      </Form>
    );

    expect(Input).to.have.been.calledWithMatch({ readOnly: true });
  });

  it('Should call onBlur callback', () => {
    const onBlur = sinon.spy();
    const instance = getDOMNode(
      <Form>
        <FormControl name="username" onBlur={onBlur} />
      </Form>
    );

    ReactTestUtils.Simulate.blur(instance.querySelector('input') as HTMLInputElement);

    expect(onBlur).to.have.been.calledOnce;
  });

  it('Should apply custom className to accepter component', () => {
    render(
      <Form>
        <FormControl className="custom" name="username" data-testid="input" />
      </Form>
    );

    expect(screen.getByTestId('input')).to.have.class('custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(
      <Form>
        <FormControl style={{ fontSize }} name="username" />
      </Form>
    );

    assert.equal((instance.querySelector('input') as HTMLInputElement).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(
      <Form>
        <FormControl classPrefix="custom-prefix" name="username" />
      </Form>
    );
    assert.ok(
      (instance.querySelector('div') as HTMLDivElement).className.match(/\bcustom-prefix\b/)
    );
  });

  it('Should render correctly when form value was null', () => {
    const instance = getDOMNode(
      // FIXME `formValue` prop does not support `null` value
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Form formValue={null}>
        <FormControl name="name" />
      </Form>
    );
    assert.equal((instance.querySelector('input') as HTMLInputElement).value, '');
  });

  it('Should render correctly form default value when set', () => {
    const mockValue = 'value';
    const instance = getDOMNode(
      <Form formDefaultValue={{ name: mockValue }}>
        <FormControl name="name" />
      </Form>
    );
    assert.equal((instance.querySelector('input') as HTMLInputElement).value, mockValue);
  });

  it('Should render correctly default value when explicitly set and form default is not set', () => {
    const mockValue = 'value';
    const instance = getDOMNode(
      // FIXME `formDefaultValue` prop does not support `null` value
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Form formDefaultValue={null}>
        <FormControl name="name" defaultValue={mockValue} />
      </Form>
    );
    assert.equal((instance.querySelector('input') as HTMLInputElement).value, mockValue);
  });

  it('Should render correctly default value when explicitly set over form default', () => {
    const mockValue = 'value';
    const instance = getDOMNode(
      <Form formDefaultValue={{ name: 'another value' }}>
        <FormControl name="name" defaultValue={mockValue} />
      </Form>
    );
    assert.equal((instance.querySelector('input') as HTMLInputElement).value, mockValue);
  });

  it('Should render correctly when form error was null', () => {
    const instance = getDOMNode(
      // FIXME `formError` prop does not support `null` value
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Form formError={null}>
        <FormControl name="name" />
      </Form>
    );
    assert.ok(!instance.querySelector('.rs-form-control-message-wrapper'));
  });

  it('Should render correctly when errorMessage was null', () => {
    const instance = getDOMNode(
      <Form formError={{ username: 'error' }}>
        <FormControl errorMessage={null} name="username" />
      </Form>
    );

    assert.ok(!instance.querySelector('.rs-form-control-message-wrapper'));
  });

  it('Should render correctly when errorMessage was null 2', () => {
    const instance = getDOMNode(
      <Form formError={{ username: 'error' }} errorFromContext={false}>
        <FormControl name="username" />
      </Form>
    );

    assert.ok(!instance.querySelector('.rs-form-control-message-wrapper'));
  });

  it('Should the priority of errorMessage be higher than formError', () => {
    const instance = getDOMNode(
      <Form formError={{ username: 'error1' }}>
        <FormControl errorMessage={'error2'} name="username" />
      </Form>
    );

    assert.equal(
      (instance.querySelector('.rs-form-control-message-wrapper') as HTMLElement).textContent,
      'error2'
    );
  });

  it('Should be associated with ErrorMessage via aria-errormessage', () => {
    const { getByRole } = render(
      <Form>
        <FormGroup controlId="name1">
          <FormControl errorMessage={'error2'} name="name1" />
        </FormGroup>
      </Form>
    );

    const input = getByRole('textbox');
    const alert = getByRole('alert');

    expect(input).to.have.attr('aria-invalid', 'true');

    expect(alert).to.exist;
    expect(input).to.have.attr('aria-errormessage', alert.getAttribute('id') as string);
  });
  it('Should remove value and error when shouldResetWithUnmount is true', () => {
    let refValue = { username: '', email: '', password: '' };
    let refError = {};
    const model = Schema.Model({
      password: Schema.Types.StringType().maxLength(2, 'The length cannot exceed 2'),
      username: Schema.Types.StringType().maxLength(2, 'The length cannot exceed 2'),
      email: Schema.Types.StringType().maxLength(2, 'The length cannot exceed 2')
    });
    const Wrapper = () => {
      const [value, setValue] = useState(refValue);
      const [error, setError] = useState(refError);
      const handleChange = v => {
        refValue = v;
        setValue(v);
      };
      const handleError = e => {
        refError = e;
        setError(e);
      };

      const { email } = value;
      return (
        <>
          <Form
            model={model}
            onChange={handleChange}
            onCheck={handleError}
            formError={error}
            formValue={value}
          >
            {email || <FormControl id="password" name="password" shouldResetWithUnmount />}
            {email || <FormControl id="username" name="username" shouldResetWithUnmount />}
            <FormControl id="email" name="email" />
          </Form>
        </>
      );
    };
    const { container } = render(<Wrapper />);
    fireEvent.change(container.querySelector('#username') as HTMLInputElement, {
      target: { value: 'username' }
    });
    fireEvent.change(container.querySelector('#password') as HTMLInputElement, {
      target: { value: 'password' }
    });
    expect(refValue).to.deep.equal({ username: 'username', password: 'password', email: '' });
    expect(refError).to.deep.equal({
      username: 'The length cannot exceed 2',
      password: 'The length cannot exceed 2'
    });
    fireEvent.change(container.querySelector('#email') as HTMLInputElement, {
      target: { value: 'email' }
    });
    expect(refValue).to.deep.equal({ email: 'email' });
    expect(refError).to.deep.equal({ email: 'The length cannot exceed 2' });
  });

  describe('rule', () => {
    it("should check the field's rule", () => {
      const formRef = React.createRef<FormInstance>();
      const handleError = sinon.spy();

      render(
        <Form ref={formRef} onError={handleError}>
          <FormControl name="items" rule={Schema.Types.StringType().isRequired('require')} />
        </Form>
      );
      (formRef.current as FormInstance).check();
      assert.equal(handleError.callCount, 1);
      assert.deepEqual(handleError.firstCall.firstArg, { items: 'require' });
    });

    it('Should not validate fields unmounted with rule', () => {
      const formRef = React.createRef<FormInstance>();
      const handleError = sinon.spy();

      function Wrapper() {
        const [show, setShow] = useState(true);
        return (
          <>
            <button
              onClick={() => {
                setShow(false);
              }}
            >
              hidden
            </button>
            <Form ref={formRef} onError={handleError}>
              <FormControl name="user" rule={Schema.Types.StringType().isRequired('require')} />
              {show && (
                <FormControl
                  name="password"
                  rule={Schema.Types.StringType().isRequired('require')}
                />
              )}
            </Form>
          </>
        );
      }
      const { container } = render(<Wrapper />);

      (formRef.current as FormInstance).check();
      assert.equal(handleError.callCount, 1);
      assert.deepEqual(handleError.firstCall.firstArg, { user: 'require', password: 'require' });

      fireEvent.click(container.querySelector('button') as HTMLElement);
      (formRef.current as FormInstance).check();
      assert.equal(handleError.callCount, 2);
      assert.deepEqual(handleError.secondCall.firstArg, { user: 'require' });
    });

    it("Should validate accurately,when field's rule is dynamic", () => {
      const formRef = React.createRef<FormInstance>();
      const handleError = sinon.spy();

      function Wrapper() {
        const [rule, setRule] = useState(Schema.Types.StringType().isRequired('require'));
        return (
          <>
            <button
              onClick={() => {
                setRule(Schema.Types.StringType().isRequired('second require'));
              }}
            >
              setRule
            </button>
            <Form ref={formRef} onError={handleError}>
              <FormControl name="user" rule={rule} />
            </Form>
          </>
        );
      }

      const { container } = render(<Wrapper />);

      (formRef.current as FormInstance).check();
      assert.equal(handleError.callCount, 1);
      assert.deepEqual(handleError.firstCall.firstArg, { user: 'require' });

      fireEvent.click(container.querySelector('button') as HTMLElement);
      (formRef.current as FormInstance).check();
      assert.equal(handleError.callCount, 2);
      assert.deepEqual(handleError.secondCall.firstArg, { user: 'second require' });
    });

    it("Should use the field's rule when both model and field have same name rule", () => {
      const formRef = React.createRef<FormInstance>();
      const handleError = sinon.spy();

      function Wrapper() {
        const model = Schema.Model({
          user: Schema.Types.StringType().isRequired('form require')
        });
        return (
          <Form ref={formRef} model={model} onError={handleError}>
            <FormControl name="user" rule={Schema.Types.StringType().isRequired('field require')} />
          </Form>
        );
      }
      render(<Wrapper />);

      (formRef.current as FormInstance).check();
      assert.equal(handleError.callCount, 1);
      assert.equal(handleError.firstCall.firstArg.user, 'field require');
    });
  });

  describe('Use `checked` instead of `value` with Toggle', () => {
    it('Should be to initialize the state of Toggle through the form value', () => {
      const formValue = {
        toggle: true
      };

      render(
        <Form formValue={formValue}>
          <FormControl name="toggle" accepter={Toggle} />
        </Form>
      );

      expect(screen.getByRole('switch')).to.be.checked;
    });

    it('Should be possible to override `checked` value', () => {
      const formValue = {
        toggle: true
      };

      render(
        <Form formValue={formValue}>
          <FormControl name="toggle" accepter={Toggle} checked={false} />
        </Form>
      );

      expect(screen.getByRole('switch')).not.to.be.checked;
    });
  });
});
