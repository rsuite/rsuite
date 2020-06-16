# Nav

Provides a list of various forms of navigation menus, which can be landscape and portrait layout.

Contains the following components:

- `<Nav>`
- `<Nav.Item>`

## Usage

```js
import { Nav, Dropdown } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Nav>`

| Property    | Type `(Default)`                                           | Description                                                |
| ----------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
|             |
| activeKey   | any                                                        | Active `key`, corresponding to `eventkey` in `<Nav.item>`. |
| appearance  | enum: 'default', 'tabs', 'subtle' `('default')`            | A navigation can have different appearances                |
| children \* | React.ChildrenArray&lt;NavItem or Dropdown&gt;             | The contents of the component.                             |
| classPrefix | string `('nav')`                                           | The prefix of the component CSS class                      |
| justified   | boolean                                                    | Justified navigation                                       |
| onSelect    | (eventKey: any, event: SyntheticEvent&lt;any&gt;) => void, | Callback function triggered after selection                |
| pills       | boolean                                                    | Pills navigation                                           |
| pullRight   | boolean                                                    | appears on the right.                                      |
| stacked     | boolean                                                    | Stacked navigation                                         |

### `<Nav.Item>`

| Property       | Type `(Default)`                                           | Description                                           |
| -------------- | ---------------------------------------------------------- | ----------------------------------------------------- |
| active         | boolean                                                    | Activation status                                     |
| children \*    | React.Node                                                 | The contents of the component                         |
| componentClass | React.ElementType `('a')`                                  | You can use a custom element type for this component  |
| disabled       | boolean                                                    | Disabled status                                       |
| href           | string                                                     | Link                                                  |
| icon           | React.Element&lt;typeof Icon&gt;                           | Sets the icon for the component                       |
| onSelect       | (eventKey: any, event: SyntheticEvent&lt;any&gt;) => void, | Select the callback function that the event triggers. |
| renderItem     | (item:React.Node) => React.Node                            | Custom rendering item                                 |
