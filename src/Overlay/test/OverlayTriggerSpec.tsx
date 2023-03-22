import React, { Ref } from 'react';
import { Simulate } from 'react-dom/test-utils';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import sinon from 'sinon';
import { getDOMNode } from '@test/testUtils';
import OverlayTrigger, { OverlayTriggerHandle } from '../OverlayTrigger';
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
    fireEvent.click(whisper);
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
    fireEvent.contextMenu(whisper);
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

    fireEvent.focus(whisper);
    assert.equal(document.getElementsByClassName('test-whisper_focus').length, 1);
  });

  it('Should maintain overlay classname when trigger mouseOver and setting [trigger="hover"]', () => {
    const { getByTestId } = render(
      <OverlayTrigger
        trigger="hover"
        speaker={<Tooltip data-testid="test-whisper_hover">test</Tooltip>}
      >
        <button data-testid="whisper">button</button>
      </OverlayTrigger>
    );

    act(() => {
      Simulate.mouseOver(getByTestId('whisper'));
    });

    expect(getByTestId('test-whisper_hover')).to.exist;
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

    fireEvent.click(whisper);

    assert.equal(document.getElementsByClassName('test-whisper_active').length, 1);
  });

  it('Should call onClick callback', () => {
    const onClick = sinon.spy();

    const whisper = getDOMNode(
      <OverlayTrigger onClick={onClick} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </OverlayTrigger>
    );

    fireEvent.click(whisper);

    expect(onClick).to.have.been.calledOnce;
  });

  it('Should call onContextMenu callback', () => {
    const onContextMenu = sinon.spy();

    const whisper = getDOMNode(
      <OverlayTrigger onContextMenu={onContextMenu} trigger="contextMenu" speaker={<Tooltip />}>
        <button>button</button>
      </OverlayTrigger>
    );

    fireEvent.contextMenu(whisper);
    expect(onContextMenu).to.have.been.calledOnce;
  });

  it('Should call onFocus callback', () => {
    const onFocus = sinon.spy();

    const whisper = getDOMNode(
      <OverlayTrigger onFocus={onFocus} trigger="focus" speaker={<Tooltip />}>
        <button>button</button>
      </OverlayTrigger>
    );

    fireEvent.focus(whisper);
    expect(onFocus).to.have.been.calledOnce;
  });

  it('Should call onMouseOver callback', () => {
    const onMouseOver = sinon.spy();

    const whisper = getDOMNode(
      <OverlayTrigger onMouseOver={onMouseOver} trigger="hover" speaker={<Tooltip />}>
        <button>button</button>
      </OverlayTrigger>
    );

    fireEvent.mouseOver(whisper);
    expect(onMouseOver).to.have.been.calledOnce;
  });

  it('Should call onMouseOut callback', () => {
    const onMouseOut = sinon.spy();

    const whisper = getDOMNode(
      <OverlayTrigger onMouseOut={onMouseOut} trigger="hover" speaker={<Tooltip />}>
        <button>button</button>
      </OverlayTrigger>
    );

    fireEvent.mouseOut(whisper);
    expect(onMouseOut).to.have.been.calledOnce;
  });

  it('Should call onMouseMove callback', () => {
    const onMouseMove = sinon.spy();

    const whisper = getDOMNode(
      <OverlayTrigger onMouseMove={onMouseMove} speaker={<Tooltip />}>
        <button>button</button>
      </OverlayTrigger>
    );

    Simulate.mouseMove(whisper);
    expect(onMouseMove).to.calledOnce;
  });

  it('Should not be rendered repeatedly', () => {
    const onMouseMove = sinon.spy();
    // FIXME `.createRef()` does not accept arguments
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const count = React.createRef<number>(0);

    const MyButton = React.forwardRef((props, ref) => {
      // FIXME Ref is read-only
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      count.current += 1;
      return (
        <button {...props} ref={ref as Ref<HTMLButtonElement>}>
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
      Simulate.mouseMove(whisper);
    });

    expect(count.current).to.equal(1);
  });

  it('Should overlay follow the cursor', () => {
    const onMouseMove = sinon.spy();
    // FIXME `.createRef()` does not accept arguments
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const count = React.createRef<number>(0);

    const MyButton = React.forwardRef((props, ref) => {
      // FIXME Ref is read-only
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      count.current += 1;
      return (
        <button {...props} ref={ref as Ref<HTMLButtonElement>}>
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
      Simulate.mouseOver(getByRole('button'));
      Simulate.mouseMove(getByRole('button'), {
        pageY: 10,
        pageX: 10,
        clientX: 10,
        clientY: 10
      });
    });

    expect(count.current).to.equal(2);
    expect(getByRole('tooltip').style).to.have.property('left', '10px');
  });

  it('Should throw an error when using Fragment as child', () => {
    expect(() => {
      render(
        <OverlayTrigger speaker={<Tooltip>tooltip</Tooltip>}>
          <>button</>
        </OverlayTrigger>
      );
    }).toHaveError(
      '[rsuite] The OverlayTrigger component does not accept strings or Fragments as child.'
    );
  });

  it('Should open the Overlay', () => {
    render(
      <OverlayTrigger speaker={<Tooltip>tooltip</Tooltip>} open>
        <button>button</button>
      </OverlayTrigger>
    );

    expect(screen.getByRole('tooltip')).to.exist;
  });

  it('Should open the Overlay by default', async () => {
    const onCloseSpy = sinon.spy();
    const ref = React.createRef<OverlayTriggerHandle>();

    render(
      <OverlayTrigger
        speaker={<Tooltip>tooltip</Tooltip>}
        defaultOpen
        onExited={onCloseSpy}
        ref={ref}
      >
        <button>button</button>
      </OverlayTrigger>
    );

    expect(screen.getByRole('tooltip')).to.exist;

    ref.current?.close();

    await waitFor(() => {
      expect(onCloseSpy).to.have.been.calledOnce;
      expect(screen.queryByRole('tooltip')).to.not.exist;
    });
  });

  it('Should open in new container', () => {
    const newContainer = document.createElement('div');

    newContainer.style.position = 'relative';
    newContainer.style.marginTop = '100px';
    newContainer.style.marginLeft = '100px';

    document.body.appendChild(newContainer);

    const App = ({ container }) => (
      <OverlayTrigger speaker={<Tooltip>tooltip</Tooltip>} defaultOpen container={container}>
        <button>button</button>
      </OverlayTrigger>
    );

    const { rerender } = render(<App container={() => document.body} />);

    expect(newContainer.compareDocumentPosition(screen.getByRole('tooltip'))).to.equal(4);

    rerender(<App container={() => newContainer} />);

    expect(newContainer.compareDocumentPosition(screen.getByRole('tooltip'))).to.equal(20);

    document.body.removeChild(newContainer);
  });
});
