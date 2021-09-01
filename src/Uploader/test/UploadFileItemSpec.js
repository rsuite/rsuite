import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import UploadFileItem, { formatSize } from '../UploadFileItem';

let file = {
  fileKey: 'a',
  name: 'a',
  progress: 0,
  status: 'inited'
};

describe('UploadFileItem', () => {
  it('Should output a UploadFileItem', () => {
    const instance = getDOMNode(<UploadFileItem file={file} />);
    assert.include(instance.className, 'rs-uploader-file-item');
  });

  it('Should render picture-text for layout', () => {
    const instance = getDOMNode(<UploadFileItem listType="picture-text" file={file} />);
    assert.include(instance.className, 'rs-uploader-file-item-picture-text');
    assert.ok(instance.querySelector('.rs-uploader-file-item-panel'));
    assert.ok(instance.querySelector('.rs-uploader-file-item-progress'));
  });

  it('Should render picture for layout', () => {
    const instance = getDOMNode(<UploadFileItem listType="picture" file={file} />);
    assert.include(instance.className, 'rs-uploader-file-item-picture');
    assert.equal(instance.querySelectorAll('.rs-uploader-file-item-panel').length, 0);
    assert.equal(instance.querySelectorAll('.rs-uploader-file-item-progress').length, 0);
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<UploadFileItem file={file} disabled />);
    assert.include(instance.className, 'rs-uploader-file-item-disabled');
  });

  it('Should call `onCancel` callback', () => {
    const onCancelSpy = sinon.spy();
    const instance = getDOMNode(<UploadFileItem file={file} onCancel={onCancelSpy} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-uploader-file-item-btn-remove'));

    assert.ok(onCancelSpy.calledOnce);
  });

  it('Should not call `onCancel` callback', () => {
    const onCancelSpy = sinon.spy();
    const instance = getDOMNode(<UploadFileItem file={file} onCancel={onCancelSpy} disabled />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-uploader-file-item-btn-remove'));

    assert.equal(onCancelSpy.calledOnce, false);
  });

  it('Should not render remove button', () => {
    const instance = getDOMNode(<UploadFileItem file={file} removable={false} />);
    assert.ok(!instance.querySelector('.rs-uploader-file-item-btn-remove'));
  });

  it('Should call onPreview callback', () => {
    const onPreviewSpy = sinon.spy();
    const instance = getDOMNode(
      <UploadFileItem file={file} onPreview={onPreviewSpy} listType="picture-text" />
    );
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-uploader-file-item-title'));
    assert.ok(onPreviewSpy.calledOnce);
  });

  it('Should not call onPreview callback', () => {
    const onPreviewSpy = sinon.spy();
    const instance = getDOMNode(
      <UploadFileItem file={file} onPreview={onPreviewSpy} listType="picture-text" disabled />
    );
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-uploader-file-item-title'));
    assert.equal(onPreviewSpy.calledOnce, false);
  });

  it('Should call onReupload callback', () => {
    const onReuploadSpy = sinon.spy();
    const instance = getDOMNode(
      <UploadFileItem file={{ ...file, status: 'error' }} onReupload={onReuploadSpy} />
    );
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-uploader-file-item-icon-reupload'));
    assert.ok(onReuploadSpy.calledOnce);
  });

  it('Should not call onReupload callback', () => {
    const onReuploadSpy = sinon.spy();
    const instance = getDOMNode(
      <UploadFileItem file={{ ...file, status: 'error' }} onReupload={onReuploadSpy} disabled />
    );
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-uploader-file-item-icon-reupload'));
    assert.equal(onReuploadSpy.calledOnce, false);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<UploadFileItem file={file} className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should output a custom file name', () => {
    const instance = getDOMNode(
      <UploadFileItem
        file={file}
        className="custom"
        renderFileInfo={file => {
          return <div className="file-info">{file.name}</div>;
        }}
      />
    );
    assert.include(instance.querySelector('.file-info').innerText, 'a');
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

    assert.equal(instance.querySelector('.rs-uploader-file-item-icon').tagName, 'I');
    assert.equal(instance2.querySelector('.rs-uploader-file-item-icon').tagName, 'svg');
  });

  it('Should render an <i> tag, when the file status is uploading', () => {
    const file = { blobFile: new File(['foo'], 'foo.txt'), status: 'finished' };
    const instance = getDOMNode(<UploadFileItem file={file} />);
    assert.equal(instance.querySelector('.rs-uploader-file-item-size').innerText, '3B');
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
