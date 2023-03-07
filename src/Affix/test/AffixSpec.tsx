import React from 'react';
import { act, render, screen } from '@testing-library/react';
import sinon from 'sinon';
import { getDOMNode } from '@test/testUtils';
import getOffset from 'dom-lib/getOffset';
import Affix from '../Affix';

describe('Affix', () => {
  it('Should render a button', () => {
    render(
      <Affix>
        <button data-testid="button">button</button>
      </Affix>
    );

    expect(screen.getByTestId('button')).to.exist;
  });

  it('Should call onChange callback', () => {
    const buttonRef = React.createRef<HTMLButtonElement>();
    const affixRef = React.createRef<HTMLDivElement>();

    const onChangeSpy = sinon.spy();

    getDOMNode(
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

    const affixDOM = getDOMNode(affixRef.current);

    // eslint-disable-next-line testing-library/no-node-access
    expect(affixDOM.children[0].className).to.contain('rs-affix');
    // eslint-disable-next-line testing-library/no-node-access
    expect((affixDOM.children[0] as HTMLElement).style.position).to.equal('fixed');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Affix style={{ fontSize }} />);

    expect(instance.style.fontSize).to.equal(fontSize);
  });
});
