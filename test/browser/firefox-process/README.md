# Ordinary Firefox process diagnostics

Firefox component CI runs the existing `npm run test:ci -- --browser.headless`
command through this external wrapper. Shards and other arguments are forwarded
unchanged. Browser configuration, native input, coverage, serial file execution,
assertions and deadlines retain their existing settings. The wrapper does not
enable the native profiler or use its connected-browser launcher.

On Linux, the wrapper reads its owned child-process family every 200ms. It keeps
process/main-thread CPU counters, scheduler runtime and run-queue counters,
wait channels and available system pressure data. PID/parent/start-time checks
reject reused or unrelated processes. Counters stay in their original clock-tick
or nanosecond units; `clockTicksPerSecond` records the clock query when available.
Kernel scheduler statistics can be disabled; their setting
and unavailable files are recorded, never represented as measured zero waits.

Each invocation writes `summary.json`, `tests.log`, timestamped byte offsets and
`process-samples.jsonl` under `artifacts/firefox-process/`. Up to 64 processes
and 10,000 samples are retained; truncation is explicit. Process command lines
and environments are not read; the summary records the launched test arguments.
CI retains these files after success or
failure. Original nonzero test exits propagate unchanged; a passing Linux run
without Firefox scheduler samples fails the diagnostics check.

On other platforms the ordinary command still runs and reports process sampling
as unsupported. Such a run does not qualify Linux process capture. The external
sampler has overhead and is not a performance benchmark or a native JavaScript
stack profile. Independent Firefox native-profile shards remain required.
Sample timestamps include collection duration, and observer CPU counters are
retained in microseconds so analysis can account for the observer's own work.

Transition failure observations include the browser clock origin and capture
time so their timer/state records can be aligned with these process samples.
Use the actual sample interval, process identity and counter availability before
attributing a delay to CPU work, runnable-thread waiting or another actor. A
passing diagnostic run does not explain an earlier unprofiled failure.

Counter formats follow the Linux [process-stat documentation](https://man7.org/linux/man-pages/man5/proc_pid_stat.5.html)
and [scheduler statistics](https://docs.kernel.org/scheduler/sched-stats.html).
Interpret pressure fields using the [kernel PSI documentation](https://docs.kernel.org/accounting/psi.html);
system-wide CPU `full` is undefined and cannot establish an absence of CPU contention.
