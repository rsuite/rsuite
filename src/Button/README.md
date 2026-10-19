# Automatic loading (unreleased)

This API is available in source previews. Production documentation continues to use the published RSuite version; these examples should appear there when this API is released.

```tsx
<Button autoLoading onClick={() => saveChanges()} onClickError={error => setMessage(String(error))}>
  Save changes
</Button>
```

`autoLoading` observes the promise returned by the click handler. While it is pending, the button displays its loading indicator, exposes `aria-busy`, and blocks repeated activation while retaining keyboard focus. Return the task's promise so that its entire lifetime is tracked. Synchronous return values do not start loading.

The existing boolean `loading` prop continues to work. If `loading` is true, it keeps the button loading even after the task finishes. Removing `autoLoading` during a task does not detach the task or allow another activation before it settles. `IconButton` supports the same props.

`onClickError` receives the original error and click event for errors thrown by managed activation callbacks or rejected promises. It belongs to the task that started it, so changing the prop later does not redirect an earlier task's error. If a pending task rejects after the button unmounts, its error callback still runs. Keep application error handling appropriate for navigation and component lifetimes.

Without `onClickError`, synchronous errors follow normal event-handler error reporting; asynchronous errors use the global error reporter, with an asynchronous throw fallback. Errors thrown by an error callback are also reported. The button does not silently consume failures, retry tasks, or cancel caller-owned work. Alternatively, catch expected failures inside the click handler and render application feedback there.

The first activation retains normal link navigation and form submission behavior. Use `type="button"` for a custom asynchronous submission workflow, or manage the form's submit handler directly. Prevent a link's default navigation in the click handler when navigation should wait for the task.

Automatic loading prevents duplicate activation of this button. It is not a server-side idempotency guarantee or a lock shared across separate buttons.

# Primary foreground colors (unreleased)

Primary buttons select black or white text from their current opaque background, including hover and pressed states. `IconButton` selects its segmented icon's foreground from the icon segment's background. Loading indicators use the button's foreground without revealing the hidden label. These styles require relative CSS colors and `sign()`; older browsers retain the theme's fixed foreground.

Set `--rs-btn-primary-bg`, `--rs-btn-primary-hover-bg` and `--rs-btn-primary-active-bg` to customize backgrounds. The foreground updates when these tokens or palette colors change, without rendering React again. Color transitions animate the background and derive the foreground at each frame, rather than fading black text through gray into white.

An explicit `--rs-btn-primary-text` on the button or an ancestor overrides automatic colors for labels, icon segments and loading indicators. Inline `color` still overrides label text; an icon's own inline `color` overrides its segmented foreground. For translucent colors, gradients or a direct `background` override, choose an explicit foreground that suits the actual background.

Validation targets normal text at [4.5:1](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and meaningful icons at [3:1](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), across the stock themes, palettes and active states. The loading rotor also uses a 3:1 visibility target. This does not establish conformance for arbitrary author overrides or the entire application; inactive controls have separate WCAG exceptions.

Production documentation continues to use the published RSuite version until this change is released.
