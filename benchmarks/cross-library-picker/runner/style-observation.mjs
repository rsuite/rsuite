import { gzipSync } from 'node:zlib';
import { hash } from '../integrity.mjs';

export function requestLedger(page, baseURL) {
  const base = new URL(baseURL);
  const counts = new Map();
  const failed = [];
  const unaccounted = [];
  function fileOf(request) {
    const url = new URL(request.url());
    if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) return null;
    const file = decodeURIComponent(url.pathname.slice(base.pathname.length));
    return /\.(?:js|css)$/.test(file) ? file : null;
  }
  const finished = request => {
    const file = fileOf(request);
    if (file) counts.set(file, (counts.get(file) || 0) + 1);
    else if (['script', 'stylesheet'].includes(request.resourceType())) {
      unaccounted.push({ url: request.url(), type: request.resourceType() });
    }
  };
  const error = request => {
    const file = fileOf(request);
    if (file) failed.push({ file, error: request.failure()?.errorText });
  };
  page.on('requestfinished', finished);
  page.on('requestfailed', error);
  return {
    snapshot: () => ({
      files: [...counts.keys()].sort(),
      requests: Object.fromEntries(counts),
      failed,
      unaccounted
    }),
    close() {
      page.off('requestfinished', finished);
      page.off('requestfailed', error);
    }
  };
}

export async function observeStyles(page) {
  const raw = await page.evaluate(async () => {
    await document.fonts.ready;
    const animations = document
      .getAnimations()
      .filter(animation => Number.isFinite(animation.effect?.getComputedTiming().endTime));
    let timer;
    try {
      await Promise.race([
        Promise.all(animations.map(animation => animation.finished.catch(() => {}))),
        new Promise((_, reject) => {
          timer = setTimeout(() => reject(new Error('Style animation did not settle')), 3000);
        })
      ]);
    } finally {
      clearTimeout(timer);
    }
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const snapshot = window.pickerBenchmark.snapshot();
    const popup = snapshot.expanded
      ? [...document.querySelectorAll('.benchmark-popup')].find(element => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return (
            rect.width > 0 &&
            rect.height > 0 &&
            style.visibility !== 'hidden' &&
            style.display !== 'none' &&
            Number(style.opacity) > 0
          );
        })
      : null;
    const marker =
      popup && snapshot.firstVisible
        ? popup.querySelector('[data-bench-value="' + CSS.escape(snapshot.firstVisible) + '"]')
        : null;
    const nodes = {
      combobox: document.querySelector('#root [role="combobox"]'),
      trigger: document.querySelector('#root [aria-label="Open items"]'),
      popup,
      firstVisibleOption: marker?.closest('[role="option"]') || marker?.parentElement || null,
      firstVisibleLabel: marker,
      activeLabel:
        popup && snapshot.activeValue
          ? popup.querySelector('[data-bench-value="' + CSS.escape(snapshot.activeValue) + '"]')
          : null,
      searchInput: popup?.querySelector('input:not([type="hidden"])') || null,
      emptyLabel: snapshot.emptyVisible
        ? [...popup.querySelectorAll('*')].find(element =>
            [...element.childNodes].some(
              node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() === 'No results'
            )
          ) || null
        : null
    };
    for (const [name, owner] of Object.entries({
      combobox: nodes.combobox,
      trigger: nodes.trigger
    })) {
      if (!owner) continue;
      const visible = element => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden';
      };
      const descendants = [owner, ...owner.querySelectorAll('*')].filter(visible);
      const text = descendants.filter(element =>
        [...element.childNodes].some(
          node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
        )
      );
      text.forEach((element, index) => (nodes[name + 'Text' + index] = element));
      descendants
        .filter(element => element.tagName.toLowerCase() === 'svg')
        .forEach((element, index) => (nodes[name + 'Icon' + index] = element));
    }
    if (!nodes.combobox || (snapshot.popupVisible && !popup) || (snapshot.firstVisible && !marker))
      throw new Error('Missing representative style node');
    const properties = [
      'display',
      'position',
      'width',
      'height',
      'fontFamily',
      'fontSize',
      'fontWeight',
      'lineHeight',
      'color',
      'backgroundColor',
      'borderTopWidth',
      'borderTopStyle',
      'borderTopColor',
      'borderRadius',
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',
      'boxShadow',
      'outlineStyle',
      'outlineWidth',
      'outlineColor',
      'opacity',
      'visibility',
      'fill',
      'stroke',
      'overflowX',
      'overflowY'
    ];
    const styles = Object.fromEntries(
      Object.entries(nodes).map(([name, element]) => {
        if (!element) return [name, null];
        const style = getComputedStyle(element);
        return [name, Object.fromEntries(properties.map(property => [property, style[property]]))];
      })
    );
    const sheets = [...new Set([...document.styleSheets, ...(document.adoptedStyleSheets || [])])];
    const css = sheets.map(sheet => ({
      mechanism:
        sheet.ownerNode?.nodeName === 'LINK'
          ? 'linked'
          : sheet.ownerNode
            ? 'inline'
            : 'constructed',
      css: [...sheet.cssRules].map(rule => rule.cssText).join('\n')
    }));
    const subjects = Object.fromEntries(
      Object.entries(nodes).map(([name, element]) => [
        name,
        element
          ? {
              tag: element.tagName,
              role: element.getAttribute('role'),
              className: element.getAttribute('class'),
              directText: [...element.childNodes]
                .filter(node => node.nodeType === Node.TEXT_NODE)
                .map(node => node.textContent.trim())
                .filter(Boolean)
                .join(' '),
              paintsColor:
                ['INPUT', 'TEXTAREA'].includes(element.tagName) ||
                element.namespaceURI === 'http://www.w3.org/2000/svg' ||
                [...element.childNodes].some(
                  node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
                ),
              svg: element.namespaceURI === 'http://www.w3.org/2000/svg'
            }
          : null
      ])
    );
    const rasterization = Object.fromEntries(
      Object.entries(nodes).map(([name, element]) => {
        const style = element && getComputedStyle(element);
        return [
          name,
          style
            ? {
                webkitFontSmoothing: style.getPropertyValue('-webkit-font-smoothing'),
                mozOsxFontSmoothing: style.getPropertyValue('-moz-osx-font-smoothing'),
                textRendering: style.textRendering
              }
            : null
        ];
      })
    );
    return { styles, subjects, css, snapshot, rasterization };
  });
  return {
    snapshot: raw.snapshot,
    styles: raw.styles,
    subjects: raw.subjects,
    rasterization: raw.rasterization,
    css: raw.css.map(sheet => ({
      mechanism: sheet.mechanism,
      serializedBytes: Buffer.byteLength(sheet.css),
      serializedGzipBytes: gzipSync(sheet.css).length,
      sha256: hash(Buffer.from(sheet.css))
    }))
  };
}
