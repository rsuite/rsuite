# ColorPicker

Choose an sRGB color with opacity, a pointer or touch color area, keyboard channel controls, text entry, and optional presets. Color values are strings, so they work directly with controlled React state, `Form.Control`, and native form submission.

This API is unreleased. The production documentation site continues to use the published RSuite package; enable its page when a release includes this API.

## Usage

```tsx
import { useState } from 'react';
import { ColorPicker } from 'rsuite';

function BrandColor() {
  const [color, setColor] = useState<string | null>('#3498ff80');

  return (
    <ColorPicker
      label="Brand"
      name="brand"
      value={color}
      onChange={setColor}
      presets={[
        { value: '#3498ff', label: 'Primary' },
        { value: '#4caf50', label: 'Success' },
        'transparent'
      ]}
    />
  );
}
```

The component is available from the package root and as the default or named export of `rsuite/ColorPicker`. Import `rsuite/dist/rsuite.min.css` for the complete library stylesheet, or `rsuite/ColorPicker/styles/index.css` with the application's RSuite theme setup for component styles.

## Values and formats

`value` controls the selection; `defaultValue` supplies an uncontrolled initial value. Values accept short or long hex strings, hex with alpha, `rgb()`/`rgba()`, `hsl()`/`hsla()`, and `transparent`. RGB and HSL accept comma-separated and modern space-separated syntax. CSS variables, other named colors, wide-gamut colors, and gradients are outside this sRGB value contract.

`format` controls the output format for subsequent edits. `defaultFormat` initializes it to `hex`, `rgb`, or `hsl`; the default is `hex`. Changing the format updates the text editor and calls `onFormatChange(format, event)`. It preserves the selected value until the next color edit. Controlled values and formats remain authoritative if a parent declines an update.

Text commits on Enter or blur. Invalid text displays a linked error without replacing the selection, and Enter does not submit the surrounding form. `onChange(value, event)` fires when an edit changes the serialized value. Clearing produces `null` and also calls `onClean(event)`. `cleanable={false}` removes the clear controls.

`disableAlpha` hides opacity controls and produces opaque colors on subsequent edits. It preserves an externally supplied translucent value until the user edits it.

## Forms

```tsx
import { ColorPicker, Form } from 'rsuite';

<Form formDefaultValue={{ brand: '#3498ff' }}>
  <Form.Group controlId="brand">
    <Form.ControlLabel>Brand color</Form.ControlLabel>
    <Form.Control name="brand" accepter={ColorPicker} />
  </Form.Group>
</Form>;
```

For native forms, `name` submits one selected value and `form` can associate an external form by ID. A cleared selection submits an empty string. Disabled controls are omitted from `FormData`; read-only controls keep their value. Native form reset restores an uncontrolled picker to its default value without firing `onChange`. A cancelled reset and a controlled value are preserved.

`readOnly` prevents editing and opening the popup. `plaintext` renders the value as text while preserving its named form value. Form labels and validation errors stay associated with the trigger.

## Keyboard and responsive behavior

Give the trigger a `label`, `aria-label`, or `aria-labelledby`. Enter, Space, or Arrow Down opens its dialog. The first channel receives focus, and each native range control has a localized name and value. Arrow keys, Home, and End adjust channels; the color area provides equivalent pointer and touch interaction. Delete clears a cleanable selection from the trigger. Escape and Done close the popup and return focus to the trigger after the close is accepted.

The popup adapts to a Drawer on small screens. `responsive={false}` keeps a desktop popup; a breakpoint name or media query selects a custom boundary. Desktop popups prevent viewport overflow by default, and the editor scrolls while its actions remain visible in short windows. `open`/`defaultOpen`, `onOpen`, `onClose`, placement, sizing, and picker styling props follow the shared picker API.

The forwarded `PickerHandle` provides the shared optional `open()`, `close()`, and `updatePosition()` methods, plus root, target, and overlay references.

## Localization and server rendering

`CustomProvider` supplies direction, component defaults, and locale labels. Override individual labels with the component's `locale` prop or a partial `locale.ColorPicker` object. English and Simplified/Traditional Chinese labels are provided; missing labels fall back to English.

Server rendering preserves the selected form value without opening a portal or invoking change callbacks. After hydration, the popup can open on desktop or mobile, including when `defaultOpen` was set on the server. Color parsing and conversion require no DOM or additional runtime dependency.
