import React, { CSSProperties, Ref } from 'react';
import Whisper, { WhisperInstance } from '../Whisper';
import Tooltip from '../../Tooltip';
import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

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
    const onClick = vi.fn();
    render(
      <Whisper onClick={onClick} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Should call onOpen callback', async () => {
    const onOpen = vi.fn();
    render(
      <Whisper onOpen={onOpen} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(onOpen).toHaveBeenCalledTimes(1);
    });
  });

  it('Should call onOpen callback by open()', async () => {
    const onOpen = vi.fn();
    const ref = React.createRef<WhisperInstance>();
    render(
      <Whisper ref={ref} onOpen={onOpen} trigger="none" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    ref.current?.open();
    await waitFor(() => {
      expect(onOpen).toHaveBeenCalledTimes(1);
    });
  });

  it('Should call onEntered callback', async () => {
    const onEntered = vi.fn();

    render(
      <Whisper onEntered={onEntered} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(onEntered).toHaveBeenCalledTimes(1);
    });
  });

  it('Should call onClose callback', async () => {
    const onClose = vi.fn();

    render(
      <Whisper onClose={onClose} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it('Should call onExited callback', async () => {
    const onExited = vi.fn();

    render(
      <Whisper onExited={onExited} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(onExited).toHaveBeenCalledTimes(1);
    });
  });

  it('Should pass transition callbacks to Transition', async () => {
    const onExit = vi.fn();
    const onExiting = vi.fn();
    const onExited = vi.fn();
    const onEnter = vi.fn();
    const onEntering = vi.fn();
    const onEntered = vi.fn();

    render(
      <Whisper
        trigger="click"
        speaker={<Tooltip>test</Tooltip>}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
      >
        <button data-testid="btn">button</button>
      </Whisper>
    );

    fireEvent.click(screen.getByTestId('btn'));

    await waitFor(() => {
      expect(onEnter).toHaveBeenCalled();
      expect(onEntering).toHaveBeenCalled();
      expect(onEntered).toHaveBeenCalled();
    });

    fireEvent.click(screen.getByTestId('btn'));

    await waitFor(() => {
      expect(onExit).toHaveBeenCalled();
      expect(onExiting).toHaveBeenCalled();
      expect(onExited).toHaveBeenCalled();
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
        }: {
          style: CSSProperties;
          onClose?: (delay?: number) => void | NodeJS.Timeout;
        } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
        ref
      ) => {
        const handleClose = () => {
          if (onClose) {
            onClose();
          }
        };

        return (
          <div {...rest} style={style} ref={ref as Ref<HTMLDivElement>}>
            <button onClick={handleClose}>close</button>
          </div>
        );
      }
    );

    const onExited = vi.fn();

    render(
      <Whisper
        ref={ref}
        onExited={onExited}
        trigger="click"
        speaker={(props, ref) => {
          const { left, top, onClose } = props;
          return <Overlay style={{ left, top }} onClose={onClose} ref={ref} />;
        }}
      >
        <button>button</button>
      </Whisper>
    );

    fireEvent.click((ref.current as WhisperInstance).root as HTMLElement);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() => {
      expect(onExited).toHaveBeenCalled();
    });
  });
});
