import React from 'react';
import PickerPopup from '../PickerPopup';
import getWidth from 'dom-lib/getWidth';
import { render, screen } from '@testing-library/react';
import sinon from 'sinon';
import { testStandardProps } from '@test/utils';
import * as hooks from '@/internals/hooks';
import useElementResize from '@test/stubs/useElementResize';
import { OverlayTriggerHandle } from '../PickerToggleTrigger';

describe('PickerPopup', () => {
  afterEach(() => {
    sinon.restore();
  });

  testStandardProps(<PickerPopup />);

  it('Should render a popup', () => {
    render(<PickerPopup data-testid="overlay" />);
    expect(screen.getByTestId('overlay').className).to.contain('picker-popup');
  });

  it('Should update the position after the size is changed', () => {
    sinon.stub(hooks, 'useElementResize').callsFake(useElementResize);
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
            }) as any
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
          <PickerPopup target={targetRef} placement="topStart">
            <div ref={contentRef} style={{ width: 100, height: 100 }}>
              test
            </div>
          </PickerPopup>
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
