import React, { useRef } from 'react';
import { render, fireEvent, act, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import { getInstance } from '@test/utils';
import { FormInstance } from '../hooks/useFormRef';
import Form from '../Form';
import FormControl from '../../FormControl';
import Schema from '../../Schema';
import Button from '../../Button';

const model = Schema.Model({
  name: Schema.Types.StringType().isEmail('Email error')
});

const modelAsync = Schema.Model({
  name: Schema.Types.StringType().addAsyncRule(value => {
    return new Promise(resolve => {
      setTimeout(() => {
        if (value != 'bac') {
          resolve(false);
        }
        resolve(true);
      }, 500);
    });
  }, 'Duplicate name')
});

describe('Form Validation', () => {
  it('Should be `false` for check status', () => {
    const values = {
      name: 'abc'
    };
    const form = getInstance(
      <Form model={model} formDefaultValue={values}>
        <FormControl name="name" />
      </Form>
    );

    expect(form.check()).to.be.false;
  });

  it('Should be `false` for check status by checkForField', () => {
    const values = {
      name: 'abc'
    };
    const form = getInstance(
      <Form
        model={model}
        formDefaultValue={values}
        onError={formError => {
          expect(formError.name).to.equal('Email error');
        }}
      >
        <FormControl name="name" />
      </Form>
    );
    const checkStatus = form.checkForField('name', checkResult => {
      expect(checkResult).to.be.deep.equal({
        hasError: true,
        errorMessage: 'Email error'
      });
    });

    expect(checkStatus).to.be.false;
  });

  it('Should be `true` for check status', () => {
    const values = {
      name: 'abc@gmail.com'
    };
    const form = getInstance(
      <Form model={model} formDefaultValue={values}>
        <FormControl name="name" />
      </Form>
    );
    expect(form.check()).to.be.true;
  });

  it('Should be `true` for check status by checkForField', () => {
    const values = {
      name: 'abc@gmail.com'
    };
    const form = getInstance(
      <Form model={model} formDefaultValue={values}>
        <FormControl name="name" />
      </Form>
    );
    const checkStatus = form.checkForField('name', checkResult => {
      expect(checkResult).to.be.deep.equal({
        hasError: false
      });
    });

    expect(checkStatus).to.be.true;
  });

  it('Should be {} for formError when call cleanErrors', () => {
    const values = {
      name: 'abc.com'
    };

    const form = getInstance(
      <Form model={model} formDefaultValue={values}>
        <FormControl name="name" />
      </Form>
    );
    form.check();
    form.cleanErrors(() => {
      expect(form.state.formError).to.be.deep.equal({});
    });
  });

  it('Should be {n1} for formError when call cleanErrorForField', () => {
    const values = {
      n1: 1,
      n2: 1
    };
    const model = Schema.Model({
      n1: Schema.Types.NumberType().min(2, 'error'),
      n2: Schema.Types.NumberType().min(2, 'error')
    });

    const form = getInstance(
      <Form model={model} formDefaultValue={values}>
        <FormControl name="n1" />
        <FormControl name="n2" />
      </Form>
    );
    form.check();
    form.cleanErrorForField('n2', () => {
      expect(form.state.formError).to.be.deep.equal({ n1: 'error' });
    });
  });

  it('Should be {name:"error"} for formError when call resetErrors', () => {
    const values = {
      name: 'abc.com'
    };
    const form = getInstance(
      <Form model={model} formDefaultValue={values}>
        <FormControl name="name" />
      </Form>
    );
    form.resetErrors({ name: 'error' }, () => {
      expect(form.state.formError).to.be.deep.equal({ name: 'error' });
    });
  });

  it('Should call onChange callback with correct form values', () => {
    const values = {
      name: 'abc'
    };

    const onChange = sinon.spy();

    render(
      <Form formDefaultValue={values} onChange={onChange}>
        <FormControl name="name" />
      </Form>
    );

    userEvent.type(screen.getByRole('textbox'), 'd');

    expect(onChange).to.be.called;
    expect(onChange).to.be.calledWith({ name: 'abcd' });
  });

  it('Should call onError callback', () => {
    const values = {
      name: 'abc'
    };
    const onError = sinon.spy();
    render(
      <Form formDefaultValue={values} onError={onError} model={model}>
        <FormControl name="name" />
      </Form>
    );

    userEvent.type(screen.getByRole('textbox'), 'd');

    expect(onError).to.be.called;
    expect(onError).to.be.calledWith({ name: 'Email error' });
  });

  it('Should not call onError callback', () => {
    const values = {
      name: 'abc@ddd.com'
    };

    const onError = sinon.spy();
    render(
      <Form formDefaultValue={values} onError={onError} model={model}>
        <FormControl name="name" />
      </Form>
    );

    userEvent.type(screen.getByRole('textbox'), 'd', {
      initialSelectionStart: 3,
      initialSelectionEnd: 3
    });

    expect(onError).to.be.not.called;
  });

  it('Should call onError callback by checkAsync', async () => {
    const values = {
      name: 'abc'
    };

    const onError = sinon.spy();
    render(
      <Form formDefaultValue={values} onError={onError} model={modelAsync}>
        <FormControl name="name" checkAsync />
      </Form>
    );

    userEvent.type(screen.getByRole('textbox'), 'd');

    await waitFor(() => {
      expect(onError).to.be.called;
      expect(onError).to.be.calledWith({ name: 'Duplicate name' });
    });
  });

  it('Check status should be fired on checkAsync ', async () => {
    const values = {
      name: 'abc'
    };
    const form = getInstance(
      <Form formDefaultValue={values} model={modelAsync}>
        <FormControl name="name" checkAsync />
      </Form>
    );
    const result = await form.checkAsync();

    expect(result.hasError).to.be.true;
  });

  it('Check status should be fired on checkForFieldAsync', async () => {
    const values = {
      name: 'abc'
    };
    const form = getInstance(
      <Form formDefaultValue={values} model={modelAsync}>
        <FormControl name="name" checkAsync />
      </Form>
    );
    const result = await form.checkForFieldAsync('name');

    expect(result.hasError).to.be.true;
  });

  it('Should support complex inspections by onChange', () => {
    const model = Schema.Model({
      items: Schema.Types.ArrayType().of(
        Schema.Types.ObjectType().shape({
          field1: Schema.Types.StringType().isRequired(),
          field2: Schema.Types.NumberType().isRequired('field2 is required')
        })
      )
    });

    const Field = ({ onChange }) => {
      const handleChange = () => {
        onChange([{ field1: '', field2: '' }]);
      };
      return <input name="items" onChange={handleChange} />;
    };

    const values = {
      items: []
    };

    const onError = sinon.spy();
    render(
      <Form formDefaultValue={values} onError={onError} model={model}>
        <FormControl name="items" accepter={Field} />
      </Form>
    );

    userEvent.type(screen.getByRole('textbox'), 'abcd');

    expect(onError).to.be.calledWith({
      items: {
        hasError: true,
        array: [
          {
            hasError: true,
            object: {
              field1: { hasError: true, errorMessage: 'field1 is a required field' },
              field2: { hasError: true, errorMessage: 'field2 is required' }
            }
          }
        ]
      }
    });
  });

  it('Should support complex inspections by check method ', () => {
    const model = Schema.Model({
      items: Schema.Types.ArrayType().of(
        Schema.Types.ObjectType().shape({
          field1: Schema.Types.StringType().isRequired(),
          field2: Schema.Types.NumberType().isRequired('field2 is required')
        })
      )
    });

    const Field = () => {
      return <input name="items" />;
    };

    const values = { items: [{ field1: '', field2: '' }] };

    const formRef = React.createRef<FormInstance>();
    const onError = sinon.spy();

    render(
      <Form formDefaultValue={values} onError={onError} model={model} ref={formRef}>
        <FormControl name="items" accepter={Field} />
      </Form>
    );

    act(() => {
      (formRef.current as FormInstance).check();
    });

    expect(onError).to.be.calledWith({
      items: {
        hasError: true,
        array: [
          {
            hasError: true,
            object: {
              field1: { hasError: true, errorMessage: 'field1 is a required field' },
              field2: { hasError: true, errorMessage: 'field2 is required' }
            }
          }
        ]
      }
    });
  });

  it('Should provide public objects and methods', () => {
    const form = getInstance(<Form />);

    expect(form.root).to.exist;
    expect(form.check).to.instanceOf(Function);
    expect(form.checkAsync).to.instanceOf(Function);
    expect(form.checkForField).to.instanceOf(Function);
    expect(form.checkForFieldAsync).to.instanceOf(Function);
    expect(form.cleanErrors).to.instanceOf(Function);
    expect(form.cleanErrorForField).to.instanceOf(Function);
    expect(form.resetErrors).to.instanceOf(Function);
  });

  describe('The onCheck callback', () => {
    it('Should call onCheck callback', () => {
      const values = {
        name: 'abc'
      };

      const onCheck = sinon.spy();
      render(
        <Form formDefaultValue={values} onCheck={onCheck}>
          <FormControl name="name" />
        </Form>
      );

      userEvent.type(screen.getByRole('textbox'), 'd');

      expect(onCheck).to.be.called;
      expect(onCheck).to.be.calledWith({});
    });

    it('Should call onCheck callback when blur', () => {
      const values = {
        name: 'abc'
      };

      const onCheck = sinon.spy();
      render(
        <Form formDefaultValue={values} onCheck={onCheck} checkTrigger="blur">
          <FormControl name="name" />
        </Form>
      );
      fireEvent.blur(screen.getByRole('textbox'));

      expect(onCheck).to.be.called;
      expect(onCheck).to.be.calledWith({});
    });

    it('Should not call onCheck callback when checkTrigger is null', () => {
      const values = {
        name: 'abc'
      };

      const onCheck = sinon.spy();
      render(
        <Form formDefaultValue={values} onCheck={onCheck} checkTrigger={null}>
          <FormControl name="name" />
        </Form>
      );
      fireEvent.blur(screen.getByRole('textbox'));
      userEvent.type(screen.getByRole('textbox'), 'd');

      expect(onCheck).to.be.not.called;
    });

    it('Should call onCheck callback', () => {
      const values = {
        name: 'abc'
      };

      const onCheck = sinon.spy();
      render(
        <Form
          formDefaultValue={values}
          onCheck={onCheck}
          formError={{
            email: 'email is null'
          }}
        >
          <FormControl name="name" />
        </Form>
      );
      userEvent.type(screen.getByRole('textbox'), 'd');

      expect(onCheck).to.be.called;
      expect(onCheck).to.be.calledWith({ email: 'email is null' });
    });
  });

  describe('The onSubmit callback', () => {
    it('Should call onSubmit callback', () => {
      const values = {
        mail: 'foobar@gmail.com'
      };

      const onSubmit = sinon.spy();
      const onError = sinon.spy();
      const onCheck = sinon.spy();
      render(
        <Form
          formDefaultValue={values}
          model={model}
          onSubmit={onSubmit}
          onError={onError}
          onCheck={onCheck}
        >
          <FormControl name="name" />
          <Button type="submit">submit</Button>
        </Form>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(onSubmit).to.be.calledWith(values);
      expect(onCheck).to.be.calledWith({});
      expect(onError).to.be.not.called;
    });

    it('Should call onSubmit callback by submit method', () => {
      const values = {
        mail: 'foobar@gmail.com'
      };

      const onSubmit = sinon.spy();
      const onError = sinon.spy();
      const onCheck = sinon.spy();
      const formRef = React.createRef<FormInstance>();
      render(
        <Form
          ref={formRef}
          formDefaultValue={values}
          model={model}
          onSubmit={onSubmit}
          onError={onError}
          onCheck={onCheck}
        >
          <FormControl name="name" />
        </Form>
      );

      formRef.current?.submit();

      expect(onSubmit).to.be.calledWith(values);
      expect(onCheck).to.be.calledWith({});
      expect(onError).to.be.not.called;
    });

    it('Should not call onSubmit callback when check failed', () => {
      const values = {
        name: 'foobar'
      };

      const onSubmit = sinon.spy();
      const onError = sinon.spy();
      const onCheck = sinon.spy();
      render(
        <Form
          formDefaultValue={values}
          model={model}
          onSubmit={onSubmit}
          onError={onError}
          onCheck={onCheck}
        >
          <FormControl name="name" />
          <Button type="submit">submit</Button>
        </Form>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(onSubmit).to.be.not.called;
      expect(onCheck).to.be.calledWith({ name: 'Email error' });
      expect(onError).to.be.calledWith({ name: 'Email error' });
    });

    it('Should not call onSubmit callback when form is disabled', () => {
      const values = { name: 'foobar@gmail.com' };
      const onSubmit = sinon.spy();
      render(
        <Form formDefaultValue={values} model={model} onSubmit={onSubmit} disabled>
          <FormControl name="name" />
          <Button type="submit">submit</Button>
        </Form>
      );

      fireEvent.click(screen.getByRole('button'));
      expect(onSubmit).to.be.not.called;
    });

    it('Should not call onSubmit callback when form is readOnly', () => {
      const values = { name: 'foobar@gmail.com' };
      const onSubmit = sinon.spy();
      render(
        <Form formDefaultValue={values} model={model} onSubmit={onSubmit} readOnly>
          <FormControl name="name" />
          <Button type="submit">submit</Button>
        </Form>
      );

      fireEvent.click(screen.getByRole('button'));
      expect(onSubmit).to.be.not.called;
    });

    it('Should not call onSubmit callback when form is plaintext', () => {
      const values = { name: 'foobar@gmail.com' };
      const onSubmit = sinon.spy();
      render(
        <Form formDefaultValue={values} model={model} onSubmit={onSubmit} plaintext>
          <FormControl name="name" />
          <Button type="submit">submit</Button>
        </Form>
      );

      fireEvent.click(screen.getByRole('button'));
      expect(onSubmit).to.be.not.called;
    });
  });

  describe('The onReset callback', () => {
    it('Should call onReset callback', () => {
      const values = { name: 'foobar@mail.com' };
      const onReset = sinon.spy();

      render(
        <Form formDefaultValue={values} onReset={onReset} model={model}>
          <FormControl name="name" />
          <Button type="reset">reset</Button>
        </Form>
      );

      fireEvent.change(screen.getByRole('textbox'), { target: { value: '123' } });

      expect(screen.getByRole('textbox')).to.have.value('123');
      expect(screen.getByRole('alert')).to.have.text('Email error');

      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('textbox')).to.have.value('foobar@mail.com');
      expect(screen.queryAllByRole('alert')).to.be.empty;
      expect(onReset).to.be.calledWith(values);
    });

    it('Should call onReset callback by reset method', async () => {
      const values = { name: 'foobar@mail.com' };
      const onReset = sinon.spy();
      const formRef = React.createRef<FormInstance>();

      render(
        <Form formDefaultValue={values} onReset={onReset} model={model} ref={formRef}>
          <FormControl name="name" />
          <Button type="reset">reset</Button>
        </Form>
      );

      fireEvent.change(screen.getByRole('textbox'), { target: { value: '123' } });

      expect(screen.getByRole('textbox')).to.have.value('123');
      expect(screen.getByRole('alert')).to.have.text('Email error');

      formRef.current?.reset();

      await waitFor(() => {
        expect(screen.getByRole('textbox')).to.have.value('foobar@mail.com');
        expect(screen.queryAllByRole('alert')).to.be.empty;
        expect(onReset).to.be.calledWith(values);
      });
    });

    it('Should not call onReset callback when form is disabled', () => {
      const values = { name: 'foobar@mail.com' };
      const onReset = sinon.spy();
      render(
        <Form formDefaultValue={values} onReset={onReset} model={model} disabled>
          <FormControl name="name" />
          <Button type="reset">reset</Button>
        </Form>
      );

      fireEvent.click(screen.getByRole('button'));
      expect(onReset).to.be.not.called;
    });

    it('Should not call onReset callback when form is readOnly', () => {
      const values = { name: 'foobar@mail.com' };
      const onReset = sinon.spy();
      render(
        <Form formDefaultValue={values} onReset={onReset} model={model} readOnly>
          <FormControl name="name" />
          <Button type="reset">reset</Button>
        </Form>
      );

      fireEvent.click(screen.getByRole('button'));
      expect(onReset).to.be.not.called;
    });
    it('Should not call onReset callback when form is plaintext', () => {
      const values = { name: 'foobar@mail.com' };
      const onReset = sinon.spy();
      render(
        <Form formDefaultValue={values} onReset={onReset} model={model} plaintext>
          <FormControl name="name" />
          <Button type="reset">reset</Button>
        </Form>
      );

      fireEvent.click(screen.getByRole('button'));
      expect(onReset).to.be.not.called;
    });
  });

  describe('Using uncontrolled formError correctly', () => {
    const nameRule = Schema.Types.StringType().minLength(10, 'Name is too short');
    const emailRule = Schema.Types.StringType().isEmail('Please enter a valid email address');

    function UsernameField(props) {
      return (
        <Form.Group controlId="name">
          <Form.ControlLabel>Username</Form.ControlLabel>
          <Form.Control name="name" rule={nameRule} {...props} />
        </Form.Group>
      );
    }

    function EmailField(props) {
      return (
        <Form.Group controlId="email">
          <Form.ControlLabel>Email</Form.ControlLabel>
          <Form.Control name="email" rule={emailRule} {...props} />
        </Form.Group>
      );
    }

    function RenderForm(props: { checkAsync?: boolean }) {
      const { checkAsync = false } = props;
      const formRef = useRef<FormInstance>(null);
      const handleClearEmailError = () => {
        formRef.current?.cleanErrorForField('email');
      };
      return (
        <Form ref={formRef} formDefaultValue={{ name: '', email: '' }}>
          <UsernameField checkAsync={checkAsync} />
          <EmailField checkAsync={checkAsync} />
          <Button onClick={handleClearEmailError}>clear email error</Button>
        </Form>
      );
    }

    it('Should show name error and email error', () => {
      render(<RenderForm />);

      userEvent.type(screen.getByRole('textbox', { name: 'Username' }), 'name');
      userEvent.type(screen.getByRole('textbox', { name: 'Email' }), 'email');
      expect(screen.getAllByRole('alert')).length(2);
    });

    it('Should show name error and email error when checkAsync is true', async () => {
      render(<RenderForm checkAsync />);
      userEvent.type(screen.getByRole('textbox', { name: 'Username' }), 'name');

      // Although this assertion is repeated, it is necessary to wait for the async check to finish
      expect(await screen.findByText('Name is too short')).to.exist;
      userEvent.type(screen.getByRole('textbox', { name: 'Email' }), 'email');

      expect(await screen.findByText('Name is too short')).to.exist;
      expect(await screen.findByText('Please enter a valid email address')).to.exist;
    });

    it('Should clear error exactly', () => {
      render(<RenderForm />);

      userEvent.type(screen.getByRole('textbox', { name: 'Username' }), 'name');
      userEvent.type(screen.getByRole('textbox', { name: 'Email' }), 'email');
      expect(screen.getAllByRole('alert')).length(2);

      userEvent.click(screen.getByRole('button'));
      expect(screen.getAllByRole('alert')).length(1);
    });
  });

  describe('Nested Fields', () => {
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

    it('Should render an error message when the value changes with checkAsync', async () => {
      const model = Schema.Model({
        user: Schema.Types.ObjectType().shape({
          age: Schema.Types.NumberType('Age must be a number ')
        })
      });

      render(
        <Form formDefaultValue={{ user: { age: '10' } }} model={model} nestedField>
          <FormControl checkAsync name="user.age" />
        </Form>
      );

      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a' } });
      await screen.findByRole('alert');
      expect(screen.getByRole('alert')).to.have.text('Age must be a number ');
    });

    it('Should render an error message when the value changes', () => {
      const model = Schema.Model({
        age: Schema.Types.NumberType('Age must be a number ')
      });

      render(
        <Form formDefaultValue={{ age: '10' }} model={model} nestedField>
          <FormControl name="age" />
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

    it('Should only validate the field of the current interactive control', () => {
      const onCheck = sinon.spy();
      const model = Schema.Model({
        obj: Schema.Types.ObjectType().shape({
          number1: Schema.Types.NumberType(),
          number2: Schema.Types.NumberType()
        })
      });

      render(
        <Form
          formDefaultValue={{ obj: { number1: '', number2: '' } }}
          model={model}
          nestedField
          onCheck={onCheck}
        >
          <FormControl name="obj.number1" data-testid="textbox1" />
          <FormControl name="obj.number2" data-testid="textbox2" />
        </Form>
      );

      fireEvent.change(screen.getByTestId('textbox1'), { target: { value: 'a' } });

      expect(screen.getByText('obj.number1 must be a number')).to.exist;

      fireEvent.change(screen.getByTestId('textbox2'), { target: { value: 'a' } });

      expect(screen.getByText('obj.number2 must be a number')).to.exist;

      fireEvent.change(screen.getByTestId('textbox2'), { target: { value: 1 } });

      expect(screen.queryByText('obj.number2 must be a number')).to.not.exist;
      expect(screen.queryByText('obj.number1 must be a number')).to.exist;
    });

    it('Should render deeply nested error messages', async () => {
      const model = Schema.Model({
        name: Schema.Types.StringType().isRequired('Name is required'),
        user: Schema.Types.ObjectType().shape({
          email: Schema.Types.StringType().isRequired('Email is required'),
          city: Schema.Types.StringType().isRequired('City is required')
        })
      });

      render(
        <Form model={model} nestedField>
          <FormControl name="name" />
          <FormControl name="user.email" />
          <FormControl name="user.city" />
          <Button appearance="primary" type="submit">
            Submit
          </Button>
        </Form>
      );

      fireEvent.click(screen.getByRole('button'));

      await screen.findAllByRole('alert');

      expect(screen.getAllByRole('alert')).to.have.length(3);

      screen.getAllByRole('alert').forEach((alert, index) => {
        expect(alert).to.have.text(
          ['Name is required', 'Email is required', 'City is required'][index]
        );
      });
    });

    it('Should render deeply nested error messages with addRule', async () => {
      const onAddRule = sinon.spy();
      const model = Schema.Model({
        name: Schema.Types.StringType().isRequired('Name is required'),
        user: Schema.Types.ObjectType().shape({
          email: Schema.Types.StringType().isRequired('Email is required'),
          city: Schema.Types.StringType().isRequired('City is required'),
          street: Schema.Types.StringType()
            .isRequired('Street is required')
            .addRule((value, data) => {
              onAddRule(value, data);
              return false;
            }, 'AddRule error')
        })
      });

      const formDefaultValue = { user: { street: 'Street' } };

      render(
        <Form model={model} nestedField formDefaultValue={formDefaultValue}>
          <FormControl name="name" />
          <FormControl name="user.email" />
          <FormControl name="user.city" />
          <FormControl name="user.street" />
          <Button appearance="primary" type="submit">
            Submit
          </Button>
        </Form>
      );

      fireEvent.click(screen.getByRole('button'));

      await screen.findAllByRole('alert');

      expect(screen.getAllByRole('alert')).to.have.length(4);
      expect(onAddRule).to.be.calledWith(formDefaultValue.user.street, formDefaultValue);

      screen.getAllByRole('alert').forEach((alert, index) => {
        expect(alert).to.have.text(
          ['Name is required', 'Email is required', 'City is required', 'AddRule error'][index]
        );
      });
    });

    it('Should render deeply nested error messages with FormControl set rule', async () => {
      render(
        <Form nestedField>
          <FormControl
            name="name"
            rule={Schema.Types.StringType().isRequired('Name is required')}
          />
          <FormControl
            name="user.email"
            rule={Schema.Types.StringType().isRequired('Email is required')}
          />
          <FormControl
            name="user.city"
            rule={Schema.Types.StringType().isRequired('City is required')}
          />
          <Button appearance="primary" type="submit">
            Submit
          </Button>
        </Form>
      );

      fireEvent.click(screen.getByRole('button'));

      await screen.findAllByRole('alert');

      expect(screen.getAllByRole('alert')).to.have.length(3);

      screen.getAllByRole('alert').forEach((alert, index) => {
        expect(alert).to.have.text(
          ['Name is required', 'Email is required', 'City is required'][index]
        );
      });
    });
  });

  describe('Custom validation rules', () => {
    it('Should get the correct formValue in the addRule callback', () => {
      const onAddRule = sinon.spy();
      const model = Schema.Model({
        name: Schema.Types.StringType().isRequired(),
        email: Schema.Types.StringType()
          .isRequired()
          .addRule((value, data) => {
            onAddRule(value, data);
            return false;
          })
      });

      const formValue = {
        name: 'username',
        email: 'email'
      };

      render(
        <Form model={model} formDefaultValue={formValue}>
          <Form.Control name="name" />
          <Form.Control name="email" />

          <Button appearance="primary" type="submit">
            Submit
          </Button>
        </Form>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(onAddRule).to.be.calledWith(formValue.email, formValue);
    });
  });
});
