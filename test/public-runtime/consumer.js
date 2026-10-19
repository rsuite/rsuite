/* eslint-disable @typescript-eslint/no-require-imports -- This fixture runs in a separate DOM-free Node process. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
function assertNoDOM() {
  for (const name of ['window', 'document', 'XMLHttpRequest'])
    assert.equal(typeof globalThis[name], 'undefined', name + ' must remain absent');
}
assertNoDOM();
const React = require('react');
const ReactDOM = require('react-dom');
const renderer = require('react-dom/server');
const expected = process.argv[2] === '18' ? '18.2.0' : '19.0.0';
assert.equal(React.version, expected);
assert.equal(ReactDOM.version, expected);
assert.equal(renderer.version, expected);
const ownRequire = createRequire(__filename);
const iconsReact = createRequire(ownRequire.resolve('@rsuite/icons/package.json'))('react');
const tableReact = createRequire(ownRequire.resolve('rsuite-table/package.json'))('react');
assert.equal(React, iconsReact, 'icons must share the selected React');
assert.equal(React, tableReact, 'table must share the selected React');
const names = [
  'Form',
  'FormControl',
  'FormErrorSummary',
  'SelectPicker',
  'Button',
  'useAsyncSearch',
  'useLocaleSearch',
  'ColorPicker',
  'EmptyState'
];
const cjs = { Root: require('rsuite') };
for (const name of names) cjs[name] = require('rsuite/' + name);
const esm = require('./esm-bundle.cjs');
assertNoDOM();
const resolvedCJS = { rsuite: ownRequire.resolve('rsuite') };
for (const name of names) resolvedCJS['rsuite/' + name] = ownRequire.resolve('rsuite/' + name);
const published = path.dirname(fs.realpathSync(ownRequire.resolve('rsuite/package.json')));
for (const [specifier, file] of Object.entries(resolvedCJS)) {
  const directory = path.join(published, specifier === 'rsuite' ? '' : specifier.slice(7));
  const metadata = JSON.parse(fs.readFileSync(path.join(directory, 'package.json'), 'utf8'));
  assert.equal(
    fs.realpathSync(file),
    path.resolve(directory, metadata.main),
    specifier + ' must use package.main'
  );
}
const identities = [];
for (const [format, api] of Object.entries({ cjs, esm })) {
  for (const name of names) {
    assert.equal(api.Root[name], api[name].default, format + ' root/default ' + name);
    assert.equal(api.Root[name], api[name][name], format + ' root/named ' + name);
    identities.push({ format, name, rootEqualsDefaultAndNamed: true });
  }
  assert.equal(api.Root.Form.Control, api.Root.FormControl);
  assert.equal(api.Root.Form.ErrorSummary, api.Root.FormErrorSummary);
}
const calls = [];
const callback =
  name =>
  (...args) =>
    calls.push({ name, argumentCount: args.length });
const h = React.createElement;
const ref = callback('ref');
function SearchProbe({ hook: useSearch, enabled }) {
  const result = useSearch({ query: 'q', enabled, search: callback('async-search') });
  return h('output', null, [result.status, result.loading, result.items.length].join(':'));
}
const localeItems = ['Café'];
function LocaleSearchProbe({ hook: useSearch, enabled }) {
  const result = useSearch({
    items: localeItems,
    query: 'cafe',
    locale: 'invalid_locale',
    getText: callback('locale-search'),
    enabled
  });
  return h('output', null, [result.status, result.loading, result.items.length].join(':'));
}
function fixtures(api) {
  return [
    {
      name: 'EmptyState renders an accessible recovery action through the root entry',
      element: h(
        api.Root.EmptyState,
        {
          as: 'section',
          'aria-label': 'Projects',
          title: 'No projects',
          description: 'Create one to get started.',
          headingLevel: 2,
          icon: h('svg'),
          ref
        },
        h('button', { type: 'button', onClick: callback('empty-action') }, 'Create project')
      ),
      expected: [
        /aria-label="Projects"/,
        /<h2 class="rs-empty-state-title">No projects<\/h2>/,
        /aria-hidden="true"/,
        /Create project<\/button>/
      ],
      absent: [/aria-live=/, /role="alert"/]
    },
    {
      name: 'EmptyState subpath honors provider defaults and numeric content',
      element: h(
        api.Root.CustomProvider,
        {
          components: { EmptyState: { defaultProps: { size: 'sm', align: 'start' } } }
        },
        h(api.EmptyState.default, { title: 0, description: 0 })
      ),
      expected: [/data-size="sm"/, /data-align="start"/, /<h3 class="rs-empty-state-title">0<\/h3>/]
    },
    ...[
      {},
      { defaultOpen: true },
      { open: true },
      { plaintext: true },
      { disabled: true },
      { readOnly: true }
    ].map(props => ({
      name: 'ColorPicker preserves the native color without DOM: ' + JSON.stringify(props),
      element: h(api.ColorPicker.default, {
        name: 'brand',
        form: 'profile',
        defaultValue: '#1234',
        presets: ['#fff'],
        onChange: callback('color-change'),
        onOpen: callback('color-open'),
        onClose: callback('color-close'),
        ref,
        ...props
      }),
      expected: [/name="brand"/, /form="profile"/, /value="#1234"/],
      absent: [/rs-color-picker-panel/]
    })),
    {
      name: 'ColorPicker controlled null overrides a default color',
      element: h(api.Root.ColorPicker, { name: 'brand', value: null, defaultValue: '#fff' }),
      expected: [/name="brand"/, /value=""/],
      absent: [/value="#fff"/]
    },
    {
      name: 'ColorPicker receives its selected value from Form.Control during SSR',
      element: h(
        api.Root.Form,
        { formDefaultValue: { brand: '#00ff0080' } },
        h(api.Root.Form.Control, { name: 'brand', accepter: api.Root.ColorPicker })
      ),
      expected: [/name="brand"/, /value="#00ff0080"/]
    },
    ...[true, false].map(enabled => ({
      name: 'Locale search renders without starting work or initializing Intl, enabled=' + enabled,
      element: h(LocaleSearchProbe, { hook: api.Root.useLocaleSearch, enabled }),
      expected: [new RegExp('<output>' + (enabled ? 'pending:true' : 'idle:false') + ':0</output>')]
    })),
    ...[true, false].map(enabled => ({
      name: 'Async search renders without starting work, enabled=' + enabled,
      element: h(SearchProbe, { hook: api.Root.useAsyncSearch, enabled }),
      expected: [new RegExp('<output>' + (enabled ? 'pending:true' : 'idle:false') + ':0</output>')]
    })),
    ...['mdDown', '(max-width: 1279px)'].flatMap(responsive =>
      [
        'SelectPicker',
        'CheckPicker',
        'Cascader',
        'MultiCascader',
        'TreePicker',
        'CheckTreePicker',
        'InputPicker',
        'TagPicker',
        'DatePicker',
        'DateRangePicker',
        'TimePicker',
        'TimeRangePicker'
      ].map(name => ({
        name: name + ' renders responsive query ' + responsive + ' without DOM',
        element: h(api.Root[name], {
          id: 'responsive-picker',
          'aria-label': 'Country',
          responsive,
          ...(/^(Date|Time)/.test(name) ? {} : { data: [{ label: 'Alpha', value: 'a' }] }),
          onOpen: callback('responsive-open'),
          onClose: callback('responsive-close'),
          ref
        }),
        expected: [/id="responsive-picker"/, /aria-label="Country"/],
        absent: [/rs-drawer/, /responsive=/]
      }))
    ),
    ...[undefined, true, false].map((reduceMotion, index) => ({
      name:
        'Animation renders motion policy ' + ['auto', 'reduce', 'allow'][index] + ' without DOM',
      element: h(
        api.Root.Animation.Bounce,
        {
          in: true,
          transitionAppear: true,
          reduceMotion,
          onEntered: callback('motion-entered'),
          ref
        },
        h('div', { ref: callback('animation-child-ref') }, 'Motion content')
      ),
      expected: [new RegExp('data-rs-motion="' + ['auto', 'reduce', 'allow'][index] + '"')]
    })),
    {
      name: 'Provider motion policy preserves an explicit component override during SSR',
      element: h(
        api.Root.CustomProvider,
        { reduceMotion: true },
        h(api.Root.Animation.Slide, { in: true }, h('div', null, 'Reduced')),
        h(api.Root.Animation.Fade, { in: true, reduceMotion: false }, h('div', null, 'Allowed'))
      ),
      expected: [/data-rs-motion="reduce"/, /data-rs-motion="allow"/]
    },
    {
      name: 'default Form value survives StrictMode SSR',
      element: h(
        React.StrictMode,
        null,
        h(
          api.Root.Form,
          {
            formDefaultValue: { email: 'saved@example.com' },
            onChange: callback('form-change'),
            onCheck: callback('form-check'),
            ref
          },
          h(api.Root.Form.Control, {
            name: 'email',
            'aria-label': 'Email',
            shouldResetWithUnmount: true,
            ref
          })
        )
      ),
      expected: [/value="saved@example.com"/, /class="rs-form/]
    },
    {
      name: 'controlled Form value and labelled error stay linked',
      element: h(
        api.Form.default,
        {
          formValue: { email: 'controlled@example.com' },
          formError: { email: 'Invalid address' },
          resolver: callback('resolver'),
          onChange: callback('controlled-change'),
          onError: callback('controlled-error'),
          onSubmit: callback('submit'),
          ref
        },
        h(api.FormControl.default, { name: 'email', id: 'email-input', 'aria-label': 'Email', ref })
      ),
      expected: [
        /value="controlled@example.com"/,
        /aria-invalid="true"/,
        /aria-errormessage="email-input-error-message"/,
        /id="email-input-error-message"/,
        /role="alert"/,
        /Invalid address/
      ]
    },
    {
      name: 'error summary exposes labelled navigation',
      element: h(api.FormErrorSummary.default, {
        header: 'Please correct these fields',
        items: [
          { name: 'email', label: 'Email', message: 'Invalid address', controlId: 'email-input' }
        ],
        onSelect: callback('summary-select'),
        ref
      }),
      expected: [
        /role="region"/,
        /aria-labelledby=/,
        /Please correct these fields/,
        /href="#email-input"/,
        /Invalid address/
      ]
    },
    {
      name: 'SelectPicker preserves the raw zero selection',
      element: h(api.SelectPicker.default, {
        data: [{ value: 0, label: 'Zero option' }],
        value: 0,
        onChange: callback('picker-change'),
        onSelect: callback('picker-select'),
        onOpen: callback('picker-open'),
        ref
      }),
      expected: [/role="combobox"/, /aria-expanded="false"/, /Zero option/],
      absent: [/rs-picker-placeholder/]
    },
    {
      name: 'ordinary Button renders without invoking callbacks',
      element: h(
        api.Button.default,
        { type: 'button', onClick: callback('button-click'), ref },
        'Save draft'
      ),
      expected: [/<button/, /type="button"/, /Save draft/]
    },
    ...[false, true].map(loading => ({
      name: 'automatic Button renders controlled loading=' + loading + ' without running actions',
      element: h(
        api.Button.default,
        {
          autoLoading: true,
          loading,
          onClick: callback('automatic-button-click'),
          onClickError: callback('automatic-button-error'),
          ref
        },
        'Save action'
      ),
      expected: [
        /<button/,
        /Save action/,
        new RegExp('data-loading="' + loading + '"'),
        ...(loading ? [/aria-busy="true"/] : [])
      ],
      absent: [/autoLoading=/i, /onClickError=/i, ...(loading ? [] : [/aria-busy=/])]
    }))
  ];
}
const cases = [];
let renders = 0;
for (const [method, render] of Object.entries({
  renderToString: renderer.renderToString,
  renderToStaticMarkup: renderer.renderToStaticMarkup
})) {
  const left = fixtures(cjs);
  const right = fixtures(esm);
  for (let index = 0; index < left.length; index++) {
    assertNoDOM();
    const cjsMarkup = render(left[index].element);
    const esmMarkup = render(right[index].element);
    for (const expression of left[index].expected) {
      assert.match(cjsMarkup, expression, 'CJS ' + left[index].name);
      assert.match(esmMarkup, expression, 'ESM ' + right[index].name);
    }
    for (const expression of left[index].absent || []) {
      assert.doesNotMatch(cjsMarkup, expression);
      assert.doesNotMatch(esmMarkup, expression);
    }
    assert.equal(cjsMarkup, esmMarkup, method + ' ' + left[index].name);
    assertNoDOM();
    assert.deepEqual(calls, [], 'SSR must not invoke business, resolver, or ref callbacks');
    renders += 2;
    cases.push({ method, name: left[index].name, cjsEqualsEsm: true });
  }
}
console.log(
  JSON.stringify({
    node: process.version,
    react: React.version,
    reactDOM: ReactDOM.version,
    serverRenderer: renderer.version,
    iconsPeerSame: React === iconsReact,
    tablePeerSame: React === tableReact,
    resolvedCJS,
    identities,
    cases,
    renders,
    callbackCount: calls.length,
    DOMAbsent: true
  })
);
