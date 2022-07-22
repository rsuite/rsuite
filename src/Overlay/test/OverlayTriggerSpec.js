import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';

import OverlayTrigger from '../OverlayTrigger';
import Tooltip from '../../Tooltip';
import { act, render } from '@testing-library/react';

describe('OverlayTrigger', () => {
  it('Should create Whisper element', () => {
    const instance = getDOMNode(
      <OverlayTrigger speaker={<Tooltip>tooltip</Tooltip>}>
        <button type="button">button</button>
      </OverlayTrigger>
    );
    assert.equal(instance.nodeName, 'BUTTON');
  });

  it('Should maintain overlay classname when trigger click', () => {
    const whisper = getDOMNode(
      <OverlayTrigger
        trigger="click"
        speaker={<Tooltip className="test-whisper_click">test</Tooltip>}
      >
        <button>button</button>
      </OverlayTrigger>
    );
    ReactTestUtils.Simulate.click(whisper);
    assert.equal(document.getElementsByClassName('test-whisper_click').length, 1);
  });

  it('Should maintain overlay classname when trigger contextMenu', () => {
    const whisper = getDOMNode(
      <OverlayTrigger
        trigger="contextMenu"
        speaker={<Tooltip className="test-whisper_context-menu">test</Tooltip>}
      >
        <button>button</button>
      </OverlayTrigger>
    );
    ReactTestUtils.Simulate.contextMenu(whisper);
    assert.equal(document.getElementsByClassName('test-whisper_context-menu').length, 1);
  });

  it('Should maintain overlay classname when trigger focus', () => {
    const whisper = getDOMNode(
      <OverlayTrigger
        trigger="focus"
        speaker={<Tooltip className="test-whisper_focus">test</Tooltip>}
      >
        <button>button</button>
      </OverlayTrigger>
    );

    ReactTestUtils.Simulate.focus(whisper);
    assert.equal(document.getElementsByClassName('test-whisper_focus').length, 1);
  });

  it('Should maintain overlay classname when trigger mouseOver and setting [trigger="hover"]', () => {
    const whisper = getDOMNode(
      <OverlayTrigger
        trigger="hover"
        speaker={<Tooltip className="test-whisper_hover">test</Tooltip>}
      >
        <button>button</button>
      </OverlayTrigger>
    );

    ReactTestUtils.Simulate.mouseOver(whisper);
    assert.equal(document.getElementsByClassName('test-whisper_hover').length, 1);
  });

  it('Should maintain overlay classname when trigger click and setting [trigger="active"]  ', () => {
    const whisper = getDOMNode(
      <OverlayTrigger
        trigger="active"
        speaker={<Tooltip className="test-whisper_active">test</Tooltip>}
      >
        <button>button</button>
      </OverlayTrigger>
    );

    ReactTestUtils.Simulate.click(whisper);
    assert.equal(document.getElementsByClassName('test-whisper_active').length, 1);
  });

  it('Should call onClick callback', done => {
    const doneOp = () => {
      done();
    };

    const whisper = getDOMNode(
      <OverlayTrigger onClick={doneOp} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </OverlayTrigger>
    );

    ReactTestUtils.Simulate.click(whisper);
  });

  it('Should call onContextMenu callback', done => {
    const doneOp = () => {
      done();
    };

    const whisper = getDOMNode(
      <OverlayTrigger onContextMenu={doneOp} trigger="contextMenu" speaker={<Tooltip />}>
        <button>button</button>
      </OverlayTrigger>
    );

    ReactTestUtils.Simulate.contextMenu(whisper);
  });

  it('Should call onFocus callback', done => {
    const doneOp = () => {
      done();
    };

    const whisper = getDOMNode(
      <OverlayTrigger onFocus={doneOp} trigger="focus" speaker={<Tooltip />}>
        <button>button</button>
      </OverlayTrigger>
    );

    ReactTestUtils.Simulate.focus(whisper);
  });

  it('Should call onMouseOver callback', done => {
    const doneOp = () => {
      done();
    };

    const whisper = getDOMNode(
      <OverlayTrigger onMouseOver={doneOp} trigger="hover" speaker={<Tooltip />}>
        <button>button</button>
      </OverlayTrigger>
    );

    ReactTestUtils.Simulate.mouseOver(whisper);
  });

  it('Should call onMouseOut callback', done => {
    const doneOp = () => {
      done();
    };

    const whisper = getDOMNode(
      <OverlayTrigger onMouseOut={doneOp} trigger="hover" speaker={<Tooltip />}>
        <button>button</button>
      </OverlayTrigger>
    );

    ReactTestUtils.Simulate.mouseOut(whisper);
  });

  it('Should call onMouseMove callback', () => {
    const onMouseMove = sinon.spy();

    const whisper = getDOMNode(
      <OverlayTrigger onMouseMove={onMouseMove} speaker={<Tooltip />}>
        <button>button</button>
      </OverlayTrigger>
    );

    ReactTestUtils.Simulate.mouseMove(whisper);
    expect(onMouseMove).to.calledOnce;
  });

  it('Should not be rendered repeatedly', () => {
    const onMouseMove = sinon.spy();
    const count = React.createRef(0);

    const MyButton = React.forwardRef((props, ref) => {
      count.current += 1;
      return (
        <button {...props} ref={ref}>
          {count.current}
        </button>
      );
    });

    const whisper = getDOMNode(
      <OverlayTrigger onMouseMove={onMouseMove} speaker={<Tooltip />}>
        <MyButton />
      </OverlayTrigger>
    );

    expect(count.current).to.equal(1);

    act(() => {
      ReactTestUtils.Simulate.mouseMove(whisper);
    });

    expect(count.current).to.equal(1);
  });

  it('Should overlay follow the cursor', () => {
    const onMouseMove = sinon.spy();
    const count = React.createRef(0);

    const MyButton = React.forwardRef((props, ref) => {
      count.current += 1;
      return (
        <button {...props} ref={ref}>
          {count.current}
        </button>
      );
    });

    const { getByRole } = render(
      <OverlayTrigger onMouseMove={onMouseMove} trigger="hover" followCursor speaker={<Tooltip />}>
        <MyButton />
      </OverlayTrigger>
    );

    expect(count.current).to.equal(1);

    act(() => {
      ReactTestUtils.Simulate.mouseOver(getByRole('button'));
      ReactTestUtils.Simulate.mouseMove(getByRole('button'), {
        pageY: 10,
        pageX: 10,
        clientX: 10,
        clientY: 10
      });
    });

    expect(count.current).to.equal(2);
    expect(getByRole('tooltip').style).to.have.property('left', '10px');
  });
});
