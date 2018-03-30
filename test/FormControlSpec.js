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
});
