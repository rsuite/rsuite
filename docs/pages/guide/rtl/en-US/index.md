# Right-to-left

In order to support the habits of languages ​​such as Arabic and Hebrew, the UI of the language read from right to left (RTL).

## Steps

### 1.HTML

Make sure the `dir` attribute is set on the body:

```html
<html dir="rtl"></html>
```

### 2.CustomProvider

Set the rtl property on the CustomProvider component, and all components are rendered according to the RTL layout.

```jsx
function RTL(props) {
  return <CustomProvider rtl>{props.children}</CustomProvider>;
}
```

### 3.Import RTL style files

- Including the RTL version when using the compiled React Suite CSS

```less
@import '~rsuite/dist/styles/rsuite-default-rtl.css'; //or ~rsuite/dist/styles/rsuite-dark-rtl.css
```

- Processing the final CSS via [rtlcss](https://rtlcss.com/) in case of using the Less version

```less
@import '~rsuite/lib/styles/themes/default/index.less'; // or ~rsuite/lib/styles/themes/dark/index.less
```
