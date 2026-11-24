import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import UploadFileItem from '../UploadFileItem';

const file = { fileKey: 'alpha', name: 'alpha.png', status: 'error' } as const;

describe.each(['text', 'picture-text', 'picture'] as const)(
  'UploadFileItem keyboard semantics: %s',
  listType => {
    it('uses native non-submit buttons in the tab order for remove and retry', () => {
      render(<UploadFileItem file={file} listType={listType} />);
      for (const name of ['Remove file', 'Retry']) {
        const button = screen.getByRole('button', { name }) as HTMLButtonElement;
        expect(button.tagName).toBe('BUTTON');
        expect(button.type).toBe('button');
        expect(button.tabIndex).toBe(0);
        expect(button.disabled).toBe(false);
      }
    });

    it('disables both native controls when the file item is disabled', () => {
      render(<UploadFileItem file={file} listType={listType} disabled />);
      for (const button of screen.getAllByRole('button', { hidden: true })) {
        expect(button).toHaveProperty('disabled', true);
      }
    });

    it('omits actions when removal and retry are unavailable', () => {
      render(
        <UploadFileItem file={file} listType={listType} removable={false} allowReupload={false} />
      );
      expect(screen.queryByRole('button', { name: 'Remove file' })).toBeNull();
      expect(screen.queryByRole('button', { name: 'Retry' })).toBeNull();
    });

    it('preserves file identity and single callbacks for pointer activation', () => {
      const onCancel = vi.fn();
      const onReupload = vi.fn();
      render(
        <UploadFileItem
          file={file}
          listType={listType}
          onCancel={onCancel}
          onReupload={onReupload}
        />
      );
      fireEvent.click(screen.getByRole('button', { name: 'Remove file' }));
      fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
      expect(onCancel).toHaveBeenCalledTimes(1);
      expect(onCancel.mock.calls[0][0]).toBe('alpha');
      expect(onReupload).toHaveBeenCalledTimes(1);
      expect(onReupload.mock.calls[0][0]).toBe(file);
    });
  }
);
