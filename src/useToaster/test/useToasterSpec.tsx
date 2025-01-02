import React from 'react';
import { screen, render, act, fireEvent, waitFor, renderHook } from '@testing-library/react';
import sinon from 'sinon';
import useToaster from '../useToaster';
import CustomProvider from '../../CustomProvider';
import Uploader from '../../Uploader';
import zhCN from '../../locales/zh_CN';
import Message from '../../Message';

afterEach(() => {
  sinon.restore();
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
      ((screen.queryByTestId('msg-top-end') as HTMLElement).parentNode as HTMLElement).className
    ).to.equal('rs-toast-container rs-toast-container-top-end');
    expect(
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
});
