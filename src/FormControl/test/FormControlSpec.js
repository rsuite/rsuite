import React, { useState } from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { render, fireEvent, screen } from '@testing-library/react';
import { getDOMNode } from '@test/testUtils';
import Form from '../../Form';
import FormControl from '../FormControl';
import FormGroup from '../../FormGroup';
import Schema from '../../Schema';

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

  it('Should call onChange callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <Form>
        <FormControl name="username" onChange={doneOp} />
      </Form>
    );

    ReactTestUtils.Simulate.change(instance.querySelector('input'));
  });

  it('Should be readOnly', () => {
    const instance = getDOMNode(
      <Form readOnly>
        <FormControl name="username" />
      </Form>
    );

    assert.ok(instance.querySelector('input[readonly]'));
  });

  it('Should be readOnly on accepter', done => {
    function Input(props) {
      // eslint-disable-next-line react/prop-types
      if (props && props.readOnly) {
        done();
      }
      return <input {...props} />;
    }
    getDOMNode(
      <Form readOnly>
        <FormControl name="username" accepter={Input} />
      </Form>
    );
  });

  it('Should call onBlur callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <Form>
        <FormControl name="username" onBlur={doneOp} />
      </Form>
    );

    ReactTestUtils.Simulate.blur(instance.querySelector('input'));
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

    assert.equal(instance.querySelector('input').style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(
      <Form>
        <FormControl classPrefix="custom-prefix" name="username" />
      </Form>
    );
    assert.ok(instance.querySelector('div').className.match(/\bcustom-prefix\b/));
  });

  it('Should render correctly when form value was null', () => {
    const instance = getDOMNode(
      <Form formValue={null}>
        <FormControl name="name" />
      </Form>
    );
    assert.equal(instance.querySelector('input').value, '');
  });

  it('Should render correctly form default value when set', () => {
    const mockValue = 'value';
    const instance = getDOMNode(
      <Form formDefaultValue={{ name: mockValue }}>
        <FormControl name="name" />
      </Form>
    );
    assert.equal(instance.querySelector('input').value, mockValue);
  });

  it('Should render correctly default value when explicitly set and form default is not set', () => {
    const mockValue = 'value';
    const instance = getDOMNode(
      <Form formDefaultValue={null}>
        <FormControl name="name" defaultValue={mockValue} />
      </Form>
    );
    assert.equal(instance.querySelector('input').value, mockValue);
  });

  it('Should render correctly default value when explicitly set over form default', () => {
    const mockValue = 'value';
    const instance = getDOMNode(
      <Form formDefaultValue={{ name: 'another value' }}>
        <FormControl name="name" defaultValue={mockValue} />
      </Form>
    );
    assert.equal(instance.querySelector('input').value, mockValue);
  });

  it('Should render correctly when form error was null', () => {
    const instance = getDOMNode(
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

    assert.equal(instance.querySelector('.rs-form-control-message-wrapper').textContent, 'error2');
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
    expect(input).to.have.attr('aria-errormessage', alert.getAttribute('id'));
  });

  it('Should remove value and error when shouldResetWithUnmount is true', () => {
    let refValue = { username: '', email: '' };
    let refError = {};
    const model = Schema.Model({
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
            {email || <FormControl id="username" name="username" shouldResetWithUnmount />}
            <FormControl id="email" name="email" />
          </Form>
        </>
      );
    };
    const { container } = render(<Wrapper />);
    fireEvent.change(container.querySelector('#username'), { target: { value: 'username' } });
    assert.deepEqual(refValue, { username: 'username', email: '' });
    assert.deepEqual(refError, { username: 'The length cannot exceed 2' });
    fireEvent.change(container.querySelector('#email'), { target: { value: 'email' } });
    assert.deepEqual(refValue, { email: 'email' });
    assert.deepEqual(refError, { email: 'The length cannot exceed 2' });
  });

  describe('rule', () => {
    it("should check the field's rule", () => {
      const formRef = React.createRef();
      const handleError = sinon.spy();

      render(
        <Form ref={formRef} onError={handleError}>
          <FormControl name="items" rule={Schema.Types.StringType().isRequired('require')} />
        </Form>
      );
      formRef.current.check();
      assert.equal(handleError.callCount, 1);
      assert.deepEqual(handleError.firstCall.firstArg, { items: 'require' });
    });

    it('Should not validate fields unmounted with rule', () => {
      const formRef = React.createRef();
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

      formRef.current.check();
      assert.equal(handleError.callCount, 1);
      assert.deepEqual(handleError.firstCall.firstArg, { user: 'require', password: 'require' });

      fireEvent.click(container.querySelector('button'));
      formRef.current.check();
      assert.equal(handleError.callCount, 2);
      assert.deepEqual(handleError.secondCall.firstArg, { user: 'require' });
    });

    it("Should validate accurately,when field's rule is dynamic", () => {
      const formRef = React.createRef();
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

      formRef.current.check();
      assert.equal(handleError.callCount, 1);
      assert.deepEqual(handleError.firstCall.firstArg, { user: 'require' });

      fireEvent.click(container.querySelector('button'));
      formRef.current.check();
      assert.equal(handleError.callCount, 2);
      assert.deepEqual(handleError.secondCall.firstArg, { user: 'second require' });
    });

    it("Should use the field's rule when both model and field have same name rule", () => {
      const formRef = React.createRef();
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

      formRef.current.check();
      assert.equal(handleError.callCount, 1);
      assert.equal(handleError.firstCall.firstArg.user, 'field require');
    });
  });
});
