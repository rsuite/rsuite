import React from 'react';
import { act } from '@testing-library/react';
import { getDOMNode } from '@test/testUtils';
import getOffset from 'dom-lib/getOffset';
import Affix from '../Affix';

describe('Affix', () => {
  it('Should render a button', () => {
    const instance = getDOMNode(
      <Affix>
        <button>button</button>
      </Affix>
    );

    expect(instance.children[0].children[0].tagName).to.equal('BUTTON');
  });

  it('Should call onChange callback', () => {
    const buttonRef = React.createRef();
    const affixRef = React.createRef();

    const onChangeSpy = sinon.spy();

    getDOMNode(
      <div style={{ height: 3000 }}>
        <div style={{ height: 100 }}>--</div>
        <Affix top={10} ref={affixRef} onChange={onChangeSpy}>
          <button ref={buttonRef}>button</button>
        </Affix>
      </div>
    );

    const top = getOffset(buttonRef.current).top;

    act(() => {
      window.scrollTo({ top });
      window.dispatchEvent(new UIEvent('scroll'));
    });

    expect(onChangeSpy).to.have.been.called;

    const affixDOM = getDOMNode(affixRef.current);

    expect(affixDOM.children[0].className).to.contain('rs-affix');
    expect(affixDOM.children[0].style.position).to.equal('fixed');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Affix style={{ fontSize }} />);

    expect(instance.style.fontSize).to.equal(fontSize);
  });
});
