import React from 'react';
import { screen, render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks/dom';
import useToaster from '../useToaster';
import CustomProvider from '../../CustomProvider';
import Uploader from '../../Uploader';
import zhCN from '../../locales/zh_CN';

afterEach(() => {
  sinon.restore();
});

describe('useToaster', () => {
  it('Should push a message', () => {
    const toaster = renderHook(() => useToaster()).result.current;

    toaster.push(<div data-testid="msg-1">message</div>);

    const message = screen.queryByTestId('msg-1');

    assert.include(message.className, 'rs-toast-fade-entered');
    assert.equal(message.textContent, 'message');
  });

  it('Should render 2 containers', () => {
    const toaster = renderHook(() => useToaster()).result.current;

    toaster.push(<div data-testid="msg-top-end">topEnd</div>, {
      placement: 'topEnd'
    });
    toaster.push(<div data-testid="msg-bottom-end">bottomEnd</div>, {
      placement: 'bottomEnd'
    });

    assert.equal(
      screen.queryByTestId('msg-top-end').parentNode.className,
      'rs-toast-container rs-toast-container-top-end'
    );
    assert.equal(
      screen.queryByTestId('msg-bottom-end').parentNode.className,
      'rs-toast-container rs-toast-container-bottom-end'
    );
  });

  it('Should remove a message', () => {
    const toaster = renderHook(() => useToaster()).result.current;
    const clock = sinon.useFakeTimers();

    const key = toaster.push(<div data-testid="message">abc</div>);

    const message = screen.queryByTestId('message');
    assert.include(message.className, 'rs-toast-fade-entered');

    toaster.remove(key);
    assert.include(message.className, 'rs-toast-fade-exiting');

    clock.tick(400);
    assert.notExists(screen.queryByTestId('message'));
  });

  it('Should clear all message', () => {
    const toaster = renderHook(() => useToaster()).result.current;
    const clock = sinon.useFakeTimers();
    toaster.push(<div data-testid="msg-3">3</div>);
    toaster.push(<div data-testid="msg-4">4</div>);

    assert.exists(screen.queryByTestId('msg-3'));
    assert.exists(screen.queryByTestId('msg-4'));
    toaster.clear();

    clock.tick(400);
    assert.notExists(screen.queryByTestId('msg-3'));
    assert.notExists(screen.queryByTestId('msg-4'));
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

    const uploaderBtn = screen
      .getByTestId('msg-with-uploader')
      .querySelector('.rs-uploader-trigger-btn');
    assert.equal(uploaderBtn.textContent, '上传');
  });
});
