import { isDeepStrictEqual } from 'node:util';
import assert from 'node:assert/strict';
import { observeStyles } from './style-observation.mjs';

// Container currentColor can differ without painting anything. Compare the actual
// label/input/SVG as well, and retain every raw difference in a separate channel.
function componentStyles(checkpoint) {
  return Object.fromEntries(
    Object.entries(checkpoint.styles).map(([name, raw]) => {
      if (!raw) return [name, null];
      const style = { ...raw };
      const subject = checkpoint.subjects[name];
      if (!subject.paintsColor) delete style.color;
      if (!subject.svg) {
        delete style.fill;
        delete style.stroke;
      }
      if (
        parseFloat(style.borderTopWidth) === 0 ||
        ['none', 'hidden'].includes(style.borderTopStyle)
      )
        delete style.borderTopColor;
      if (parseFloat(style.outlineWidth) === 0 || ['none', 'hidden'].includes(style.outlineStyle))
        delete style.outlineColor;
      return [name, style];
    })
  );
}

export function compareStyles(full, component) {
  return {
    componentPropertiesMatch: isDeepStrictEqual(componentStyles(full), componentStyles(component)),
    rawPropertiesMatch: isDeepStrictEqual(full.styles, component.styles),
    rasterizationMatch: isDeepStrictEqual(full.rasterization, component.rasterization)
  };
}

export async function verifyColorFault(page, baseline) {
  const original = await page
    .locator('.benchmark-popup [data-bench-value]')
    .first()
    .evaluate(element => {
      const original = element.getAttribute('style');
      element.style.setProperty('color', 'rgb(1, 2, 3)', 'important');
      return original;
    });
  let fault;
  try {
    fault = await observeStyles(page);
    assert.equal(
      compareStyles(baseline, fault).componentPropertiesMatch,
      false,
      'Actual visible label color fault must be detected'
    );
  } finally {
    await page
      .locator('.benchmark-popup [data-bench-value]')
      .first()
      .evaluate((element, original) => {
        if (original === null) element.removeAttribute('style');
        else element.setAttribute('style', original);
      }, original);
  }
  const restored = await observeStyles(page);
  assert.equal(
    compareStyles(baseline, restored).componentPropertiesMatch,
    true,
    'Color control must restore the exact component styles'
  );
  return {
    detected: true,
    restored: true,
    baseline: baseline.styles.firstVisibleLabel.color,
    injected: fault.styles.firstVisibleLabel.color,
    after: restored.styles.firstVisibleLabel.color
  };
}
