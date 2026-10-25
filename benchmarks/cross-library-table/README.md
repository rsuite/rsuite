# Table workflow prototype

This fixture is a prototype. Its browser reports are diagnostic results, not a
qualified comparison, accessibility conformance result or ranking.

The selection workflow sorts 24 ledger rows, selects a stable ID, reverses
the ordering, hides the selected row with a filter and restores it. Pointer and
keyboard profiles use real browser input in fresh Chromium and Firefox contexts.
The command exits unsuccessfully when any case fails.

The fixed cohort is React 19.0.0, Ant Design 6.6.6, Chakra UI 3.37.0 and HeroUI
3.2.6. RSuite uses a locally built source SDK; every report captures
its package fingerprint and installed dependency versions. Its table dependency
is rsuite-table 5.19.2. This is not a measurement of the published RSuite artifact.

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

The virtual workflow uses 10,000 fixed records and a 400px body viewport. Shared
application jump buttons request the top, row 9000 and the end. Both input profiles
select the actual row checkbox and retain its key across viewport changes. DOM
membership, visible identity markers and complete row border boxes are reported
separately: a native focused row may remain mounted outside the viewport. Bounded
DOM counts are correctness checks, not performance measurements.

RSuite uses its native virtualizer and scrolling ref with application Checkbox
selection. Ant Design uses native virtualization, selection and scrolling with
public onRow ID attributes and an application roving checkbox focus policy. Public
ConfigProvider global and Table padding tokens align its virtual row estimate
with the requested 40px rows; no private Ant Design CSS selectors are overridden.
Chakra composes TanStack Virtual and a roving
checkbox focus policy; its sticky header is included in scrolling padding. HeroUI
uses React Aria Virtualizer/TableLayout and selection. Its application jump
controller coordinates the public TableStateContext focus key with DOM scrolling.
Its public ResizableContainer and explicit column widths define the 720px layout,
while TableLayout defines 40px rows and headers.
No runner calls DOM focus, forces a click or increases the ten-second deadline.
Virtual selection checks that the enabled checkbox's label is a native hit target
for the requested row, then sends mouse input at its current center. This avoids
the locator click's automatic pre-scroll moving an already visible virtual row.
Native event identities and post-selection visibility are still required.

    node checks/virtual-pointer.mjs /absolute/path/virtual-pointer-results

The pointer controls assert unchanged scroll position before native pointerdown
in both production HeroUI fixtures. Covered, clipped, disabled and wrong-row
targets must be rejected without sending pointer input in both browsers.

    node run.mjs --skip-build --workflow virtual --output /absolute/path/virtual.json
    node checks/report-integrity.mjs /absolute/path/virtual.json

Whole-row geometry protocol 1 records each row's border box, its ancestor client
scrollports (excluding borders), the section/browser bounds and the column-header
bottom. `rowFullyVisible` requires the entire box to lie in their intersection,
within 0.5px; `fullyVisibleRows` counts those rows. The existing `visible` field
continues to measure the smaller identity marker. The validator recomputes the
intersection, row flags and aggregate count. Fourteen real DOM controls cover
both browsers, including borders, nested/horizontal clipping and browser bounds.

    node checks/whole-row-geometry.mjs

Functional success still requires the requested identity marker and actual
selection. It does not require every target row to be completely exposed. In the
reviewed fixture, HeroUI's selected checkpoint can expose ten markers but nine
complete rows after native selection scrolls part of the target beneath its
header. Reports retain that distinction. These axis-aligned rectangle checks do
not test arbitrary visual occlusion, transformed layouts, assistive technology
or performance. Older reports without geometry protocol 1 cannot establish
whole-row visibility.

The single-task-v1 capture evaluates all DOM snapshot fields in the same browser
task. A deterministic microtask-reorder control reproduces the old split-sampling
race and verifies that atomic sampling keeps row IDs and metadata consistent.

    node checks/atomic-capture.mjs
    node checks/composed-focus.mjs /absolute/path/focus-results

The response-and-final-v1 protocol hashes every successfully served response and
checks source, SDK, installed dependencies and all production artifacts again
at completion. A response violation stays recorded even if its file is restored.
Validators recompute outcomes and reject a contradictory stored summary. Older
prototype reports need their captured protocol version; they do not prove these
new integrity checks.

Run the mutation controls exclusively: they temporarily change one owned source,
SDK manifest, installed-package manifest or served HTML file after the first
browser case. They keep backups/journals, restore exact bytes in cleanup and
reject a file modified externally instead of overwriting it.

    node checks/runtime-mutations.mjs /absolute/path/control-results

Loading/empty recovery, native wheel/keyboard exploration beyond this jump
workflow and repeated performance measurements remain separate work.
No overall ranking is established.

The dedicated Virtual table workflow CI builds the SDK from the checked-out
source, installs the standalone cohort with npm ci, runs both native browsers,
checks atomic capture/report integrity and composed focus, and executes the four
mid-run mutation controls. Raw results and build fingerprints are uploaded even
on failure. Sort/tree diagnostic failures remain explicit in their own commands.

### Loading, empty and recovered data

Run the `lifecycle` workflow against all four production adapters:

```sh
node run.mjs --workflow lifecycle --output results/lifecycle/report.json
node checks/report-integrity.mjs results/lifecycle/report.json
```

It selects an original row, starts loading, resolves an empty result, recovers three different row IDs and selects a recovered row. Three application buttons control these transitions deterministically; this is not a network latency measurement. The shared application policy clears rows and selected keys when the request starts. Reports check actual native checkbox state for every data row, including unchecked recovered rows, rather than inferring selection from application output alone. Loading and empty presentation have no data identity markers and cannot count as data rows.

RSuite uses public `loading`, `renderLoading` and `renderEmpty` props. Ant Design uses native `loading`/Spin and `locale.emptyText`, with `dataSource={undefined}` while loading: the pinned version intentionally shows its empty placeholder alongside loading for an explicit empty array. Chakra uses an application loading/empty table-row composition. HeroUI uses its public React Aria empty-state render prop; initial loading content is application composition, distinct from its native additional-item `Table.LoadMoreItem` API.

The application phase/status is recorded separately from actual native `aria-busy` observations. Reference integrity, trusted toolbar/selection input, exact row identities, indicator visibility and real checkbox state are acceptance gates; screen-reader announcement and accessibility conformance are not claimed. The runner waits for native checked state within the same 10-second action bound before capturing a selected checkpoint. Original premature-sampling and adapter-input failures remain recovery evidence.

The dedicated CI workflow now runs both virtual and lifecycle matrices and their report controls, then the shared atomic-capture, focus and exclusive mutation controls. Raw lifecycle outcomes are included in the always-uploaded results.
