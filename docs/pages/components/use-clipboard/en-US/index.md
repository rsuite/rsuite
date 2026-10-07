# useClipboard

Copy text with success and error feedback. Use this hook with Button, IconButton or your own controls to copy record IDs, links and configuration values.

## Import

<!--{include:<import-guide>}-->

## Examples

### Copy text

Feedback becomes successful only after the clipboard write completes. Keep a status region mounted so assistive technology can announce the result.

<!--{include:`basic.md`}-->

### Feedback duration

Set `timeout` to change how long `copied` stays true after a successful write. The default is 2000 milliseconds. Set it to `0` to keep the success state until the next copy operation or `reset()`.

```tsx
const { copied, error, copy, reset } = useClipboard({ timeout: 5000 });
```

## Browser support

Copying uses the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText), which requires a secure context, such as HTTPS or localhost, and may require a user interaction. Call `copy()` from a click or keyboard action.

If the API is unavailable or the browser denies the write, `copy()` resolves to `false`, `copied` stays false, and `error` contains the failure. Rendering is safe on the server and starts with `copied: false` and `error: null`. The hook does not require CustomProvider or styles.

## API

### `useClipboard(options?)`

```ts
interface UseClipboardOptions {
  timeout?: number;
}

interface UseClipboardReturn {
  copied: boolean;
  error: Error | null;
  copy: (text: string) => Promise<boolean>;
  reset: () => void;
}
```

| Option  | Type   | Default | Description                                                             |
| ------- | ------ | ------- | ----------------------------------------------------------------------- |
| timeout | number | 2000    | Success feedback duration in milliseconds; `0` disables automatic reset |

| Return value | Description                                                                         |
| ------------ | ----------------------------------------------------------------------------------- |
| copied       | Whether the latest copy request succeeded; resets when another request starts       |
| error        | Failure from the latest request, or `null`; cleared by another request or `reset()` |
| copy(text)   | Writes text, including an empty string; resolves to whether that write succeeded    |
| reset()      | Clears feedback and ignores pending results; does not change the system clipboard   |

When requests overlap, only the latest request updates feedback. Each `copy()` promise still reports the result of its own write. The hook clears its feedback timer on unmount. It cannot cancel a clipboard write that the browser has already started.
