# VisuallyHidden

VisuallyHidden is a component that visually hides its children while keeping them accessible to screen readers.

## Import

<!--{include:<import-guide>}-->

## Usage

<!--{include:`usage.md`}-->

## Accessibility

VisuallyHidden is used to hide content that is still accessible to screen readers. It is used to hide content that is not visible on the screen, but is still accessible to screen readers. For example, it can be used to hide the text of a button that is represented by an icon.

## Props

### `<VisuallyHidden>`

| Property | Type `(Default)`     | Description                         |
| -------- | -------------------- | ----------------------------------- |
| children | ReactNode            | The children to be visually hidden. |
| as       | ElementType `'span'` | The HTML element to render.         |
