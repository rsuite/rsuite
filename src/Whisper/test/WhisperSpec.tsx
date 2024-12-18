import React, { CSSProperties, Ref } from 'react';
import sinon from 'sinon';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Whisper, { WhisperInstance } from '../Whisper';
import Tooltip from '../../Tooltip';

describe('Whisper', () => {
  it('Should create Whisper element', () => {
    const { container } = render(
      <Whisper speaker={<Tooltip>tooltip</Tooltip>}>
        <button type="button">button</button>
      </Whisper>
    );

    expect(container.firstChild).to.have.tagName('BUTTON');
  });

  it('Should maintain overlay classname when trigger click', () => {
    render(
      <Whisper
        trigger="click"
        speaker={
          <Tooltip className="test-whisper" data-testid="tooltip">
            test
          </Tooltip>
        }
      >
        <button>button</button>
      </Whisper>
    );
    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByTestId('tooltip')).to.have.class('test-whisper');
  });

  it('Should maintain overlay classname when trigger focus', () => {
    render(
      <Whisper
        trigger="focus"
        speaker={
          <Tooltip className="test-whisper" data-testid="tooltip">
            test
          </Tooltip>
        }
      >
        <button>button</button>
      </Whisper>
    );

    fireEvent.focus(screen.getByRole('button'));
    expect(screen.getByTestId('tooltip')).to.have.class('test-whisper');
  });

  it('Should call onClick callback', () => {
    const onClick = sinon.spy();
    render(
      <Whisper onClick={onClick} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).to.have.been.calledOnce;
  });

  it('Should call onOpen callback', async () => {
    const onOpen = sinon.spy();
    render(
      <Whisper onOpen={onOpen} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(onOpen).to.have.been.calledOnce;
    });
  });

  it('Should call onOpen callback by open()', async () => {
    const onOpen = sinon.spy();
    const ref = React.createRef<WhisperInstance>();
    render(
      <Whisper ref={ref} onOpen={onOpen} trigger="none" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    ref.current?.open();
    await waitFor(() => {
      expect(onOpen).to.have.been.calledOnce;
    });
  });

  it('Should call onEntered callback', async () => {
    const onEntered = sinon.spy();

    render(
      <Whisper onEntered={onEntered} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(onEntered).to.have.been.calledOnce;
    });
  });

  it('Should call onClose callback', async () => {
    const onClose = sinon.spy();

    render(
      <Whisper onClose={onClose} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(onClose).to.have.been.calledOnce;
    });
  });

  it('Should call onExited callback', async () => {
    const onExited = sinon.spy();

    render(
      <Whisper onExited={onExited} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(onExited).to.have.been.calledOnce;
    });
  });

  it('Should pass transition callbacks to Transition', async () => {
    const onExitSpy = sinon.spy();
    const onExitingSpy = sinon.spy();
    const onExitedSpy = sinon.spy();
    const onEnterSpy = sinon.spy();
    const onEnteringSpy = sinon.spy();
    const onEnteredSpy = sinon.spy();

    render(
      <Whisper
        trigger="click"
        speaker={<Tooltip>test</Tooltip>}
        onExit={onExitSpy}
        onExiting={onExitingSpy}
        onExited={onExitedSpy}
        onEnter={onEnterSpy}
        onEntering={onEnteringSpy}
        onEntered={onEnteredSpy}
      >
        <button data-testid="btn">button</button>
      </Whisper>
    );

    fireEvent.click(screen.getByTestId('btn'));

    await waitFor(() => {
      expect(onEnterSpy).to.called;
      expect(onEnteringSpy).to.called;
      expect(onEnteredSpy).to.called;
    });

    fireEvent.click(screen.getByTestId('btn'));

    await waitFor(() => {
      expect(onExitSpy).to.called;
      expect(onExitingSpy).to.called;
      expect(onExitedSpy).to.called;
    });
  });

  it('Should Overlay be closed, after call onClose', async () => {
    const ref = React.createRef<WhisperInstance>();
    const Overlay = React.forwardRef(
      (
        {
          style,
          onClose,
          ...rest
        }: { style: CSSProperties; onClose: () => void } & React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLDivElement>,
          HTMLDivElement
        >,
        ref
      ) => {
        return (
          <div {...rest} style={style} ref={ref as Ref<HTMLDivElement>}>
            <button onClick={onClose}>close</button>
          </div>
        );
      }
    );

    const onExitedSpy = sinon.spy();

    render(
      <Whisper
        ref={ref}
        onExited={onExitedSpy}
        trigger="click"
        speaker={(props, ref) => {
          const { className, left, top, onClose } = props;
          return (
            <Overlay style={{ left, top }} onClose={onClose} className={className} ref={ref} />
          );
        }}
      >
        <button>button</button>
      </Whisper>
    );

    fireEvent.click((ref.current as WhisperInstance).root as HTMLElement);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() => {
      expect(onExitedSpy).to.called;
    });
  });
});
