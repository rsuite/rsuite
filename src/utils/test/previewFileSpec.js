import previewFile from '../previewFile';

describe('[utils] previewFile', () => {
  it('Should output image base64 string', done => {
    const file = new File(['10'], 'image.png', {
      type: 'image/png'
    });

    previewFile(file, result => {
      if (result === 'data:image/png;base64,MTA=') {
        done();
      }
    });
  });

  it('Should output null if file is not an image', done => {
    const file = new File(['10'], 'image.png', {
      type: 'text/plain'
    });

    previewFile(file, result => {
      try {
        assert.isNull(result);
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
