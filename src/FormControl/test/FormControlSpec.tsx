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
    render(
      <Form>
        <FormControl name="username" />
      </Form>
    );
    expect(screen.getByRole('textbox')).to.exist;
  });

  it('Should output a textarea', () => {
    render(
      <Form>
        <FormControl name="username" accepter="textarea" />
      </Form>
    );

    expect(screen.getByRole('textbox')).to.have.tagName('TEXTAREA');
  });

  it('Should call onChange callback', () => {
    const onChange = sinon.spy();
    render(
      <Form>
        <FormControl name="username" onChange={onChange} />
      </Form>
    );

    ReactTestUtils.Simulate.change(screen.getByRole('textbox'));
    expect(onChange).to.have.been.calledOnce;
  });

  it('Should be readOnly', () => {
    render(
      <Form readOnly>
        <FormControl name="username" />
      </Form>
    );

    expect(screen.getByRole('textbox')).to.have.attr('readonly');
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

    // eslint-disable-next-line testing-library/no-node-access
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

    // eslint-disable-next-line testing-library/no-node-access
    assert.equal((instance.querySelector('input') as HTMLInputElement).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(
      <Form>
        <FormControl classPrefix="custom-prefix" name="username" data-testid="control" />
      </Form>
    );

    assert.ok(
      // eslint-disable-next-line testing-library/no-node-access
      (instance.querySelector('div') as HTMLDivElement).className.match(/\bcustom-prefix\b/)
    );
  });

  it('Should render correctly when form value was null', () => {
    render(
      // FIXME `formValue` prop does not support `null` value
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Form formValue={null}>
        <FormControl name="name" />
      </Form>
    );

    expect(screen.getByRole('textbox')).to.have.value('');
  });

  it('Should render correctly form default value when set', () => {
    const mockValue = 'value';
    render(
      <Form formDefaultValue={{ name: mockValue }}>
        <FormControl name="name" />
      </Form>
    );

    expect(screen.getByRole('textbox')).to.have.value(mockValue);
  });

  it('Should render correctly default value when explicitly set and form default is not set', () => {
    const mockValue = 'value';
    render(
      // FIXME `formDefaultValue` prop does not support `null` value
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Form formDefaultValue={null}>
        <FormControl name="name" defaultValue={mockValue} />
      </Form>
    );

    expect(screen.getByRole('textbox')).to.have.value(mockValue);
  });

  it('Should render correctly default value when explicitly set over form default', () => {
    const mockValue = 'value';
    render(
      <Form formDefaultValue={{ name: 'another value' }}>
        <FormControl name="name" defaultValue={mockValue} />
      </Form>
    );

    expect(screen.getByRole('textbox')).to.have.value(mockValue);
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
    // eslint-disable-next-line testing-library/no-node-access
    assert.ok(!instance.querySelector('.rs-form-control-message-wrapper'));
  });

  it('Should render correctly when errorMessage was null', () => {
    const instance = getDOMNode(
      <Form formError={{ username: 'error' }}>
        <FormControl errorMessage={null} name="username" />
      </Form>
    );

    // eslint-disable-next-line testing-library/no-node-access
    assert.ok(!instance.querySelector('.rs-form-control-message-wrapper'));
  });

  it('Should render correctly when errorMessage was null 2', () => {
    const instance = getDOMNode(
      <Form formError={{ username: 'error' }} errorFromContext={false}>
        <FormControl name="username" />
      </Form>
    );

    // eslint-disable-next-line testing-library/no-node-access
    assert.ok(!instance.querySelector('.rs-form-control-message-wrapper'));
  });

  it('Should the priority of errorMessage be higher than formError', () => {
    render(
      <Form formError={{ username: 'error1' }}>
        <FormControl errorMessage={'error2'} name="username" />
      </Form>
    );

    expect(screen.getByText('error2')).to.be.visible;
  });

  it('Should be associated with ErrorMessage via aria-errormessage', () => {
    render(
      <Form>
        <FormGroup controlId="name1">
          <FormControl errorMessage={'error2'} name="name1" />
        </FormGroup>
      </Form>
    );

    const input = screen.getByRole('textbox');
    const alert = screen.getByRole('alert');

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
            {email || <FormControl data-testid="password" name="password" shouldResetWithUnmount />}
            {email || <FormControl data-testid="username" name="username" shouldResetWithUnmount />}
            <FormControl data-testid="email" name="email" />
          </Form>
        </>
      );
    };
    render(<Wrapper />);
    fireEvent.change(screen.getByTestId('username'), {
      target: { value: 'username' }
    });
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'password' }
    });
    expect(refValue).to.deep.equal({ username: 'username', password: 'password', email: '' });
    expect(refError).to.deep.equal({
      username: 'The length cannot exceed 2',
      password: 'The length cannot exceed 2'
    });
    fireEvent.change(screen.getByTestId('email'), {
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
              data-testid="button"
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
      render(<Wrapper />);

      (formRef.current as FormInstance).check();
      assert.equal(handleError.callCount, 1);
      assert.deepEqual(handleError.firstCall.firstArg, { user: 'require', password: 'require' });

      fireEvent.click(screen.getByTestId('button'));
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
              data-testid="button"
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

      render(<Wrapper />);

      (formRef.current as FormInstance).check();
      assert.equal(handleError.callCount, 1);
      assert.deepEqual(handleError.firstCall.firstArg, { user: 'require' });

      fireEvent.click(screen.getByTestId('button'));
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
