import React from 'react';
import { act, render, screen } from '@testing-library/react';
import sinon from 'sinon';
import getOffset from 'dom-lib/getOffset';
import Affix from '../Affix';

describe('Affix', () => {
  it('Should render a button', () => {
    render(
      <Affix>
        <button data-testid="button">button</button>
      </Affix>
    );

    expect(screen.getByTestId('button')).to.have.tagName('BUTTON');
  });

  it('Should call onChange callback', () => {
    const buttonRef = React.createRef<HTMLButtonElement>();
    const affixRef = React.createRef<HTMLDivElement>();

    const onChangeSpy = sinon.spy();

    render(
      <div style={{ height: 3000 }}>
        <div style={{ height: 100 }}>--</div>
        <Affix top={10} ref={affixRef} onChange={onChangeSpy}>
          <button ref={buttonRef}>button</button>
        </Affix>
      </div>
    );

    const top = getOffset(buttonRef.current)?.top;

    act(() => {
      window.scrollTo({ top });
      window.dispatchEvent(new UIEvent('scroll'));
    });

    expect(onChangeSpy).to.have.been.called;

    const affixDOM = affixRef.current as HTMLDivElement;

    expect(affixDOM.children[0]).to.have.class('rs-affix');
    expect(affixDOM.children[0]).to.have.style('position', 'fixed');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    render(<Affix style={{ fontSize }} data-testid="affix" />);

    expect(screen.getByTestId('affix')).to.have.style('font-size', fontSize);
  });
});
