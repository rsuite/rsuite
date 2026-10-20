# Cross-library form workflows

This isolated production-browser fixture exercises account-form compositions using the same
values, predicates and native interactions. It reports application workflow outcomes, not an
overall library ranking or an accessibility-conformance result.

## Reproduce

Use Node.js 24 and first build RSuite from the repository root:

    npm ci --legacy-peer-deps
    npm run build
    cd benchmarks/cross-library-form
    npm ci --ignore-scripts
    npx playwright install chromium firefox
    npm run check
    npm run bench -- --browser chromium --output results/chromium.json
    npm run bench -- --browser firefox --output results/firefox.json

The platform dependencies reuse the picker's fixed versions and resolutions. The added
React Hook Form version is 7.90.0. This project's separate lock does not add dependencies to
RSuite. `install-links=true` copies `file:../../lib`; reinstall after rebuilding the candidate.
The installed candidate must match root `lib` byte for byte. Reports retain that package's
fingerprint, exact fixture/runner/config/lock hashes, runtime versions and built asset hashes.
`--skip-build` rejects changed source, candidates or production assets. The fixture checkout's
commit identifies its source; it does not prove that `lib` was rebuilt from that commit.
RSuite is a source build, while the competitors are pinned npm releases.

## Ownership and compositions

| UI library | Form values and list operations                                                        | Validation execution                                                                                            |
| ---------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| RSuite     | Controlled Form callbacks; application splices contact arrays and controls visibility  | Form.Control schema rules, schema-typed, Form request handling and documented checkAsync submission composition |
| Ant Design | Form instance and Form.List; application controls visibility                           | Form.Item rules and native form validation/submission                                                           |
| Chakra UI  | React Hook Form useForm, useFieldArray and Controller; application controls visibility | React Hook Form; Chakra Field/Input display the values and errors                                               |
| HeroUI     | React Hook Form useForm, useFieldArray and Controller; application controls visibility | React Hook Form; HeroUI Form/TextField/Input/FieldError display values and errors                               |

All adapters call shared application predicates for the same short ASCII examples. These
predicates do not measure complete email syntax, internationalization or schema-language
expressiveness. The shared HTTP transport validates its response but does not cancel,
sequence-filter or suppress validation results. Async result handling belongs to the selected
form engine. Event/submission logging and the checkbox that controls optional-field visibility
are application behavior. React Hook Form capabilities are not attributed to the two UI libraries.
Validation uses blur and submission in all adapters. Errors are inline; RSuite explicitly
selects static placement. The pointer outcomes therefore describe this configuration rather
than every library's default trigger or every possible application layout.

The implementations use public APIs documented by [RSuite](https://www.rsuitejs.com/components/form/),
[Ant Design](https://ant.design/components/form/), [Chakra Field](https://chakra-ui.com/docs/components/field)
and [HeroUI Form](https://heroui.com/en/docs/react/components/form). The installed pinned
declarations and executable adapters remain authoritative for the tested versions.

## Workflows and failures

Four workflows run in fresh browser contexts:

- Nested email and password/confirmation validation, followed by a nested submission.
- Add an invalid contact, correct and shift its index, remove a later invalid row, and submit.
- Mount a required company field, retire its value/error on unmount, and restore initial values.
- Resolve a newer username check before an older invalid result, then submit the current value.

Both `pointer` and `keyboard` submission modes run by default. Pointer clicks are attempted
with the field focus left by editing. Keyboard mode presses Enter in the last visible text
control. Each attempt must dispatch exactly one trusted native form submission event. Input,
key, pointer target, click and submission logs are retained. If blur-driven error layout moves
a button between pointer down and up, the missing submission remains a failed pointer case;
it is not reported as validation-engine failure or silently replaced by a keyboard pass.

Use `--libraries`, `--scenarios` and `--submit-modes` for an explicitly recorded subset.
Each case has a 90-second outer deadline; ordinary browser waits use 12 seconds. The primary
error is saved before separately bounded snapshot/screenshot collection. Cases continue after
other cases fail. Broken label/description ID references are recorded at checkpoints; workflow
steps may continue to provide diagnostic coverage, but the references still fail the case and
the overall command. Other unmet workflow expectations stop that case at their first failure.

The command exits 1 for failures, missing/duplicate/out-of-order checkpoints, browser errors,
broken references or an incomplete run. Failure counts are case outcomes and repeated
reference occurrences, not unique defects, library scores or universal capability judgments.
No timing, bundle-size ranking, assistive-technology, IME, mobile or RTL claim is produced.
