import React from 'react';
import { screen, render, act, fireEvent, waitFor } from '@testing-library/react';
import sinon from 'sinon';
import useToaster from '../useToaster';
import CustomProvider from '../../CustomProvider';
import Uploader from '../../Uploader';
import zhCN from '../../locales/zh_CN';
import { renderHook } from '@test/utils';
import Message from '../../Message';
import Notification from '../../Notification'; // Added
import { PlacementType } from '../../toaster/ToastContainer'; // Added
import userEvent from '@testing-library/user-event'; // Added

afterEach(() => {
  sinon.restore();
  // Attempt to clear any remaining toasts to avoid interference between tests
  // This might require a more robust solution if direct toaster access isn't available here
  // or if CustomProvider instances don't clean up globally.
  const clearButton = screen.queryByTestId('clear-button-global');
  if (clearButton) {
    fireEvent.click(clearButton);
  }
});

describe('useToaster', () => {
  it('Should push a message', () => {
    const toaster = renderHook(() => useToaster(), { wrapper: CustomProvider }).result.current;

    act(() => {
      toaster.push(<div data-testid="msg-1">message</div>);
    });

    const message = screen.queryByTestId('msg-1') as HTMLElement;

    expect(message.className).to.contain('rs-toast-fade-entered');
    expect(message.textContent).to.equal('message');
  });

  it('Should render 2 containers', () => {
    const toaster = renderHook(() => useToaster(), { wrapper: CustomProvider }).result.current;

    act(() => {
      toaster.push(<div data-testid="msg-top-end">topEnd</div>, {
        placement: 'topEnd'
      });
      toaster.push(<div data-testid="msg-bottom-end">bottomEnd</div>, {
        placement: 'bottomEnd'
      });
    });

    expect(
      // eslint-disable-next-line testing-library/no-node-access
      ((screen.queryByTestId('msg-top-end') as HTMLElement).parentNode as HTMLElement).className
    ).to.equal('rs-toast-container rs-toast-container-top-end');
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      ((screen.queryByTestId('msg-bottom-end') as HTMLElement).parentNode as HTMLElement).className
    ).to.equal('rs-toast-container rs-toast-container-bottom-end');
  });

  it('Should remove a message', () => {
    const toaster = renderHook(() => useToaster(), { wrapper: CustomProvider }).result.current;
    const clock = sinon.useFakeTimers();

    let key;
    act(() => {
      key = toaster.push(<div data-testid="message">abc</div>);
    });

    const message = screen.queryByTestId('message') as HTMLElement;
    expect(message.className).to.contain('rs-toast-fade-entered');

    act(() => {
      toaster.remove(key);
      clock.tick(400);
    });

    expect(screen.queryByTestId('message')).not.to.exist;
  });

  it('Should clear all message', () => {
    const toaster = renderHook(() => useToaster(), { wrapper: CustomProvider }).result.current;
    const clock = sinon.useFakeTimers();

    act(() => {
      toaster.push(<div data-testid="msg-3">3</div>);
      toaster.push(<div data-testid="msg-4">4</div>);
    });

    expect(screen.queryByTestId('msg-3')).to.exist;
    expect(screen.queryByTestId('msg-4')).to.exist;

    act(() => {
      toaster.clear();
      clock.tick(400);
    });

    expect(screen.queryByTestId('msg-3')).to.not.exist;
    expect(screen.queryByTestId('msg-4')).to.not.exist;
  });

  it('Should be localized on components rendered via toaster', () => {
    const App = () => {
      const toaster = useToaster();

      const handleClick = () => {
        toaster.push(<Uploader action="/" />);
      };

      return (
        <div>
          <button data-testid="btn" onClick={handleClick}>
            click
          </button>
        </div>
      );
    };

    render(
      <CustomProvider locale={zhCN}>
        <App />
      </CustomProvider>
    );

    fireEvent.click(screen.getByTestId('btn'));

    expect(screen.getByText('上传')).to.exist;
  });

  it('Should pass duration to Message', async () => {
    const toaster = renderHook(() => useToaster(), { wrapper: CustomProvider }).result.current;

    const Message = React.forwardRef<HTMLDivElement, any>((props, ref) => {
      const { duration } = props;
      return (
        <div data-testid="msg-1" ref={ref}>
          {duration}
        </div>
      );
    });

    toaster.push(<Message>message</Message>, { duration: 10 });

    await waitFor(() => {
      expect(screen.getByTestId('msg-1')).to.have.text('10');
    });
  });

  it('Should call onClose callback with duration', async () => {
    const onCloseSpy = sinon.spy();
    const toaster = renderHook(() => useToaster(), { wrapper: CustomProvider }).result.current;

    toaster.push(
      <Message data-testid="msg-1" onClose={onCloseSpy}>
        message
      </Message>,
      { duration: 10 }
    );

    await waitFor(() => {
      expect(onCloseSpy).to.have.been.calledOnce;
    });
  });

  it('Should keep the same reference when useToaster re-renders', async () => {
    const { result, rerender } = renderHook(() => useToaster(), { wrapper: CustomProvider });

    const toaster1 = result.current;

    rerender();

    const toaster2 = result.current;

    expect(toaster1).to.equal(toaster2);
  });

  it('Should push a message to a custom container', async () => {
    const container = React.createRef<HTMLDivElement>();
    const App = props => {
      const { children, ...rest } = props;
      return (
        <CustomProvider {...rest}>
          <div role="alert" ref={container} />
          {children}
        </CustomProvider>
      );
    };

    const toaster = renderHook(() => useToaster(), { wrapper: App }).result.current;

    act(() => {
      toaster.push(<div>message</div>, { container: container.current });
    });

    await waitFor(() => expect(container.current).to.have.text('message'));
  });

  const TestAppForRapidPush = ({
    messages,
    placement
  }: {
    messages: string[];
    placement: PlacementType;
  }) => {
    const toaster = useToaster();

    const handlePushRapidly = async () => {
      for (const msgContent of messages) {
        toaster.push(
          <Notification type="info" closable header="Test Context Notification">
            {msgContent}
          </Notification>,
          { placement, duration: 0 }
        );
      }
    };

    const handleClear = () => {
      toaster.clear();
    };

    return (
      <>
        <button onClick={handlePushRapidly} data-testid="push-button-rapid">
          Push All Rapidly
        </button>
        <button onClick={handleClear} data-testid="clear-button-rapid">
          Clear All Rapid
        </button>
      </>
    );
  };

  it('should display all notifications in a single container via useToaster within CustomProvider when pushed rapidly', async () => {
    const testMessages = ['Msg CP Rapid 1', 'Msg CP Rapid 2', 'Msg CP Rapid 3'];
    const testPlacement: PlacementType = 'bottomEnd'; // Using a different placement to avoid potential conflicts

    render(
      <CustomProvider>
        <TestAppForRapidPush messages={testMessages} placement={testPlacement} />
      </CustomProvider>
    );

    await userEvent.click(screen.getByTestId('push-button-rapid'));

    // The container for toasts pushed via useToaster within CustomProvider is usually directly in the body,
    // and CustomProvider might add a wrapper like .rs-toast-provider if it's managing the context.
    // For rsuite, the ToastContainer is typically appended to document.body directly or to a specified portalTarget.
    // If CustomProvider itself renders a ToasterContainer, the selector needs to be specific to that.
    // Based on the prior test "Should push a message to a custom container", it seems direct container management is possible.
    // Let's assume CustomProvider might provide a context that influences where the default container is placed or how it's identified.
    // The key is that useToaster().push should still work with the race condition fix.

    // Default container is usually body, let's look for the specific placement class.
    // If CustomProvider has its own portal/wrapper, this might need adjustment.
    // The provided conceptual example uses `.rs-toast-provider .rs-toast-container...`
    // Let's stick to that as per instructions.
    const containerSelector = `.rs-toast-provider .rs-toast-container.rs-toast-container-${testPlacement}`;

    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-node-access
      const containers = document.querySelectorAll(containerSelector);
      expect(containers.length).to.equal(
        1,
        `Expected 1 container for placement ${testPlacement} within .rs-toast-provider, found ${containers.length}`
      );

      const host = containers[0];
      // eslint-disable-next-line testing-library/no-node-access
      const notifications = host.querySelectorAll('.rs-notification');
      expect(notifications.length).to.equal(
        testMessages.length,
        `Expected ${testMessages.length} notifications, found ${notifications.length}`
      );

      // Verify content
      testMessages.forEach(msg => {
        let found = false;
        notifications.forEach(n => {
          // Check if the notification's text content includes the message
          // This is more robust than exact match if there's other text (e.g. "Test Context Notification")
          if (n.textContent?.includes(msg) && n.textContent?.includes('Test Context Notification')) {
            found = true;
          }
        });
        expect(found).to.be.true;
      });
    });

    // Cleanup
    await userEvent.click(screen.getByTestId('clear-button-rapid'));
    await waitFor(
      () => {
        // eslint-disable-next-line testing-library/no-node-access
        const host = document.querySelector(containerSelector);
        if (host) {
          // eslint-disable-next-line testing-library/no-node-access
          expect(host.querySelectorAll('.rs-notification').length).to.equal(0);
        } else {
          // If the container itself is removed when empty, this is also fine.
          // eslint-disable-next-line testing-library/no-node-access
          expect(document.querySelectorAll(containerSelector).length).to.equal(0);
        }
      },
      { timeout: 1000 } // Increased timeout for cleanup if animations are involved
    );
  });
});
