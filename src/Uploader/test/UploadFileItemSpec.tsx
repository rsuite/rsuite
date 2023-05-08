import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { render, screen, waitFor } from '@testing-library/react';
import sinon from 'sinon';
import { getDOMNode } from '@test/testUtils';
import UploadFileItem, { formatSize } from '../UploadFileItem';
import userEvent from '@testing-library/user-event';

const file = {
  fileKey: 'a',
  name: 'a',
  progress: 0,
  status: 'inited'
} as const;

describe('UploadFileItem', () => {
  it('Should output a UploadFileItem', () => {
    const instance = getDOMNode(<UploadFileItem file={file} />);
    assert.include(instance.className, 'rs-uploader-file-item');
  });

  it('Should render picture-text for layout', () => {
    const instance = getDOMNode(<UploadFileItem listType="picture-text" file={file} />);
    assert.include(instance.className, 'rs-uploader-file-item-picture-text');
    // eslint-disable-next-line testing-library/no-node-access
    assert.ok(instance.querySelector('.rs-uploader-file-item-panel'));
    // eslint-disable-next-line testing-library/no-node-access
    assert.ok(instance.querySelector('.rs-uploader-file-item-progress'));
  });

  it('Should render picture for layout', () => {
    const instance = getDOMNode(<UploadFileItem listType="picture" file={file} />);
    assert.include(instance.className, 'rs-uploader-file-item-picture');
    // eslint-disable-next-line testing-library/no-node-access
    assert.equal(instance.querySelectorAll('.rs-uploader-file-item-panel').length, 0);
    // eslint-disable-next-line testing-library/no-node-access
    assert.equal(instance.querySelectorAll('.rs-uploader-file-item-progress').length, 0);
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<UploadFileItem file={file} disabled />);
    assert.include(instance.className, 'rs-uploader-file-item-disabled');
  });

  it('Should call `onCancel` callback', () => {
    const onCancelSpy = sinon.spy();
    render(<UploadFileItem file={file} onCancel={onCancelSpy} />);

    userEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onCancelSpy).to.have.been.calledOnce;
  });

  it('Should not call `onCancel` callback when `disabled=true`', () => {
    const onCancelSpy = sinon.spy();
    const instance = getDOMNode(<UploadFileItem file={file} onCancel={onCancelSpy} disabled />);
    ReactTestUtils.Simulate.click(
      // FIXME Didn't manage to use RTL query here, possibly because RTL bug
      // https://github.com/testing-library/dom-testing-library/issues/846
      //
      // eslint-disable-next-line testing-library/no-node-access
      instance.querySelector('.rs-uploader-file-item-btn-remove') as HTMLElement
    );

    assert.equal(onCancelSpy.calledOnce, false);
  });

  it('Should not render remove button', () => {
    render(<UploadFileItem file={file} removable={false} />);

    expect(screen.queryByRole('button', { name: /close/i })).not.to.exist;
  });

  it('Should call onPreview callback', () => {
    const onPreviewSpy = sinon.spy();
    const instance = getDOMNode(
      <UploadFileItem file={file} onPreview={onPreviewSpy} listType="picture-text" />
    );
    ReactTestUtils.Simulate.click(
      // eslint-disable-next-line testing-library/no-node-access
      instance.querySelector('.rs-uploader-file-item-title') as HTMLElement
    );
    assert.ok(onPreviewSpy.calledOnce);
  });

  it('Should not call onPreview callback if `disabled=true`', () => {
    const onPreviewSpy = sinon.spy();
    const instance = getDOMNode(
      <UploadFileItem file={file} onPreview={onPreviewSpy} listType="picture-text" disabled />
    );
    ReactTestUtils.Simulate.click(
      // eslint-disable-next-line testing-library/no-node-access
      instance.querySelector('.rs-uploader-file-item-title') as HTMLElement
    );
    assert.equal(onPreviewSpy.calledOnce, false);
  });

  it('Should call onReupload callback', () => {
    const onReuploadSpy = sinon.spy();
    const instance = getDOMNode(
      <UploadFileItem file={{ ...file, status: 'error' }} onReupload={onReuploadSpy} />
    );
    ReactTestUtils.Simulate.click(
      // FIXME Add accessible name to Reload button
      // eslint-disable-next-line testing-library/no-node-access
      instance.querySelector('.rs-uploader-file-item-icon-reupload') as HTMLElement
    );
    assert.ok(onReuploadSpy.calledOnce);
  });

  it('Should not call onReupload callback', () => {
    const onReuploadSpy = sinon.spy();
    const instance = getDOMNode(
      <UploadFileItem file={{ ...file, status: 'error' }} onReupload={onReuploadSpy} disabled />
    );
    ReactTestUtils.Simulate.click(
      // FIXME Add accessible name to Reload button
      // eslint-disable-next-line testing-library/no-node-access
      instance.querySelector('.rs-uploader-file-item-icon-reupload') as HTMLElement
    );
    assert.equal(onReuploadSpy.calledOnce, false);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<UploadFileItem file={file} className="custom" />);
    assert.include(instance.className, 'custom');
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

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<UploadFileItem file={file} style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<UploadFileItem file={file} classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should render an <i> tag, when the file status is uploading', () => {
    const instance = getDOMNode(<UploadFileItem file={{ ...file, status: 'uploading' }} />);
    const instance2 = getDOMNode(<UploadFileItem file={{ ...file, status: 'inited' }} />);

    assert.equal(
      // eslint-disable-next-line testing-library/no-node-access
      (instance.querySelector('.rs-uploader-file-item-icon') as HTMLElement).tagName,
      'I'
    );
    assert.equal(
      // eslint-disable-next-line testing-library/no-node-access
      (instance2.querySelector('.rs-uploader-file-item-icon') as HTMLElement).tagName,
      'svg'
    );
  });

  it('Should render an <i> tag, when the file status is uploading', () => {
    const file = { blobFile: new File(['foo'], 'foo.txt'), status: 'finished' } as const;
    const instance = getDOMNode(<UploadFileItem file={file} />);
    assert.equal(
      // eslint-disable-next-line testing-library/no-node-access
      (instance.querySelector('.rs-uploader-file-item-size') as HTMLElement).textContent,
      '3B'
    );
  });

  it('Should not render a default thumbnail', () => {
    const instance = getDOMNode(<UploadFileItem file={file} listType="text" />);
    // eslint-disable-next-line testing-library/no-node-access
    const thumbnail = instance.querySelector('.rs-uploader-file-item-preview');
    assert.isNull(thumbnail);
  });

  it('Should render a default thumbnail when listType="picture-text" ', () => {
    const instance = getDOMNode(<UploadFileItem file={file} listType="picture-text" />);
    // eslint-disable-next-line testing-library/no-node-access
    const thumbnail = instance.querySelector(
      '.rs-uploader-file-item-preview .rs-uploader-file-item-icon'
    );
    assert.isNotNull(thumbnail);
  });

  it('Should render a default thumbnail when listType="picture"', () => {
    const instance = getDOMNode(<UploadFileItem file={file} listType="picture" />);
    // eslint-disable-next-line testing-library/no-node-access
    const thumbnail = instance.querySelector(
      '.rs-uploader-file-item-preview .rs-uploader-file-item-icon'
    );
    assert.isNotNull(thumbnail);
  });

  it('Should render a custom thumbnail', () => {
    const instance = getDOMNode(
      <UploadFileItem
        file={file}
        listType="picture-text"
        renderThumbnail={() => {
          return <span>custom-thumbnail</span>;
        }}
      />
    );
    // eslint-disable-next-line testing-library/no-node-access
    const thumbnail = instance.querySelector('.rs-uploader-file-item-preview') as HTMLElement;

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

    const instance = getDOMNode(<UploadFileItem file={file} listType="picture-text" />);

    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-node-access
      const thumbnail = instance.querySelector(
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
