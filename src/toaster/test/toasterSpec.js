import React, { useEffect } from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import toaster from '../toaster';

const element = document.createElement('div');
document.body.appendChild(element);

afterEach(() => {
  sinon.restore();
});

describe('toaster', () => {
  it('Should push a message', async () => {
    toaster.push(<div data-testid="msg-1">abc</div>);

    await waitFor(() => {
      const message = screen.queryByTestId('msg-1');
      expect(message.className).to.include('rs-toast-fade-entered');
      expect(message.textContent).to.equal('abc');
    });
  });

  it('Should render 2 containers', async () => {
    toaster.push(<div>topEnd</div>, {
      container: element,
      placement: 'topEnd'
    });

    await waitFor(() => {
      expect(element.querySelector('.rs-toast-container.rs-toast-container-top-end')).to.exist;
    });

    toaster.push(<div>bottomEnd</div>, {
      container: element,
      placement: 'bottomEnd'
    });

    await waitFor(() => {
      expect(element.querySelector('.rs-toast-container.rs-toast-container-bottom-end')).to.exist;
    });
  });

  it('Should remove a message', async () => {
    const key = await toaster.push(<div data-testid="message">abc</div>, {
      container: element
    });

    await waitFor(() => {
      const message = screen.queryByTestId('message');
      expect(message.className).to.contain('rs-toast-fade-entered');
    });

    toaster.remove(key);

    await waitFor(() => {
      expect(screen.queryByTestId('message').className).to.contain('rs-toast-fade-exiting');
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
      expect(screen.queryByTestId('message1').className).to.contain('rs-toast-fade-exiting');
      expect(screen.queryByTestId('message2').className).to.contain('rs-toast-fade-exiting');
    });

    await waitFor(
      () => {
        expect(screen.queryByTestId('message1')).not.to.exist;
        expect(screen.queryByTestId('message2')).not.to.exist;
      },
      { timeout: 500 }
    );
  });

  it('Should not throw errors when push() is called via useEffect', () => {
    function MyComponent() {
      useEffect(() => {
        toaster.push(<div>Hi toaster!</div>);
      }, []);

      return <div>My component</div>;
    }

    expect(() => render(<MyComponent />)).not.to.throw();
    expect(screen.getByText('Hi toaster!')).to.exist;
  });
});
