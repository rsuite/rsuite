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
    const onEnteredSpy = sinon.spy();
    const { container } = render(
      <Transition
        transitionAppear
        in
        timeout={100}
        exitedClassName="class-out"
        enteredClassName="class-in"
        onEntered={onEnteredSpy}
      >
        {props => <div {...props}>test</div>}
      </Transition>
    );

    expect(onEnteredSpy).to.not.be.called;

    await waitFor(() => {
      expect(container.firstChild).to.have.class('class-in');
    });
  });

  it('Should call onEnter/onEntering/onEntered callback', async () => {
    const onEnterSpy = sinon.spy();
    const onEnteringSpy = sinon.spy();
    const onEnteredSpy = sinon.spy();

    render(
      <Transition
        transitionAppear
        in
        timeout={100}
        exitedClassName="class-out"
        enteredClassName="class-in"
        onEnter={onEnterSpy}
        onEntering={onEnteringSpy}
        onEntered={onEnteredSpy}
      >
        {props => <div {...props}>test</div>}
      </Transition>
    );

    await waitFor(() => {
      expect(onEnterSpy).to.be.called;
      expect(onEnteringSpy).to.be.called;
      expect(onEnteredSpy).to.be.called;
    });
  });

  it('Should call onExit/onExiting/onExited callback', async () => {
    const onExitSpy = sinon.spy();
    const onExitingSpy = sinon.spy();
    const onExitedSpy = sinon.spy();

    const transitionRef = React.createRef<Transition>();
    render(
      <Transition
        ref={transitionRef}
        timeout={100}
        exitedClassName="class-out"
        enteredClassName="class-in"
        onExit={onExitSpy}
        onExiting={onExitingSpy}
        onExited={onExitedSpy}
      >
        {props => <div {...props}>test</div>}
      </Transition>
    );

    act(() => {
      transitionRef.current?.performExit(transitionRef.current.props);
    });

    await waitFor(() => {
      expect(onExitSpy).to.be.called;
      expect(onExitingSpy).to.be.called;
      expect(onExitedSpy).to.be.called;
    });
  });
});
