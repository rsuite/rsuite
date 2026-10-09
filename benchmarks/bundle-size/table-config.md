# Table configuration bundle baseline

Table reads provider defaults, RTL and common locale configuration without formatting or
parsing dates. Its configuration hook previously created date adapters unconditionally.
Table now uses the private configuration hook introduced in the
[component configuration extraction](./component-config.md). The public Table wrappers,
forwarded ref, event props, static subcomponents and provider date adapters are unchanged.

[table-config.json](./table-config.json) records freshly built public-package consumers before
and after changing Table's hook call, using baseline source commit
`468ef370976b23479c5b9603906471217bccfe86`.
Recorded versions are **Node v24.12.0, esbuild 0.25.2, date-fns 4.1.0,
Lodash 4.18.1, Babel runtime 7.26.10, and rsuite-table 5.19.2**.
The comparison uses browser ESM ES2020, minification and tree shaking, production defines,
React/ReactDOM external and gzip level 9. It excludes CSS and runtime timing.

| Consumer               | Before minified bytes | After minified bytes | Before gzip bytes | After gzip bytes |
| ---------------------- | --------------------: | -------------------: | ----------------: | ---------------: |
| Table-root             |               152,582 |              116,032 |            50,831 |           43,109 |
| Table-subpath          |               152,592 |              116,042 |            50,883 |           43,327 |
| CustomProvider-root    |                58,210 |               58,210 |            22,762 |           22,762 |
| CustomProvider-subpath |                58,222 |               58,222 |            22,724 |           22,724 |
| DateInput-root         |               103,917 |              103,917 |            33,181 |           33,181 |
| DateInput-subpath      |               103,927 |              103,927 |            33,190 |           33,190 |

The Table bundles retain 7,033 bytes of date-fns locale output, down from 42,844 bytes of
date-fns output including the unused formatting and parsing implementations. Date
dependencies remain because the existing default locale is preserved. CustomProvider and
DateInput control outputs have identical before/after hashes. The external rsuite-table
implementation is unchanged. These local import measurements do not predict a whole
application's savings.

To reproduce, build both checkouts with `npm run build:ts`, then run the consumer measurement
snippet in [component-config.md](./component-config.md) with the entry names changed to
`['Table', 'CustomProvider', 'DateInput']` and omit the `Animation-Fade-root` entry.
Use the Node and dependency versions recorded in the JSON report. The snippet resolves the
built package root and public subpath `module` entries through a temporary package link and
keeps each exported component observable. Inspect positive output `bytesInOutput` in its
metafiles for dependency retention. Raw JavaScript and metafiles remain in the printed
directory. The report records source/output SHA256 values, dependency versions, options and
compression settings. Rebuild before every comparison.
