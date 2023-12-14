import React, { Ref } from 'react';
import { Simulate } from 'react-dom/test-utils';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import sinon from 'sinon';
import OverlayTrigger, { OverlayTriggerHandle } from '../OverlayTrigger';
import Tooltip from '../../Tooltip';

describe('OverlayTrigger', () => {
  it('Should create Whisper element', () => {
    render(
      <OverlayTrigger speaker={<Tooltip>tooltip</Tooltip>}>
        <button type="button">button</button>
      </OverlayTrigger>
    );

    expect(screen.getByRole('button')).to.exist;
  });

  it('Should not open the Overlay', () => {
    render(
      <OverlayTrigger speaker={<Tooltip>tooltip</Tooltip>} open={false}>
        <button>button</button>
      </OverlayTrigger>
    );

    expect(screen.queryByRole('tooltip')).to.not.exist;
  });

  it('Should maintain overlay classname when trigger click', () => {
    render(
      <OverlayTrigger
        trigger="click"
        speaker={<Tooltip className="test-whisper_click">test</Tooltip>}
      >
        <button>button</button>
      </OverlayTrigger>
    );

    fireEvent.click(screen.getByText('button'));
    expect(screen.getByRole('tooltip')).to.have.class('test-whisper_click');
  });

  it('Should maintain overlay classname when trigger contextMenu', () => {
    render(
      <OverlayTrigger
        trigger="contextMenu"
        speaker={<Tooltip className="test-whisper_context-menu">test</Tooltip>}
      >
        <button>button</button>
      </OverlayTrigger>
    );

    fireEvent.contextMenu(screen.getByText('button'));
    expect(screen.getByRole('tooltip')).to.have.class('test-whisper_context-menu');
  });

  it('Should maintain overlay classname when trigger focus', () => {
    render(
      <OverlayTrigger
        trigger="focus"
        speaker={<Tooltip className="test-whisper_focus">test</Tooltip>}
      >
        <button>button</button>
      </OverlayTrigger>
    );

    fireEvent.focus(screen.getByText('button'));
    expect(screen.getByRole('tooltip')).to.have.class('test-whisper_focus');
  });

  it('Should maintain overlay classname when trigger mouseOver and setting [trigger="hover"]', () => {
    render(
      <OverlayTrigger trigger="hover" speaker={<Tooltip>test</Tooltip>}>
        <button>button</button>
      </OverlayTrigger>
    );

    act(() => {
      Simulate.mouseOver(screen.getByRole('button'));
    });

    expect(screen.getByRole('tooltip')).to.exist;
  });

  it('Should delay opening and closing of Tooltip', async () => {
    render(
      <OverlayTrigger speaker={<Tooltip>tooltip</Tooltip>} delayOpen={500} trigger="hover">
        <button>button</button>
      </OverlayTrigger>
    );

    act(() => {
      Simulate.mouseOver(screen.getByRole('button'));
    });

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).to.be.visible;
    });

    act(() => {
      Simulate.mouseOut(screen.getByRole('button'));
    });

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).to.not.exist;
    });
  });

  it('Should maintain overlay classname when trigger click and setting [trigger="active"] ', () => {
    render(
      <OverlayTrigger
        trigger="active"
        speaker={<Tooltip className="test-whisper_active">test</Tooltip>}
      >
        <button>button</button>
      </OverlayTrigger>
    );

    fireEvent.click(screen.getByText('button'));
    expect(screen.queryByRole('tooltip')).to.have.class('test-whisper_active');
  });

  it('Should call onClick callback', () => {
    const onClick = sinon.spy();

    render(
      <OverlayTrigger onClick={onClick} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </OverlayTrigger>
    );

    fireEvent.click(screen.getByText('button'));

    expect(onClick).to.have.been.calledOnce;
  });

  it('Should call onContextMenu callback', () => {
    const onContextMenu = sinon.spy();

    render(
      <OverlayTrigger onContextMenu={onContextMenu} trigger="contextMenu" speaker={<Tooltip />}>
        <button>button</button>
      </OverlayTrigger>
    );

    fireEvent.contextMenu(screen.getByText('button'));
    expect(onContextMenu).to.have.been.calledOnce;
  });

  it('Should call onFocus callback', () => {
    const onFocus = sinon.spy();

    render(
      <OverlayTrigger onFocus={onFocus} trigger="focus" speaker={<Tooltip />}>
        <button>button</button>
      </OverlayTrigger>
    );

    fireEvent.focus(screen.getByText('button'));
    expect(onFocus).to.have.been.calledOnce;
  });

  it('Should call onMouseOver callback', () => {
    const onMouseOver = sinon.spy();

    render(
      <OverlayTrigger onMouseOver={onMouseOver} trigger="hover" speaker={<Tooltip />}>
        <button>button</button>
      </OverlayTrigger>
    );

    fireEvent.mouseOver(screen.getByText('button'));
    expect(onMouseOver).to.have.been.calledOnce;
  });

  it('Should call onMouseOut callback', () => {
    const onMouseOut = sinon.spy();

    render(
      <OverlayTrigger onMouseOut={onMouseOut} trigger="hover" speaker={<Tooltip />}>
        <button>button</button>
      </OverlayTrigger>
    );

    fireEvent.mouseOut(screen.getByText('button'));
    expect(onMouseOut).to.have.been.calledOnce;
  });

  it('Should call onMouseMove callback', () => {
    const onMouseMove = sinon.spy();

    render(
      <OverlayTrigger onMouseMove={onMouseMove} speaker={<Tooltip />}>
        <button>button</button>
      </OverlayTrigger>
    );

    Simulate.mouseMove(screen.getByText('button'));
    expect(onMouseMove).to.have.been.calledOnce;
  });

  it('Should not be rendered repeatedly', () => {
    const onMouseMove = sinon.spy();
    let count = 0;

    const MyButton = React.forwardRef((props, ref) => {
      count += 1;
      return (
        <button {...props} ref={ref as Ref<HTMLButtonElement>}>
          {count}
        </button>
      );
    });

    render(
      <OverlayTrigger onMouseMove={onMouseMove} speaker={<Tooltip />}>
        <MyButton />
      </OverlayTrigger>
    );

    expect(count).to.equal(1);

    act(() => {
      Simulate.mouseMove(screen.getByRole('button'));
    });

    expect(count).to.equal(1);
  });

  it('Should overlay follow the cursor', () => {
    const onMouseMove = sinon.spy();

    let count = 0;

    const MyButton = React.forwardRef((props, ref) => {
      count += 1;
      return (
        <button {...props} ref={ref as Ref<HTMLButtonElement>}>
          {count}
        </button>
      );
    });

    render(
      <OverlayTrigger onMouseMove={onMouseMove} trigger="hover" followCursor speaker={<Tooltip />}>
        <MyButton />
      </OverlayTrigger>
    );

    expect(count).to.equal(1);

    act(() => {
      Simulate.mouseOver(screen.getByRole('button'));
      Simulate.mouseMove(screen.getByRole('button'), {
        pageY: 10,
        pageX: 10,
        clientX: 10,
        clientY: 10
      });
    });

    expect(count).to.equal(2);
    expect(screen.getByRole('tooltip').style).to.have.property('left', '10px');
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

  it('Should call `onEntered` and `onExited`', async () => {
    const onEntered = sinon.spy();
    const onExited = sinon.spy();

    render(
      <OverlayTrigger
        trigger="click"
        speaker={<div role="tooltip">test</div>}
        onEntered={onEntered}
        onExited={onExited}
      >
        <button>button</button>
      </OverlayTrigger>
    );

    fireEvent.click(screen.getByText('button'));

    await waitFor(() => {
      expect(onEntered).to.have.been.calledOnce;
      expect(screen.getByRole('tooltip')).to.exist;
    });

    fireEvent.click(screen.getByText('button'));

    await waitFor(() => {
      expect(onExited).to.have.been.calledOnce;
      expect(screen.queryByRole('tooltip')).to.not.exist;
    });
  });

  it('Should delayed to call `onEntered`', async () => {
    const onEntered = sinon.spy();

    render(
      <OverlayTrigger
        trigger="click"
        delayOpen={100}
        speaker={<div role="tooltip">test</div>}
        onEntered={onEntered}
      >
        <button>button</button>
      </OverlayTrigger>
    );

    fireEvent.click(screen.getByText('button'));

    await waitFor(() => {
      expect(onEntered).to.have.been.calledOnce;
      expect(screen.getByRole('tooltip')).to.exist;
    });
  });

  it('Should delayed to call `onExited`', async () => {
    const onExited = sinon.spy();

    render(
      <OverlayTrigger
        trigger="click"
        delayClose={100}
        speaker={<div role="tooltip">test</div>}
        onExited={onExited}
        defaultOpen
      >
        <button>button</button>
      </OverlayTrigger>
    );

    fireEvent.click(screen.getByText('button'));

    await waitFor(() => {
      expect(onExited).to.have.been.calledOnce;
      expect(screen.queryByRole('tooltip')).to.not.exist;
    });
  });

  it('Should delayed to call `onEntered` and `onExited`', async () => {
    const onEntered = sinon.spy();
    const onExited = sinon.spy();

    render(
      <OverlayTrigger
        trigger="click"
        delay={100}
        speaker={<div role="tooltip">test</div>}
        onEntered={onEntered}
        onExited={onExited}
      >
        <button>button</button>
      </OverlayTrigger>
    );

    fireEvent.click(screen.getByText('button'));

    await waitFor(() => {
      expect(onEntered).to.have.been.calledOnce;
      expect(screen.getByRole('tooltip')).to.exist;
    });

    fireEvent.click(screen.getByText('button'));

    await waitFor(() => {
      expect(onExited).to.have.been.calledOnce;
      expect(screen.queryByRole('tooltip')).to.not.exist;
    });
  });
});
