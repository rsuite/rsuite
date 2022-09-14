import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import { getDOMNode, getInstance } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Button from '../Button';

describe('Button', () => {
  testStandardProps(<Button />);

  it('Should output a button', () => {
    const instance = getDOMNode(<Button>Title</Button>);
    assert.equal(instance.textContent, 'Title');
    assert.equal(instance.nodeName, 'BUTTON');
    assert.ok(instance.className.match(/\bbtn-default\b/));
  });

  it('Should show the submit type', () => {
    const instance = getDOMNode(<Button type="submit">Title</Button>);
    assert.equal(instance.getAttribute('type'), 'submit');
  });

  it('Should show the default type', () => {
    const instance = getDOMNode(<Button>Title</Button>);
    assert.equal(instance.getAttribute('type'), 'button');
  });

  it('Should output an anchor if called with a href', () => {
    const href = '/url';
    const instance = getDOMNode(<Button href={href}>Title</Button>);
    assert.equal(instance.nodeName, 'A');
    assert.equal(instance.getAttribute('href'), href);
  });

  it('Should call onClick callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Button onClick={doneOp}>Title</Button>);
    ReactTestUtils.Simulate.click(instance);
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<Button disabled>Title</Button>);

    assert.ok(instance.disabled);
  });

  it('Should be loading', () => {
    const instance = getInstance(<Button loading>Title</Button>);
    assert.include(instance.className, 'rs-btn-loading');
    assert.ok(instance.querySelector('.rs-btn-spin'));
  });

  it('Should be disabled link', () => {
    const onClickSpy = sinon.spy();
    const instance = getDOMNode(
      <Button disabled href="https://rsuitejs.com" onClick={onClickSpy}>
        Title
      </Button>
    );

    ReactTestUtils.Simulate.click(instance);
    assert.ok(!onClickSpy.calledOnce);
  });

  it('Should have block class', () => {
    const instance = getDOMNode(<Button block>Title</Button>);
    assert.ok(instance.className.match(/\bbtn-block\b/));
  });

  it('Should apply appearance', () => {
    const instance = getDOMNode(<Button appearance="ghost">Title</Button>);
    assert.ok(instance.className.match(/\bbtn-ghost\b/));
  });

  it('Should apply size class', () => {
    const instance = getDOMNode(<Button size="lg">Title</Button>);
    assert.ok(instance.className.match(/\bbtn-lg\b/));
  });

  it('Should honour additional classes passed in, adding not overriding', () => {
    const instance = getDOMNode(
      <Button className="bob" appearance="ghost">
        Title
      </Button>
    );

    assert.ok(instance.className.match(/\bbob\b/));
    assert.ok(instance.className.match(/\bbtn-ghost\b/));
  });

  it('Should be active', () => {
    const instance = getDOMNode(<Button active>Title</Button>);
    assert.ok(instance.className.match(/\bactive\b/));
  });

  it('Should have a correct role', () => {
    const instance = getDOMNode(<Button as="span" />);

    const instance2 = getDOMNode(<Button as="span" role="combobox" />);

    assert.equal(instance.getAttribute('role'), 'button');
    assert.equal(instance.nodeName, 'SPAN');

    assert.equal(instance2.getAttribute('role'), 'combobox');
  });

  it('Should access the underlying <button> element via `ref` attribute', () => {
    const buttonRef = React.createRef();

    render(<Button ref={buttonRef}>Text</Button>);

    expect(buttonRef.current).to.have.tagName('button');
  });
});
