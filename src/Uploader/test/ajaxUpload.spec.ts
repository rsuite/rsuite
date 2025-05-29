import ajaxUpload from '../utils/ajaxUpload';
import { describe, expect, it, vi } from 'vitest';

describe('Uploader/utils/ajaxUpload', () => {
  it('Should upload a FormData', () => {
    const file = new File(['foo'], 'foo.txt');
    const { data } = ajaxUpload({ name: 'file', file, url: '' });

    expect(data).to.be.instanceOf(FormData);
  });

  it('Should upload a File', () => {
    const file = new File(['foo'], 'foo.txt');
    const { data } = ajaxUpload({ name: 'file', file, url: '', disableMultipart: true });

    expect(data).to.be.instanceOf(File);
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
    expect((data as FormData).get('name')).to.equal('myfile');
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
    expect(xhr.withCredentials).to.be.true;
  });

  it('Should time out', () => {
    const onError = vi.fn();

    // Mock XMLHttpRequest
    const originalXMLHttpRequest = window.XMLHttpRequest;
    const xhrMock = {
      open: vi.fn(),
      send: vi.fn().mockImplementation(function (this: XMLHttpRequest) {
        (this as any).ontimeout(new Event('timeout'));
      }),
      upload: {},
      readyState: 4,
      status: 0,
      withCredentials: false,
      setRequestHeader: vi.fn(),
      timeout: 0,
      ontimeout: null
    };

    window.XMLHttpRequest = vi.fn(() => xhrMock) as any;

    vi.useFakeTimers();

    const file = new File(['foo'], 'foo.txt');
    ajaxUpload({
      name: 'file',
      file,
      url: '',
      timeout: 1,
      onError
    });

    // Trigger timeout
    vi.advanceTimersByTime(1000);

    // Verify the error callback was called with timeout error
    expect(onError).toHaveBeenCalled();
    const errorArg = onError.mock.calls[0][0];
    expect(errorArg).toHaveProperty('type', 'timeout');

    // Cleanup
    vi.useRealTimers();
    window.XMLHttpRequest = originalXMLHttpRequest;
  });
});
