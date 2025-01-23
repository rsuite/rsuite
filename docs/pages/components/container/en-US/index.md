# Container

Used to layout and wrap content in a container.

## Import

<!--{include:<import-guide>}-->

## Examples

### Horizontal Layout

<!--{include:<example-horizontal>}-->

### Right Sidebar

<!--{include:<example-right-sidebar>}-->

### Vertical Layout

<!--{include:<example-vertical>}-->

### Center Layout

<!--{include:<example-center>}-->

## Props

### `<Container>`

| Property    | Type `(Default)`          | Description                                     |
| ----------- | ------------------------- | ----------------------------------------------- |
| as          | ElementType `('section')` | You can use a custom element for this component |
| children    | ReactNode                 | Primary content                                 |
| classPrefix | string `('container')`    | The prefix of the component CSS class           |
| className   | string                    | Additional classes                              |
| style       | CSSProperties             | Additional style                                |

### `<Header>`

| Property    | Type `(Default)`         | Description                                     |
| ----------- | ------------------------ | ----------------------------------------------- |
| as          | ElementType `('header')` | You can use a custom element for this component |
| children    | ReactNode                | Primary content                                 |
| classPrefix | string `('header')`      | The prefix of the component CSS class           |
| className   | string                   | Additional classes                              |
| style       | CSSProperties            | Additional style                                |

### `<Content>`

| Property    | Type `(Default)`       | Description                                     |
| ----------- | ---------------------- | ----------------------------------------------- |
| as          | ElementType `('main')` | You can use a custom element for this component |
| children    | ReactNode              | Primary content                                 |
| classPrefix | string `('content')`   | The prefix of the component CSS class           |
| className   | string                 | Additional classes                              |
| style       | CSSProperties          | Additional style                                |

### `<Footer>`

| Property    | Type `(Default)`         | Description                                     |
| ----------- | ------------------------ | ----------------------------------------------- |
| as          | ElementType `('footer')` | You can use a custom element for this component |
| children    | ReactNode                | Primary content                                 |
| classPrefix | string `('footer')`      | The prefix of the component CSS class           |
| className   | string                   | Additional classes                              |
| style       | CSSProperties            | Additional style                                |

### `<Sidebar>`

| Property    | Type `(Default)`        | Description                                     |
| ----------- | ----------------------- | ----------------------------------------------- |
| as          | ElementType `('aside')` | You can use a custom element for this component |
| children    | ReactNode               | Primary content                                 |
| classPrefix | string `('sidebar')`    | The prefix of the component CSS class           |
| className   | string                  | Additional classes                              |
| collapsible | boolean                 | Whether the sidebar can be collapsed            |
| style       | CSSProperties           | Additional style                                |
| width       | number                  | Width of the sidebar                            |
