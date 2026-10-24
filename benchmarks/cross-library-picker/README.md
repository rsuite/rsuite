# Cross-library picker comparison

This production-browser fixture exercises RSuite, Ant Design, Chakra UI and HeroUI using a
shared dataset and visible outcomes. It is a measurement tool, not evidence of an overall
library ranking. Correctness failures remain failures in the report and must be diagnosed
before comparing timings. A one-iteration run only validates the fixture.

## Reproduce

Use Node.js 24, the runtime used for validation. Build RSuite from the repository root, then
install this isolated development project:

    npm ci --legacy-peer-deps
    npm run build
    cd benchmarks/cross-library-picker
    npm ci --ignore-scripts
    npx playwright install chromium firefox
    npm run check
    npm run bench -- --browser chromium --output results/chromium.json

The local `file:../../lib` dependency is copied into this project's installation using
`install-links=true`. Reinstall this project after rebuilding RSuite. Both the installed
candidate package fingerprint and all fixture/runner/lockfile hashes are recorded. The installed
package must also match the repository build byte for byte. The runner
rejects stale or changed build inputs, including when `--skip-build` is used. All competitor
versions and transitive resolutions are frozen by this project's separate lockfile. They do
not become runtime dependencies of RSuite.
RSuite uses the current source build; competitors use their pinned npm releases. Include this
distinction and the recorded source commit when reporting results.

A bounded correctness run across ordinary and virtualized lists:

    npm run bench -- --sizes 1000 --modes standard,virtualized --warmups 0 --iterations 1

The default is virtualized 1k, 10k and 50k options, five warmups and thirty measured trials.
Use `--browser firefox` for a separate browser report. Library order is randomized with a
recorded seed; each library/size/mode receives a fresh browser context. Run comparisons on an
otherwise idle machine and repeat with another seed before drawing performance conclusions.

## JavaScript and CSS accounting

Run separate production builds and native correctness checks for full and component styles:

    npm run audit:assets -- --output results/styles.json
    npm run check:assets

The default covers both browsers, four libraries, ordinary and virtualized 1k lists, and both
style profiles. `--browsers`, `--profiles`, `--libraries`, `--modes` and `--size` record explicit
subsets. This is one-iteration correctness and payload accounting, not repeated performance
evidence. Existing timing commands retain their full-style build and deadlines.

These builds use `dist-styles/full` and `dist-styles/component`, independently of `dist`.
`--skip-build` rejects mismatched profiles, source/package fingerprints or changed artifacts.
The component profile uses RSuite's public SelectPicker CSS entry and HeroUI's published
ComboBox, Input, ListBox and ListBoxItem CSS. HeroUI's base, utilities, variants, animation
dependency and complete official default theme remain included. Ant Design's ConfigProvider
and Chakra's defaultSystem stay unchanged and produce their automatic styles in JavaScript.
These are documented configurations, not mathematical minimum-size claims.

Reports separate static initial imports, all reachable imports, and unique assets actually
requested over the whole workflow, including its fresh navigations. JS/CSS totals exclude
HTML, build logs and analysis JSON. Shared assets count once, and each actual asset is gzip
compressed separately with the same Node defaults. This does not measure negotiated wire
transfer. Rollup module/package contributions identify included peers, providers and fixture
code before final minification; their character counts are not per-package gzip attribution.

React, ReactDOM, other runtime dependencies and measurement code are included. CSS-in-JS is
not treated as style-free: CSSOM inline/constructed stylesheet sizes are recorded separately
at closed, open, empty, keyboard-scrolled and selected checkpoints. That serialized CSS is
already represented in JavaScript and is never added to payload totals twice. Checkpoints
also compare selected computed properties on representative combobox, trigger, popup and
actual visible/active label, search-input, empty-text and trigger-icon nodes within each
library/browser/mode. Nonpainting container currentColor and zero-width border/outline
colors remain in the raw observations but do not imply a visible mismatch. Inherited font
rasterization properties are recorded separately: full styles can include a document reset
that component styles omit. These checks do not establish pixel equivalence. Each native
case injects a visible label color fault, requires its detection and restores the exact
inline style before continuing. Checkpoints and fault controls run outside measured intervals.
Failures, style differences and diagnostic artifacts remain in the report and exit nonzero.
`check:assets` corrupts one built asset and one profile identity in turn, requires early
rejection with no native cases, and restores the exact original bytes in `finally` blocks.
The Picker asset accounting workflow runs these commands on Linux with both browsers and
uploads the raw reports and built assets even when a check fails.

Public style references: [RSuite component imports](https://rsuitejs.com/guide/usage/),
[HeroUI specific imports](https://github.com/heroui-inc/heroui/blob/v3/packages/styles/README.md).

## Automated accessibility audit

Use the same installed project and production build for a separate four-state audit:

    npm run audit:a11y -- --browser chromium --output results/a11y-chromium.json
    npm run audit:a11y -- --browser firefox --output results/a11y-firefox.json

The default is all four libraries with 1,000 virtualized options. `--libraries`, `--sizes`,
`--modes` and `--skip-build` follow the benchmark's configuration and integrity rules. For
ordinary and virtualized lists together, pass `--modes standard,virtualized`. Each configured
case records closed, open, keyboard-scrolled and empty-search states in that order. Native
keys must expose each option from 1 through 21, with the connected active option fully visible.
Opening animations must finish before scanning; the report retains the sampled appearance.

The pinned axe-core engine runs WCAG 2/2.1/2.2 A and AA tagged rules on the whole fixture page.
Separate fixture checks record broken ID references, including expanded comboboxes whose
controlled listbox is absent. A known unlabelled-input fault must be accessible and detected
in a separate control document, so popup focus/visibility policies cannot hide the fault.
It is removed and is not included in the measured states. Engine version/hash, browser/runtime,
build inputs and complete raw axe results accompany the report.

The command exits **1** for confirmed violations, broken fixture references, failed/missing
states, browser errors or a failed engine control. A completed audit can therefore exit 1;
known defects in any library are retained, not skipped. Failed cases are saved before bounded
artifact capture. The summary counts rule occurrences across states, not unique defects or
library scores. Incomplete axe results remain manual-review items, including on exit 0.

Neither zero confirmed violations nor this fixed fixture establishes accessibility
conformance, screen-reader support, OS IME/mobile behavior, internationalization, coverage of
all components or relative leadership. Manual assessment remains required. Accessibility
runs do not produce timing comparisons. `npm run check` covers failure aggregation, invalid
references and a nonresponsive browser audit in addition to diagnostic artifact deadlines.

## Async application workflow

Run separate production entries for the same four pinned adapters:

    npm run test:async -- --browser chromium --output results/async-chromium.json
    npm run test:async -- --browser firefox --output results/async-firefox.json

Both ordinary and virtualized menus run by default. `--libraries`, `--modes`, `--scenarios`
and `--skip-build` can select a documented subset; the report records that configuration.
The initial collection has 1,000 items. Browser-intercepted HTTP requests return the same
30-result collections, including a disabled second item, for every adapter. This is a
deterministic server substitute, not a measurement of networking speed.

The shared application owns fetch, response validation, latest-response ordering, a
pending/error announcement and controlled selection. These are not credited as library
features. Each adapter uses public APIs: RSuite `data`/`onSearch`/`value`, Ant Design
`options`/`showSearch`/`value`, Chakra's collection/input/value callbacks, and HeroUI's
`items`/`onInputChange`/`selectedKey`. Server results are not filtered again locally.

The response-order case delivers a newer query before its predecessor, then uses native
keys to skip the disabled result and select the third one. The recovery case selects an
item, receives HTTP 500, receives an empty collection, and selects from a later successful
response. The target workflow retains selection during an independent search. Editable
combobox and separate-search dropdown designs may require different application composition
to achieve that target; a failed retention expectation alone does not establish a defect.

Checkpoints wait for animations and two frames. Final selection also waits for all
selection-triggered requests. Reports retain snapshots, existing ID references, native input
and keyboard trust, request/selection logs, original errors and bounded failure artifacts.
Missing states/cases, runtime errors, or unmet workflow expectations exit 1. Failed cases
stop at their first unmet expectation; later steps in those cases are not assessed. Counts
are case outcomes, not unique defects or library scores. No timing, library-wide ranking,
screen-reader, IME, mobile or accessibility-conformance conclusion is produced.

The async entries have their own build manifest and output directory. The original timing
entries remain separate. Rebuild after changing source or the installed candidate package;
`--skip-build` rejects stale source/package fingerprints or modified built assets.

## Workload and completion

Every adapter receives the same stable string values and plain ASCII labels. Every hundredth
label contains `match`. Data generation and closed mounting are recorded separately and
excluded from interaction samples. The viewport is 1280 x 800, device scale is 1, locale is
en-US and reduced motion is requested. The input width is 240px, rows are 36px and the list
height is capped at 180px. Each library uses its official style/theme setup. The report's
build manifest identifies the exact JavaScript and CSS assets, versions and source commit.

- First opening and warm reopening: trusted pointerdown to a positioned, visible popup whose
  first visible item is item 1. Warm openings reuse the same instance without a selection.
- Sparse filtering: a trusted input event replaces the query with `match`, until item 100 is
  visibly first. Empty filtering uses `no-such-option` and requires a visible empty result.
  Clearing and focusing the input happen outside measurement. These are replacement/paste
  workloads; incremental typing, locale collation and filtering that leaves identical output
  are separate workloads and are not measured here.
- Keyboard: native ArrowDown events move from the same highlighted item 1 through item 21,
  crossing the list viewport. Every sample requires a connected active option reference and
  the expected option fully visible inside all clipping ancestors. Physical row focus and input-retained virtual
  focus are accepted according to their actual DOM/ARIA contracts. Enter must report value 21
  and close the popup. Each keyboard trial starts with a freshly mounted instance, outside
  timing; these samples are not a sustained typing benchmark.
- Separate preflights require a trusted wheel event to advance the viewport, verify both ends
  through real DOM scroll offsets (outside timing), then
  filter to the final dataset item and select it with native keys,
  checking that adapters did not silently truncate the supplied collection.

Timing starts in document capture before the component handles the trusted event. A shared
MutationObserver and geometry checks detect the visible outcome. `domReadyMs` includes this
instrumentation; `frameReadyMs` includes two subsequent animation frames and is frame-quantized,
not a direct measurement of screen presentation. Visible options are checked by physical row
geometry and ancestor clipping, independently of pointer hit testing. Small virtual windows are
scanned directly; large ordinary lists use bounded indexing under this fixture's uniform,
DOM-ordered row contract, with first/middle/last geometry checks. Offscreen rows are counted
without a per-row geometry scan. Instrumentation cost still depends
on DOM structure. Preserve raw samples and account for it when interpreting differences.
Nearest-rank p50/p95 values are descriptive, without pass thresholds or confidence claims.

The renderer adds the same label marker to all adapters. Native virtualization is used for
RSuite and Ant Design. Chakra uses its documented TanStack virtualizer composition; HeroUI's
ListBox is composed with the React Aria Virtualizer. These integration differences are part
of the recorded configuration and must not be hidden as an identical internal implementation.

HeroUI's Tailwind utility detection is restricted to browser fixture sources and the HTML
entry point, using [Tailwind's explicit source registration](https://tailwindcss.com/docs/detecting-classes-in-source-files).
Runner code, audit prose and results must not generate extra CSS. This corrects the earlier
automatic project-wide utility scan; retain the build manifest when comparing different
fixture revisions. The official HeroUI style import remains the full style profile.

## Sources and limits

- [Ant Design Select](https://ant.design/components/select/)
- [Chakra Combobox](https://chakra-ui.com/docs/components/combobox) and
  [official virtualized composition](https://github.com/chakra-ui/chakra-ui/blob/main/apps/compositions/src/examples/combobox-virtualized.tsx)
- [HeroUI v3 ComboBox](https://heroui.com/en/docs/react/components/combo-box)
- [React Aria Virtualizer](https://react-aria.adobe.com/Virtualizer)

This suite does not establish screen-reader accessibility, real OS IME behavior, mobile-device
behavior, overall component coverage, or application-wide performance. Those acceptance areas
remain separate. Browser errors and failed cases are retained with screenshots and diagnostics;
the runner exits nonzero if any case fails. Results apply to their measured workloads.
Generated builds, raw results, screenshots and installed dependencies stay untracked.

Failed cases are saved before collecting artifacts. Screenshot and state probes each have a
three-second diagnostic deadline; capture failures are recorded separately from the original
workload error. The failed status, primary error and navigation/interaction deadlines are
preserved. `npm run check` also exercises stalled/erroring probes.
