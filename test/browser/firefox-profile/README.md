# Native Firefox failure profiles

Use this optional launcher to investigate delayed callbacks or stalled component
tests on Linux or macOS. It runs the existing component tests in headless Firefox
and retains their exit code. It does not retry tests or change their assertions,
timeouts or state updates. Ordinary test commands keep their existing launcher.

Select the React runtime as usual, install the project-local Firefox browser, then:

```sh
node scripts/install-browser-ci.cjs firefox
F=src/Animation/test/Transition.refs.keyboard.spec.tsx npm run test:firefox-profile
npm run test:firefox-profile -- --coverage --shard=2/2
```

File filters, test names, shards, coverage and reporters are forwarded to Vitest.
The browser and config are fixed by this command. `RUN_ENV` may be `test` or `ci`.
For fixtures outside the default `src` include, set the existing `F` selector.

Each invocation prints a unique directory under `artifacts/firefox-profile/`.
Set `RSUITE_FIREFOX_PROFILE_DIR` to choose another parent directory. The directory
contains `tests.log`, `summary.json` and, when a test fails, a native Gecko profile.
The browser-side failure hook waits for the requesting content process to appear
in the profile before its test frame can be destroyed. Only the first failed test
is captured; later assertion failures remain in the ordinary test report.

Open the JSON profile in [Firefox Profiler](https://profiler.firefox.com/). Its
UserTiming markers identify the test ID and capture request. `summary.json`
records the profile hash and actual sampling configuration. A passing run records
`not-requested`; a capture error is recorded separately from the original test
exit code, and partial files are retained.

HTTP capture errors return a fixed message. Detailed errors and stack traces
remain in the local `summary.json`, including the first rejected request.

The launcher uses an owned Playwright `launchServer` process handle and Firefox's
[POSIX profiler stop signal](https://github.com/firefox-devtools/profiler/blob/main/docs-user/async-posix-signal-control.md).
It samples the main thread with JavaScript and native stacks every 2ms. Firefox
142 clamps capacity to at least 16,777,216 entries (128MiB of nominal entry
storage); this is not an RSS measurement. Profiling overhead has not been
qualified for performance comparisons. Profiles and logs contain test source
paths and page URLs, so use test data when sharing them.

```sh
npm run test:firefox-profile-controls
```

The controls verify partial exports, missing content frames, invalid requests,
owned-process signaling and capture errors, then run real native pointer input
through passing and intentionally failing test fixtures. They retain the original
assertion messages and exit codes, verify the first failure's content marker and
profile hash, and keep their artifacts for inspection. Firefox native shard1
runs these controls in CI for each supported React runtime.
