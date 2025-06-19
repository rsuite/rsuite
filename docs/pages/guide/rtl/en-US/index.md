# Right-to-Left (RTL)

UI support for right-to-left (RTL) languages such as Arabic and Hebrew.

## Usage

<div class="rs-doc-steps">
<h3 class="rs-doc-step-header">HTML Setup</h3>
<div class="rs-doc-step-body">

Make sure the `dir` attribute is set on the html element:

```html
<html dir="rtl"></html>
```

</div>

<h3 class="rs-doc-step-header">Configure CustomProvider (Optional)</h3>
<div class="rs-doc-step-body">

This step is optional. By default, components will determine whether to enable RTL layout based on the `dir` attribute on the html element. If you need to enable RTL layout for a specific area, you can set the `rtl` prop on the CustomProvider component to render components with RTL layout.

```jsx
import { CustomProvider } from 'rsuite';

function App({ children }) {
  return <CustomProvider rtl>{children}</CustomProvider>;
}
```

</div>
</div>
