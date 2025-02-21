import React, { useState } from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import sinon from 'sinon';
import Form, { FormInstance } from '../../Form';
import FormControl from '../FormControl';
import FormGroup from '../../FormGroup';
import Schema from '../../Schema';
import Toggle from '../../Toggle';
import Button from '@/Button';
import TagInput from '@/TagInput';

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

  it('Should have a custom style', () => {
    render(
      <Form>
        <FormControl style={{ fontSize: 12 }} name="username" />
      </Form>
    );

    expect(screen.getByRole('textbox')).to.have.style('font-size', '12px');
  });

  it('Should have a custom className prefix', () => {
    const { container } = render(
      <Form>
        <FormControl classPrefix="custom-prefix" name="username" data-testid="control" />
      </Form>
    );

    expect((container.querySelector('div') as HTMLDivElement).className).to.match(
      /\bcustom-prefix\b/
    );
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

  it('Should render errorMessage when array as property of formError', () => {
    const { ArrayType, StringType } = Schema.Types;
    const model = Schema.Model({
      emails: ArrayType().of(StringType('The tag should be a string').isEmail('Should be an email'))
    });
    render(
      <Form model={model} formDefaultValue={{ emails: ['123@gmail.com', 'xxx'] }}>
        <Form.Control name="emails" style={{ width: 300 }} accepter={TagInput} />
        <Button appearance="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByRole('alert')).to.have.text('Should be an email');
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

  it('Should render correct errorMessage when using proxy of schema-typed', () => {
    const model = Schema.Model({
      password: Schema.Types.StringType().proxy(['confirmPassword']),
      confirmPassword: Schema.Types.StringType().equalTo('password', 'The passwords do not match')
    });

    render(
      <Form model={model} formDefaultValue={{ password: '123', confirmPassword: '123' }}>
        <FormControl name="password" />
        <FormControl name="confirmPassword" />
      </Form>
    );
    fireEvent.change(screen.getAllByRole('textbox')[0], {
      target: { value: '1234' }
    });

    expect(screen.getByRole('alert')).to.have.text('The passwords do not match');

    fireEvent.change(screen.getAllByRole('textbox')[0], {
      target: { value: '123' }
    });
    expect(screen.queryByRole('alert')).to.not.exist;
  });

  it('Should render correct errorMessage when using proxy of schema-typed with async check', async () => {
    const model = Schema.Model({
      password: Schema.Types.StringType().proxy(['confirmPassword']),
      confirmPassword: Schema.Types.StringType().equalTo('password', 'The passwords do not match')
    });

    render(
      <Form model={model} formDefaultValue={{ password: '123', confirmPassword: '123' }}>
        <FormControl checkAsync name="password" />
        <FormControl checkAsync name="confirmPassword" />
      </Form>
    );
    fireEvent.change(screen.getAllByRole('textbox')[0], {
      target: { value: '1234' }
    });

    await screen.findByRole('alert');

    expect(screen.getByRole('alert')).to.have.text('The passwords do not match');

    fireEvent.change(screen.getAllByRole('textbox')[0], {
      target: { value: '123' }
    });
    await waitFor(() => expect(screen.queryByRole('alert')).to.not.exist);
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
        <Form formDefaultValue={{ user: { name: ['foo', 'bar'] } }} nestedField>
          <FormControl name="user.name.1" />
        </Form>
      );

      expect(screen.getByRole('textbox')).to.have.value('bar');
    });

    it('Should render the value on the FormControl', () => {
      render(
        <Form formDefaultValue={{ user: { name: ['foo', 'bar'] } }} nestedField>
          <FormControl name="user.name.1" value="tom" />
        </Form>
      );

      expect(screen.getByRole('textbox')).to.have.value('tom');
    });

    it('Should return correctly value when onChange called', () => {
      let formValue: Record<string, any> = { user: { name: ['foo', 'bar'] } };
      render(
        <Form formValue={formValue} onChange={value => (formValue = value)} nestedField>
          <FormControl name="user.name.1" />
        </Form>
      );
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'tom' } });

      expect(formValue.user.name[1]).to.equal('tom');
    });
  });

  describe('Accessibility', () => {
    it('Should have a default `id` in FormControl', () => {
      render(
        <Form>
          <FormGroup>
            <FormControl name="name" />
          </FormGroup>
        </Form>
      );

      expect(screen.getByRole('textbox')).to.have.attribute('id');
    });

    it('Should have `id` in FormControl when set controlId of FormGroup', () => {
      render(
        <Form>
          <FormGroup controlId="group">
            <FormControl name="name" />
          </FormGroup>
        </Form>
      );

      expect(screen.getByRole('textbox')).to.have.attribute('id', 'group');
    });

    it('Should override `id` in FormControl when set id of FormControl', () => {
      render(
        <Form>
          <FormGroup controlId="group">
            <FormControl name="name" id="control" />
          </FormGroup>
        </Form>
      );

      expect(screen.getByRole('textbox')).to.have.attribute('id', 'control');
    });

    it('Should have `aria-invalid` and `aria-errormessage` when has error', () => {
      render(
        <Form formError={{ name: 'Name is required' }}>
          <FormControl name="name" id="input" />
        </Form>
      );

      expect(screen.getByRole('textbox')).to.have.attr('aria-invalid', 'true');
      expect(screen.getByRole('textbox')).to.have.attr('aria-errormessage', 'input-error-message');
      expect(screen.getByRole('alert')).to.have.attr('id', 'input-error-message');
    });
  });
});
