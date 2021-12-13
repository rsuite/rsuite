import React from 'react';
import { screen } from '@testing-library/react';
import toaster from '../toaster';

const element = document.createElement('div');
document.body.appendChild(element);

afterEach(() => {
  sinon.restore();
});

describe('toaster', () => {
  it('Should push a message', () => {
    toaster.push(<div id="msg-1">abc</div>, {
      container: element
    });

    const message = element.querySelector('#msg-1');
    assert.include(message.className, 'rs-toast-fade-entered');
    assert.equal(message.textContent, 'abc');
  });

  it('Should render 2 containers', () => {
    toaster.push(<div id="msg-1">topEnd</div>, {
      container: element,
      placement: 'topEnd'
    });
    toaster.push(<div id="msg-2">bottomEnd</div>, {
      container: element,
      placement: 'bottomEnd'
    });

    assert.ok(element.querySelector('.rs-toast-container.rs-toast-container-top-end'));
    assert.ok(element.querySelector('.rs-toast-container.rs-toast-container-bottom-end'));
  });

  it('Should remove a message', () => {
    const clock = sinon.useFakeTimers();

    const key = toaster.push(
      <div id="msg-2" data-testid="message">
        abc
      </div>,
      {
        container: element
      }
    );

    const message = element.querySelector('#msg-2');
    assert.include(message.className, 'rs-toast-fade-entered');

    toaster.remove(key);
    assert.include(element.querySelector('#msg-2').className, 'rs-toast-fade-exiting');

    clock.tick(400);
    expect(screen.queryByTestId('message')).not.to.exist;
  });

  it('Should clear all message', () => {
    const clock = sinon.useFakeTimers();
    toaster.push(
      <div className="message" data-testid="message">
        123
      </div>,
      {
        container: element
      }
    );

    toaster.push(
      <div className="message" data-testid="message">
        456
      </div>,
      {
        container: element
      }
    );

    assert.equal(element.querySelectorAll('.message').length, 2);
    toaster.clear();
    assert.equal(element.querySelectorAll('.message.rs-toast-fade-exiting').length, 2);

    clock.tick(400);
    expect(screen.queryByTestId('message')).not.to.exist;
  });
});
