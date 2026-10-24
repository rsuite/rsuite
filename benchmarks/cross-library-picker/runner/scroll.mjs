async function observeScroll(viewport) {
  return viewport.evaluateHandle(element => {
    if (!('onscrollend' in element)) throw new Error('Native scrollend is required');
    const state = {
      element,
      initialTop: element.scrollTop,
      progressed: false,
      completed: false,
      unchanged: false
    };
    const onScroll = event => {
      if (event.target === element && event.isTrusted) {
        state.progressed ||= element.scrollTop !== state.initialTop;
      }
    };
    const onEnd = event => {
      // Firefox can deliver the native scrollend before its queued scroll event.
      // Require both observations without assuming their delivery order.
      if (event.target === element && event.isTrusted) {
        state.completed = true;
      }
    };
    element.addEventListener('scroll', onScroll, { capture: true, passive: true });
    element.addEventListener('scrollend', onEnd, { capture: true, passive: true });
    state.dispose = () => {
      element.removeEventListener('scroll', onScroll, true);
      element.removeEventListener('scrollend', onEnd, true);
    };
    return state;
  });
}

async function waitForScroll(page, observation) {
  try {
    await page.waitForFunction(
      state =>
        state.completed &&
        (state.progressed || state.unchanged) &&
        state.element.scrollTop === state.destination,
      observation,
      { timeout: 12000 }
    );
  } catch (error) {
    const context = await observation.evaluate(state => ({
      initialTop: state.initialTop,
      top: state.element.scrollTop,
      destination: state.destination,
      connected: state.element.isConnected,
      progressed: state.progressed,
      completed: state.completed
    }));
    const detail = '\nScroll completion: ' + JSON.stringify(context);
    error.message += detail;
    if (error.stack) error.stack += detail;
    throw error;
  }
}

export async function scrollViewport(page, viewport, position) {
  const observation = await observeScroll(viewport);
  try {
    await observation.evaluate((state, position) => {
      const element = state.element;
      // The previous wheel can advance while the observer is being installed.
      // Only events delivered after this range write belong to this operation.
      state.initialTop = element.scrollTop;
      state.progressed = false;
      state.completed = false;
      const top = position === 'bottom' ? element.scrollHeight : 0;
      const destination = Math.min(top, element.scrollHeight - element.clientHeight);
      state.destination = destination;
      // An already completed position does not produce a new native scrollend.
      if (element.scrollTop === destination) {
        state.completed = true;
        state.unchanged = true;
      }
      element.scrollTop = top;
    }, position);
    await waitForScroll(page, observation);
  } finally {
    await observation.evaluate(state => state.dispose());
    await observation.dispose();
  }
}
