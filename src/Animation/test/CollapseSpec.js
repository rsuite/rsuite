import React from 'react';
import { findDOMNode } from 'react-dom';
import Collapse from '../Collapse';
import { getDOMNode, getInstance } from '@test/testUtils';

describe('Animation.Collapse', () => {
  it('Should be horizontal', () => {
    const instance = getDOMNode(
      <Collapse in dimension="width">
        <div>test</div>
      </Collapse>
    );
    assert.include(instance.className, 'rs-anim-collapse-horizontal');

    const instance2 = getDOMNode(
      <Collapse in dimension={() => 'width'}>
        <div>test</div>
      </Collapse>
    );
    assert.include(instance2.className, 'rs-anim-collapse-horizontal');
  });

  it('Should set a dimension value at onExit of the transition', done => {
    const App = React.forwardRef((props, ref) => {
      const [show, setShow] = React.useState(true);
      const collapseRef = React.useRef();
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
            // eslint-disable-next-line react/no-find-dom-node
            if (findDOMNode(collapseRef.current).style.height === '50px') {
              done();
            }
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

    instance.hide();
    assert.include(instance.className, 'rs-collapse-horizontal');
  });
});
