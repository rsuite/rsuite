import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode, createTestContainer } from '@test/testUtils';

import Whisper from '../Whisper';
import Tooltip from '../../Tooltip';

describe('Whisper', () => {
  it('Should create Whisper element', () => {
    const instance = getDOMNode(
      <Whisper speaker={<Tooltip>tooltip</Tooltip>}>
        <button type="button">button</button>
      </Whisper>
    );
    assert.equal(instance.nodeName, 'BUTTON');
  });

  it('Should maintain overlay classname when trigger click', () => {
    const whisper = getDOMNode(
      <Whisper trigger="click" speaker={<Tooltip className="test-whisper">test</Tooltip>}>
        <button>button</button>
      </Whisper>
    );
    ReactTestUtils.Simulate.click(whisper);
    assert.equal(document.getElementsByClassName('test-whisper').length, 1);
  });

  it('Should maintain overlay classname when trigger focus', () => {
    const whisper = getDOMNode(
      <Whisper trigger="focus" speaker={<Tooltip className="test-whisper">test</Tooltip>}>
        <button>button</button>
      </Whisper>
    );

    ReactTestUtils.Simulate.blur(whisper);
    assert.equal(document.getElementsByClassName('test-whisper').length, 1);
  });

  it('Should call onClick callback', done => {
    const doneOp = () => {
      done();
    };

    const whisper = getDOMNode(
      <Whisper onClick={doneOp} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    ReactTestUtils.Simulate.click(whisper);
  });

  it('Should call onOpen callback', done => {
    const doneOp = () => {
      done();
    };

    const whisper = getDOMNode(
      <Whisper onOpen={doneOp} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    ReactTestUtils.Simulate.click(whisper);
  });

  it('Should call onOpen callback by open()', done => {
    const doneOp = () => {
      done();
    };
    const triggerRef = React.createRef();
    getDOMNode(
      <Whisper onOpen={doneOp} triggerRef={triggerRef} trigger="none" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );
    triggerRef.current.open();
  });

  it('Should call onOpen callback', done => {
    const doneOp = () => {
      done();
    };

    const whisper = getDOMNode(
      <Whisper onOpen={doneOp} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    ReactTestUtils.Simulate.click(whisper);
  });

  it('Should call onEntered callback', done => {
    const doneOp = () => {
      done();
    };

    const whisper = getDOMNode(
      <Whisper onEntered={doneOp} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    ReactTestUtils.Simulate.click(whisper);
  });

  it('Should call onClose callback', done => {
    const doneOp = () => {
      done();
    };

    const whisper = getDOMNode(
      <Whisper onClose={doneOp} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    ReactTestUtils.Simulate.click(whisper);
    ReactTestUtils.Simulate.click(whisper);
  });

  it('Should call onExited callback', done => {
    const doneOp = () => {
      done();
    };

    const whisper = getDOMNode(
      <Whisper onExited={doneOp} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    ReactTestUtils.Simulate.click(whisper);
    ReactTestUtils.Simulate.click(whisper);
  });

  it('Should pass transition callbacks to Transition', done => {
    let count = 0;
    const increment = () => {
      count += 1;
    };

    const whisper = getDOMNode(
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

    ReactTestUtils.Simulate.click(whisper);
  });

  it('Should Overlay be closed, after call onClose', done => {
    const doneOp = () => {
      done();
    };
    const btnRef = React.createRef();
    const closeBtnRef = React.createRef();
    const Overlay = React.forwardRef(({ style, onClose, ...rest }, ref) => {
      return (
        <div {...rest} style={style} ref={ref}>
          <button ref={closeBtnRef} onClick={onClose}>
            close
          </button>
        </div>
      );
    });

    Overlay.displayName = 'Overlay';

    ReactTestUtils.act(() => {
      ReactDOM.render(
        <Whisper
          onExited={doneOp}
          trigger="click"
          speaker={(props, ref) => {
            const { className, left, top, onClose } = props;
            return (
              <Overlay style={{ left, top }} onClose={onClose} className={className} ref={ref} />
            );
          }}
        >
          <button ref={btnRef}>button</button>
        </Whisper>,
        createTestContainer()
      );
    });
    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.click(btnRef.current);
    });

    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.click(closeBtnRef.current);
    });
  });
});
