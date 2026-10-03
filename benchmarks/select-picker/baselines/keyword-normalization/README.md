# Default search keyword normalization snapshot

This matching pair records a local production SelectPicker run before and after normalizing the default search keyword once per filtering pass. The measured source versions differ only in the four search implementation/test files; both include the same virtual keyboard scroll fix and benchmark fixture.

The complete, untrimmed reports are [before.json](before.json) and [after.json](after.json), with 721 samples each. Their metadata retains the **actual measured source commits**, even though these reports were committed afterward. The earlier benchmark snapshots at revision `fcb2ee9c6` are separate historical runs and are not used in this comparison.

## Reproduction and environment

At each source revision, run:

```sh
npm run bench:select-picker -- --sizes 50000 --warmups 5 --iterations 30 --browser chromium --output snapshot.json
```

Both runs use the complete production build path (`skipBuild: false`), built ESM and the official stylesheet. They ran sequentially on one machine while other repository browser, build and type-check jobs were paused. The fixture and settings are identical: React 19.0.0, Chromium 141.0.7390.37, headless 1280 × 800, device pixel ratio 1, 180px list height, 36px items and two overscan rows. The host was an Apple M4 Pro with 14 CPU cores, Darwin 25.5.0 arm64, Node 24.12.0, Vite 6.3.5 and Playwright 1.56.1.

| Snapshot | Recorded run start (UTC) | Source commit                              | Built fixture SHA-256                                              |
| -------- | ------------------------ | ------------------------------------------ | ------------------------------------------------------------------ |
| Before   | 2026-10-03 21:10:49.855  | `82f8572a7380f4621c8e56432f42e30d2e160077` | `0e8d50cd14b5a75dd403f9b299d9c34ba4e3d715e27669f126cd0570961d4a47` |
| After    | 2026-10-03 21:12:12.164  | `05c6b6096c7844f603f50d0aa78cbfd4ba4d51d1` | `4236276493664b1cfa2166f8f79d32101fc768e2866bdc3e9f2e952f7648f9bc` |

## Results

Durations run from trusted browser event capture to the benchmark's usable DOM/ARIA/focus condition. Filtering replaces an empty query in one native input event; query reset and preparation are outside the measurement. Percentiles use nearest rank over all 30 trials without retries, trimming or timing thresholds.

| Filter query     | Matching options | Before p50 / p95 (ms) | After p50 / p95 (ms) | Maximum mounted rows |
| ---------------- | ---------------: | --------------------: | -------------------: | -------------------: |
| `Item`           |    50,000 (100%) |           11.0 / 11.5 |            4.1 / 4.7 |                    7 |
| `match`          |         500 (1%) |           10.8 / 11.6 |            4.3 / 4.7 |                    7 |
| `no-such-option` |                0 |             9.5 / 9.8 |            2.8 / 3.0 |                    0 |

Each report also retains one first-open observation, 30 warm opens and 600 single-key observations from 30 native keyboard trials of 20 consecutive ArrowDown keys followed by correct Enter selection. All 721 measured events were trusted, DOM/frame durations were finite and every trial completed without browser errors. Every readiness snapshot contained at most nine option rows. First-open is a single observation, not a percentile estimate.

`frameReadyMs` records the additional check after two animation frames; it is a readiness proxy, not proof of paint. Mounted row counts are captured at DOM readiness and the completion condition is rechecked after those frames. These measurements are **not INP or paint measurements**, and this single-machine pair does not establish cross-machine performance or library rankings. Reproduce locally rather than comparing absolute values across machines. See the [benchmark guide](../../README.md) for the fixture, measurement boundaries and setup costs.
