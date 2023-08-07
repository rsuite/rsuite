import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { render, screen, waitFor } from '@testing-library/react';
import sinon from 'sinon';
import UploadFileItem, { formatSize } from '../UploadFileItem';
import userEvent from '@testing-library/user-event';
import { testStandardProps } from '@test/commonCases';

const file = {
  fileKey: 'a',
  name: 'a',
  progress: 0,
  status: 'inited'
} as const;

describe('UploadFileItem', () => {
  testStandardProps(<UploadFileItem file={file} />);
  it('Should output a UploadFileItem', () => {
    const { container } = render(<UploadFileItem file={file} />);
    expect(container.firstChild).to.have.class('rs-uploader-file-item');
  });

  it('Should render picture-text for layout', () => {
    const { container } = render(<UploadFileItem listType="picture-text" file={file} />);
    expect(container.firstChild).to.have.class('rs-uploader-file-item-picture-text');
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    assert.ok(container.querySelector('.rs-uploader-file-item-panel'));
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    assert.ok(container.querySelector('.rs-uploader-file-item-progress'));
  });

  it('Should render picture for layout', () => {
    const { container } = render(<UploadFileItem listType="picture" file={file} />);
    expect(container.firstChild).to.have.class('rs-uploader-file-item-picture');
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    assert.equal(container.querySelectorAll('.rs-uploader-file-item-panel').length, 0);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    assert.equal(container.querySelectorAll('.rs-uploader-file-item-progress').length, 0);
  });

  it('Should be disabled', () => {
    const { container } = render(<UploadFileItem file={file} disabled />);
    expect(container.firstChild).to.have.class('rs-uploader-file-item-disabled');
  });

  it('Should call `onCancel` callback', async () => {

                    const user = userEvent.setup();
                    const onCancelSpy = sinon.spy();
          render(<UploadFileItem file={file} onCancel={onCancelSpy} />);

          await user.click(screen.getByRole('button', { name: /close/i }));
          expect(onCancelSpy).to.have.been.calledOnce;
                    
  });

  it('Should not call `onCancel` callback when `disabled=true`', () => {
    const onCancelSpy = sinon.spy();
    const { container } = render(<UploadFileItem file={file} onCancel={onCancelSpy} disabled />);
    ReactTestUtils.Simulate.click(
      // FIXME Didn't manage to use RTL query here, possibly because RTL bug
      // https://github.com/testing-library/dom-testing-library/issues/846
      //
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector('.rs-uploader-file-item-btn-remove') as HTMLElement
    );

    assert.equal(onCancelSpy.calledOnce, false);
  });

  it('Should not render remove button', () => {
    render(<UploadFileItem file={file} removable={false} />);

    expect(screen.queryByRole('button', { name: /close/i })).not.to.exist;
  });

  it('Should call onPreview callback', () => {
    const onPreviewSpy = sinon.spy();
    const { container } = render(
      <UploadFileItem file={file} onPreview={onPreviewSpy} listType="picture-text" />
    );
    ReactTestUtils.Simulate.click(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector('.rs-uploader-file-item-title') as HTMLElement
    );
    assert.ok(onPreviewSpy.calledOnce);
  });

  it('Should not call onPreview callback if `disabled=true`', () => {
    const onPreviewSpy = sinon.spy();
    const { container } = render(
      <UploadFileItem file={file} onPreview={onPreviewSpy} listType="picture-text" disabled />
    );
    ReactTestUtils.Simulate.click(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector('.rs-uploader-file-item-title') as HTMLElement
    );
    assert.equal(onPreviewSpy.calledOnce, false);
  });

  it('Should call onReupload callback', () => {
    const onReuploadSpy = sinon.spy();
    const { container } = render(
      <UploadFileItem file={{ ...file, status: 'error' }} onReupload={onReuploadSpy} />
    );
    ReactTestUtils.Simulate.click(
      // FIXME Add accessible name to Reload button
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector('.rs-uploader-file-item-icon-reupload') as HTMLElement
    );
    assert.ok(onReuploadSpy.calledOnce);
  });

  it('Should not call onReupload callback', () => {
    const onReuploadSpy = sinon.spy();
    const { container } = render(
      <UploadFileItem file={{ ...file, status: 'error' }} onReupload={onReuploadSpy} disabled />
    );
    ReactTestUtils.Simulate.click(
      // FIXME Add accessible name to Reload button
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector('.rs-uploader-file-item-icon-reupload') as HTMLElement
    );
    assert.equal(onReuploadSpy.calledOnce, false);
  });

  it('Should output a custom file name', () => {
    render(
      <UploadFileItem
        file={file}
        className="custom"
        renderFileInfo={file => {
          return (
            <div className="file-info" data-testid="custom-info">
              {file.name}
            </div>
          );
        }}
      />
    );

    expect(screen.getByTestId('custom-info')).to.exist;
  });

  it('Should render an <i> tag, when the file status is uploading', () => {
    const { container, rerender } = render(
      <UploadFileItem file={{ ...file, status: 'uploading' }} />
    );

    assert.equal(
      // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
      (container.querySelector('.rs-uploader-file-item-icon') as HTMLElement).tagName,
      'I'
    );

    rerender(<UploadFileItem file={{ ...file, status: 'inited' }} />);

    assert.equal(
      // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
      (container.querySelector('.rs-uploader-file-item-icon') as HTMLElement).tagName,
      'svg'
    );
  });

  it('Should render an <i> tag, when the file status is uploading', () => {
    const file = { blobFile: new File(['foo'], 'foo.txt'), status: 'finished' } as const;
    const { container } = render(<UploadFileItem file={file} />);
    assert.equal(
      // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
      (container.querySelector('.rs-uploader-file-item-size') as HTMLElement).textContent,
      '3B'
    );
  });

  it('Should not render a default thumbnail', () => {
    const { container } = render(<UploadFileItem file={file} listType="text" />);
    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    const thumbnail = container.querySelector('.rs-uploader-file-item-preview');
    assert.isNull(thumbnail);
  });

  it('Should render a default thumbnail when listType="picture-text" ', () => {
    const { container } = render(<UploadFileItem file={file} listType="picture-text" />);
    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    const thumbnail = container.querySelector(
      '.rs-uploader-file-item-preview .rs-uploader-file-item-icon'
    );
    assert.isNotNull(thumbnail);
  });

  it('Should render a default thumbnail when listType="picture"', () => {
    const { container } = render(<UploadFileItem file={file} listType="picture" />);
    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    const thumbnail = container.querySelector(
      '.rs-uploader-file-item-preview .rs-uploader-file-item-icon'
    );
    assert.isNotNull(thumbnail);
  });

  it('Should render a custom thumbnail', () => {
    const { container } = render(
      <UploadFileItem
        file={file}
        listType="picture-text"
        renderThumbnail={() => {
          return <span>custom-thumbnail</span>;
        }}
      />
    );
    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    const thumbnail = container.querySelector('.rs-uploader-file-item-preview') as HTMLElement;

    assert.include(thumbnail.textContent, 'custom-thumbnail');
  });

  it('Should render a thumbnail previewing the image to upload', async () => {
    const file = {
      name: 'image.png',
      fileKey: 1,
      blobFile: new File(['10'], 'image.png', {
        type: 'image/png'
      })
    };

    const { container } = render(<UploadFileItem file={file} listType="picture-text" />);

    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
      const thumbnail = container.querySelector(
        '.rs-uploader-file-item-preview img'
      ) as HTMLImageElement;
      assert.equal(thumbnail.src, 'data:image/png;base64,MTA=');
    });
  });
});

describe('UploadFileItem - formatSize', () => {
  it('Should be formatted to file size unit', () => {
    assert.equal(formatSize(1024), '1024B');
    assert.equal(formatSize(1024 + 1), '1.00KB');
    assert.equal(formatSize(1024 * 1024), '1024.00KB');
    assert.equal(formatSize(1024 * 1024 + 1), '1.00MB');
    assert.equal(formatSize(1024 * 1024 * 1024), '1024.00MB');
    assert.equal(formatSize(1024 * 1024 * 1024 + 1), '1.00GB');
    assert.equal(formatSize(1024 * 1024 * 1024 * 1024), '1024.00GB');
    assert.equal(formatSize(1024 * 1024 * 1024 * 1024 + 1), '1024.00GB');
  });
});
