import React from 'react';
import { createRoot } from 'react-dom/client';
import Button from '../Button';
import CustomProvider from '../../CustomProvider';
import IconButton from '../../IconButton';
import { background, contrast, rgba } from '../../../test/browser/contrast';
import '../styles/index.scss';
import '../../IconButton/styles/index.scss';

const colors = [undefined, 'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'] as const;
const theme = new URLSearchParams(location.hash.slice(1)).get('theme') as
  | 'light'
  | 'dark'
  | 'high-contrast';
const icon = (
  <svg className="rs-icon" data-glyph="" viewBox="0 0 24 24">
    <path fill="currentColor" d="M4 10h6V4h4v6h6v4h-6v6h-4v-6H4z" />
  </svg>
);

function measure(id: string) {
  const button = document.getElementById(id)!;
  const style = getComputedStyle(button);
  const surface = background(button);
  const glyph = button.querySelector('[data-glyph]');
  const spinner = button.querySelector('.rs-btn-spin');
  return {
    background: surface,
    targets: ['--rs-btn-primary-bg', '--rs-btn-primary-hover-bg', '--rs-btn-primary-active-bg'].map(
      name => rgba(style.getPropertyValue(name))
    ),
    foreground: rgba(style.color),
    textContrast: contrast(rgba(style.color), surface),
    glyphContrast: glyph ? contrast(rgba(getComputedStyle(glyph).color), background(glyph)) : null,
    glyphBackground: glyph ? background(glyph) : null,
    glyphTargets: [
      '--rs-iconbtn-primary-addon',
      '--rs-iconbtn-primary-activated-addon',
      '--rs-iconbtn-primary-pressed-addon'
    ].map(name => rgba(style.getPropertyValue(name))),
    spinnerContrast: spinner
      ? contrast(rgba(getComputedStyle(spinner, '::after').borderTopColor), surface)
      : null,
    transitionDuration: style.transitionDuration,
    animation: spinner ? getComputedStyle(spinner, '::after').animationName : null,
    hover: button.matches(':hover'),
    active: button.matches(':active'),
    focus: button.matches(':focus-visible')
  };
}

async function sample(id: string, duration: number) {
  const values: ReturnType<typeof measure>[] = [];
  const start = performance.now();
  do {
    await new Promise(requestAnimationFrame);
    values.push(measure(id));
  } while (performance.now() - start < duration);
  return values;
}

let pending: Promise<Awaited<ReturnType<typeof sample>>>;
function start(id: string, event: string) {
  pending = new Promise((resolve, reject) => {
    document.getElementById(id)!.addEventListener(
      event,
      event => {
        if (!event.isTrusted) reject(new Error('Expected a trusted pointer event'));
        else sample(id, 180).then(resolve, reject);
      },
      { once: true }
    );
  });
}
const finish = () => pending;

declare global {
  interface Window {
    __RSUITE_PRIMARY_CONTRAST__: {
      measure: typeof measure;
      start: typeof start;
      finish: typeof finish;
    };
  }
}
window.__RSUITE_PRIMARY_CONTRAST__ = { measure, start, finish };

createRoot(document.getElementById('root')!).render(
  <CustomProvider theme={theme}>
    <div style={{ display: 'grid', gap: 12, padding: 20 }}>
      {colors.map((color, index) => (
        <div key={index} style={{ display: 'flex', gap: 12 }}>
          <Button id={`button-${index}`} appearance="primary" color={color}>
            Save
          </Button>
          <Button id={`anchor-${index}`} as="a" href="#save" appearance="primary" color={color}>
            Save
          </Button>
          <IconButton
            id={`icon-${index}`}
            aria-label="Save"
            icon={icon}
            appearance="primary"
            color={color}
          />
          <IconButton id={`addon-${index}`} icon={icon} appearance="primary" color={color}>
            Save
          </IconButton>
          <Button id={`loading-${index}`} loading appearance="primary" color={color}>
            Save
          </Button>
        </div>
      ))}
      <Button id="override" appearance="primary" style={{ color: '#14283c' }}>
        Custom
      </Button>
    </div>
  </CustomProvider>
);
