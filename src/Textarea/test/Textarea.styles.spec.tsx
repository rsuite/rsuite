import React from 'react';
import Textarea from '../Textarea';
import { describe, expect, it } from 'vitest';
import { getHeight } from 'dom-lib';
import { fireEvent, render, screen } from '@testing-library/react';

import '../styles/index.less';
import '../../Input/styles/index.less';

describe('Textarea', () => {
  it('Should update style.height when value changes (autosize)', () => {
    render(<Textarea autosize minRows={2} maxRows={4} />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;

    fireEvent.change(textarea, { target: { value: 'a' } });
    // 56px = 36 + 20 (minRows)
    expect(getHeight(textarea)).to.equal(56);

    fireEvent.change(textarea, { target: { value: 'a\n' } });
    expect(getHeight(textarea)).to.equal(56);

    fireEvent.change(textarea, { target: { value: 'a\n\n' } });
    expect(getHeight(textarea)).to.equal(76);

    fireEvent.change(textarea, { target: { value: 'a\n\n\n' } });
    expect(getHeight(textarea)).to.equal(96);

    fireEvent.change(textarea, { target: { value: 'a\n\n\n\n' } });
    // 96px = 36 + (20 * 3) (maxRows)
    expect(getHeight(textarea)).to.equal(96);
  });
});
