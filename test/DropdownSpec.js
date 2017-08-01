import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import Dropdown from '../src/Dropdown';

describe('Dropdown', () => {

  it('Should render a Dropdown', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Dropdown>
        <Dropdown.Item>1</Dropdown.Item>
        <Dropdown.Item>2</Dropdown.Item>
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
    assert.ok(findDOMNode(instance).querySelector('button.disabled'));
  });

  it('Should be block', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Dropdown block>
        <Dropdown.Item>1</Dropdown.Item>
        <Dropdown.Item>2</Dropdown.Item>
      </Dropdown>
    );
    assert.ok(findDOMNode(instance).className.match(/\bbtn-block\b/));
    assert.ok(findDOMNode(instance).querySelector('button').className.match(/\bbtn-block\b/));
  });

  it('Should be dropup', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Dropdown dropup>
        <Dropdown.Item>1</Dropdown.Item>
        <Dropdown.Item>2</Dropdown.Item>
      </Dropdown>
    );
    assert.ok(findDOMNode(instance).className.match(/\bdropup\b/));
  });

  it('Should have a title', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Dropdown title="abc">
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    assert.equal(findDOMNode(instance).querySelector('button').innerText, 'abc');
  });

  it('Should have a title when set activeKey', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Dropdown select activeKey={2} title="abc">
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    assert.equal(findDOMNode(instance).querySelector('button').innerText, 2);
  });

  it('Should have a title when set object activeKey', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Dropdown select activeKey={{ key: 2, value: 2 }} title="abc">
        <Dropdown.Item eventKey={{ key: 1, value: 1 }}>1</Dropdown.Item>
        <Dropdown.Item eventKey={{ key: 2, value: 2 }}>2</Dropdown.Item>
      </Dropdown>
    );
    assert.equal(findDOMNode(instance).querySelector('button').innerText, 2);
  });

  it('Should be shown at both ends', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Dropdown bothEnds>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    assert.ok(findDOMNode(instance).className.match(/\bboth-ends\b/));
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
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelectorAll('a')[1]);
  });

  it('Should be active second item when trigger onSelect', (done) => {
    let doneOp = (eventKey) => {
      if (eventKey === 2) {
        setTimeout(() => {
          if (findDOMNode(instance).querySelector('button').innerText === '2') {
            done();
          }
        }, 200);
      }
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <Dropdown onSelect={doneOp} select>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelectorAll('a')[1]);
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
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector('button'));
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
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector('button'));
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
    const btn = findDOMNode(instance).querySelector('button');
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
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector('button'));
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
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelectorAll('a')[1]);
  });

  it('Should have a custom style in Menu', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <Dropdown menuStyle={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).querySelector('.dropdown-menu').style.fontSize, fontSize);
  });

  it('Should apply shape class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Dropdown shape="danger" />
    );

    assert.ok(findDOMNode(instance).className.match(/\bbtn-group-danger\b/));
    assert.ok(findDOMNode(instance).querySelector('button').className.match(/\bbtn-danger\b/));
  });

  it('Should apply size class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Dropdown size="lg" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bbtn-group-lg\b/));
    assert.ok(findDOMNode(instance).querySelector('button').className.match(/\bbtn-lg\b/));
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
