import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Dropdown from '../src/Dropdown';
import NavItem from '../src/NavItem';
import innerText from './innerText';
import { globalKey } from '../src/utils/prefix';

describe('Dropdown', () => {

  it('Should render a Dropdown', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Dropdown>
        <Dropdown.Item>1</Dropdown.Item>
        <Dropdown.Item>2</Dropdown.Item>
        {null}
        <div>abc</div>
      </Dropdown>
    );
    assert.ok(findDOMNode(instance).className.match(/\bdropdown\b/));
  });


  it('Should be disabled', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Dropdown disabled>
        <Dropdown.Item>1</Dropdown.Item>
        <Dropdown.Item>2</Dropdown.Item>
      </Dropdown>
    );
    assert.ok(findDOMNode(instance).className.match(/\bdisabled\b/));
  });

  it('Should have a className for placement', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Dropdown placement="topLeft">
        <Dropdown.Item>1</Dropdown.Item>
        <Dropdown.Item>2</Dropdown.Item>
      </Dropdown>
    );
    assert.ok(findDOMNode(instance).className.match(/\bplacement-top-left\b/));
  });


  it('Should have a title', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Dropdown title="abc">
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    assert.equal(innerText(findDOMNode(instance).querySelector(`.${globalKey}dropdown-toggle`)), 'abc');
  });

  it('Should call onSelect callback', (done) => {
    let doneOp = (eventKey) => {
      if (eventKey === 2) {
        done();
      }
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <Dropdown onSelect={doneOp} >
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelectorAll(`.${globalKey}dropdown-menu a`)[1]);
  });


  it('Should call onToggle callback', (done) => {
    let doneOp = () => {
      done();
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <Dropdown onToggle={doneOp} >
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector(`.${globalKey}dropdown-toggle`));
  });

  it('Should call onOpen callback', (done) => {
    let doneOp = () => {
      done();
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <Dropdown onOpen={doneOp} >
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector(`.${globalKey}dropdown-toggle`));
  });

  it('Should call onClose callback', (done) => {
    let doneOp = () => {
      done();
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <Dropdown onClose={doneOp} >
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    const btn = findDOMNode(instance).querySelector(`.${globalKey}dropdown-toggle`);
    ReactTestUtils.Simulate.click(btn);
    ReactTestUtils.Simulate.click(btn);
  });

  it('Should not call onToggle callback when set disabled', (done) => {
    let k = true;
    let doneOp = () => {
      k = false;
    };
    setTimeout(() => {
      if (k) {
        done();
      }
    }, 200);
    let instance = ReactTestUtils.renderIntoDocument(
      <Dropdown onToggle={doneOp} disabled>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector(`.${globalKey}dropdown-toggle`));
  });

  it('Should call onClose callback when set autoClose', (done) => {
    let doneOp = () => {
      done();
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <Dropdown onClose={doneOp} autoClose>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelectorAll(`.${globalKey}dropdown-menu a`)[1]);
  });

  it('Should have a custom style in Menu', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <Dropdown menuStyle={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).querySelector(`.${globalKey}dropdown-menu`).style.fontSize, fontSize);
  });





  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Dropdown className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <Dropdown style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
