/// <reference types="vite/client" />

import React from 'react';
import { fireEvent, render, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Button from '../../Button';
import Input from '../../Input';
import SelectPicker from '../../SelectPicker';
import styles from '../../styles/index.scss?inline';

const frames: HTMLIFrameElement[] = [];

function createFrame() {
  const frame = document.createElement('iframe');
  frames.push(frame);
  document.body.appendChild(frame);
  return frame.contentDocument!;
}

function installStyles(root: Document | ShadowRoot) {
  const owner = root.nodeType === Node.DOCUMENT_NODE ? (root as Document) : root.ownerDocument!;
  const style = owner.createElement('style');
  style.textContent = styles;
  if (root.nodeType === Node.DOCUMENT_NODE) (root as Document).head.appendChild(style);
  else root.appendChild(style);
}

function renderControls(root: HTMLElement | ShadowRoot, theme: string) {
  const wrapper = root.ownerDocument!.createElement('section');
  root.appendChild(wrapper);
  if (theme !== 'light') wrapper.dataset.theme = theme;
  const onClick = vi.fn();
  const view = render(
    <>
      <Button appearance="primary" onClick={onClick}>
        Save
      </Button>
      <Input aria-label="Title" />
    </>,
    { container: wrapper }
  );
  const button = within(wrapper).getByRole('button', { name: 'Save' });
  const input = within(wrapper).getByRole('textbox', { name: 'Title' });
  return { button, input, onClick, unmount: view.unmount };
}

function readStyles(el: HTMLElement) {
  const computed = el.ownerDocument.defaultView!.getComputedStyle(el);
  return {
    spacing: computed.getPropertyValue('--rs-spacing').trim(),
    foreground: computed.getPropertyValue('--rs-text-primary').trim(),
    background: computed.backgroundColor,
    borderRadius: computed.borderRadius,
    padding: computed.paddingInlineStart
  };
}

afterEach(() => {
  for (const frame of frames.splice(0)) frame.remove();
});

describe('RSuite styles in an isolated Shadow DOM', () => {
  it.each(['light', 'dark', 'high-contrast'])('matches document component tokens in %s', theme => {
    const referenceDoc = createFrame();
    installStyles(referenceDoc);
    const reference = renderControls(referenceDoc.body, theme);

    const isolatedDoc = createFrame();
    const host = isolatedDoc.createElement('div');
    isolatedDoc.body.append(host);
    const shadow = host.attachShadow({ mode: 'open' });
    installStyles(shadow);
    const isolated = renderControls(shadow, theme);

    try {
      const documentStyle = readStyles(reference.button);
      expect(documentStyle.spacing).toBe('0.25rem');
      expect(readStyles(isolated.button)).toEqual(documentStyle);
      expect(readStyles(isolated.input)).toEqual(readStyles(reference.input));
      expect(readStyles(isolatedDoc.body).spacing).toBe('');
      fireEvent.click(isolated.button);
      expect(isolated.onClick).toHaveBeenCalledOnce();
    } finally {
      isolated.unmount();
      reference.unmount();
    }
  });

  it('keeps a picker portal in the themed shadow root when given its container', async () => {
    const doc = createFrame();
    const host = doc.createElement('div');
    doc.body.append(host);
    const shadow = host.attachShadow({ mode: 'open' });
    installStyles(shadow);
    const theme = doc.createElement('section');
    theme.dataset.theme = 'dark';
    const mount = doc.createElement('div');
    theme.append(mount);
    shadow.append(theme);
    const onChange = vi.fn();
    const view = render(
      <SelectPicker
        data={[{ value: 'one', label: 'First option' }]}
        container={theme}
        defaultOpen
        responsive={false}
        onChange={onChange}
      />,
      { container: mount }
    );
    try {
      const listbox = await within(theme).findByRole('listbox');
      expect(listbox.getRootNode()).toBe(shadow);
      expect(readStyles(listbox).foreground).toBe(readStyles(theme).foreground);
      expect(readStyles(listbox).spacing).toBe('0.25rem');
      expect(doc.querySelector('[role="listbox"]')).not.to.exist;
      const label = within(listbox).getByText('First option', { exact: true });
      expect(doc.defaultView!.getComputedStyle(label).fontSize).toBe('14px');
      fireEvent.click(label);
      expect(onChange).toHaveBeenCalledExactlyOnceWith('one', expect.anything());
    } finally {
      view.unmount();
    }
  });

  it('allows a host to override a component token without affecting a sibling shadow root', () => {
    const doc = createFrame();
    const makeControls = () => {
      const host = doc.createElement('div');
      doc.body.append(host);
      const shadow = host.attachShadow({ mode: 'open' });
      installStyles(shadow);
      return { host, ...renderControls(shadow, 'light') };
    };
    const custom = makeControls();
    const standard = makeControls();
    try {
      custom.host.style.setProperty('--rs-btn-primary-bg', 'rgb(50, 60, 70)');
      expect(readStyles(custom.button).background).toBe('rgb(50, 60, 70)');
      expect(readStyles(standard.button).background).not.toBe('rgb(50, 60, 70)');
      expect(readStyles(standard.button).spacing).toBe('0.25rem');
    } finally {
      custom.unmount();
      standard.unmount();
    }
  });
});
