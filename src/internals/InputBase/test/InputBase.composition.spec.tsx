import React from 'react';
import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Input from '@/Input';
import Textarea from '@/Textarea';

describe.each([
  ['Input', Input],
  ['Textarea', Textarea]
] as const)('%s composition', (_name, Editor) => {
  it.each([
    { isComposing: true, keyCode: 13 },
    { isComposing: false, keyCode: 229 }
  ])('keeps Enter in the IME session for %j', signal => {
    const onPressEnter = vi.fn();
    const onKeyDown = vi.fn();
    render(<Editor onPressEnter={onPressEnter} onKeyDown={onKeyDown} />);
    const editor = screen.getByRole('textbox');

    const composingEnter = createEvent.keyDown(editor, { key: 'Enter', ...signal });
    expect(composingEnter).toMatchObject(signal);
    fireEvent(editor, composingEnter);
    expect(onPressEnter).not.toHaveBeenCalled();
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown.mock.calls[0][0].nativeEvent).toBe(composingEnter);
    expect(composingEnter.defaultPrevented).toBe(false);

    const ordinaryEnter = createEvent.keyDown(editor, { key: 'Enter', keyCode: 13 });
    fireEvent(editor, ordinaryEnter);
    expect(onPressEnter).toHaveBeenCalledTimes(1);
    expect(onPressEnter.mock.calls[0][0].nativeEvent).toBe(ordinaryEnter);
    expect(onKeyDown).toHaveBeenCalledTimes(2);
  });
});
