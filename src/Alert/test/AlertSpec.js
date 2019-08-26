import Alert from '../Alert';
import ReactTestUtils from 'react-dom/test-utils';

const alert = new Alert();
const element = document.createElement('div');
document.body.appendChild(element);

alert.setProps({
  getContainer: () => {
    return element;
  }
});

describe('Notification', () => {
  it('Should open a alert', () => {
    alert.open('info', 'message');
    const instance = document.body.querySelector('.rs-alert');
    assert.equal(instance.querySelector('.rs-alert-item-content').innerText, 'message');
    assert.ok(instance.querySelector('.rs-alert-info'));
  });

  it('Should be rendered in the container', () => {
    alert.open('info', 'message');
    const instance = element.querySelector('.rs-alert');
    assert.ok(instance);
  });

  it('Should call onClose callback', done => {
    alert.open('info', 'message', null, () => {
      done();
    });

    const instance = document.body.querySelectorAll('.rs-alert-item-close')[2];
    ReactTestUtils.Simulate.click(instance);
  });

  it('Should open a error message', () => {
    alert.open('error', 'message');
    const instance = element.querySelector('.rs-alert-error');
    assert.ok(instance);
  });
});
