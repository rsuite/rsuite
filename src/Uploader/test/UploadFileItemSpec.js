import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import UploadFileItem from '../src/UploadFileItem';

let file = {
  fileKey: 'a',
  name: 'a',
  progress: 0,
  status: 'inited'
};

describe('UploadFileItem', () => {
  it('Should output a UploadFileItem', () => {
    const instance = ReactTestUtils.renderIntoDocument(<UploadFileItem file={file} />);
    assert.include(findDOMNode(instance).className, 'rs-uploader-file-item');
  });

  it('Should render picture-text for layout', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <UploadFileItem listType="picture-text" file={file} />
    );
    assert.include(findDOMNode(instance).className, 'rs-uploader-file-item-picture-text');
    assert.ok(
      ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'rs-uploader-file-item-panel')
    );
    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'rs-uploader-file-item-progress')
    );
  });

  it('Should render picture for layout', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <UploadFileItem listType="picture" file={file} />
    );
    assert.include(findDOMNode(instance).className, 'rs-uploader-file-item-picture');
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
    const instance = ReactTestUtils.renderIntoDocument(<UploadFileItem file={file} disabled />);
    assert.include(findDOMNode(instance).className, 'rs-uploader-file-item-disabled');
  });

  it('Should call onCancel callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <UploadFileItem file={file} onCancel={doneOp} />
    );
    ReactTestUtils.Simulate.click(
      findDOMNode(instance).querySelector('.rs-uploader-file-item-btn-remove')
    );
  });

  it('Should not render remove button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <UploadFileItem file={file} removable={false} />
    );
    assert.ok(!findDOMNode(instance).querySelector('.rs-uploader-file-item-btn-remove'));
  });

  it('Should call onPreview callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <UploadFileItem file={file} onPreview={doneOp} listType="picture-text" />
    );
    ReactTestUtils.Simulate.click(
      findDOMNode(instance).querySelector('.rs-uploader-file-item-title')
    );
  });

  it('Should call onReupload callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <UploadFileItem
        file={{
          ...file,
          status: 'error'
        }}
        onReupload={doneOp}
      />
    );
    ReactTestUtils.Simulate.click(
      findDOMNode(instance).querySelector('.rs-uploader-file-item-icon-reupload')
    );
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <UploadFileItem file={file} className="custom" />
    );
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should output a custom file name', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <UploadFileItem
        file={file}
        className="custom"
        renderFileInfo={file => {
          return <div className="file-info">{file.name}</div>;
        }}
      />
    );
    assert.include(findDOMNode(instance).querySelector('.file-info').innerText, 'a');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <UploadFileItem file={file} style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <UploadFileItem file={file} classPrefix="custom-prefix" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
