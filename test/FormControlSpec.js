import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Form from '../src/Form';
import FormControl from '../src/FormControl';

describe('FormControl', () => {
  it('Should output a input', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Form>
        <FormControl name="username" />
      </Form>
    );

    const element = findDOMNode(instance);
    assert.ok(element.querySelector('input'));
  });

  it('Should output a textarea', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Form>
        <FormControl name="username" accepter="textarea" />
      </Form>
    );
    const element = findDOMNode(instance);
    assert.ok(element.querySelector('textarea'));
  });

  it('Should call onChange callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Form>
        <FormControl name="username" onChange={doneOp} />
      </Form>
    );
    const element = findDOMNode(instance);
    ReactTestUtils.Simulate.change(element.querySelector('input'));
  });

  it('Should be readOnly', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Form>
        <FormControl name="username" readOnly />
      </Form>
    );

    const element = findDOMNode(instance);
    assert.ok(element.querySelector('.rs-form-control-wrapper.read-only'));
    assert.ok(element.querySelector('input[readonly]'));
  });

  it('Should call onBlur callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Form>
        <FormControl name="username" onBlur={doneOp} />
      </Form>
    );
    const element = findDOMNode(instance);
    ReactTestUtils.Simulate.blur(element.querySelector('input'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Form>
        <FormControl className="custom" name="username" />
      </Form>
    );
    const element = findDOMNode(instance);
    assert.include(element.querySelector('input').className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <Form>
        <FormControl style={{ fontSize }} name="username" />
      </Form>
    );
    const element = findDOMNode(instance);
    assert.equal(element.querySelector('input').style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Form>
        <FormControl classPrefix="custom-prefix" name="username" />
      </Form>
    );
    assert.ok(
      findDOMNode(instance)
        .querySelector('div')
        .className.match(/\bcustom-prefix\b/)
    );
  });

  it('Should render correctly when form value was null', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Form formValue={null}>
        <FormControl name="name" />
      </Form>
    );
    assert.equal(findDOMNode(instance).querySelector('input').value, '');
  });

  it('Should render correctly when form error was null', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Form formError={null}>
        <FormControl name="name" />
      </Form>
    );
    assert.ok(!findDOMNode(instance).querySelector('.rs-form-control-message-wrapper'));
  });

  it('Should render correctly when errorMessage was null', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <Form formError={{ username: 'error' }}>
        <FormControl errorMessage={null} style={{ fontSize }} name="username" />
      </Form>
    );
    const element = findDOMNode(instance);
    assert.ok(!element.querySelector('.rs-form-control-message-wrapper'));
  });

  it('Should the priority of errorMessage be higher than formError', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <Form formError={{ username: 'error1' }}>
        <FormControl errorMessage={'error2'} style={{ fontSize }} name="username" />
      </Form>
    );
    const element = findDOMNode(instance);
    assert.equal(element.querySelector('.rs-form-control-message-wrapper').innerText, 'error2');
  });

  it('Should render correctly when errorMessage was null', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <Form formError={{ username: 'error' }} errorFromContext={false}>
        <FormControl style={{ fontSize }} name="username" />
      </Form>
    );
    const element = findDOMNode(instance);
    assert.ok(!element.querySelector('.rs-form-control-message-wrapper'));
  });
});
