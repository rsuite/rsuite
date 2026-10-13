# Native form association

Use `name` and `form` to submit a selected value to a form elsewhere on the same page:

```tsx
<>
  <form id="settings">
    <button type="submit">Save</button>
  </form>
  <SelectPicker name="country" form="settings" data={countries} />
</>
```

`form` is the target form element's ID. It takes precedence over an ancestor form.
Changing it reassigns the selected value; removing it restores the ancestor form
association. A missing target leaves the value unassociated.

This also applies to CheckPicker, TreePicker, CheckTreePicker, Cascader,
MultiCascader, InputPicker, TagPicker, and TagInput. Multiple selections retain
their existing comma-separated serialization. Search text is not submitted.
Disabled controls and controls inside a disabled fieldset are omitted; read-only
and loading controls keep their selected values.

Plaintext rendering and standalone native reset behavior retain their existing
semantics. The production documentation will expose this API after its npm release.
