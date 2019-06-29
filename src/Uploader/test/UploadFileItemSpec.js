import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode, getInstance } from '@test/testUtils';
import UploadFileItem from '../UploadFileItem';

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
    const instance = getInstance(<UploadFileItem listType="picture-text" file={file} />);
    assert.include(getDOMNode(instance).className, 'rs-uploader-file-item-picture-text');
    assert.ok(
      ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'rs-uploader-file-item-panel')
    );
    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'rs-uploader-file-item-progress')
    );
  });

  it('Should render picture for layout', () => {
    const instance = getInstance(<UploadFileItem listType="picture" file={file} />);
    assert.include(getDOMNode(instance).className, 'rs-uploader-file-item-picture');
    assert.equal(
      ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'rs-uploader-file-item-panel')
        .length,
      0
    );
    assert.equal(
      ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'rs-uploader-file-item-progress')
        .length,
      0
    );
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<UploadFileItem file={file} disabled />);
    assert.include(instance.className, 'rs-uploader-file-item-disabled');
  });

  it('Should call onCancel callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<UploadFileItem file={file} onCancel={doneOp} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-uploader-file-item-btn-remove'));
  });

  it('Should not render remove button', () => {
    const instance = getDOMNode(<UploadFileItem file={file} removable={false} />);
    assert.ok(!instance.querySelector('.rs-uploader-file-item-btn-remove'));
  });

  it('Should call onPreview callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <UploadFileItem file={file} onPreview={doneOp} listType="picture-text" />
    );
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-uploader-file-item-title'));
  });

  it('Should call onReupload callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <UploadFileItem
        file={{
          ...file,
          status: 'error'
        }}
        onReupload={doneOp}
      />
    );
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-uploader-file-item-icon-reupload'));
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
});
