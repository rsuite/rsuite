# Standalone dialog styles (unreleased)

This stylesheet entry is available in source previews. Production documentation continues to use the published RSuite version; this example should appear there when the entry is released.

Applications that import component styles individually can load the built-in `alert`, `confirm` and `prompt` styles with one import:

```tsx
import { CustomProvider, useDialog } from 'rsuite';
import 'rsuite/useDialog/styles/index.css';

function ConfirmButton() {
  const dialog = useDialog();

  return <button onClick={() => dialog.confirm('Continue?')}>Open confirmation</button>;
}

export default function App() {
  return (
    <CustomProvider>
      <ConfirmButton />
    </CustomProvider>
  );
}
```

The entry includes Modal, Button, Input, Text and Stack styles, including prompt validation messages. Applications already importing the complete RSuite stylesheet do not need this additional import. Components supplied to `dialog.open` and additional components in dialog content still need their own styles.
