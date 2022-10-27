import React from 'react';
import { act } from '@testing-library/react';
import Collapse from '../Collapse';
import { getDOMNode, getInstance } from '@test/testUtils';

describe('Animation.Collapse', () => {
  it('Should be horizontal', () => {
    const instance = getDOMNode(
      <Collapse in dimension="width">
        <div>test</div>
      </Collapse>
    );

    expect(instance.className).to.include('rs-anim-collapse-horizontal');

    const instance2 = getDOMNode(
      <Collapse in dimension={() => 'width'}>
        <div>test</div>
      </Collapse>
    );

    expect(instance2.className).to.include('rs-anim-collapse-horizontal');
  });

  it('Should set a dimension value at onExit of the transition', async () => {
    const onExitSpy = sinon.spy();
    const collapseRef = React.createRef();

    const App = React.forwardRef((props, ref) => {
      const [show, setShow] = React.useState(true);

      React.useImperativeHandle(ref, () => {
        return {
          hide: () => setShow(false)
        };
      });
      return (
        <Collapse
          ref={collapseRef}
          in={show}
          onExit={() => {
            expect(getDOMNode(collapseRef.current).style.height).to.equal('50px');
            onExitSpy();
          }}
          getDimensionValue={() => {
            return 50;
          }}
        >
          <div style={{ width: 100, height: 100 }}>test</div>
        </Collapse>
      );
    });

    const instance = getInstance(<App />);

    expect(getDOMNode(collapseRef.current).className).to.contain('rs-anim-collapse');

    act(() => {
      instance.hide();
    });

    expect(getDOMNode(collapseRef.current).className).to.contain('rs-anim-collapsing');
    expect(getDOMNode(collapseRef.current).style.height).to.equal('0px');
    expect(onExitSpy).to.called;
  });
});
