import { vi } from 'vitest';
import Transition from '../Transition';

/** Test-only, bounded observations; forwards the original callbacks and deadlines. */
export function observeTransitions(selector: string) {
  const startedAt = performance.now();
  const clockOrigin = performance.timeOrigin;
  const instances = new Map<Transition, number>();
  const ids = new WeakMap<Transition, number>();
  const records: Array<Record<string, unknown>> = [];
  let droppedRecords = 0;
  let droppedInstances = 0;
  let nextInstance = 1;
  let nextUpdate = 1;

  const state = (instance: Transition) => {
    const field = (name: string) => {
      const property = Object.getOwnPropertyDescriptor(instance, name);
      return { available: !!property, present: property ? property.value != null : null };
    };
    return {
      instance: ids.get(instance),
      status: instance.state.status,
      shown: instance.props.in,
      timeout: instance.props.timeout,
      motionReduced: instance.state.motionReduced,
      elementConnected: instance.instanceElement?.isConnected ?? false,
      timer: field('transitionEndTimeout'),
      completion: field('transitionEndCallback'),
      nextCallback: field('nextCallback'),
      listener: field('animationEventListener')
    };
  };

  const record = (
    event: string,
    instance: Transition,
    eventType?: string,
    update?: { id: number; status?: number; motionReduced?: boolean }
  ) => {
    if (!ids.has(instance)) {
      if (!instance.instanceElement?.matches(selector)) return;
      ids.set(instance, nextInstance++);
      instances.set(instance, ids.get(instance)!);
      if (instances.size > 8) {
        instances.delete(instances.keys().next().value!);
        droppedInstances++;
      }
    }
    records.push({
      event,
      elapsedMs: performance.now() - startedAt,
      eventType,
      update,
      ...state(instance)
    });
    if (records.length > 64) {
      records.shift();
      droppedRecords++;
    }
  };

  const register = Transition.prototype.onTransitionEnd;
  const setState = Transition.prototype.safeSetState;
  const cancel = Transition.prototype.cancelNextCallback;
  const unmount = Transition.prototype.componentWillUnmount;
  const spies = [
    vi.spyOn(Transition.prototype, 'safeSetState').mockImplementation(function (
      this: Transition,
      nextState,
      callback
    ) {
      const update = {
        id: nextUpdate++,
        status: nextState.status,
        motionReduced: nextState.motionReduced
      };
      record('state:before', this, undefined, update);
      try {
        return setState.call(this, nextState, event => {
          record('state:commit:before', this, event?.type, update);
          try {
            return callback(event);
          } finally {
            record('state:commit:after', this, event?.type, update);
          }
        });
      } finally {
        record('state:after', this, undefined, update);
      }
    }),
    vi.spyOn(Transition.prototype, 'onTransitionEnd').mockImplementation(function (
      this: Transition,
      node,
      handler
    ) {
      record('register:before', this);
      try {
        return register.call(this, node, event => {
          record('complete:before', this, event?.type);
          try {
            return handler(event);
          } finally {
            record('complete:after', this, event?.type);
          }
        });
      } finally {
        record('register:after', this);
      }
    }),
    vi.spyOn(Transition.prototype, 'cancelNextCallback').mockImplementation(function (
      this: Transition
    ) {
      record('cancel:before', this);
      try {
        return cancel.call(this);
      } finally {
        record('cancel:after', this);
      }
    }),
    vi.spyOn(Transition.prototype, 'componentWillUnmount').mockImplementation(function (
      this: Transition
    ) {
      record('unmount:before', this);
      try {
        return unmount.call(this);
      } finally {
        record('unmount:after', this);
      }
    })
  ];

  return {
    snapshot: () => ({
      clockOrigin,
      startedAt,
      capturedAt: performance.now(),
      records: [...records],
      instances: [...instances.keys()].map(state),
      droppedRecords,
      droppedInstances
    }),
    restore: () => {
      spies.forEach(spy => spy.mockRestore());
      instances.clear();
    }
  };
}
