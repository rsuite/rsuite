# Nav

Provides a list of various forms of navigation menus, which can be landscape and portrait layout.

## Usage

<!--{include:(components/nav/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Appearance

`appearance` values include: `default`,`tabs`,`subtle`.

<!--{include:`appearance.md`}-->

> For subtle and tabs navigation, you can set a reversed property to reverse direction and fit all directions.

### Vertical

<!--{include:`vertical.md`}-->

### Option Status

- active
- disabled

<!--{include:`status.md`}-->

### Justified

<!--{include:`justified.md`}-->

### Multi-level navigation

<!--{include:`dropdown.md`}-->

> Use the `<Dropdown>` component directly when using multi-level navigation.

### With Icon

<!--{include:`icon.md`}-->

### Used with `Link` in `next/link`

<!--{include:`with-router.md`}-->

## Props

### `<Nav>`

| Property    | Type `(Default)`                                | Description                                                |
| ----------- | ----------------------------------------------- | ---------------------------------------------------------- |
| activeKey   | string                                          | Active `key`, corresponding to `eventkey` in `<Nav.item>`. |
| appearance  | enum: 'default', 'tabs', 'subtle' `('default')` | A navigation can have different appearances                |
| children \* | ChildrenArray&lt;NavItem or Dropdown&gt;        | The contents of the component.                             |
| classPrefix | string `('nav')`                                | The prefix of the component CSS class                      |
| justified   | boolean                                         | Justified navigation                                       |
| onSelect    | (eventKey: string, event) => void               | Callback function triggered after selection                |
| pullRight   | boolean                                         | appears on the right.                                      |
| vertical    | boolean                                         | Stacked navigation                                         |

### `<Nav.Item>`

| Property    | Type `(Default)`                  | Description                                           |
| ----------- | --------------------------------- | ----------------------------------------------------- |
| active      | boolean                           | Activation status                                     |
| as          | ElementType `('a')`               | You can use a custom element type for this component. |
| children \* | ReactNode                         | The contents of the component                         |
| disabled    | boolean                           | Disabled status                                       |
| href        | string                            | Link                                                  |
| icon        | Element&lt;typeof Icon&gt;        | Sets the icon for the component                       |
| onSelect    | (eventKey: string, event) => void | Select the callback function that the event triggers. |

### `<Nav.Dropdown>`

- [Extend the Dropdown component](./dropdown#Props)
