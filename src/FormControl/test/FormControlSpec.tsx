import React, { useState } from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import sinon from 'sinon';
import { getDOMNode } from '@test/utils';
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
      <Form formDefaultValue={{ username: '' }}>
        <FormControl name="username" onChange={onChange} />
      </Form>
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '1' }
    });

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

    render(
      <Form readOnly>
        <FormControl name="username" accepter={Input} />
      </Form>
    );

    expect(Input).to.have.been.calledWithMatch({ readOnly: true });
  });

  it('Should call onBlur callback', () => {
    const onBlur = sinon.spy();
    render(
      <Form>
        <FormControl name="username" onBlur={onBlur} />
      </Form>
    );

    fireEvent.blur(screen.getByRole('textbox'));

    expect(onBlur).to.have.been.calledOnce;
  });

  it('Should apply custom className to accepter component', () => {
    render(
      <Form>
        <FormControl className="custom" name="username" />
      </Form>
    );

    expect(screen.getByRole('textbox')).to.have.class('custom');
  });

  it('Should have a custom style', () => {
    render(
      <Form>
        <FormControl style={{ fontSize: 12 }} name="username" />
      </Form>
    );

    expect(screen.getByRole('textbox')).to.have.style('font-size', '12px');
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

  describe('defaultValue', () => {
    it("Should render current value when field's defaultValue was set", () => {
      const correctValue = 'value';
      render(
        <Form>
          <FormControl name="name" defaultValue={correctValue} />
        </Form>
      );

      expect(screen.getByRole('textbox')).to.have.value(correctValue);
    });

    it("Should render Form's when both the defaultValue of the form and the defaultValue of the field were set", () => {
      const correctValue = 'value';
      render(
        <Form formDefaultValue={{ name: correctValue }}>
          <FormControl name="name" defaultValue="additional value" />
        </Form>
      );

      expect(screen.getByRole('textbox')).to.have.value(correctValue);
    });
  });

  it('Should render correctly when form error was null', () => {
    render(
      // FIXME `formError` prop does not support `null` value
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Form formError={null}>
        <FormControl name="name" />
      </Form>
    );

    expect(screen.queryByRole('alert')).to.not.exist;
  });

  it('Should render correctly when errorMessage was null', () => {
    render(
      <Form formError={{ username: 'error' }}>
        <FormControl errorMessage={null} name="username" />
      </Form>
    );

    expect(screen.queryByRole('alert')).to.not.exist;
  });

  it('Should render correctly when errorMessage was null 2', () => {
    render(
      <Form formError={{ username: 'error' }} errorFromContext={false}>
        <FormControl name="username" />
      </Form>
    );

    expect(screen.queryByRole('alert')).to.not.exist;
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

  it('should pass null as value to component when value is null', () => {
    let refValue = void 0;
    function CostumeComponent({ value }) {
      refValue = value;
      return null;
    }
    render(
      <Form formValue={{ username: null }}>
        <FormControl accepter={CostumeComponent} name="username" />
      </Form>
    );

    expect(refValue).to.be.null;
  });

  describe('rule', () => {
    it("should check the field's rule", () => {
      const formRef = React.createRef<FormInstance>();
      const onError = sinon.spy();

      render(
        <Form ref={formRef} onError={onError}>
          <FormControl name="items" rule={Schema.Types.StringType().isRequired('require')} />
        </Form>
      );
      (formRef.current as FormInstance).check();

      expect(onError).to.be.calledOnce;
      expect(onError).to.be.calledWithMatch({ items: 'require' });
    });

    it('Should not validate fields unmounted with rule', () => {
      const formRef = React.createRef<FormInstance>();
      const onError = sinon.spy();

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
            <Form ref={formRef} onError={onError}>
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

      expect(onError).to.be.calledOnce;
      expect(onError).to.be.calledWithMatch({ user: 'require', password: 'require' });

      fireEvent.click(screen.getByTestId('button'));

      (formRef.current as FormInstance).check();

      expect(onError).to.be.calledTwice;
      expect(onError).to.be.calledWithMatch({ user: 'require' });
    });

    it("Should validate accurately,when field's rule is dynamic", () => {
      const formRef = React.createRef<FormInstance>();
      const onError = sinon.spy();

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
            <Form ref={formRef} onError={onError}>
              <FormControl name="user" rule={rule} />
            </Form>
          </>
        );
      }

      render(<Wrapper />);

      (formRef.current as FormInstance).check();

      expect(onError).to.be.calledOnce;
      expect(onError).to.be.calledWithMatch({ user: 'require' });

      fireEvent.click(screen.getByTestId('button'));
      (formRef.current as FormInstance).check();

      expect(onError).to.be.calledTwice;
      expect(onError).to.be.calledWithMatch({ user: 'second require' });
    });

    it("Should use the field's rule when both model and field have same name rule", () => {
      const formRef = React.createRef<FormInstance>();
      const onError = sinon.spy();

      function Wrapper() {
        const model = Schema.Model({
          user: Schema.Types.StringType().isRequired('form require')
        });
        return (
          <Form ref={formRef} model={model} onError={onError}>
            <FormControl name="user" rule={Schema.Types.StringType().isRequired('field require')} />
          </Form>
        );
      }
      render(<Wrapper />);

      (formRef.current as FormInstance).check();

      expect(onError).to.be.calledOnce;
      expect(onError).to.be.calledWithMatch({ user: 'field require' });
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

      expect(screen.getByRole('switch')).to.not.be.checked;
    });
  });

  describe('Nested Fields', () => {
    it('Should set correctly defaultValue', () => {
      render(
        <Form formDefaultValue={{ user: { name: ['name0', 'name1'] } }} nestedField>
          <FormControl name="user.name.1" />
        </Form>
      );

      expect(screen.getByRole('textbox')).to.have.value('name1');
    });

    it('Should return correctly value when onChange called', () => {
      let formValue: Record<string, any> = { user: { name: ['name0', 'name1'] } };
      render(
        <Form formValue={formValue} onChange={value => (formValue = value)} nestedField>
          <FormControl name="user.name.1" />
        </Form>
      );
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'name2' } });

      expect(formValue.user.name[1]).to.equal('name2');
    });

    it('Should render an error message when the value changes', () => {
      const model = Schema.Model({
        user: Schema.Types.ObjectType().shape({
          age: Schema.Types.NumberType('Age must be a number ')
        })
      });

      render(
        <Form formDefaultValue={{ user: { age: '10' } }} model={model} nestedField>
          <FormControl name="user.age" />
        </Form>
      );

      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a' } });

      expect(screen.getByRole('alert')).to.have.text('Age must be a number ');
    });

    it('Should render an error message when the form is checked', async () => {
      const model = Schema.Model({
        user: Schema.Types.ObjectType().shape({
          age: Schema.Types.NumberType('Age must be a number ')
        })
      });

      const ref = React.createRef<any>();

      render(
        <Form
          formDefaultValue={{ user: { age: '10' } }}
          model={model}
          nestedField
          ref={ref}
          checkTrigger="none"
        >
          <FormControl name="user.age" />
        </Form>
      );

      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a' } });

      ref.current.check();

      await waitFor(() => {
        expect(screen.getByRole('alert')).to.have.text('Age must be a number ');
      });
    });
  });
});
