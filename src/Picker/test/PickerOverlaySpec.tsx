import React from 'react';
import PickerOverlay from '../PickerOverlay';
import getWidth from 'dom-lib/getWidth';
import { render } from '@testing-library/react';
import sinon from 'sinon';
import * as utils from '../../utils';
import useElementResize from '@test/stubs/useElementResize';
import { OverlayTriggerHandle } from '../PickerToggleTrigger';

describe('PickerOverlay', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Should update the position after the size is changed', () => {
    sinon.stub(utils, 'useElementResize').callsFake(useElementResize);
    const updatePosition = sinon.spy();
    type AppInstance = {
      changeOverlaySize: () => void;
    };

    const instanceRef = React.createRef<AppInstance>();

    const Button = React.forwardRef(
      (
        props: React.DetailedHTMLProps<
          React.ButtonHTMLAttributes<HTMLButtonElement>,
          HTMLButtonElement
        >,
        ref: React.Ref<OverlayTriggerHandle>
      ) => {
        const targetRef = React.useRef<HTMLButtonElement>(null);
        React.useImperativeHandle(
          ref,
          () =>
            ({
              root: targetRef.current as HTMLButtonElement,
              updatePosition
            } as any)
        );
        return <button ref={targetRef} {...props} />;
      }
    );

    const App = React.forwardRef((_props, ref) => {
      const targetRef = React.useRef<OverlayTriggerHandle>(null);
      const contentRef = React.useRef<HTMLDivElement>(null);
      React.useImperativeHandle(ref, () => ({
        changeOverlaySize: () => {
          (contentRef.current as HTMLDivElement).style.height = '200px';
        }
      }));
      return (
        <div>
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

    (instanceRef.current as AppInstance).changeOverlaySize();

    expect(updatePosition).to.have.been.calledOnce;
  });

  it('Should go to change the width according to the target', () => {
    const instanceRef = React.createRef<HTMLDivElement>();

    const Button = React.forwardRef(
      (
        props: React.DetailedHTMLProps<
          React.ButtonHTMLAttributes<HTMLButtonElement>,
          HTMLButtonElement
        >,
        ref: React.Ref<OverlayTriggerHandle>
      ) => {
        const targetRef = React.useRef<HTMLButtonElement>(null);
        React.useImperativeHandle(
          ref,
          () =>
            ({
              root: targetRef.current as HTMLButtonElement
            } as any)
        );
        return <button ref={targetRef} {...props} />;
      }
    );

    const App = React.forwardRef((_props, ref: React.Ref<HTMLDivElement>) => {
      const targetRef = React.useRef<OverlayTriggerHandle>(null);

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
    expect(
      getWidth(
        (instanceRef.current as HTMLDivElement).querySelector('.rs-picker-menu') as HTMLElement
      )
    ).to.equal(200);
  });
});
