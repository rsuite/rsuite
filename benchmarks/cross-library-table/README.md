# Table workflow prototype

This fixture is a prototype. Its browser reports are diagnostic results, not a
qualified comparison, accessibility conformance result or ranking.

The selection workflow sorts 24 ledger rows, selects a stable ID, reverses
the ordering, hides the selected row with a filter and restores it. Pointer and
keyboard profiles use real browser input in fresh Chromium and Firefox contexts.
The command exits unsuccessfully when any case fails.

The fixed cohort is React 19.0.0, Ant Design 6.6.6, Chakra UI 3.37.0 and HeroUI
3.2.6. RSuite uses the qualified c0f1a57 source package; SDK/build inputs are
unchanged on main 55b8d80. Its table dependency is rsuite-table 5.19.2. This is
not a measurement of the published RSuite artifact.

Ant Design owns its sorter and row-selection engine. RSuite owns its sortable
header callback, while application code orders rows and composes Checkbox cells.
Chakra uses an application header button, application ordering and Checkbox
composition. Its header primitives receive explicit HTML column scopes and its
checkboxes include labels. HeroUI Table.Content owns React Aria selection and
sort state interactions; the application orders its rows. HeroUI checkboxes
include Checkbox.Content and use the table selection slot.

Shared filtering, records, ID tie-break comparison, controlled keys and state
output belong to the application. The runner checks actual displayed row IDs
and checked state in addition to the output. It records references, duplicates,
focus, native event trust and bounded HTML failure snapshots.

The report validator checks the complete browser/library/input matrix, the seven
ordered checkpoints, displayed IDs, selected IDs and the actual checkbox state
associated with each row ID. It rejects incomplete successes, untrusted input
and page/request errors. `validated: true` means the execution report is complete
and consistent; failures remain in `summary.failed` and cause a nonzero exit.
Skip-build runs reject changed source, configuration, artifacts or installed
dependencies before writing a report.

Pointer cases click the disabled third row before sorting and verify the native
pointer events, unchanged selection and absence of change events after two
animation frames. Keyboard cases check its disabled state without a pointer
action. The existing ten-second timeout stays unchanged.
The hit check verifies the control center is inside its disabled row. When CSS
suppresses pointer events for the disabled subtree, the underlying hit must be
an ancestor containing that row; hitting another row is rejected.

Reproduce with Node 24 after rebuilding the RSuite lib:

    npm ci --ignore-scripts
    npm run check
    npm run build
    node run.mjs --skip-build --output /absolute/path/report.json

Independent report/startup controls, native disabled-row pointer probes and a
clean installation/type/build reproduction have diagnostic evidence. The clean
installation reproduces the whole dependency snapshot and all four asset sets.
Root lint uses the fixture's automatic JSX runtime, and SDK coverage excludes
this independently installed cohort alongside the picker and form fixtures.
Preserve the original prototype failures and their adapter/driver corrections.
The tree workflow opens three levels, selects a grandchild, reverses root order,
collapses and reopens parents, and checks that selection survives hidden rows.
RSuite and Ant Design use their native tree engines; RSuite composes selection
with Checkbox. HeroUI delegates hierarchy and selection to its pinned React Aria
Table through nested rows and Collection. Chakra uses an explicit application
flattening/expansion composition. The nine checkpoints use native pointer and
Tab/arrow/Enter/Space actions; driver corrections and original failures are retained.

    node run.mjs --skip-build --workflow tree --output /absolute/path/tree.json

Tree reports separate functional completion from the limited treegrid role,
row-level, expansion-state and disclosure-name gates. Expansion may be exposed
on the row or a cell; a button alone does not satisfy that gate. Leaves must not
advertise expansion. The complete matrix, actual checkbox state, hierarchy IDs,
ownership and trusted events are validated. Twenty-eight malformed-report
controls are rejected. These gates do not establish full treegrid navigation or
assistive-technology conformance.

The published-table baseline completes 14/16 functional tree cases and passes
8/16 cases including the limited semantic gates; its selection workflow passes
14/16. A private table artifact containing the header and tree keyboard fixes
completes all 16 functional tree cases, with 12/16 also passing the semantic gates,
and passes 16/16 selection cases. All four RSuite tree cases pass. Four Ant Design
semantic failures remain reported. The private comparison changes only the table
package; all three competitor asset sets and the SDK remain identical. The
published package and all four production asset sets are restored afterwards.
This does not measure a public npm release of the fixes.

Virtual scroll and loading/empty recovery remain planned separate workflows.
No overall ranking is established.
