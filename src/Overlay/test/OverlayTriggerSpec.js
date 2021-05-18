import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';

import OverlayTrigger from '../OverlayTrigger';
import Tooltip from '../../Tooltip';

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
});
