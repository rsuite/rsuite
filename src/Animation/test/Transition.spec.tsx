import React from 'react';
import Transition from '../Transition';
import { describe, it, expect, vi } from 'vitest';
import { act, render, waitFor } from '@testing-library/react';

describe('Animation', () => {
  it('Should output enteredClassName', () => {
    const { container } = render(
      <Transition in enteredClassName="class-in">
        <div>test</div>
      </Transition>
    );

    expect(container.firstChild).to.have.class('class-in');
  });

  it('Should outout enteredClassName by function children', () => {
    const { container } = render(
      <Transition in enteredClassName="class-in">
        {props => <div {...props}>test</div>}
      </Transition>
    );
    expect(container.firstChild).to.have.class('class-in');
  });

  it('Should outout exitedClassName by function children', () => {
    const { container } = render(
      <Transition exitedClassName="class-out">{props => <div {...props}>test</div>}</Transition>
    );
    expect(container.firstChild).to.have.class('class-out');
  });

  it('Should be transitionAppear', async () => {
    const onEntered = vi.fn();
    const { container } = render(
      <Transition
        transitionAppear
        in
        timeout={100}
        exitedClassName="class-out"
        enteredClassName="class-in"
        onEntered={onEntered}
      >
        {(props, ref) => (
          <div {...props} ref={ref}>
            test
          </div>
        )}
      </Transition>
    );

    expect(onEntered).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(container.firstChild).to.have.class('class-in');
    });
  });

  it('Should call onEnter/onEntering/onEntered callback', async () => {
    const onEnter = vi.fn();
    const onEntering = vi.fn();
    const onEntered = vi.fn();

    render(
      <Transition
        transitionAppear
        in
        timeout={100}
        exitedClassName="class-out"
        enteredClassName="class-in"
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
      >
        {(props, ref) => (
          <div {...props} ref={ref}>
            test
          </div>
        )}
      </Transition>
    );

    await waitFor(() => {
      expect(onEnter).toHaveBeenCalled();
      expect(onEntering).toHaveBeenCalled();
      expect(onEntered).toHaveBeenCalled();
    });
  });

  it('Should call onExit/onExiting/onExited callback', async () => {
    const onExit = vi.fn();
    const onExiting = vi.fn();
    const onExited = vi.fn();

    const transitionRef = React.createRef<Transition>();
    render(
      <Transition
        ref={transitionRef}
        timeout={100}
        exitedClassName="class-out"
        enteredClassName="class-in"
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
      >
        {(props, ref) => (
          <div {...props} ref={ref}>
            test
          </div>
        )}
      </Transition>
    );

    act(() => {
      transitionRef.current?.performExit(transitionRef.current.props);
    });

    await waitFor(() => {
      expect(onExit).toHaveBeenCalled();
      expect(onExiting).toHaveBeenCalled();
      expect(onExited).toHaveBeenCalled();
    });
  });
});
