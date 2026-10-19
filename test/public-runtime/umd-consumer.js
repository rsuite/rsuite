/* global React, ReactDOM, rsuite */
(() => {
  const cases = ['nested-array', 'symbol-metadata', 'date', 'map', 'set', 'typed-array'];
  let root;
  let current;

  function check(condition, message) {
    if (!condition) throw new Error(current.name + ': ' + message);
  }

  function render(name) {
    if (root) ReactDOM.flushSync(() => root.unmount());
    document.body.replaceChildren();
    const container = document.createElement('div');
    document.body.append(container);
    const metadata = Symbol('record metadata');
    const member = { id: 42 };
    const untouched = { label: 'Unrelated value' };
    let original;
    let field;

    if (name === 'nested-array') {
      original = { user: { names: ['First', 'Original'] }, untouched };
      field = 'user.names.1';
    } else if (name === 'symbol-metadata') {
      original = { name: 'Original', [metadata]: member, untouched };
      field = 'name';
    } else {
      const records = {
        date: () => new Date('2026-01-01T00:00:00.000Z'),
        map: () => new Map([['item', member]]),
        set: () => new Set([member]),
        'typed-array': () => new Uint8Array([10, 20])
      };
      const record = records[name]();
      record.note = 'Original';
      record[metadata] = member;
      original = { record, untouched };
      field = 'record.note';
    }

    current = { name, original, metadata, member, next: undefined, changes: 0 };
    root = ReactDOM.createRoot(container);
    ReactDOM.flushSync(() => {
      root.render(
        React.createElement(
          rsuite.Form,
          {
            nestedField: true,
            formValue: original,
            onChange: value => {
              current.next = value;
              current.changes++;
            }
          },
          React.createElement(rsuite.Form.Control, { name: field, 'aria-label': 'Value' })
        )
      );
    });
  }

  function verify() {
    const { name, original, next, metadata, member, changes } = current;
    check(changes === 1, 'editing must emit one change, received ' + changes);
    check(next !== original, 'the root value must be copied');
    check(next.untouched === original.untouched, 'unrelated values must retain their identity');

    if (name === 'nested-array') {
      check(next.user.names[1] === 'Edited', 'the nested array path was not updated');
      check(original.user.names[1] === 'Original', 'the original array was mutated');
      check(next.user !== original.user, 'the edited object branch must be copied');
      check(next.user.names !== original.user.names, 'the edited array must be copied');
      check(next.user.names[0] === 'First', 'the adjacent array entry changed');
    } else if (name === 'symbol-metadata') {
      check(next.name === 'Edited', 'the field was not updated');
      check(original.name === 'Original', 'the original field was mutated');
      check(next[metadata] === member, 'enumerable Symbol metadata was lost');
    } else {
      check(original.record.note === 'Original', 'the original container was mutated');
      check(next.record !== original.record, 'the edited container must be copied');
      check(next.record.note === 'Edited', 'the container field was not updated');
      check(next.record[metadata] === member, 'container Symbol metadata was lost');

      if (name === 'date') {
        check(next.record instanceof Date, 'the Date type was lost');
        check(next.record.getTime() === original.record.getTime(), 'the date value changed');
      } else if (name === 'map') {
        check(next.record instanceof Map, 'the Map type was lost');
        check(next.record.size === 1 && next.record.get('item') === member, 'Map entries changed');
      } else if (name === 'set') {
        check(next.record instanceof Set, 'the Set type was lost');
        check(next.record.size === 1 && next.record.has(member), 'Set entries changed');
      } else {
        check(next.record instanceof Uint8Array, 'the typed array type was lost');
        check(next.record[0] === 10 && next.record[1] === 20, 'typed array entries changed');
        check(next.record.buffer !== original.record.buffer, 'the edited buffer must be copied');
      }
    }
    return { name, passed: true };
  }

  window.rsuiteUMDConsumer = {
    cases,
    render,
    verify,
    changed: () => current.changes > 0
  };
})();
