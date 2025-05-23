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

  it('Should render 1 container', async () => {
    await toaster.push(<div>topEnd1</div>, {
      container: element,
      placement: 'topEnd'
    });
    await toaster.push(<div>topEnd2</div>, {
      container: element,
      placement: 'topEnd'
    });

    await waitFor(() => {
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        element.querySelectorAll('.rs-toast-container.rs-toast-container-top-end')
      ).to.have.length(1);
    });
  });

  it('Should render 2 containers', async () => {
    await toaster.push(<div>topEnd</div>, {
      container: element,
      placement: 'topEnd'
    });

    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-node-access
      expect(element.querySelector('.rs-toast-container.rs-toast-container-top-end')).to.exist;
    });

    await toaster.push(<div>bottomEnd</div>, {
      container: element,
      placement: 'bottomEnd'
    });

    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-node-access
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

  it('should display all notifications in a single container when pushed rapidly', async () => {
    const messages = [
      { id: 'msg-rapid-1', content: 'Rapid Message 1' },
      { id: 'msg-rapid-2', content: 'Rapid Message 2' },
      { id: 'msg-rapid-3', content: 'Rapid Message 3' }
    ];
    const placement = 'topStart'; // Use a specific placement for this test

    // Act: Push messages in a loop
    const pushPromises = messages.map(msg =>
      toaster.push(
        <div data-testid={msg.id} className="rs-notification">
          {msg.content}
        </div>,
        { placement, duration: 0 } // duration 0 to prevent auto-close
      )
    );
    await Promise.all(pushPromises);

    // Assert: Single container for the specified placement
    const containerSelector = `.rs-toast-container.rs-toast-container-${placement}`;
    let host: Element | null = null;

    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-node-access
      const containers = document.querySelectorAll(containerSelector);
      expect(containers.length).to.equal(1, `Expected 1 container for placement ${placement}, found ${containers.length}`);
      // eslint-disable-next-line testing-library/no-node-access
      host = document.querySelector(containerSelector);
      expect(host).to.exist;
    });

    // Ensure host is not null before proceeding, to satisfy TypeScript and prevent runtime errors
    if (!host) {
      throw new Error(`Container with selector ${containerSelector} not found after waitFor.`);
    }

    // Assert: All notifications within that single container
    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-node-access
      const notificationElements = host!.querySelectorAll('.rs-notification');
      expect(notificationElements.length).to.equal(
        messages.length,
        'Number of notifications does not match pushed messages'
      );

      // Check content of each notification
      messages.forEach(msg => {
        expect(screen.getByTestId(msg.id).textContent).to.equal(msg.content);
        // eslint-disable-next-line testing-library/no-node-access
        expect(host!.contains(screen.getByTestId(msg.id))).to.be.true;
      });
    });

    // Cleanup is handled by afterEach, but an explicit clear can be added if necessary.
    // toaster.clear();
    // await waitFor(() => {
    //   // eslint-disable-next-line testing-library/no-node-access
    //   expect(host!.querySelectorAll('.rs-notification').length).to.equal(0);
    // });
  });
});
