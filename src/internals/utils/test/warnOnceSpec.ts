import sinon from 'sinon';
import warnOnce from '../warnOnce';

describe('internals/utils/warnOnce', () => {
  it('Should log a warning message', () => {
    const message = 'Useful message';
    sinon.spy(console, 'warn');

    warnOnce(message);

    expect(console.warn).to.have.been.calledWith(message);
  });

  it('Should log the same message only once', () => {
    const message = 'Repeated message';
    sinon.spy(console, 'warn');

    warnOnce(message);
    warnOnce(message);

    expect(console.warn).to.have.been.calledOnce;
  });

  it('Should be able to log a same message after resetting', () => {
    const message = 'Repeated message';
    sinon.spy(console, 'warn');

    warnOnce(message);
    warnOnce._resetWarned();
    warnOnce(message);

    expect(console.warn).to.have.been.calledTwice;
  });
});
