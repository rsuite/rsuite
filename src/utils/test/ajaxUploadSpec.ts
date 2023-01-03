import sinon from 'sinon';
import ajaxUpload from '../ajaxUpload';

afterEach(() => {
  sinon.restore();
});

describe('[utils] ajaxUpload', () => {
  it('Should upload a FormData', () => {
    const file = new File(['foo'], 'foo.txt');
    const { data } = ajaxUpload({ name: 'file', file, url: '' });

    assert.ok(data instanceof FormData);
  });

  it('Should upload a File', () => {
    const file = new File(['foo'], 'foo.txt');
    const { data } = ajaxUpload({ name: 'file', file, url: '', disableMultipart: true });

    assert.ok(data instanceof File);
  });

  it('Should add data to FormData', () => {
    const file = new File(['foo'], 'foo.txt');
    const { data } = ajaxUpload({
      name: 'file',
      file,
      url: '',
      data: { name: 'myfile' },
      headers: { name: 'my-header' }
    });
    // TODO Make ajaxUpload returned type determinated
    assert.equal((data as FormData).get('name'), 'myfile');
  });

  it('Should be withCredentials', () => {
    const file = new File(['foo'], 'foo.txt');
    const { xhr } = ajaxUpload({
      name: 'file',
      file,
      url: '',
      withCredentials: true,
      data: { name: 'myfile' }
    });
    assert.ok(xhr.withCredentials);
  });

  it('Should time out', () => {
    sinon.useFakeXMLHttpRequest();
    const onError = sinon.spy();
    const clock = sinon.useFakeTimers();
    const file = new File(['foo'], 'foo.txt');
    ajaxUpload({
      name: 'file',
      file,
      url: '',
      timeout: 1,
      onError
    });
    clock.tick(1000);

    expect(onError).to.have.been.calledWithMatch({ type: 'timeout' });
  });
});
