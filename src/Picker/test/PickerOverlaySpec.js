import React from 'react';
import PickerOverlay from '../PickerOverlay';
import { getWidth } from 'dom-lib';
import { render } from '@testing-library/react';
import * as utils from '../../utils';
import useElementResize from '@test/stubs/useElementResize';

describe('PickerOverlay', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Should update the position after the size is changed', done => {
    sinon.stub(utils, 'useElementResize').callsFake(useElementResize);

    const instanceRef = React.createRef();

    const Button = React.forwardRef((props, ref) => {
      const targetRef = React.useRef();
      React.useImperativeHandle(ref, () => ({
        root: targetRef.current,
        updatePosition: () => {
          done();
        }
      }));
      return <button ref={targetRef} {...props} />;
    });

    const App = React.forwardRef((props, ref) => {
      const targetRef = React.useRef();
      const contentRef = React.useRef();
      React.useImperativeHandle(ref, () => ({
        changeOverlaySize: () => {
          contentRef.current.style.height = '200px';
        }
      }));
      return (
        <div ref={ref}>
          <Button ref={targetRef}>target</Button>
          <PickerOverlay target={targetRef} placement="topStart">
            <div ref={contentRef} style={{ width: 100, height: 100 }}>
              test
            </div>
          </PickerOverlay>
        </div>
      );
    });
    render(<App ref={instanceRef} />);

    instanceRef.current.changeOverlaySize();
  });

  it('Should go to change the width according to the target', done => {
    const instanceRef = React.createRef();

    const Button = React.forwardRef((props, ref) => {
      const targetRef = React.useRef();
      React.useImperativeHandle(ref, () => ({
        root: targetRef.current,
        updatePosition: () => {
          done();
        }
      }));
      return <button ref={targetRef} {...props} />;
    });

    const App = React.forwardRef((props, ref) => {
      const targetRef = React.useRef();

      return (
        <div ref={ref}>
          <Button ref={targetRef} style={{ width: 200 }}>
            target
          </Button>
          <PickerOverlay
            target={targetRef}
            placement="topStart"
            autoWidth
            style={{
              position: 'absolute'
            }}
          >
            <div>test</div>
          </PickerOverlay>
        </div>
      );
    });

    render(<App ref={instanceRef} />);
    if (getWidth(instanceRef.current.querySelector('.rs-picker-menu')) === 200) {
      done();
    }
  });
});
