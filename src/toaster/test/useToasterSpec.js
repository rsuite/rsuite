import React from 'react';
import { screen, render, act } from '@testing-library/react';
import useToaster from '../useToaster';
import CustomProvider from '../../CustomProvider';
import Uploader from '../../Uploader';
import zhCN from '../../locales/zh_CN';
import { renderHook } from '@test/testUtils';

afterEach(() => {
  sinon.restore();
});

describe('useToaster', () => {
  it('Should push a message', () => {
    const toaster = renderHook(() => useToaster(), { wrapper: CustomProvider }).result.current;

    act(() => {
      toaster.push(<div data-testid="msg-1">message</div>);
    });

    const message = screen.queryByTestId('msg-1');

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

    expect(screen.queryByTestId('msg-top-end').parentNode.className).to.equal(
      'rs-toast-container rs-toast-container-top-end'
    );
    expect(screen.queryByTestId('msg-bottom-end').parentNode.className).to.equal(
      'rs-toast-container rs-toast-container-bottom-end'
    );
  });

  it('Should remove a message', () => {
    const toaster = renderHook(() => useToaster(), { wrapper: CustomProvider }).result.current;
    const clock = sinon.useFakeTimers();

    let key;
    act(() => {
      key = toaster.push(<div data-testid="message">abc</div>);
    });

    const message = screen.queryByTestId('message');
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
      React.useEffect(() => {
        toaster.push(
          <div data-testid="msg-with-uploader">
            <Uploader action="/" />
          </div>
        );
      });
      return null;
    };

    render(
      <CustomProvider locale={zhCN}>
        <App />
      </CustomProvider>
    );

    expect(screen.queryByTestId('msg-with-uploader')).to.exist;

    const uploaderBtn = screen
      .getByTestId('msg-with-uploader')
      .querySelector('.rs-uploader-trigger-btn');

    expect(uploaderBtn.textContent).to.equal('上传');
  });
});
