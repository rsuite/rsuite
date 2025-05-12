import React from 'react';
import sinon from 'sinon';
import PickerPopup from '../PickerPopup';
import getWidth from 'dom-lib/getWidth';
import useElementResize from '@test/stubs/useElementResize';
import * as hooks from '@/internals/hooks';
import type { OverlayTriggerHandle } from '@/internals/Overlay';
import { describe, expect, it, afterEach } from 'vitest';
import { ComboboxContext } from '../PickerToggleTrigger';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('PickerPopup', () => {
  afterEach(() => {
    sinon.restore();
  });

  testStandardProps(<PickerPopup />);

  it('Should render a popup', () => {
    render(<PickerPopup data-testid="overlay" />);
    expect(screen.getByTestId('overlay').className).to.contain('picker-popup');
  });

  it('Should update the position after the size is changed', async () => {
    // Stub the useElementResize hook to control resize behavior
    sinon.stub(hooks, 'useElementResize').callsFake(useElementResize);

    // Create a spy to track updatePosition calls
    const updatePosition = sinon.spy();

    type AppInstance = {
      changeOverlaySize: (height: number) => void;
      getContentHeight: () => number;
    };

    const instanceRef = React.createRef<AppInstance>();

    // Mock Button component that exposes updatePosition method
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
            }) as any
        );
        return <button ref={targetRef} data-testid="target-button" {...props} />;
      }
    );

    // Test component that allows changing content size
    const App = React.forwardRef((_props, ref) => {
      const targetRef = React.useRef<OverlayTriggerHandle>(null);
      const contentRef = React.useRef<HTMLDivElement>(null);

      React.useImperativeHandle(ref, () => ({
        changeOverlaySize: (height: number) => {
          if (contentRef.current) {
            contentRef.current.style.height = `${height}px`;
          }
        },
        getContentHeight: () => {
          return contentRef.current ? parseInt(contentRef.current.style.height, 10) : 0;
        }
      }));

      return (
        <div>
          <Button ref={targetRef}>target</Button>
          <ComboboxContext.Provider value={{ placement: 'topStart' }}>
            <PickerPopup target={targetRef} data-testid="picker-popup-container">
              <div ref={contentRef} style={{ width: 100, height: 100 }} data-testid="content-div">
                test
              </div>
            </PickerPopup>
          </ComboboxContext.Provider>
        </div>
      );
    });

    // Render the test component
    const { findByTestId } = render(<App ref={instanceRef} />);

    // Verify initial height
    const contentDiv = await findByTestId('content-div');
    expect(contentDiv.style.height).to.equal('100px');

    // Reset the spy to ensure clean state before size change
    updatePosition.resetHistory();

    // Change the size
    (instanceRef.current as AppInstance).changeOverlaySize(200);

    // Verify the height was changed
    expect(contentDiv.style.height).to.equal('200px');
    expect((instanceRef.current as AppInstance).getContentHeight()).to.equal(200);

    // Verify updatePosition was called after size change
    expect(updatePosition).to.have.been.calledOnce;

    // Change size again to verify multiple updates work correctly
    updatePosition.resetHistory();
    (instanceRef.current as AppInstance).changeOverlaySize(300);

    // Verify the second update
    expect(contentDiv.style.height).to.equal('300px');
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
            }) as any
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
          <PickerPopup
            target={targetRef}
            placement="topStart"
            autoWidth
            style={{
              position: 'absolute'
            }}
          >
            <div>test</div>
          </PickerPopup>
        </div>
      );
    });

    render(<App ref={instanceRef} />);
    expect(getWidth(screen.getByTestId('picker-popup'))).to.equal(200);
  });
});
