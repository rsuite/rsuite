import React from 'react';
import { createRoot } from 'react-dom/client';
import Button from '../../src/Button';
import Input from '../../src/Input';
import Tag from '../../src/Tag';
import CustomProvider from '../../src/CustomProvider';

const options = new URLSearchParams(window.location.hash.slice(1));
const mode = options.get('styles');
const theme = options.get('theme') as 'light' | 'dark' | 'high-contrast';
const typography = { fontFamily: 'monospace', fontSize: '18px', fontWeight: 600 };
Object.assign(document.body.style, typography, { color: 'rgb(17, 34, 51)' });

// Author styles precede the library styles to exercise the default rules' specificity.
const authored = document.createElement('style');
authored.textContent = '.native-override { font: italic 21px serif; color: rgb(123, 45, 67); }';
document.head.append(authored);

const raw = document.createElement('div');
raw.innerHTML =
  '<button>Raw</button><input><select><option>Raw</option></select><textarea></textarea><button class="rs-native-probe" disabled>Disabled</button>';
document.body.append(raw);
const snapshotRaw = () =>
  Array.from(raw.children, element => {
    const style = getComputedStyle(element);
    return [style.font, style.color, style.margin, style.padding, style.border];
  });
const before = snapshotRaw();

async function mount() {
  if (mode === 'full') {
    await import('../../src/styles/index.scss');
  } else if (mode === 'no-reset') {
    await import('../../src/styles/components.scss');
  } else {
    await import('../../src/Tag/styles/index.scss');
    await import('../../src/Button/styles/index.scss');
    await import('../../src/Input/styles/index.scss');
  }

  createRoot(document.getElementById('root')!).render(
    <CustomProvider theme={theme}>
      <div data-testid="parent" style={typography}>
        <Button data-testid="button">Run</Button>
        <Button as="span" data-testid="span">
          Run
        </Button>
        <Button as="a" data-testid="anchor">
          Run
        </Button>
        <Input data-testid="input" />
        <Input as="textarea" data-testid="textarea" />
        <Button data-testid="disabled" disabled>
          Disabled
        </Button>
        {(['sm', 'md', 'lg'] as const).map(size =>
          ['violet', '#000', '#fff'].map(color => (
            <Tag
              key={`${size}-${color}`}
              data-testid={`tag-${size}-${color}`}
              size={size}
              color={color}
              closable
            >
              Alpha
            </Tag>
          ))
        )}
        <button className="rs-native-probe native-override" data-testid="override">
          Override
        </button>
        <Button data-testid="inline" style={{ fontFamily: 'serif', color: 'rgb(123, 45, 67)' }}>
          Inline
        </Button>
      </div>
    </CustomProvider>
  );
  window.__RSUITE_NATIVE_STYLES__ = { before, after: snapshotRaw() };
}

void mount();

declare global {
  interface Window {
    __RSUITE_NATIVE_STYLES__: { before: string[][]; after: string[][] };
  }
}
