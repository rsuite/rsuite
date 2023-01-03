import { waitFor } from '@testing-library/react';
import Sinon from 'sinon';
import previewFile from '../previewFile';

describe('[utils] previewFile', () => {
  it('Should output image base64 string', async () => {
    const file = new File(['10'], 'image.png', {
      type: 'image/png'
    });

    const callback = Sinon.spy();

    previewFile(file, callback);

    await waitFor(() => {
      expect(callback).to.have.been.calledWith('data:image/png;base64,MTA=');
    });
  });

  it('Should output null if file is not an image', () => {
    const file = new File(['10'], 'image.png', {
      type: 'text/plain'
    });

    const callback = Sinon.spy();

    previewFile(file, callback);

    expect(callback).to.have.been.calledWith(null);
  });
});
