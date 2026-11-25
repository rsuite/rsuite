export function installTouchTrace(page) {
  return page.addInitScript(() => {
    window.formTouchEvents = [];
    for (const type of ['touchstart', 'touchend', 'touchcancel']) {
      document.addEventListener(
        type,
        event => {
          window.formTouchEvents.push({ type, trusted: event.isTrusted });
        },
        true
      );
    }
  });
}

export function readTouchTrace(page) {
  return page.evaluate(() => window.formTouchEvents ?? []);
}

export function captureTouchLayout(page, name) {
  return page.evaluate(name => {
    const root = document.documentElement;
    const form = document.querySelector('form[aria-label="Account"]');
    const controls = [
      ...(form?.querySelectorAll(
        '[data-form-field] input:not([type=hidden]), button, .bench-toggle'
      ) ?? [])
    ].map(element => {
      const rect = element.getBoundingClientRect();
      return {
        kind: element.matches('input') ? 'field' : element.matches('button') ? 'button' : 'toggle',
        left: rect.left,
        right: rect.right,
        width: rect.width,
        height: rect.height
      };
    });
    return {
      name,
      viewportWidth: root.clientWidth,
      scrollWidth: root.scrollWidth,
      visualWidth: window.visualViewport?.width,
      scale: window.visualViewport?.scale,
      touchPoints: navigator.maxTouchPoints,
      controls
    };
  }, name);
}

export function validTouchCase(row, checkpoints) {
  if (row.submitMode !== 'touch') return true;
  const { width, actions, layouts, events } = row.touch ?? {};
  if (
    !Number.isInteger(width) ||
    !Number.isInteger(actions) ||
    actions <= 0 ||
    !Array.isArray(layouts) ||
    !Array.isArray(events) ||
    events.length !== actions * 2 ||
    !events.every(
      (event, index) => event.trusted && event.type === (index % 2 ? 'touchend' : 'touchstart')
    )
  ) {
    return false;
  }

  const names = ['initial', ...checkpoints];
  return (
    layouts.length === names.length &&
    layouts.every(
      (layout, index) =>
        layout.name === names[index] &&
        layout.viewportWidth === width &&
        layout.scrollWidth <= width &&
        Math.abs(layout.visualWidth - width) < 1 &&
        Math.abs(layout.scale - 1) < 0.01 &&
        Array.isArray(layout.controls) &&
        layout.controls.filter(control => control.kind === 'field').length >= 5 &&
        layout.controls.filter(control => control.kind === 'button').length >= 2 &&
        layout.controls.some(control => control.kind === 'toggle') &&
        layout.controls.every(
          control =>
            control.left >= -0.5 &&
            control.right <= width + 0.5 &&
            control.width >= 43.5 &&
            control.height >= 43.5
        )
    )
  );
}
