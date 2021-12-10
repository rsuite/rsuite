import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { render } from '@testing-library/react';

import { getDOMNode } from '@test/testUtils';
import Form from '../../Form';
import FormControl from '../FormControl';
import FormGroup from '../../FormGroup';

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

  it('Should have a custom className', () => {
    const instance = getDOMNode(
      <Form>
        <FormControl className="custom" name="username" />
      </Form>
    );

    assert.include(instance.querySelector('.rs-form-control').className, 'custom');
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
});
