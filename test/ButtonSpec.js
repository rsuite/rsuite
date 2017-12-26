import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Button from '../src/Button';

describe('Button', () => {

  it('Should output a button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Button>
        Title
      </Button>
    );
    assert.equal(findDOMNode(instance).innerHTML, 'Title');
    assert.equal(findDOMNode(instance).nodeName, 'BUTTON');
    assert.ok(findDOMNode(instance).className.match(/\bbtn-default\b/));
  });


  it('Should show the type if passed one', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Button type="submit">
        Title
      </Button>
    );
    assert.equal(findDOMNode(instance).getAttribute('type'), 'submit');
  });

  it('Should output an anchor if called with a href', () => {
    const href = '/url';
    const instance = ReactTestUtils.renderIntoDocument(
      <Button href={href}>
        Title
      </Button>
    );
    assert.equal(findDOMNode(instance).nodeName, 'A');
    assert.equal(findDOMNode(instance).getAttribute('href'), href);

  });

  it('Should call onClick callback', (done) => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Button onClick={doneOp}>
        Title
      </Button>
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance));
  });

  it('Should be disabled', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Button disabled>
        Title
      </Button>
    );
    assert.ok(findDOMNode(instance).disabled);
  });

  it('Should be disabled link', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Button disabled href="#">
        Title
      </Button>
    );
    assert.ok(findDOMNode(instance).className.match(/\bdisabled\b/));
  });

  it('Should have block class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Button block>
        Title
      </Button>
    );
    assert.ok(findDOMNode(instance).className.match(/\bbtn-block\b/));
  });

  it('Should apply appearance', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Button appearance="ghost">
        Title
      </Button>
    );
    assert.ok(findDOMNode(instance).className.match(/\bbtn-ghost\b/));
  });

  it('Should apply size class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Button size="lg">
        Title
      </Button>
    );
    assert.ok(findDOMNode(instance).className.match(/\bbtn-lg\b/));
  });

  it('Should honour additional classes passed in, adding not overriding', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Button className="bob" appearance="ghost">
        Title
      </Button>
    );

    assert.ok(findDOMNode(instance).className.match(/\bbob\b/));
    assert.ok(findDOMNode(instance).className.match(/\bbtn-ghost\b/));
  });

  it('Should default to shape="default"', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Button shape="default">
        Title
      </Button>
    );
    assert.equal(instance.props.shape, 'default');
  });

  it('Should be active', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Button active>
        Title
      </Button>
    );
    assert.ok(findDOMNode(instance).className.match(/\bactive\b/));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Button className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <Button style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
