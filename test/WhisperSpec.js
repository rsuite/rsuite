import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import Whisper from '../src/Whisper';
import Tooltip from '../src/Tooltip';

describe('Whisper', () => {

  let mountPoint;
  beforeEach(() => {
    mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);
  });
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(mountPoint);
    document.body.removeChild(mountPoint);
  });

  const Container = ({ className, children }) => (
    <div className={className}>
      {children}
    </div>
  );


  it('Should create Whisper element', () => {
    let trigger = null;
    const triggerRef = ref => trigger = ref;
    const instance = ReactTestUtils.renderIntoDocument(
      <Whisper triggerRef={triggerRef} speaker={<Tooltip>dd</Tooltip>}>
        <button>Click Me</button>
      </Whisper>
    );
    const node = findDOMNode(trigger);
    assert.equal(node.nodeName, 'BUTTON');
  });


  it('Should maintain overlay classname when trigger click', () => {
    let trigger = null;
    const triggerRef = ref => trigger = ref;
    const instance = ReactTestUtils.renderIntoDocument(
      <Whisper triggerRef={triggerRef} trigger="click" speaker={<Tooltip className="test-whisper">test</Tooltip>}>
        <button>button</button>
      </Whisper>
    );

    const whisper = findDOMNode(trigger);
    ReactTestUtils.Simulate.click(whisper);
    assert.equal(document.getElementsByClassName('test-whisper').length, 1);
  });

  it('Should maintain overlay classname when trigger focus', () => {
    let trigger = null;
    const triggerRef = ref => trigger = ref;
    const instance = ReactTestUtils.renderIntoDocument(
      <Whisper triggerRef={triggerRef} trigger="focus" speaker={<Tooltip className="test-whisper">test</Tooltip>}>
        <button>button</button>
      </Whisper>
    );

    const whisper = findDOMNode(trigger);
    ReactTestUtils.Simulate.blur(whisper);
    assert.equal(document.getElementsByClassName('test-whisper').length, 1);
  });

  it('Should call onClick callback', (done) => {
    const doneOp = () => {
      done();
    };
    let trigger = null;
    const triggerRef = ref => trigger = ref;
    const instance = ReactTestUtils.renderIntoDocument(
      <Whisper triggerRef={triggerRef} onClick={doneOp} trigger="click" speaker={<Tooltip className="test-whisper">test</Tooltip>}>
        <button>button</button>
      </Whisper>
    );

    const whisper = findDOMNode(trigger);
    ReactTestUtils.Simulate.click(whisper);
  });


  it('Should pass transition callbacks to Transition', (done) => {
    let count = 0;
    const increment = () => {
      count += 1;
    };

    let whisper;
    let trigger = null;
    const triggerRef = ref => trigger = ref;
    const instance = ReactTestUtils.renderIntoDocument(
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
