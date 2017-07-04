import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import ButtonGroup from '../src/ButtonGroup';
import Button from '../src/Button';

describe('ButtonGroup', () => {
  it('Should output a button group', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup />
    );
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbtn-group\b/));
  });

  it('Should add size', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup size="lg" />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbtn-group-lg\b/));
  });

  it('Should add vertical variation', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup vertical />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbtn-group-vertical\b/));
  });


  it('Should add block variation', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup vertical block />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbtn-block\b/));
  });

  it('Should warn about block without vertical', () => {

    ReactTestUtils.renderIntoDocument(
      <ButtonGroup block />
    );
  });

  it('Should add justified variation', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup justified />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbtn-group-justified\b/));
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup className="custom" />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should render 2 buttons', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup justified>
        <Button>
          Title
        </Button>
        <Button>
          Title
        </Button>
      </ButtonGroup>
    );
    assert.equal(ReactDOM.findDOMNode(instance).querySelectorAll('button').length, 2);
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonGroup style={{ fontSize }} />
    );
    assert.equal(ReactDOM.findDOMNode(instance).style.fontSize, fontSize);
  });


});
