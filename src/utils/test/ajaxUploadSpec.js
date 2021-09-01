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
});
