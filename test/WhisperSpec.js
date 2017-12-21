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
    const instance = ReactTestUtils.renderIntoDocument(
      <Whisper speaker={<Tooltip>dd</Tooltip>}>
        <button>Click Me</button>
      </Whisper>
    );
    const whisper = findDOMNode(instance);
    assert.equal(whisper.nodeName, 'BUTTON');
  });


  it('Should maintain overlay classname when trigger click', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Whisper trigger="click" speaker={<Tooltip className="test-whisper">test</Tooltip>}>
        <button>button</button>
      </Whisper>
    );

    const whisper = findDOMNode(instance);
    ReactTestUtils.Simulate.click(whisper);
    assert.equal(document.getElementsByClassName('test-whisper').length, 1);
  });

  it('Should maintain overlay classname when trigger focus', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Whisper trigger="focus" speaker={<Tooltip className="test-whisper">test</Tooltip>}>
        <button>button</button>
      </Whisper>
    );

    const whisper = findDOMNode(instance);
    ReactTestUtils.Simulate.blur(whisper);
    assert.equal(document.getElementsByClassName('test-whisper').length, 1);
  });

  it('Should call onClick callback', (done) => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Whisper onClick={doneOp} trigger="click" speaker={<Tooltip className="test-whisper">test</Tooltip>}>
        <button>button</button>
      </Whisper>
    );

    const whisper = findDOMNode(instance);
    ReactTestUtils.Simulate.click(whisper);
  });


  it('Should pass transition callbacks to Transition', (done) => {
    let count = 0;
    const increment = () => {
      count += 1;
    };

    let whisper;

    const instance = ReactTestUtils.renderIntoDocument(
      <Whisper
        trigger="click"
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

    whisper = findDOMNode(instance);
    ReactTestUtils.Simulate.click(whisper);
  });

});
