import Transition from '../../src/Animation/Transition';

export async function traceWhisperCompletion(check: () => Promise<void>) {
  const trace: unknown[] = [];
  const start = performance.now();
  const realTimeout = window.setTimeout.bind(window);
  const record = (name: string, details = {}) =>
    trace.push({ name, ms: performance.now() - start, ...details });
  const prototype = Transition.prototype as any;
  const methods = [
    'performEnter',
    'performExit',
    'onTransitionEnd',
    'safeSetState',
    'cancelNextCallback',
    'componentDidUpdate',
    'setNextCallback'
  ];
  const originals = Object.fromEntries(methods.map(name => [name, prototype[name]]));
  for (const name of methods.filter(name => name !== 'setNextCallback')) {
    prototype[name] = function (...args: any[]) {
      record(name, {
        status: this.state.status,
        open: this.props.in,
        timeout: this.props.timeout,
        nextState: name === 'safeSetState' ? args[0] : undefined,
        pending: !!this.nextCallback
      });
      return originals[name].apply(this, args);
    };
  }
  let callbackID = 0;
  prototype.setNextCallback = function (callback: (...args: any[]) => void) {
    const id = ++callbackID;
    record('callback-created', { id, status: this.state.status });
    const result = originals.setNextCallback.call(this, (...args: any[]) => {
      record('callback-invoked', { id, status: this.state.status });
      callback(...args);
    });
    const observed: any = (...args: any[]) => {
      record('callback-attempt', {
        id,
        eventType: args[0]?.type,
        argumentType: typeof args[0],
        targetMatches: args[0] ? args[0].target === this.instanceElement : undefined,
        status: this.state.status
      });
      return result(...args);
    };
    observed.cancel = () => {
      record('callback-cancelled', { id, status: this.state.status });
      result.cancel();
    };
    this.nextCallback = observed;
    return observed;
  };
  try {
    record('environment', {
      visibility: document.visibilityState,
      focus: document.hasFocus(),
      userAgent: navigator.userAgent
    });
    await check();
    record('assertions-passed');
  } catch (error) {
    record('assertion-deadline', { visibility: document.visibilityState });
    await new Promise(resolve => realTimeout(resolve, 2000));
    record('late-observation', {
      tooltip: document.querySelector('[role="tooltip"]')?.outerHTML
    });
    throw error;
  } finally {
    for (const name of methods) prototype[name] = originals[name];
    console.info('[whisper-completion-trace]', JSON.stringify(trace));
  }
}
