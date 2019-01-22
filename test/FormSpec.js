import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Form from '../src/Form';
import FormControl from '../src/FormControl';
import Schema from '../src/Schema';
import _isNil from 'lodash/isNil';

const checkEmail = '请输入正确的邮箱';

const model = Schema.Model({
  name: Schema.Types.StringType().addRule(value => {
    return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      value
    );
  }, checkEmail)
});

describe('Form', () => {
  it('Should render a Form', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(<Form>{title}</Form>);
    assert.equal(findDOMNode(instance).tagName, 'FORM');
    assert.equal(findDOMNode(instance).innerHTML, title);
  });

  it('Should be horizontal', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Form layout="horizontal" />);
    const element = findDOMNode(instance);
    assert.include(element.className, 'rs-form-horizontal');
  });

  it('Should be inline', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Form layout="inline" />);
    const element = findDOMNode(instance);
    assert.include(element.className, 'rs-form-inline');
  });

  it('Should have a value', () => {
    const values = {
      name: 'abc',
      email: 'aa@ss.com'
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Form formValue={values}>
        <FormControl name="name" />
        <FormControl name="email" />
      </Form>
    );
    const element = findDOMNode(instance);
    assert.equal(element.querySelector('input[name="name"]').value, values.name);
    assert.equal(element.querySelector('input[name="email"]').value, values.email);
  });

  it('Should have a default values', () => {
    const values = {
      name: 'abc',
      email: 'aa@ss.com'
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Form formDefaultValue={values}>
        <FormControl name="name" />
        <FormControl name="email" />
      </Form>
    );
    const element = findDOMNode(instance);
    assert.equal(element.querySelector('input[name="name"]').value, values.name);
    assert.equal(element.querySelector('input[name="email"]').value, values.email);
  });

  it('Should be `false` for check status', () => {
    const values = {
      name: 'abc'
    };
    const instance = ReactTestUtils.renderIntoDocument(
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
    const instance = ReactTestUtils.renderIntoDocument(
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
    const instance = ReactTestUtils.renderIntoDocument(
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
    const instance = ReactTestUtils.renderIntoDocument(
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
    const instance = ReactTestUtils.renderIntoDocument(
      <Form model={model} formDefaultValue={values}>
        <FormControl name="name" />
      </Form>
    );
    instance.check();
    instance.cleanErrors(() => {
      assert.equal(Object.keys(instance.state.formError).length, 0);
    });
  });

  it('Should be {name:"error"} for formError when call resetErrors', () => {
    const values = {
      name: 'abc.com'
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Form model={model} formDefaultValue={values}>
        <FormControl name="name" />
      </Form>
    );
    instance.resetErrors({ name: 'error' }, () => {
      assert.equal(instance.state.formError.name, 'error');
    });
  });

  it('Should call onChange callback', done => {
    const values = {
      name: 'abc'
    };

    const doneOp = v => {
      if (v.name === values.name) {
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Form formDefaultValue={values} onChange={doneOp}>
        <FormControl name="name" />
      </Form>
    );
    const element = findDOMNode(instance);
    ReactTestUtils.Simulate.change(element.querySelector('input[name="name"]'));
  });

  it('Should clear error', done => {
    const tip = 'This field is required.';
    const curModel = Schema.Model({
      name: Schema.Types.StringType().isRequired(tip),
      number: Schema.Types.StringType().isRequired(tip)
    });

    class Demo extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          formValue: {
            name: '',
            number: '123'
          },
          formError: {}
        };
      }

      handleChangeNum = () => {
        this.setState(({ formValue }) => ({
          formValue: {
            ...formValue,
            name: 'abc@qq.com'
          }
        }));
        setTimeout(() => {
          if (this.state.formValue.name === 'abc@qq.com' && _isNil(this.state.formError.name)) {
            done();
          }
        });
      };

      render() {
        const { formValue } = this.state;
        return (
          <Form
            ref={ref => (this.form = ref)}
            model={curModel}
            formValue={formValue}
            onChange={formValue => this.setState({ formValue })}
            onCheck={formError => this.setState({ formError })}
          >
            <FormControl name="name" />
            <FormControl name="number" onChange={this.handleChangeNum} />
          </Form>
        );
      }
    }

    const instance = ReactTestUtils.renderIntoDocument(<Demo />);
    const element = findDOMNode(instance.form);
    ReactTestUtils.Simulate.change(element.querySelector('input[name="name"]'));
    ReactTestUtils.Simulate.change(element.querySelector('input[name="number"]'));
  });

  it('Should call onError callback', done => {
    const values = {
      name: 'abc'
    };

    const doneOp = v => {
      if (v.name === checkEmail) {
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Form formDefaultValue={values} onError={doneOp} model={model}>
        <FormControl name="name" />
      </Form>
    );
    const element = findDOMNode(instance);
    ReactTestUtils.Simulate.change(element.querySelector('input[name="name"]'));
  });

  it('Should not call onError callback', done => {
    let isValid = true;
    const values = {
      name: 'abc@ddd.com'
    };

    const doneOp = () => {
      isValid = false;
    };

    setTimeout(() => {
      if (isValid) {
        done();
      }
    }, 10);

    const instance = ReactTestUtils.renderIntoDocument(
      <Form formDefaultValue={values} onError={doneOp} model={model}>
        <FormControl name="name" />
      </Form>
    );
    const element = findDOMNode(instance);
    ReactTestUtils.Simulate.change(element.querySelector('input[name="name"]'));
  });

  it('Should call onCheck callback', done => {
    const values = {
      name: 'abc'
    };

    const doneOp = v => {
      if (typeof v.name === 'undefined') {
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Form formDefaultValue={values} onCheck={doneOp}>
        <FormControl name="name" />
      </Form>
    );
    const element = findDOMNode(instance);
    ReactTestUtils.Simulate.change(element.querySelector('input[name="name"]'));
  });

  it('Should call onCheck callback when blur', done => {
    const values = {
      name: 'abc'
    };

    const doneOp = v => {
      if (typeof v.name === 'undefined') {
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Form formDefaultValue={values} onCheck={doneOp} checkTrigger="blur">
        <FormControl name="name" />
      </Form>
    );
    const element = findDOMNode(instance);
    ReactTestUtils.Simulate.blur(element.querySelector('input[name="name"]'));
  });

  it('Should not call onCheck callback when checkTrigger is null', done => {
    let isValid = true;
    const values = {
      name: 'abc'
    };

    const doneOp = () => {
      isValid = false;
    };

    setTimeout(() => {
      if (isValid) {
        done();
      }
    }, 10);

    const instance = ReactTestUtils.renderIntoDocument(
      <Form formDefaultValue={values} onCheck={doneOp} checkTrigger={null}>
        <FormControl name="name" />
      </Form>
    );
    const element = findDOMNode(instance);
    ReactTestUtils.Simulate.blur(element.querySelector('input[name="name"]'));
    ReactTestUtils.Simulate.change(element.querySelector('input[name="name"]'));
  });

  it('Should call onCheck callback', done => {
    const values = {
      name: 'abc'
    };

    const doneOp = v => {
      if (v.email === 'email is null') {
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Form
        formDefaultValue={values}
        onCheck={doneOp}
        formError={{
          email: 'email is null'
        }}
      >
        <FormControl name="name" />
      </Form>
    );
    const element = findDOMNode(instance);
    ReactTestUtils.Simulate.change(element.querySelector('input[name="name"]'));
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Form className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(<Form style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Form classPrefix="custom-prefix" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
