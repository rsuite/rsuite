import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import UploadFileItem from '../UploadFileItem';

const file = { fileKey: 'example', name: 'example.txt', status: 'finished' } as const;

it('gives unnamed files a meaningful preview action name', () => {
  render(<UploadFileItem file={{ fileKey: 'unnamed' }} onPreview={vi.fn()} />);
  expect(screen.getByRole('button', { name: 'Preview' })).toBeTruthy();
});

describe.each(['text', 'picture-text', 'picture'] as const)(
  'UploadFileItem preview: %s',
  listType => {
    it('exposes native non-submit preview buttons, including attachment thumbnails', () => {
      render(<UploadFileItem file={file} listType={listType} onPreview={vi.fn()} />);
      const buttons = screen.getAllByRole('button', { name: 'Preview: example.txt' });
      expect(buttons).toHaveLength(listType === 'picture-text' ? 2 : 1);
      for (const button of buttons) {
        expect(button.tagName).toBe('BUTTON');
        expect(button).toHaveProperty('type', 'button');
        expect(button).toHaveProperty('tabIndex', 0);
        expect(button).toHaveProperty('disabled', false);
      }
    });

    it('does not introduce preview controls when no callback is provided', () => {
      render(<UploadFileItem file={file} listType={listType} />);
      expect(screen.queryByRole('button', { name: /^Preview/ })).toBeNull();
    });

    it('disables every preview target when the file item is disabled', () => {
      const onPreview = vi.fn();
      render(<UploadFileItem file={file} listType={listType} onPreview={onPreview} disabled />);
      for (const button of screen.getAllByRole('button', {
        name: 'Preview: example.txt'
      })) {
        expect(button).toHaveProperty('disabled', true);
        fireEvent.click(button);
      }
      expect(onPreview).not.toHaveBeenCalled();
    });

    it('preserves file identity and passes one click event per preview activation', () => {
      const onPreview = vi.fn();
      const submit = vi.fn();
      render(
        <form onSubmit={submit}>
          <UploadFileItem file={file} listType={listType} onPreview={onPreview} />
        </form>
      );
      for (const button of screen.getAllByRole('button', {
        name: 'Preview: example.txt'
      })) {
        onPreview.mockClear();
        fireEvent.click(button);
        expect(onPreview).toHaveBeenCalledTimes(1);
        expect(onPreview.mock.calls[0][0]).toBe(file);
        expect(onPreview.mock.calls[0][1].type).toBe('click');
        expect(onPreview.mock.calls[0][1].nativeEvent).toBeInstanceOf(MouseEvent);
      }
      expect(submit).not.toHaveBeenCalled();
    });
  }
);
