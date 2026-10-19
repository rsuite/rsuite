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
not a direct measurement of screen presentation. Painted rows are located by viewport hit tests;
offscreen rows are counted without a per-row geometry scan. Instrumentation cost still depends
on DOM structure. Preserve raw samples and account for it when interpreting differences.
Nearest-rank p50/p95 values are descriptive, without pass thresholds or confidence claims.

The renderer adds the same label marker to all adapters. Native virtualization is used for
RSuite and Ant Design. Chakra uses its documented TanStack virtualizer composition; HeroUI's
ListBox is composed with the React Aria Virtualizer. These integration differences are part
of the recorded configuration and must not be hidden as an identical internal implementation.

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
