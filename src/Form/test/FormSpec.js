import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import { getDOMNode, getInstance } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';

import Form from '../Form';
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
    let title = 'Test';
    let instance = getDOMNode(<Form>{title}</Form>);
    assert.equal(instance.tagName, 'FORM');
    assert.equal(instance.innerHTML, title);
  });

  it('Should be horizontal', () => {
    const instance = getDOMNode(<Form layout="horizontal" />);

    assert.include(instance.className, 'rs-form-horizontal');
  });

  it('Should be inline', () => {
    const instance = getDOMNode(<Form layout="inline" />);

    assert.include(instance.className, 'rs-form-inline');
  });

  it('Should have a value', () => {
    const values = {
      name: 'abc',
      email: 'aa@ss.com'
    };
    const instance = getDOMNode(
      <Form formValue={values}>
        <FormControl name="name" />
        <FormControl name="email" />
      </Form>
    );
    assert.equal(instance.querySelector('input[name="name"]').value, values.name);
    assert.equal(instance.querySelector('input[name="email"]').value, values.email);
  });

  it('Should have a default values', () => {
    const values = {
      name: 'abc',
      email: 'aa@ss.com'
    };
    const instance = getDOMNode(
      <Form formDefaultValue={values}>
        <FormControl name="name" />
        <FormControl name="email" />
      </Form>
    );
    assert.equal(instance.querySelector('input[name="name"]').value, values.name);
    assert.equal(instance.querySelector('input[name="email"]').value, values.email);
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
    assert.equal(instance.check(), false);
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
          assert.equal(formError.name, checkEmail);
        }}
      >
        <FormControl name="name" />
      </Form>
    );
    const checkStatus = instance.checkForField('name', checkResult => {
      assert.equal(checkResult.hasError, true);
      assert.equal(checkResult.errorMessage, checkEmail);
    });
    assert.equal(checkStatus, false);
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
    assert.equal(instance.check(), true);
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
      assert.equal(checkResult.hasError, false);
    });
    assert.equal(checkStatus, true);
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
      assert.equal(Object.keys(instance.state.formError).length, 0);
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
      assert.equal(instance.state.formError.n1, 'error');
      assert.equal(instance.state.formError.n2, undefined);
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
      assert.equal(instance.state.formError.name, 'error');
    });
  });

  it('Should call onChange callback with correct form values', () => {
    const values = {
      name: 'abc'
    };

    const onChangeSpy = sinon.spy();

    const instance = getDOMNode(
      <Form formDefaultValue={values} onChange={onChangeSpy}>
        <FormControl name="name" />
      </Form>
    );
    act(() => {
      fireEvent.change(instance.querySelector('input[name="name"]'), { target: { value: 'abcd' } });
    });

    expect(onChangeSpy).to.be.called;
    expect(onChangeSpy).to.be.calledWith({ name: 'abcd' });
  });

  it('Should call onError callback', () => {
    const values = {
      name: 'abc'
    };
    const onErrorSpy = sinon.spy();
    const instance = getDOMNode(
      <Form formDefaultValue={values} onError={onErrorSpy} model={model}>
        <FormControl name="name" />
      </Form>
    );

    fireEvent.change(instance.querySelector('input[name="name"]'), { target: { value: 'abcd' } });

    expect(onErrorSpy).to.be.called;
    expect(onErrorSpy).to.be.calledWith({ name: checkEmail });
  });

  it('Should not call onError callback', () => {
    const values = {
      name: 'abc@ddd.com'
    };

    const onErrorSpy = sinon.spy();
    const instance = getDOMNode(
      <Form formDefaultValue={values} onError={onErrorSpy} model={model}>
        <FormControl name="name" />
      </Form>
    );
    fireEvent.change(instance.querySelector('input[name="name"]'), {
      target: { value: 'abcd@ddd.com' }
    });

    expect(onErrorSpy).to.be.not.called;
  });

  it('Should call onCheck callback', () => {
    const values = {
      name: 'abc'
    };

    const onCheckSpy = sinon.spy();
    const instance = getDOMNode(
      <Form formDefaultValue={values} onCheck={onCheckSpy}>
        <FormControl name="name" />
      </Form>
    );
    fireEvent.change(instance.querySelector('input[name="name"]'), { target: { value: 'abcd' } });
    expect(onCheckSpy).to.be.called;
    expect(onCheckSpy).to.be.calledWith({});
  });

  it('Should call onCheck callback when blur', () => {
    const values = {
      name: 'abc'
    };

    const onCheckSpy = sinon.spy();
    const instance = getDOMNode(
      <Form formDefaultValue={values} onCheck={onCheckSpy} checkTrigger="blur">
        <FormControl name="name" />
      </Form>
    );
    fireEvent.blur(instance.querySelector('input[name="name"]'));

    expect(onCheckSpy).to.be.called;
    expect(onCheckSpy).to.be.calledWith({});
  });

  it('Should not call onCheck callback when checkTrigger is null', () => {
    const values = {
      name: 'abc'
    };

    const onCheckSpy = sinon.spy();
    const instance = getDOMNode(
      <Form formDefaultValue={values} onCheck={onCheckSpy} checkTrigger={null}>
        <FormControl name="name" />
      </Form>
    );
    fireEvent.blur(instance.querySelector('input[name="name"]'));
    fireEvent.change(instance.querySelector('input[name="name"]'), { target: { value: 'abcd' } });

    expect(onCheckSpy).to.be.not.called;
  });

  it('Should call onCheck callback', () => {
    const values = {
      name: 'abc'
    };

    const onCheckSpy = sinon.spy();
    const instance = getDOMNode(
      <Form
        formDefaultValue={values}
        onCheck={onCheckSpy}
        formError={{
          email: 'email is null'
        }}
      >
        <FormControl name="name" />
      </Form>
    );
    fireEvent.change(instance.querySelector('input[name="name"]'), { target: { value: 'abcd' } });

    expect(onCheckSpy).to.be.called;
    expect(onCheckSpy).to.be.calledWith({ email: 'email is null' });
  });

  it('Should call onError callback by checkAsync', async () => {
    const values = {
      name: 'abc'
    };

    const onErrorSpy = sinon.spy();
    const instance = getDOMNode(
      <Form formDefaultValue={values} onError={onErrorSpy} model={modelAsync}>
        <FormControl name="name" checkAsync />
      </Form>
    );

    fireEvent.change(instance.querySelector('input[name="name"]'), { target: { value: 'abcd' } });

    await waitFor(() => {
      expect(onErrorSpy).to.be.called;
      expect(onErrorSpy).to.be.calledWith({ name: 'Duplicate name' });
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
          field1: Schema.Types.StringType().isRequired('error1'),
          field2: Schema.Types.NumberType().isRequired('error2')
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

    const onErrorSpy = sinon.spy();
    const instance = getDOMNode(
      <Form formDefaultValue={values} onError={onErrorSpy} model={model}>
        <FormControl name="items" accepter={Field} />
      </Form>
    );
    fireEvent.change(instance.querySelector('input[name="items"]'), { target: { value: 'abcd' } });

    expect(onErrorSpy).to.be.called;
    expect(onErrorSpy).to.be.calledWith({
      items: {
        hasError: true,
        array: [
          {
            hasError: true,
            object: {
              field1: { hasError: true, errorMessage: 'error1' },
              field2: { hasError: true, errorMessage: 'error2' }
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
          field1: Schema.Types.StringType().isRequired('error1'),
          field2: Schema.Types.NumberType().isRequired('error2')
        })
      )
    });

    const Field = () => {
      return <input name="items" />;
    };

    const values = {
      items: [{ field1: '', field2: '' }]
    };

    const formRef = React.createRef();
    const onErrorSpy = sinon.spy();

    render(
      <Form formDefaultValue={values} onError={onErrorSpy} model={model} ref={formRef}>
        <FormControl name="items" accepter={Field} />
      </Form>
    );

    act(() => {
      formRef.current.check();
    });

    expect(onErrorSpy).to.be.called;
    expect(onErrorSpy).to.be.calledWith({
      items: {
        hasError: true,
        array: [
          {
            hasError: true,
            object: {
              field1: { hasError: true, errorMessage: 'error1' },
              field2: { hasError: true, errorMessage: 'error2' }
            }
          }
        ]
      }
    });
  });
});
