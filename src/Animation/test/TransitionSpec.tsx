import React from 'react';
import Transition from '../Transition';
import { act, render, waitFor } from '@testing-library/react';
import sinon from 'sinon';

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
    const onEntered = sinon.spy();
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

    expect(onEntered).to.not.be.called;

    await waitFor(() => {
      expect(container.firstChild).to.have.class('class-in');
    });
  });

  it('Should call onEnter/onEntering/onEntered callback', async () => {
    const onEnter = sinon.spy();
    const onEntering = sinon.spy();
    const onEntered = sinon.spy();

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
      expect(onEnter).to.be.called;
      expect(onEntering).to.be.called;
      expect(onEntered).to.be.called;
    });
  });

  it('Should call onExit/onExiting/onExited callback', async () => {
    const onExit = sinon.spy();
    const onExiting = sinon.spy();
    const onExited = sinon.spy();

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
      expect(onExit).to.be.called;
      expect(onExiting).to.be.called;
      expect(onExited).to.be.called;
    });
  });
});
