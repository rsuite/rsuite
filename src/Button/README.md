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
