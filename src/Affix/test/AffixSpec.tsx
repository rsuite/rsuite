import React from 'react';
import sinon from 'sinon';
import getOffset from 'dom-lib/getOffset';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

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
    const onChangeSpy = sinon.spy();

    render(
      <div style={{ height: 3000 }}>
        <div style={{ height: 100 }}>--</div>
        <Affix top={10} data-testid="affix" onChange={onChangeSpy}>
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

    const affix = screen.getByTestId('affix').firstChild as HTMLDivElement;

    expect(affix).to.have.class('rs-affix');

    expect(affix).to.have.style('position', 'fixed');
  });

  it('Should have a custom style', () => {
    render(<Affix data-testid="affix" style={{ fontSize: 12 }} />);

    expect(screen.getByTestId('affix')).to.have.style('font-size', '12px');
  });

  it('Should call onOffsetChange callback', async () => {
    const buttonRef = React.createRef<HTMLButtonElement>();
    const onOffsetChangeSpy = sinon.spy();

    const App = () => {
      const [height, setHeight] = React.useState(100);

      return (
        <div style={{ height: 3000 }}>
          <div style={{ height }}>--</div>
          <Affix top={10} onOffsetChange={onOffsetChangeSpy}>
            <button ref={buttonRef} onClick={() => setHeight(200)}>
              button
            </button>
          </Affix>
        </div>
      );
    };

    render(<App />);

    fireEvent.click(buttonRef.current as HTMLButtonElement);

    const top = getOffset(buttonRef.current)?.top;

    act(() => {
      window.scrollTo({ top });
      window.dispatchEvent(new UIEvent('scroll'));
    });

    await waitFor(() => {
      expect(onOffsetChangeSpy).to.have.been.called;
    });
  });
});
