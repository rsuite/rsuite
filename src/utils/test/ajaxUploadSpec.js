import ajaxUpload from '../ajaxUpload';

describe('[utils] ajaxUpload', () => {
  it('Should upload a FormData', () => {
    const file = new File(['foo'], 'foo.txt');
    const { data } = ajaxUpload({ file, url: '' });

    assert.ok(data instanceof FormData);
  });

  it('Should upload a File', () => {
    const file = new File(['foo'], 'foo.txt');
    const { data } = ajaxUpload({ file, url: '', disableMultipart: true });

    assert.ok(data instanceof File);
  });

  it('Should add data to FormData', () => {
    const file = new File(['foo'], 'foo.txt');
    const { data } = ajaxUpload({
      file,
      url: '',
      data: { name: 'myfile' },
      headers: { name: 'my-header' }
    });
    assert.equal(data.get('name'), 'myfile');
  });

  it('Should be withCredentials', () => {
    const file = new File(['foo'], 'foo.txt');
    const { xhr } = ajaxUpload({
      file,
      url: '',
      withCredentials: true,
      data: { name: 'myfile' }
    });
    assert.ok(xhr.withCredentials);
  });

  it('Should time out', done => {
    const file = new File(['foo'], 'foo.txt');
    ajaxUpload({
      file,
      url: '',
      timeout: 1,
      onError: e => {
        if ((e.type = 'timeout')) {
          done();
        }
      }
    });
  });
});
