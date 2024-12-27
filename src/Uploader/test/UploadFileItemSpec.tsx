import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import sinon from 'sinon';
import UploadFileItem, { formatSize } from '../UploadFileItem';
import userEvent from '@testing-library/user-event';
import { testStandardProps } from '@test/utils';

const file = {
  fileKey: 'key',
  name: 'file.txt',
  progress: 0,
  status: 'inited'
} as const;

describe('UploadFileItem', () => {
  testStandardProps(<UploadFileItem file={file} />);
  it('Should output a UploadFileItem', () => {
    render(<UploadFileItem file={file} data-testid="upload-file-row" />);

    expect(screen.getByTestId('upload-file-row')).to.have.class('rs-uploader-file-item');
    expect(screen.getByText('file.txt')).to.exist;
  });

  it('Should render picture-text for layout', () => {
    render(<UploadFileItem listType="picture-text" file={file} data-testid="upload-file-row" />);

    const fileRow = screen.getByTestId('upload-file-row');

    expect(fileRow).to.have.class('rs-uploader-file-item-picture-text');
    expect(fileRow.querySelector('.rs-uploader-file-item-panel')).to.exist;
    expect(fileRow.querySelector('.rs-uploader-file-item-progress')).to.exist;
  });

  it('Should render picture for layout', () => {
    render(<UploadFileItem listType="picture" file={file} data-testid="upload-file-row" />);

    const fileRow = screen.getByTestId('upload-file-row');
    expect(fileRow).to.have.class('rs-uploader-file-item-picture');
    expect(fileRow.querySelector('.rs-uploader-file-item-panel')).to.not.exist;
    expect(fileRow.querySelector('.rs-uploader-file-item-progress')).to.not.exist;
  });

  it('Should be disabled', () => {
    render(<UploadFileItem file={file} disabled data-testid="upload-file-row" />);
    expect(screen.getByTestId('upload-file-row')).to.have.class('rs-uploader-file-item-disabled');
  });

  it('Should call `onCancel` callback', () => {
    const onCancelSpy = sinon.spy();
    render(<UploadFileItem file={file} onCancel={onCancelSpy} />);

    userEvent.click(screen.getByRole('button', { name: 'Remove file' }));
    expect(onCancelSpy).to.have.been.calledOnce;
  });

  it('Should not call `onCancel` callback when `disabled=true`', () => {
    const onCancelSpy = sinon.spy();
    render(<UploadFileItem file={file} onCancel={onCancelSpy} disabled />);

    expect(screen.getByRole('button', { hidden: true })).to.have.class(
      'rs-uploader-file-item-btn-remove'
    );

    fireEvent.click(screen.getByRole('button', { hidden: true }));

    expect(onCancelSpy).to.have.not.been.called;
  });

  it('Should not render remove button', () => {
    render(<UploadFileItem file={file} removable={false} />);

    expect(screen.queryByRole('button', { name: 'Remove file' })).not.to.exist;
  });

  it('Should call onPreview callback', () => {
    const onPreviewSpy = sinon.spy();
    render(<UploadFileItem file={file} onPreview={onPreviewSpy} listType="picture-text" />);

    fireEvent.click(screen.getByLabelText('Preview: file.txt'));

    expect(onPreviewSpy).to.have.been.calledOnce;
  });

  it('Should not call onPreview callback if `disabled=true`', () => {
    const onPreviewSpy = sinon.spy();
    render(
      <UploadFileItem file={file} onPreview={onPreviewSpy} listType="picture-text" disabled />
    );
    fireEvent.click(screen.getByLabelText('Preview: file.txt'));

    expect(onPreviewSpy).to.have.not.been.called;
  });

  it('Should call onReupload callback', () => {
    const onReuploadSpy = sinon.spy();
    render(<UploadFileItem file={{ ...file, status: 'error' }} onReupload={onReuploadSpy} />);

    fireEvent.click(screen.getByLabelText('Retry'));

    expect(onReuploadSpy).to.have.been.calledOnce;
  });

  it('Should not call onReupload callback', () => {
    const onReuploadSpy = sinon.spy();
    render(
      <UploadFileItem file={{ ...file, status: 'error' }} onReupload={onReuploadSpy} disabled />
    );
    fireEvent.click(screen.getByLabelText('Retry'));

    expect(onReuploadSpy).to.have.not.been.called;
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
    const { rerender } = render(<UploadFileItem file={{ ...file, status: 'uploading' }} />);

    expect(screen.getByLabelText('Uploading')).to.exist;

    rerender(<UploadFileItem file={{ ...file, status: 'inited' }} />);

    expect(screen.queryAllByLabelText('Uploading')[0]).to.not.exist;
  });

  it('Should render an <i> tag, when the file status is uploading', () => {
    const file = { blobFile: new File(['foo'], 'foo.txt'), status: 'finished' } as const;
    render(<UploadFileItem file={file} />);

    expect(screen.getByText('3B')).to.have.class('rs-uploader-file-item-size');
  });

  it('Should not render a default thumbnail', () => {
    render(<UploadFileItem file={file} listType="text" />);

    expect(screen.getByLabelText('Preview: file.txt')).to.exist;
  });

  it('Should render a default thumbnail when listType="picture-text" ', () => {
    render(<UploadFileItem file={file} listType="picture-text" />);

    expect(screen.getByLabelText('attachment')).to.exist;
  });

  it('Should render a default thumbnail when listType="picture"', () => {
    render(<UploadFileItem file={file} listType="picture" />);
    expect(screen.getByLabelText('attachment')).to.exist;
  });

  it('Should render a custom thumbnail', () => {
    render(
      <UploadFileItem
        file={file}
        listType="picture-text"
        renderThumbnail={() => {
          return <span>custom-thumbnail</span>;
        }}
      />
    );

    expect(screen.getByText('custom-thumbnail')).to.exist;
  });

  it('Should render a thumbnail previewing the image to upload', async () => {
    const file = {
      name: 'image.png',
      fileKey: 1,
      blobFile: new File(['10'], 'image.png', {
        type: 'image/png'
      })
    };

    render(<UploadFileItem file={file} listType="picture-text" />);

    await waitFor(() => {
      expect(screen.queryAllByLabelText('Preview: image.png')[0]).to.have.property(
        'src',
        'data:image/png;base64,MTA='
      );
    });
  });
});

describe('UploadFileItem - formatSize', () => {
  it('Should be formatted to file size unit', () => {
    expect(formatSize(0)).to.equal('0B');
    expect(formatSize(undefined)).to.equal('0B');
    expect(formatSize(1024)).to.equal('1024B');
    expect(formatSize(1024 + 1)).to.equal('1.00KB');
    expect(formatSize(1024 * 1024)).to.equal('1024.00KB');
    expect(formatSize(1024 * 1024 + 1)).to.equal('1.00MB');
    expect(formatSize(1024 * 1024 * 1024)).to.equal('1024.00MB');
    expect(formatSize(1024 * 1024 * 1024 + 1)).to.equal('1.00GB');
    expect(formatSize(1024 * 1024 * 1024 * 1024)).to.equal('1024.00GB');
    expect(formatSize(1024 * 1024 * 1024 * 1024 + 1)).to.equal('1024.00GB');
  });
});
