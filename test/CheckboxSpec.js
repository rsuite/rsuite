import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Checkbox from '../src/Checkbox';

describe('Checkbox', () => {
  it('Should render a checkbox', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Checkbox>Test</Checkbox>
    );
    assert.equal(ReactDOM.findDOMNode(instance).querySelectorAll('input[type="checkbox"]').length, 1);
  });

  it('Should add title', () => {
    let title = 'Text';
    let instance = ReactTestUtils.renderIntoDocument(
      <Checkbox title={title}>Test</Checkbox>
    );
    assert.equal(ReactDOM.findDOMNode(instance).querySelector('label').title, title);
  });

  it('Should have checkbox-inline class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Checkbox inline>Test</Checkbox>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bcheckbox-inline\b/));
  });

  it('Should be disabled', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Checkbox disabled>Test</Checkbox>
    );
    assert.ok(ReactDOM.findDOMNode(instance).querySelector('input').disabled);
    assert.ok(ReactDOM.findDOMNode(instance).querySelector('.checker').className.match(/\bdisabled\b/));
  });

  it('Should be checked', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Checkbox checked>Test</Checkbox>
    );
    assert.ok(ReactDOM.findDOMNode(instance).querySelector('.checked'));
  });

  it('Should be defaultChecked', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Checkbox defaultChecked>Test</Checkbox>
    );
    assert.ok(ReactDOM.findDOMNode(instance).querySelector('.checked'));
  });


  it('Should have a `Test` value', () => {
    let value = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <Checkbox defaultValue={value}>Test</Checkbox>
    );
    assert.equal(ReactDOM.findDOMNode(instance).querySelector('input').value, value);
  });

  it('Should support inputRef', () => {
    let input;
    let instance = ReactTestUtils.renderIntoDocument(
      <Checkbox inputRef={ref => input = ref} >Test</Checkbox>
    );
    assert.ok(input);
  });

  it('Should call onChange callback', (done) => {
    let value = 'Test';
    let doneOp = (data) => {
      if (data === value) {
        done();
      }
    };

    let instance = ReactTestUtils.renderIntoDocument(
      <Checkbox onChange={doneOp} value={value}>
        Title
      </Checkbox>
    );
    ReactTestUtils.Simulate.change(ReactDOM.findDOMNode(instance).querySelector('input'));
  });


  it('Should be checked with change', (done) => {
    let doneOp = (checked) => {
      if (checked) {
        done();
      }
    };

    let instance = ReactTestUtils.renderIntoDocument(
      <Checkbox onChange={doneOp} >
        Title
      </Checkbox>
    );

    ReactTestUtils.Simulate.change(ReactDOM.findDOMNode(instance).querySelector('input'));
  });


  it('Should be unchecked with change', (done) => {
    let doneOp = (checked) => {
      if (!checked) {
        done();
      }
    };

    let instance = ReactTestUtils.renderIntoDocument(
      <Checkbox onChange={doneOp} checked>
        Title
      </Checkbox>
    );

    ReactTestUtils.Simulate.change(ReactDOM.findDOMNode(instance).querySelector('input'));
  });


  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Checkbox className="custom" />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <Checkbox style={{ fontSize }} />
    );
    assert.equal(ReactDOM.findDOMNode(instance).style.fontSize, fontSize);
  });


});
