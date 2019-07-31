import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Whisper from '../Whisper';
import Tooltip from '../../Tooltip';

describe('Whisper', () => {
  it('Should create Whisper element', () => {
    let trigger = null;
    const triggerRef = ref => (trigger = ref);
    ReactTestUtils.renderIntoDocument(
      <Whisper triggerRef={triggerRef} speaker={<Tooltip>dd</Tooltip>}>
        <button>Click Me</button>
      </Whisper>
    );
    const node = findDOMNode(trigger);
    assert.equal(node.nodeName, 'BUTTON');
  });

  it('Should maintain overlay classname when trigger click', () => {
    let trigger = null;
    const triggerRef = ref => (trigger = ref);
    ReactTestUtils.renderIntoDocument(
      <Whisper
        triggerRef={triggerRef}
        trigger="click"
        speaker={<Tooltip className="test-whisper">test</Tooltip>}
      >
        <button>button</button>
      </Whisper>
    );

    const whisper = findDOMNode(trigger);
    ReactTestUtils.Simulate.click(whisper);
    assert.equal(document.getElementsByClassName('test-whisper').length, 1);
  });

  it('Should maintain overlay classname when trigger focus', () => {
    let trigger = null;
    const triggerRef = ref => (trigger = ref);
    ReactTestUtils.renderIntoDocument(
      <Whisper
        triggerRef={triggerRef}
        trigger="focus"
        speaker={<Tooltip className="test-whisper">test</Tooltip>}
      >
        <button>button</button>
      </Whisper>
    );

    const whisper = findDOMNode(trigger);
    ReactTestUtils.Simulate.blur(whisper);
    assert.equal(document.getElementsByClassName('test-whisper').length, 1);
  });

  it('Should call onClick callback', done => {
    const doneOp = () => {
      done();
    };
    let trigger = null;
    const triggerRef = ref => (trigger = ref);
    ReactTestUtils.renderIntoDocument(
      <Whisper triggerRef={triggerRef} onClick={doneOp} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    const whisper = findDOMNode(trigger);
    ReactTestUtils.Simulate.click(whisper);
  });

  it('Should call onOpen callback', done => {
    const doneOp = () => {
      done();
    };
    let trigger = null;
    const triggerRef = ref => (trigger = ref);
    ReactTestUtils.renderIntoDocument(
      <Whisper triggerRef={triggerRef} onOpen={doneOp} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    const whisper = findDOMNode(trigger);
    ReactTestUtils.Simulate.click(whisper);
  });

  it('Should call onEntered callback', done => {
    const doneOp = () => {
      done();
    };
    let trigger = null;
    const triggerRef = ref => (trigger = ref);
    ReactTestUtils.renderIntoDocument(
      <Whisper triggerRef={triggerRef} onEntered={doneOp} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    const whisper = findDOMNode(trigger);
    ReactTestUtils.Simulate.click(whisper);
  });

  it('Should call onClose callback', done => {
    const doneOp = () => {
      done();
    };
    let trigger = null;
    const triggerRef = ref => (trigger = ref);
    ReactTestUtils.renderIntoDocument(
      <Whisper triggerRef={triggerRef} onClose={doneOp} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    const whisper = findDOMNode(trigger);
    ReactTestUtils.Simulate.click(whisper);
    ReactTestUtils.Simulate.click(whisper);
  });

  it('Should call onExited callback', done => {
    const doneOp = () => {
      done();
    };
    let trigger = null;
    const triggerRef = ref => (trigger = ref);
    ReactTestUtils.renderIntoDocument(
      <Whisper triggerRef={triggerRef} onExited={doneOp} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    const whisper = findDOMNode(trigger);
    ReactTestUtils.Simulate.click(whisper);
    ReactTestUtils.Simulate.click(whisper);
  });

  it('Should pass transition callbacks to Transition', done => {
    let count = 0;
    const increment = () => {
      count += 1;
    };

    let whisper;
    let trigger = null;
    const triggerRef = ref => (trigger = ref);
    ReactTestUtils.renderIntoDocument(
      <Whisper
        trigger="click"
        triggerRef={triggerRef}
        speaker={<Tooltip>test</Tooltip>}
        onExit={increment}
        onExiting={increment}
        onExited={() => {
          increment();
          if (count === 6) {
            done();
          }
        }}
        onEnter={increment}
        onEntering={increment}
        onEntered={() => {
          increment();
          ReactTestUtils.Simulate.click(whisper);
        }}
      >
        <button>button</button>
      </Whisper>
    );

    whisper = findDOMNode(trigger);
    ReactTestUtils.Simulate.click(whisper);
  });
});
