# Table configuration bundle baseline

Table reads provider defaults, RTL and common locale configuration without formatting or
parsing dates. Its configuration hook previously created date adapters unconditionally.
Table now uses the private configuration hook introduced in the
[component configuration extraction](./component-config.md). The public Table wrappers,
forwarded ref, event props, static subcomponents and provider date adapters are unchanged.

[table-config.json](./table-config.json) records actual built-package consumers before and
after changing Table's own hook call, based on `c3acc61cc6beb0ac9086a412dde4feba13597251`.
Recorded versions are **esbuild 0.25.2, date-fns 4.1.0, Lodash 4.17.21, and rsuite-table 5.19.2**.
The comparison uses browser ESM ES2020, minification and tree shaking, production defines,
React/ReactDOM external and gzip level 9. It excludes CSS and runtime timing.

| Consumer               | Before minified bytes | After minified bytes | Before gzip bytes | After gzip bytes |
| ---------------------- | --------------------: | -------------------: | ----------------: | ---------------: |
| Root Table             |               152,376 |              115,826 |            50,748 |           43,052 |
| Table subpath          |               152,386 |              115,836 |            50,820 |           43,257 |
| Root CustomProvider    |                55,434 |               55,434 |            21,975 |           21,975 |
| CustomProvider subpath |                55,446 |               55,446 |            21,948 |           21,948 |
| Root DateInput         |               101,197 |              101,197 |            32,303 |           32,303 |
| DateInput subpath      |               101,207 |              101,207 |            32,317 |           32,317 |

The Table bundles retain 7,033 bytes of date-fns locale output, down from 42,844 bytes of
date-fns output including the unused formatting and parsing implementations. Date
dependencies are not zero: the existing default locale remains. CustomProvider and DateInput
control outputs have identical before/after hashes. The external rsuite-table implementation
and all date consumers are unchanged. These local import measurements do not predict a
whole application's savings.

To reproduce, build both checkouts with `npx gulp build`, then run the consumer measurement
snippet in [component-config.md](./component-config.md) with the entry names changed to
`['Table', 'CustomProvider', 'DateInput']` and without the `Fade-namespace-root` entry.
The snippet resolves the built package root and public subpath `module` entries through a
temporary package link and keeps each exported component observable. Inspect positive output
`bytesInOutput` in its metafiles for dependency retention. Raw JavaScript and metafiles remain
in the printed directory. The report records source and output SHA256 values, dependency
versions, options and compression settings. Rebuild before every comparison.
