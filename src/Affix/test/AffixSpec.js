import React from 'react';
import ReactDOM from 'react-dom';
import Affix from '../Affix';
import { getDOMNode, createTestContainer } from '@test/testUtils';
import { getOffset } from 'dom-lib';

describe('Affix', () => {
  it('Should render a button', () => {
    const instance = getDOMNode(
      <Affix>
        <button>button</button>
      </Affix>
    );

    assert.equal(instance.children[0].tagName, 'BUTTON');
  });

  it('Should call onChange callback', done => {
    const buttonRef = React.createRef();
    const affixRef = React.createRef();

    ReactDOM.render(
      <div style={{ height: 3000 }}>
        <div style={{ height: 100 }}>--</div>
        <Affix
          top={10}
          ref={affixRef}
          onChange={() => {
            const affixDOM = getDOMNode(affixRef.current);
            if (affixDOM.className === 'rs-affix' && affixDOM.style.position === 'fixed') {
              done();
            }
          }}
        >
          <button ref={buttonRef}>button</button>
        </Affix>
      </div>,
      createTestContainer()
    );
    const top = getOffset(buttonRef.current).top;
    window.scrollTo({ top });
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Affix style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });
});
