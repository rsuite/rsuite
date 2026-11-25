# CommandPalette (unreleased)

Search and invoke application commands in a modal dialog. This source API will be available with the next package release; the production documentation site continues to use the published npm package.

```tsx
const commands = [
  { value: 'projects', label: 'Open projects', group: 'Workspace', keywords: ['dashboard'] },
  { value: 'settings', label: 'Settings', group: 'Account', shortcut: '⌘ ,' }
] as const;

<CommandPalette
  open={open}
  title="Run a command"
  data={commands}
  onClose={() => setOpen(false)}
  onSelect={(value, originalItem, event) => runCommand(value)}
/>;
```

`open` is controlled, following `Modal`. The search input receives focus after Modal captures the previously focused element; closing restores that focus owner. A focused keyboard opener is restored when the palette closes. Pointer-triggered focus follows the browser's native button behavior. `autoFocus={false}` preserves the application's focus choice. `onOpen` runs after the default search focus and can choose another target. Modal owns Escape, Tab, nested-dialog ordering and the container's document.

The input retains DOM focus while ArrowUp/ArrowDown navigate enabled options. Enter invokes the active command and prevents accidental form submission; repeated Enter keydowns are ignored. Composition-flagged events, modified shortcuts and native Home/End text editing are preserved. `inputProps.onKeyDown` runs first and may prevent an internal action. Shortcut hints are visual labels; the component does not register global shortcuts.

Built-in filtering uses `useLocaleSearch`, CustomProvider's locale and grapheme-aware collation. Labels, groups and keywords are searchable. Override matching with `searchLocale` or `collatorOptions`. `searchValue`/`onSearch` control the query; `defaultSearchValue` initializes an uncontrolled query. Pending, replaced or failed searches cannot select old results. Search errors show a generic translated message and a retry action; `renderError(error, retry)` can provide application-specific recovery.

For remote or fuzzy search, compose `useAsyncSearch` (or an application data source), pass its current results as `data`, set `filter={false}`, and pass `loading`. Loading blocks selection. Application code owns async command execution, navigation, permissions and action errors. `closeOnSelect` defaults to true and calls `onClose` after `onSelect`; call `event.preventDefault()` in `onSelect`, or use `closeOnSelect={false}`, to keep the dialog open.

Treat the data array and records as immutable. Records may include typed application metadata; callbacks receive the original record. String and numeric values, duplicate values, disabled records and grouped results are supported. Groups retain their first-appearance order and commands retain their order within a group. `label` is plain searchable/accessibility text; `renderItem` customizes its visual content. Keep option labels, icons, descriptions and shortcut hints noninteractive. Put buttons and links in the optional `footer` instead.

The component composes a named dialog and an editable combobox with listbox options, following the [APG combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) and [modal dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) patterns. `title` is required. `inputProps` accepts native input labeling and description attributes; value, change handling, role, active descendant, loading and focus remain owned by the component. `inputRef` refers to the HTML input; the component ref follows Modal's wrapper div. Provider defaults use `components.CommandPalette`. Existing picker/loading translations are reused; `locale` can override search placeholder, empty results, loading, error and retry text.
