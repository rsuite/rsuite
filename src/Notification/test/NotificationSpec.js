import Notification from '../Notification';
import ReactTestUtils from 'react-dom/test-utils';

const notification = new Notification();

const element = document.createElement('div');
document.body.appendChild(element);

notification.setProps({
  getContainer: () => {
    return element;
  }
});

describe('Notification', () => {
  it('Should open a notification', () => {
    notification.open({ title: 'title', description: 'description' });
    const instance = document.body.querySelector('.rs-notification');
    assert.equal(instance.querySelector('.rs-notification-title').innerText, 'title');
    assert.equal(instance.querySelector('.rs-notification-description').innerText, 'description');
  });

  it('Should be rendered at the bottom end', () => {
    notification.open({ title: 'title', description: 'description', placement: 'bottomEnd' });
    const instance = document.body.querySelector('.rs-notification-top-end');
    assert.ok(instance);
  });

  it('Should be rendered in the container', () => {
    notification.open({
      title: 'title',
      description: 'description',
      placement: 'bottomRight'
    });
    const instance = element.querySelector('.rs-notification');
    assert.ok(instance);
  });

  it('Should call onClose callback', done => {
    notification.open({
      title: 'title',
      description: 'description',
      placement: 'topRight',
      className: 'test-onclose',
      onClose: () => {
        done();
      }
    });

    const instance = element.querySelector('.test-onclose .rs-notification-item-close');
    ReactTestUtils.Simulate.click(instance);
  });
});
