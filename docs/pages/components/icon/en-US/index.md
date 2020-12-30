# Icons

React Suite provides some guidance and suggestions for using icons in React Suite applications.

## React Suite Icons

React Suite provides a set of icon components, you need to install the `@rsuite/icons` icon component.

> [React Suite Icons](/tools/icons)

<!--{include:(components/icon/fragments/install.md)}-->

**Usage**

<!--{include:(components/icon/fragments/import.md)}-->

### Size

<!--{include:`size.md`}-->

### Color

<!--{include:`color.md`}-->

### Animating

<!--{include:`spin.md`}-->

### Flip and rotate

<!--{include:`rotate.md`}-->

## Icon extension

### Custom SVG icon

<!--{include:`custom-svg.md`}-->

### Font awesome icons

Font awesome provides 3 sets of open source icons, which can be installed as required:

```
npm install --save @fortawesome/free-brands-svg-icons
npm install --save @fortawesome/free-regular-svg-icons
npm install --save @fortawesome/free-solid-svg-icons
```

- [Font awesome Icons](https://fontawesome.com/icons?d=listing&m=free)
- [Font awesome Github](https://github.com/FortAwesome/Font-Awesome/tree/master/js-packages/%40fortawesome)

**Usage**

<!--{include:`custom-font-awesome.md`}-->

### Iconfont Icons

If you are a user of [iconfont.cn](https://iconfont.cn), you can use the `createIconFont` method to import icon resources and use them in components.

<!--{include:`create-icon-font.md`}-->

## Props

### `<Icon>`

Both `<Icon>` and the imported single icon have the following props.

| Property | Type `(Default)`               | Description                                               |
| -------- | ------------------------------ | --------------------------------------------------------- |
| as       | ElementType&lt;SVGElement&gt;  | Custom svg icon component                                 |
| fill     | string `(currentColor)`        | Icon fill color                                           |
| flip     | 'horizontal' &#124; 'vertical' | Flip icon                                                 |
| pulse    | boolean                        | Use `pulse` to have it rotate with eight steps            |
| rotate   | number                         | Rotate icon                                               |
| spin     | boolean                        | Use the `spin` to get any icon to rotate                  |
| style    | CSSProperties                  | The style properties of icon, like `fontSize` and `color` |

### `createIconFont`

| Property    | Type `(Default)`                 | Description                                                                  |
| ----------- | -------------------------------- | ---------------------------------------------------------------------------- |
| commonProps | HTMLAttributes&lt;SVGElement&gt; | Define extra properties to the component                                     |
| scriptUrl   | string &#124; string[]           | Use the js url generated online by iconfont.cn, or you can use the local url |

### `<IconFont>`

`<IconFont>` is a component created by `createIconFont`.

```js
const IconFont = createIconFont(...);
```

| Property | Type `(Default)`               | Description                                               |
| -------- | ------------------------------ | --------------------------------------------------------- |
| fill     | string `(currentColor)`        | Icon fill color                                           |
| flip     | 'horizontal' &#124; 'vertical' | Flip icon                                                 |
| icon     | string                         | Use the name from the iconfont icon set                   |
| pulse    | boolean                        | Use `pulse` to have it rotate with eight steps            |
| rotate   | number                         | Rotate icon                                               |
| spin     | boolean                        | Use the `spin` to get any icon to rotate                  |
| style    | CSSProperties                  | The style properties of icon, like `fontSize` and `color` |
