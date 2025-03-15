import React, { useEffect } from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import sinon from 'sinon';
import toaster from '../toaster';

const element = document.createElement('div');
document.body.appendChild(element);

afterEach(() => {
  sinon.restore();
});

describe('toaster', () => {
  it('Should push a message', async () => {
    await toaster.push(<div data-testid="msg-1">abc</div>);

    await waitFor(() => {
      const message = screen.queryByTestId('msg-1') as HTMLElement;
      expect(message.className).to.include('rs-toast-fade-entered');
      expect(message.textContent).to.equal('abc');
    });
  });

  it('Should render 2 messages in the same container', async () => {
    await toaster.push(<div>Message1</div>, {
      container: element,
      placement: 'topEnd'
    });
    await toaster.push(<div>Message2</div>, {
      container: element,
      placement: 'topEnd'
    });

    await waitFor(() => {
      expect(element.querySelector('.rs-toast-container')).to.have.class(
        'rs-toast-container-top-end'
      );
      expect(screen.getByText('Message1')?.parentNode).to.equal(
        screen.getByText('Message2')?.parentNode
      );
    });
  });

  it('Should render 2 containers', async () => {
    await toaster.push(<div>topEnd</div>, {
      container: element,
      placement: 'topEnd'
    });

    await waitFor(() => {
      expect(element.querySelector('.rs-toast-container.rs-toast-container-top-end')).to.exist;
    });

    await toaster.push(<div>bottomEnd</div>, {
      container: element,
      placement: 'bottomEnd'
    });

    await waitFor(() => {
      expect(element.querySelector('.rs-toast-container.rs-toast-container-bottom-end')).to.exist;
    });
  });

  it('Should remove a message', async () => {
    const key = (await toaster.push(<div data-testid="message">abc</div>, {
      container: element
    })) as string;

    await waitFor(() => {
      const message = screen.queryByTestId('message') as HTMLElement;
      expect(message.className).to.contain('rs-toast-fade-entered');
    });

    toaster.remove(key);

    await waitFor(() => {
      expect((screen.queryByTestId('message') as HTMLElement).className).to.contain(
        'rs-toast-fade-exiting'
      );
    });

    await waitFor(
      () => {
        expect(screen.queryByTestId('message')).not.to.exist;
      },
      { timeout: 500 }
    );
  });

  it('Should clear all message', async () => {
    await toaster.push(
      <div className="message" data-testid="message1">
        123
      </div>
    );

    await toaster.push(
      <div className="message" data-testid="message2">
        456
      </div>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('message1')).to.exist;
      expect(screen.queryByTestId('message2')).to.exist;
    });

    toaster.clear();
    await waitFor(() => {
      expect((screen.queryByTestId('message1') as HTMLElement).className).to.contain(
        'rs-toast-fade-exiting'
      );
      expect((screen.queryByTestId('message2') as HTMLElement).className).to.contain(
        'rs-toast-fade-exiting'
      );
    });

    await waitFor(
      () => {
        expect(screen.queryByTestId('message1')).not.to.exist;
        expect(screen.queryByTestId('message2')).not.to.exist;
      },
      { timeout: 500 }
    );
  });

  it('Should not throw errors when push() is called via useEffect', async () => {
    function MyComponent() {
      useEffect(() => {
        toaster.push(<div>Hi toaster!</div>);
      }, []);

      return <div>My component</div>;
    }

    expect(() => render(<MyComponent />)).not.to.throw();
    await waitFor(() => expect(screen.getByText('Hi toaster!')).to.exist);
  });
});
