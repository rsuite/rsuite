import React, { CSSProperties, Ref } from 'react';
import { render, act, fireEvent, waitFor } from '@testing-library/react';
import sinon from 'sinon';
import { getDOMNode, getInstance } from '@test/testUtils';

import Whisper, { WhisperInstance } from '../Whisper';
import Tooltip from '../../Tooltip';

describe('Whisper', () => {
  it('Should create Whisper element', () => {
    const instance = getDOMNode(
      <Whisper speaker={<Tooltip>tooltip</Tooltip>}>
        <button type="button">button</button>
      </Whisper>
    );

    expect(instance.nodeName).to.equal('BUTTON');
  });

  it('Should maintain overlay classname when trigger click', () => {
    const whisper = getDOMNode(
      <Whisper trigger="click" speaker={<Tooltip className="test-whisper">test</Tooltip>}>
        <button>button</button>
      </Whisper>
    );
    fireEvent.click(whisper);

    expect(document.getElementsByClassName('test-whisper')).to.length(1);
  });

  it('Should maintain overlay classname when trigger focus', () => {
    const whisper = getDOMNode(
      <Whisper trigger="focus" speaker={<Tooltip className="test-whisper">test</Tooltip>}>
        <button>button</button>
      </Whisper>
    );

    fireEvent.focus(whisper);
    expect(document.getElementsByClassName('test-whisper')).to.length(1);
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

    fireEvent.click(whisper);
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

    fireEvent.click(whisper);
  });

  it('Should call onOpen callback by open()', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(
      <Whisper onOpen={doneOp} trigger="none" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    instance.open();
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

    fireEvent.click(whisper);
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

    fireEvent.click(whisper);
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

    fireEvent.click(whisper);
    fireEvent.click(whisper);
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

    fireEvent.click(whisper);
    fireEvent.click(whisper);
  });

  it('Should pass transition callbacks to Transition', async () => {
    const onExitSpy = sinon.spy();
    const onExitingSpy = sinon.spy();
    const onExitedSpy = sinon.spy();
    const onEnterSpy = sinon.spy();
    const onEnteringSpy = sinon.spy();
    const onEnteredSpy = sinon.spy();

    const { getByTestId } = render(
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

    act(() => {
      fireEvent.click(getByTestId('btn'));
    });

    await waitFor(() => {
      expect(onEnterSpy).to.called;
      expect(onEnteringSpy).to.called;
      expect(onEnteredSpy).to.called;
    });

    act(() => {
      fireEvent.click(getByTestId('btn'));
    });

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
    act(() => {
      fireEvent.click((ref.current as WhisperInstance).root as HTMLElement);
    });

    act(() => {
      fireEvent.click(
        // FIXME WhisperInstance is missing `overlay` declaration
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (ref.current as WhisperInstance).overlay.querySelector('button') as HTMLElement
      );
    });

    await waitFor(() => {
      expect(onExitedSpy).to.called;
    });
  });
});
