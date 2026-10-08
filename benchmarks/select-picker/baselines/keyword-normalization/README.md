# Default search keyword normalization

This comparison measures the default SelectPicker search path with 50,000 plain-text options.
Normalizing the query once per filtering pass removes repeated trimming and locale lowercasing
for every option. Label matching and the synchronous callback/render filtering passes remain.
It does not add a search index, cache label text, or change the custom `searchBy` contract.

## Revisions and environment

- Before: `b3fe7aaab31c5c0b3004c403021fd991b738172d` (the production benchmark merged by #4632).
- After, primary round: `c50bf96cbe026b50822955939413786e4efa1d5e`.
- After, reverse round: `b8f26b57119e2d8cd63e3096b6040ca4fa747d97`, a merge with exactly the same
  tree as the primary after revision. The final PR adds evidence and the opening comparison CLI;
  the measured library source is unchanged.
- Node 22.22.3, React 19.0.0, RSuite 6.2.5, Vite 6.3.5, Playwright 1.56.1.
- Chromium 141.0.7390.37 and Firefox 142.0.1, headless; Apple M4 Pro (14 cores), Darwin 25.5.0 arm64.
- 1280 × 800 viewport, device pixel ratio 1, list height 180, item size 36, overscan 2.
- Before production bundle SHA-256:
  `13bfb4de413a44f5e8790e26ce4e238d0b768cfc32563208cd11a5600ab9caab`.
- After production bundle SHA-256:
  `4f5200abea1a839d0130ca92f4612ef98161d67d8a54da0de2ee600555f98a8b`.

All full-run reports record clean source checkouts. Chromium primary runs rebuilt the library,
official styles and production fixture. Firefox and the reverse round reused those exact bundles;
their hashes match across every run of each revision. Measurements ran serially, without another
browser suite or build running concurrently.

## Results

The primary round ran before then after in each engine; one reverse-order round followed to check
an observed opening slowdown. Both rounds are retained. Each full run uses five warmups per
scenario and 30 measured trials, with 20 ArrowDown events per keyboard trial. Eight runs contain
5,768 samples: 721 each, including one first-open observation per run. All interactions passed
their DOM/focus checks, used trusted browser events, and mounted at most nine option rows.

The table pools both rounds without trimming: 60 trials per query/opening and 1,200 individual
keyboard events per revision per engine. Percentiles use nearest rank and are rounded to 0.1 ms.

| Browser  | Scenario       | Before p50 / p95 (ms) | After p50 / p95 (ms) |
| -------- | -------------- | --------------------- | -------------------- |
| Chromium | Item           | 11.4 / 12.0           | 4.3 / 4.9            |
| Chromium | match          | 11.0 / 11.6           | 4.3 / 4.6            |
| Chromium | no-such-option | 10.0 / 10.4           | 2.8 / 3.0            |
| Chromium | open           | 4.3 / 7.6             | 5.4 / 7.8            |
| Chromium | arrow-down     | 2.9 / 4.1             | 3.0 / 3.9            |
| Firefox  | Item           | 13.0 / 15.0           | 7.0 / 8.0            |
| Firefox  | match          | 13.0 / 14.0           | 7.0 / 8.0            |
| Firefox  | no-such-option | 12.0 / 14.0           | 5.0 / 6.0            |
| Firefox  | open           | 5.0 / 10.0            | 8.0 / 10.0           |
| Firefox  | arrow-down     | 4.0 / 5.0             | 4.0 / 5.0            |

Search DOM-ready medians improve by approximately 61–72% in Chromium and 46–58% in Firefox on
this workload. The result is specific to default filtering with plain-text labels on this machine;
it is not a claim about custom predicates, arbitrary datasets, or other libraries.

DOM-ready includes the fixture's DOM/layout/ARIA checks. Raw reports also retain frame-ready
durations, which add two animation-frame callbacks. That is a rendering-opportunity proxy, not
paint, presentation or INP. First-open has one observation per run and is not a percentile
distribution. See the [benchmark methodology](../../README.md) for scenario details.

## Opening control and limitations

The full runs showed higher opening medians after the change: Chromium 3.0 → 5.0 ms in the
primary round and 4.9 → 5.5 ms in the reverse round; Firefox 5 → 8 ms and 4 → 8 ms. These
observations remain in the table and raw reports above.

To investigate process-level variation, the same unmodified bundles were also served from one
origin in one browser process and page per engine. Each visit navigated to a fresh document in
before/after/after/before (ABBA) order, excluded its first opening and five warmups, and measured
30 openings. There was no CPU profiling or prototype instrumentation in these timings.
The initial control used a local diagnostic harness; the second control validated the portable
CLI included in this PR. Both sets are retained, with 60 openings per revision per engine each.

| Run                     | Browser  | Before p50 / p95 (ms) | After p50 / p95 (ms) |
| ----------------------- | -------- | --------------------- | -------------------- |
| Initial control         | Chromium | 4.6 / 7.7             | 4.2 / 7.9            |
| Initial control         | Firefox  | 9.0 / 11.0            | 8.0 / 10.0           |
| Portable CLI validation | Chromium | 2.4 / 7.3             | 2.2 / 4.6            |
| Portable CLI validation | Firefox  | 7.0 / 10.0            | 5.0 / 10.0           |

The higher opening medians did not reproduce under these shared-process controls. They do not
establish the cause of the separate-process variation or prove that every interaction improves.
The performance claim is limited to the search results above; there is no timing CI threshold.

## Reproduce and inspect

Create separate checkouts of the before and primary after commits. In each, use Node 22.22.3,
run `npm ci --legacy-peer-deps`, and install the browsers with
`npx playwright install chromium firefox`. Run the Chromium command in before then after, followed
by the Firefox command in before then after:

```sh
npm run bench:select-picker -- --sizes 50000 --warmups 5 --iterations 30 --browser chromium
npm run bench:select-picker -- --sizes 50000 --warmups 5 --iterations 30 --browser firefox --skip-build
```

For the reverse round, run the same commands in after then before for each engine, adding
`--skip-build` to Chromium too. Preserve every output file. Rebuild after any library or fixture
source change; do not reuse bundles from a different source revision.

From the final PR checkout, compare the two existing build directories (repeat with Firefox):

```sh
node benchmarks/select-picker/compare-opening.mjs \
  --before ../rsuite-before/benchmarks/select-picker/.build \
  --after ../rsuite-after/benchmarks/select-picker/.build \
  --browser chromium
```

This CLI records both bundle hashes and all opening samples, validates fixture settings, and
uses the original fixture's readiness checks. Its default order, size, warmups and trial count
match the controls above. Interaction failures produce a nonzero exit and a partial report.

The 12 `.json.gz` files in this directory are losslessly compressed original JSON reports.
Names without `reverse-` are primary full runs; `reverse-` denotes the second full round;
`shared-process-opening-` is the initial ABBA control and `portable-opening-` is the CLI validation.
[manifest.json](manifest.json) lists byte lengths and SHA-256 hashes of both compressed and
original bytes. For example:

```sh
gzip -dc benchmarks/select-picker/baselines/keyword-normalization/before-chromium.json.gz > before.json
```

All 6,248 full-run and opening-control samples are retained. No measured samples or unfavorable
controls were discarded. The reverse round and both opening controls are included above.
