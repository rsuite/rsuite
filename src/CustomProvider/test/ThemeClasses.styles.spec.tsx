import React from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import CustomProvider from '../CustomProvider';
import '../../styles/index.scss';

describe('CustomProvider theme stylesheet lifetime', () => {
  let originalClassName: string;

  beforeEach(() => {
    originalClassName = document.body.className;
    document.body.className = 'rs-theme-light';
  });

  afterEach(() => {
    cleanup();
    document.body.className = originalClassName;
  });

  it('restores actual light theme variables after a dark provider unmounts', () => {
    const bodyColor = () => getComputedStyle(document.body).getPropertyValue('--rs-body').trim();
    const light = bodyColor();
    expect(light).not.toBe('');
    const view = render(<CustomProvider theme="dark" />);
    const dark = bodyColor();
    expect(dark).not.toBe('');
    expect(dark).not.toBe(light);
    view.unmount();
    expect(bodyColor()).toBe(light);
  });
});
