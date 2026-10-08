# SelectPicker interaction benchmark

This benchmark runs the built RSuite ESM SelectPicker and official CSS in a production-built
application, using one real Chromium or Firefox page at a time. It measures virtualized lists
with 1,000, 10,000, and 50,000 options. It is a reproducible local baseline, with no timing
pass/fail threshold or comparison to other libraries.

## Run

Install dependencies and the desired Playwright browser, then run:

    npm ci --legacy-peer-deps
    npx playwright install chromium
    npm run bench:select-picker

The command builds the library, styles, and Vite production fixture, then serves the static
output locally. It does not use the Vitest browser runner or a development server.

A smaller correctness check:

    npm run bench:select-picker -- --sizes 1000 --warmups 0 --iterations 1

Firefox and custom output:

    npx playwright install firefox
    npm run bench:select-picker -- --browser firefox --output benchmarks/select-picker/results/firefox.json

Use --skip-build only to reuse the existing library and fixture build. The report includes the
fixture bundle hash and current checkout commit/dirty state. Always rebuild after source changes.
Sizes must be unique integers from 100 to 1,000,000; iterations must be positive. Default warmups
are 5 per scenario, with 30 measured trials.

## Workload and fixture costs

Each size gets a fresh page. A deterministic option array is generated once, outside React
rendering, and is reused throughout that page's trials. Labels are plain text: “Item N”, with
“match” appended to every hundredth option. The fixture has no StrictMode, custom option renderer,
data fetching, or business logic. It uses a 240px picker width, 180px list height, 36px item size,
and overscan of 2, at a 1280 × 800 viewport and device pixel ratio of 1.

Data generation and closed-picker mounting are recorded separately in the fixture metadata;
they are excluded from interaction samples. The first opening is retained as a separate single
observation. Warm reopening is reported after the configured warmups, without mixing these costs.
Browser startup, navigation, CSS loading, and fonts readiness are outside interaction timings.

The scenarios are:

- Opening: trusted toggle click until the expanded popup has positioned options and the expected
  logical row count.
- Filtering: an empty search query is replaced with one input event using keyboard.insertText.
  This represents pasting/replacing a query, rather than typing its characters individually.
  “Item” matches 100%, “match” matches 1% (rounded down), and “no-such-option” matches none.
  Completion requires the expected logical count, first option, and query highlight, or the
  no-results message. Clearing and focusing the search input happen outside measurement.
- Keyboard: 20 consecutive trusted ArrowDown events per trial, starting with one focus on the
  toggle. Subsequent events follow actual option focus across the virtual window. Each key
  completes only when its expected option is mounted, positioned inside the list viewport,
  focused, and referenced by aria-activedescendant. Enter must select option 20 and restore
  toggle focus. Selection clearing and reopening are outside measurement.

## Timing and results

Timing starts in a browser event capture listener, before the React event handler. A scoped
MutationObserver and focus listener detect the expected DOM state. This avoids including Node
RPC, Playwright locator waiting, or polling delays in the reported interaction durations.
Instrumentation reads only mounted virtual rows; observer predicate reads and necessary layout
checks are included in the DOM-ready duration. Default opening animation completion is excluded.
Mounted row counts and focus metadata are captured at DOM-ready; readiness is checked again after
the two frame callbacks to reject interactions whose expected DOM/focus did not remain ready.

DOM-ready is a DOM/layout/ARIA/focus readiness metric. Frame-ready additionally waits for two
requestAnimationFrame callbacks, as a rendering-opportunity proxy; it is not a paint, presentation,
or INP measurement. The keyboard summary aggregates individual key samples, and raw samples retain
trial and key indices so entry keys and window crossings can be inspected separately.

The JSON report contains every measured sample, p50/p95 using nearest-rank percentiles, mounted
row counts, fixture setup costs, and OS/CPU/Node/React/browser/tool versions, viewport, checkout
commit, dirty state, and production bundle SHA-256. Results are ignored by git. Keep raw reports
when comparing changes, and use the same machine, browser build, and workload configuration.
The first-open summary has one observation, not a distribution.

Interaction correctness failures or browser errors produce a nonzero exit and a partial report.
They must be resolved before interpreting timings. There is no automatic retry, sample trimming,
or timing threshold. Do not run other browser suites, builds, or CPU-heavy work concurrently with
measurements. Timing comparisons across machines or operating systems need separate baselines.

## Compare reopening in one browser process

For an additional opening control, `compare-opening.mjs --before path/to/.build --after path/to/.build`
serves two existing production builds from one origin and visits them in ABBA order in one browser
page. It excludes each document's first opening and warmups, then uses the same fixture readiness
checks. Pass `--browser firefox` for Firefox or `--help` for size, trial, and output options.
Reports contain both bundle hashes and every measured opening. The
[keyword normalization comparison](baselines/keyword-normalization/README.md) includes full-run
and shared-process control results, raw reports, and reproduction commands.
