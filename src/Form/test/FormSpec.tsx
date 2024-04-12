import React from 'react';
import { render, fireEvent, act, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import { getInstance, testStandardProps } from '@test/utils';

import Form, { FormInstance } from '../Form';
import FormControl from '../../FormControl';
import Schema from '../../Schema';

const checkEmail = 'Please input the correct email address';

const model = Schema.Model({
  name: Schema.Types.StringType().addRule(value => {
    return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      value
    );
  }, checkEmail)
});

const modelAsync = Schema.Model({
  // FIXME `.addRule()` doesn't support a callback returning Promise
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  name: Schema.Types.StringType().addRule(value => {
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

describe('Form', () => {
  testStandardProps(<Form />);

  it('Should render a Form', () => {
    render(<Form aria-label="form">My Form</Form>);

    expect(screen.getByRole('form')).to.have.tagName('FORM');
    expect(screen.getByRole('form')).to.have.text('My Form');
  });

  it('Should be horizontal', () => {
    render(<Form aria-label="form" layout="horizontal" />);
    expect(screen.getByRole('form')).to.have.class('rs-form-horizontal');
  });

  it('Should be inline', () => {
    render(<Form aria-label="form" layout="inline" />);
    expect(screen.getByRole('form')).to.have.class('rs-form-inline');
  });

  it('Should be disabled', () => {
    render(
      <Form aria-label="form" disabled>
        <button type="submit">submit</button>
      </Form>
    );

    expect(screen.getByRole('form')).to.have.class('rs-form-disabled');
  });

  it('Should be readOnly', () => {
    render(<Form aria-label="form" readOnly />);

    expect(screen.getByRole('form')).to.have.class('rs-form-readonly');
  });

  it('Should be plaintext', () => {
    render(<Form aria-label="form" plaintext />);

    expect(screen.getByRole('form')).to.have.class('rs-form-plaintext');
  });

  it('Should have a value', () => {
    const values = {
      name: 'abc',
      email: 'aa@ss.com'
    };
    render(
      <Form formValue={values}>
        <FormControl name="name" />
        <FormControl name="email" />
      </Form>
    );

    expect(screen.getAllByRole('textbox')[0]).to.have.value(values.name);
    expect(screen.getAllByRole('textbox')[1]).to.have.value(values.email);
  });

  it('Should have a default values', () => {
    const values = {
      name: 'abc',
      email: 'aa@ss.com'
    };
    render(
      <Form formDefaultValue={values}>
        <FormControl name="name" />
        <FormControl name="email" />
      </Form>
    );

    expect(screen.getAllByRole('textbox')[0]).to.have.value(values.name);
    expect(screen.getAllByRole('textbox')[1]).to.have.value(values.email);
  });

  it('Should be `false` for check status', () => {
    const values = {
      name: 'abc'
    };
    const instance = getInstance(
      <Form model={model} formDefaultValue={values}>
        <FormControl name="name" />
      </Form>
    );

    expect(instance.check()).to.be.false;
  });

  it('Should be `false` for check status by checkForField', () => {
    const values = {
      name: 'abc'
    };
    const instance = getInstance(
      <Form
        model={model}
        formDefaultValue={values}
        onError={formError => {
          expect(formError.name).to.equal(checkEmail);
        }}
      >
        <FormControl name="name" />
      </Form>
    );
    const checkStatus = instance.checkForField('name', checkResult => {
      expect(checkResult).to.be.deep.equal({
        hasError: true,
        errorMessage: checkEmail
      });
    });

    expect(checkStatus).to.be.false;
  });

  it('Should be `true` for check status', () => {
    const values = {
      name: 'abc@gmail.com'
    };
    const instance = getInstance(
      <Form model={model} formDefaultValue={values}>
        <FormControl name="name" />
      </Form>
    );
    expect(instance.check()).to.be.true;
  });

  it('Should be `true` for check status by checkForField', () => {
    const values = {
      name: 'abc@gmail.com'
    };
    const instance = getInstance(
      <Form model={model} formDefaultValue={values}>
        <FormControl name="name" />
      </Form>
    );
    const checkStatus = instance.checkForField('name', checkResult => {
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

    const instance = getInstance(
      <Form model={model} formDefaultValue={values}>
        <FormControl name="name" />
      </Form>
    );
    instance.check();
    instance.cleanErrors(() => {
      expect(instance.state.formError).to.be.deep.equal({});
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

    const instance = getInstance(
      <Form model={model} formDefaultValue={values}>
        <FormControl name="n1" />
        <FormControl name="n2" />
      </Form>
    );
    instance.check();
    instance.cleanErrorForField('n2', () => {
      expect(instance.state.formError).to.be.deep.equal({ n1: 'error' });
    });
  });

  it('Should be {name:"error"} for formError when call resetErrors', () => {
    const values = {
      name: 'abc.com'
    };
    const instance = getInstance(
      <Form model={model} formDefaultValue={values}>
        <FormControl name="name" />
      </Form>
    );
    instance.resetErrors({ name: 'error' }, () => {
      expect(instance.state.formError).to.be.deep.equal({ name: 'error' });
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
    expect(onError).to.be.calledWith({ name: checkEmail });
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
      // FIXME `checkTrigger` doesn't support `null` value
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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
    const instance = getInstance(
      <Form formDefaultValue={values} model={modelAsync}>
        <FormControl name="name" checkAsync />
      </Form>
    );
    const result = await instance.checkAsync();

    expect(result.hasError).to.be.true;
  });

  it('Check status should be fired on checkForFieldAsync', async () => {
    const values = {
      name: 'abc'
    };
    const instance = getInstance(
      <Form formDefaultValue={values} model={modelAsync}>
        <FormControl name="name" checkAsync />
      </Form>
    );
    const result = await instance.checkForFieldAsync('name');

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
});
