import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Dropdown from '../src/Dropdown';
import innerText from './innerText';

describe('Dropdown', () => {
  it('Should render a Dropdown', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown>
        <Dropdown.Item>1</Dropdown.Item>
        <Dropdown.Item>2</Dropdown.Item>
        {null}
        <div>abc</div>
      </Dropdown>
    );
    assert.include(findDOMNode(instance).className, 'rs-dropdown');
  });

  it('Should be disabled', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown disabled>
        <Dropdown.Item>1</Dropdown.Item>
        <Dropdown.Item>2</Dropdown.Item>
      </Dropdown>
    );
    assert.include(findDOMNode(instance).className, 'rs-dropdown-disabled');
  });

  it('Should hava a custom className in toggle', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown toggleClassName="custom-toggle">
        <Dropdown.Item>1</Dropdown.Item>
        <Dropdown.Item>2</Dropdown.Item>
      </Dropdown>
    );
    assert.ok(findDOMNode(instance).querySelector('.rs-dropdown-toggle.custom-toggle'));
  });

  it('Should have a className for placement', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown placement="topLeft">
        <Dropdown.Item>1</Dropdown.Item>
        <Dropdown.Item>2</Dropdown.Item>
      </Dropdown>
    );
    assert.include(findDOMNode(instance).className, 'rs-dropdown-placement-top-left');
  });

  it('Should have a title', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown title="abc">
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );

    assert.equal(innerText(findDOMNode(instance).querySelector('.rs-dropdown-toggle')), 'abc');
  });

  it('Should call onSelect callback', done => {
    const doneOp = eventKey => {
      if (eventKey === 2) {
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown onSelect={doneOp}>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelectorAll('.rs-dropdown-menu a')[1]);
  });

  it('Should call onToggle callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown onToggle={doneOp}>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector('.rs-dropdown-toggle'));
  });

  it('Should call onOpen callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown onOpen={doneOp}>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector('.rs-dropdown-toggle'));
  });

  it('Should call onClose callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown onClose={doneOp}>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    const btn = findDOMNode(instance).querySelector('.rs-dropdown-toggle');
    ReactTestUtils.Simulate.click(btn);
    ReactTestUtils.Simulate.click(btn);
  });

  it('Should not call onToggle callback when set disabled', () => {

    const onToggleSpy = sinon.spy();
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown onToggle={onToggleSpy} disabled>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector('.rs-dropdown-toggle'));
    assert.ok(!onToggleSpy.calledOnce);

  });

  it('Should have a custom style in Menu', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<Dropdown menuStyle={{ fontSize }} />);
    assert.equal(findDOMNode(instance).querySelector('.rs-dropdown-menu').style.fontSize, fontSize);
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Dropdown className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<Dropdown style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
