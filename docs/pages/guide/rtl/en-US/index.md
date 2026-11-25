# Right-to-Left (RTL)

UI support for right-to-left (RTL) languages such as Arabic and Hebrew.

## Usage

<div class="rs-doc-steps">
<h3 class="rs-doc-step-header">Whole page</h3>
<div class="rs-doc-step-body">

Set `dir="rtl"` on the `<html>` element to apply RTL to the whole page. RSuite components use the document direction by default.

```html
<html dir="rtl"></html>
```

</div>

<h3 class="rs-doc-step-header">One section</h3>
<div class="rs-doc-step-body">

To enable RTL in one section of an LTR page, set `dir="rtl"` on a DOM element around the section for text and CSS layout. Place `<CustomProvider rtl>` inside it so RSuite component behavior, such as arrow-key navigation in Tabs, follows the same direction.

```jsx
import { CustomProvider } from 'rsuite';

function App({ children }) {
  return (
    <div dir="rtl">
      <CustomProvider rtl>{children}</CustomProvider>
    </div>
  );
}
```

</div>
</div>
