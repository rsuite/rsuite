# Upgrading from v5 to v6

React Suite v6 is a modern release featuring a major refactoring of the styling system (Less to SCSS), a mandatory requirement for React 18, and comprehensive support for CSS Logical Properties. This guide will help you migrate your existing v5 applications to v6.

## Overview

Key breaking changes in v6 include:

- **Minimum Requirements**: React >= 18.0.0, IE11 is no longer supported.
- **Styling System**: Migrated from Less to SCSS. Adjustments are needed if you use custom themes or import Less files.
- **CSS Properties**: Full adoption of CSS Logical Properties (e.g., `margin-inline-start` instead of `margin-left`) for RTL support.
- **Dependency Upgrade**: `date-fns` upgraded to v4.

## 1. Upgrading Dependencies

First, update `rsuite` and its peer dependencies:

```bash
npm install rsuite@latest react@latest react-dom@latest
# Or
yarn add rsuite@latest react@latest react-dom@latest
```

If you use `date-fns`, ensure you upgrade to v4 as well:

```bash
npm install date-fns@^4.0.0
```

## 2. Style Migration (Less -> SCSS)

This is the largest change in v6. We no longer ship Less files; instead, we provide compiled CSS and SCSS source files.

### If you only use compiled CSS

If you simply import `rsuite/dist/rsuite.min.css`, you generally don't need to make changes unless you rely on removed CSS class names or specific cascading styles.

### If you use Custom Themes (Less)

In v5, you likely configured a Less loader to modify variables. In v6, to provide better performance and compatibility (e.g., RSC support), we no longer support compiling Less/SCSS variables at runtime or build time.

**v6 recommends using CSS Variables for theme customization.**

RSuite v6 has fully adopted the CSS Variables system. You can redefine these variables in your global CSS file to override default styles:

```css
/* global.css */
:root {
  --rs-primary-50: #e3f2fd;
  --rs-primary-100: #bbdefb;
  --rs-primary-200: #90caf9;
  --rs-primary-500: #2196f3; /* Primary Color */
  /* ...more variables */
}
```

For more available CSS variables, please refer to the [CSS Variables](/guide/css-variables) documentation.

### Removed Deprecated Less Variables

Due to architectural changes, we no longer expose Less/SCSS variables for direct use. Please use the corresponding CSS Variables instead.

## 3. CSS Logical Properties & RTL

To better support Right-to-Left (RTL) languages, we replaced all Physical CSS Properties with Logical Properties.

- `margin-left` -> `margin-inline-start`
- `margin-right` -> `margin-inline-end`
- `padding-top` -> `padding-block-start`
- ...

**Impact:**
If you override RSuite styles in your own CSS using physical properties (like `margin-left`), they might not work as expected due to specificity or property name differences. We recommend checking any style overrides related to layout.

## 4. Component Changes

### Form Component

1. **Layout Changes**: `Form` no longer includes layout-related styles and does not manage spacing between children by default.
   - Use the new `Form.Stack` component to control form layout.
   - For compatibility, `Form` still retains `layout` and `fluid` props and will wrap a `Form.Stack` automatically, but the default `layout` is no longer `vertical`. You must set it explicitly.

   ```jsx
   // v5
   <Form layout="horizontal">...</Form>

   // v6 Recommended
   <Form>
     <Form.Stack layout="horizontal">...</Form.Stack>
   </Form>
   ```

2. **Aliases**:
   - `Form.ControlLabel` can be abbreviated as `Form.Label`.
   - `Form.HelpText` can be abbreviated as `Form.Text`.

### Grid System

1. **Property Redesign**: The responsive API for `Row` and `Col` has been redesigned for more flexibility.
2. **Col Props Deprecated**: Direct props like `xs`, `sm`, `md`, `lg`, `xl`, `xxl` and their `Offset`, `Push`, `Pull` variants are **deprecated**.
3. **New Usage**: Use the `span` prop with object syntax.

   ```jsx
   // v5
   <Col xs={24} md={8}>...</Col>

   // v6
   <Col span={{ xs: 24, md: 8 }}>...</Col>
   ```

4. **FlexboxGrid**: Deprecated. Use `Row` and `Col` directly (which are now Flex-based and more powerful).

### Navbar and Nav

The `pullRight` prop on `Nav` is deprecated. Use `Navbar.Content` to control layout.

```jsx
// v5
<Navbar>
  <Nav>...</Nav>
  <Nav pullRight>...</Nav>
</Navbar>

// v6
<Navbar>
  <Nav>...</Nav>
  <Navbar.Content>
    <Nav>...</Nav>
  </Navbar.Content>
</Navbar>
```

### NumberInput (formerly InputNumber)

`InputNumber` has been renamed to `NumberInput` to maintain naming consistency with other input components like `DateInput` and `PasswordInput`.

```jsx
// v5
import { InputNumber } from 'rsuite';

// v6 Recommended
import { NumberInput } from 'rsuite';
```

For compatibility, `InputNumber` is still retained, but migration to the new name is recommended. Additionally, `NumberInput` now supports the `controls` property.

### Picker Property Renaming

To improve API consistency, a series of Picker component properties have been renamed:

| v5 Property | v6 New Property |
| :--- | :--- |
| `menuClassName` | `popupClassName` |
| `menuStyle` | `popupStyle` |
| `menuAutoWidth` | `popupAutoWidth` |
| `menuMaxHeight` | `listboxMaxHeight` |
| `renderMenu` | `renderListbox` |
| `renderMenuItem` | `renderOption` |
| `renderMenuGroup` | `renderOptionGroup` |
| `renderMenuItemCheckbox` | `renderCheckbox` |

### Badge Component

The way to hide a Badge has changed. Use the `invisible` prop instead of setting `content={false}`.

### Style Units (rem)

Font sizes, spacing, and other dimensions in component styles have been converted from `px` to `rem` to better support responsive typography and accessibility scaling.

### FlexboxGrid (Deprecated)

`FlexboxGrid` is marked as deprecated. We recommend using the new `Grid` (CSS Grid based) or `Box` (Flexbox based) and `Stack` (Spacing management) components instead.

```jsx
// v5
<FlexboxGrid>
  <FlexboxGrid.Item colspan={6}>...</FlexboxGrid.Item>
</FlexboxGrid>

// v6 Recommended
<Grid>
  <Col xs={6}>...</Col>
</Grid>
// Or
<Stack>...</Stack>
```

### Picker Property Renaming

To maintain API consistency, some Picker component properties may have been tweaked. Focus on the consistent behavior of generic props like `cleanable` and `searchable` across different Pickers.

### Removal of Deprecated Props

Properties marked as `@deprecated` in v5 have been officially removed in v6. Please check console warnings and fix them before upgrading.

## 5. Other Breaking Changes

- **DateFns v4**: Components like `Calendar` and `DatePicker` internally depend on `date-fns` v4. If you mix `date-fns` versions in your project, be aware of compatibility.
- **React 17**: v6 uses React 18 hooks like `useId`, so React 17 is no longer supported.
- **IE11**: Removed all Polyfills and special style handling for IE11.

## Need Help?

If you encounter any issues during migration, feel free to provide feedback in [GitHub Issues](https://github.com/rsuite/rsuite/issues) or discuss in [Discussions](https://github.com/rsuite/rsuite/discussions).
