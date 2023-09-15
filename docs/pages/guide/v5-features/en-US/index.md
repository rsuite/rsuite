# New Features v5 and Migration from v4

The accessibility and scalability of components are improved in React Suite 5. The following will introduce in detail the new features and how to upgrade from `4.x` to `5.0`.

## Major changes ✨

### Improve accessibility

It is our hope that more users can use barrier-free use of products developed by React Suite. We will improve each component provided by React Suite in multiple scenarios such as keyboard operation and screen reading devices.

<br/>

**Accessibility**

React Suite follows the [WAI-ARIA](https://www.w3.org/TR/wai-aria/) standard. All components have been refactored to have appropriate attributes and keyboard interaction functions out of the box.

<br/>

**Add a set of high contrast themes**

In React Suite v4, we refer to the 《Web Content Accessibility Guidelines (WCAG) 》 standard for color contrast requirements, and have made great improvements to the components to meet most users. We still hope to improve on this basis and take care of a small number of people with visual impairments. React Suite officially provides a total of [3 sets of themes (light, dark, high-contrast)](/guide/official-themes/).

<br/>

**Use SVG Icon instead of Icon font**

Icon font has some rendering problems, which makes the icon blurry, the need to load the font file, and the content area flickers. For better accessibility, we decided to prefer SVG Icon. And can be well compatible with third-party icon resources.

```js
import GearIcon from '@rsuite/icons/Gear';

render(<GearIcon />);

// output
<svg>
  <path d="M11.967 ..."></path>
  <path d="M8 10a2 2 0 10.001-3.999A2 2 0 008 10zm0 1a3 3 0 110-6 3 3 0 010 6z"></path>
</svg>;
```

### Support CSS variables

Current mainstream browsers already support CSS variables. We plan to provide a set of component CSS variable configurations to make theme customization and theme switching more convenient.

### Refactoring React Class Components with Hooks

We refactored most of our components using function component and adopted the new features brought by React Hooks to enhance the development experience.

### Import on Demand

When importing components in v4, you need to distinguish between cjs and esm. In v5 this is automatic.

```jsx
// v4: cjs
import Button from 'rsuite/lib/Button';
// v4: esm
import Button from 'rsuite/es/Button';

// v5
import Button from 'rsuite/Button';
```

### Improvements to Form

- Improve the style of Form in plain text mode
- Rename Form related components

```
Rename FormGroup to Form.Group
Rename FormControl to Form.Control
Rename ControlLabel to Form.ControlLabel
Rename ErrorMessage to Form.ErrorMessage
Rename HelpBlock to Form.HelpText
```

- Form validation supports object structure

```js
const model = SchemaModel({
  username: StringType().isRequired('Username required'),
  tags: ArrayType().of(StringType('The tag should be a string').isRequired()),
  role: ObjectType.shape({
    name: StringType().isRequired('Name required'),
    permissions: ArrayType().isRequired('Permissions required')
  })
});

const checkResult = model.check({
  username: 'foobar',
  tags: ['Sports', 'Games', 10],
  role: { name: 'administrator' }
});

console.log(checkResult);
```

output:

```js
{
  username: { hasError: false },
  tags: {
    hasError: true,
    array: [
      { hasError: false },
      { hasError: false },
      { hasError: true, errorMessage: 'The tag should be a string' }
    ]
  },
  role: {
    hasError: true,
    object: {
      name: { hasError: false },
      permissions: { hasError: true, errorMessage: 'Permissions required' }
    }
  }
};
```

For detailed usage, please read: [Form Validation](components/form-validation) and [Schema](https://github.com/rsuite/schema-typed)

### Added support for srcSet, sizes,imgProps on Avatar

- `srcSet`: The srcSet attribute for the img element. Use this attribute for responsive image display.
- `sizes`: The sizes attribute for the img element.
- `imgProps`: Attributes applied to the img element if the component is used to display an image.

### Added support `onChangeCommitted` on Slider and RangeSlider

The difference between `onChangeCommitted` and `onChange` is that `onChange` is triggered every time the value changes, while `onChangeCommitted` is a callback that is triggered after the `mouseup` event is triggered and the value changes.

### Improvements to DatePicker and DateRangePicker

- DatePicker and DateRangePicker support keyboard input.
- DateRangePicker can only select date before, and time can be selected in v5

```js
<DateRangePicker format="yyyy-MM-dd HH:mm:ss" />
```

### Add support for `color` on Badge

```js
<Badge color="red">Red</Badge>
<Badge color="orange">Orange</Badge>
<Badge color="yellow">Yellow</Badge>
```

### Improvements to Table

- Refactor Table

Use react hooks to refactor the Table and improve the performance when the table scrolls. [The `onDataUpdated` and `bodyRef` props are deprecated](https://github.com/rsuite/rsuite-table/pull/232).

For some components to be rendered inside the table, the body container of the table can be obtained through `bodyRef` before. Now we can get the container directly through the `ref` of `Table`.

```js
// v4
const bodyRef = useRef();
return (
  <>
    <Table
      bodyRef={body => {
        bodyRef.current = body;
      }}
    />
    <CheckPicker container={() => bodyRef.current} />
  </>
);

// v5
const ref = useRef();
return (
  <>
    <Table ref={ref} />
    <CheckPicker container={() => ref.current.body} />
  </>
);
```

- Add support for `rowSpan`

```jsx
const data = [
  {
    city: 'New Gust',
    name: 'Janis',
    rowspan: 2
  },
  {
    city: 'New Gust',
    name: 'Ernest Schuppe Anderson'
  },
  {
    city: 'Maria Junctions',
    name: 'Alessandra',
    rowspan: 3
  },
  {
    city: 'Maria Junctions',
    name: 'Margret'
  },
  {
    city: 'Maria Junctions',
    name: 'Emiliano'
  }
];
return (
  <Table data={data}>
    <Column
      width={100}
      verticalAlign="middle"
      rowSpan={rowData => {
        return rowData.rowspan;
      }}
    >
      <HeaderCell>Name</HeaderCell>
      <Cell dataKey="city" />
    </Column>
    <Column width={100}>
      <HeaderCell />
      <Cell dataKey="name" />
    </Column>
  </Table>
);
```

### Add support for TagInput

The enhancement of Input supports input tags and management tags.

```ts
import TagInput from 'rsuite/TagInput';

return <TagInput defaultValue={['HTML', 'CSS']} trigger={['Enter', 'Space', 'Comma']} />;
```

### Improvements to Carousel

Support `onSelect`, `onSlideEnd`, `onSlideStart` on `<Carousel>`

- `onSelect`: Callback fired when the active item changes
- `onSlideEnd`: Callback fired when a slide transition ends
- `onSlideStart`: Callback fired when a slide transition starts

---

## Migration from v4 to v5

The next step will provide you with guidance so that you can quickly migrate from v4 to v5.

### Updating your dependencies

- React is upgraded to version 16.8 and above.
- Make sure your current rsuite version is `4.*`, otherwise [please migrate to v4 first](https://v4.rsuitejs.com/guide/v3-to-v4/).

### Run codemods

The process of upgrading components for large projects is often painful. We have prepared these [codemods](https://github.com/rsuite/codemod) to ease your migration experience.

**Usage**

```
npx rsuite-codemod <transform> <path> [...options]
```

- `transform` - [name of transform](https://github.com/rsuite/codemod#included-transforms).
- `path` - files or directory to transform.
- use the `--dry` option for a dry-run and use `--print` to print the output for comparison.

### Handling breaking changes

#### Supported browsers

Dropped Internet Explorer 10

```diff
- last 2 versions or > 1% or ie >= 10
+ last 2 versions or > 1% and not ie <11
```

#### Use SVG Icon instead of Icon font

Use SVG Icon, import dependency `@rsuite/icons`.

```
npm i @rsuite/icons
```

```js
// for rsuite v4
import { Icon } from 'rsuite';

return <Icon icon="gear" />;

// for rsuite v5
import GearIcon from '@rsuite/icons/Gear';

return <GearIcon />;
```

The `size` property has been removed and replaced by `fontSize`.

```js
// for rsuite v4
return <Icon icon="gear" size="3x" />;

// for rsuite v5
return <GearIcon style={{ fontSize: '3em' }} />;
```

The relationship between the `size` attribute value and its corresponding `fontSize` value is as follows:

- `lg` : `1.3333em`
- `2x` : `2em`
- `3x` : `3em`
- `4x` : `4em`
- `5x` : `5em`

Compatible with legacy icons

The rsuite v4 icons can be found inside `@rsuite/icons/legacy`.

```js
// rsuite v4
import { Icon } from 'rsuite';

return <Icon icon="arrow-down" />;

// rsuite v5
import ArrowDown from '@rsuite/icons/legacy/ArrowDown';

return <ArrowDown />;
```

#### date-fns upgrade v2

The [date-fns](https://date-fns.org/v2.24.0/docs/Upgrade-Guide) tool is used in React Suite for date format, calculation, etc. Based on the Unicode standard, the new format string used for [format functions has changed](<(https://blog.date-fns.org/post/unicode-tokens-in-date-fns-v2-sreatyki91jg/)>). [Detailed description]

```js
// for rsuite v4

return (
  <>
    <DatePicker format="YYYY-MM-DD" />
    <DateRangePicker format="YYYY-MM-DD" />
  </>
);

// for rsuite v5

return (
  <>
    <DatePicker format="yyyy-MM-dd" />
    <DateRangePicker format="yyyy-MM-dd" />
  </>
);
```

#### Alert is deprecated. Use `toaster.push(<Message>)` instead

All pop-up notification messages are managed using the new API toaster. The Alert component will be deprecated. The alternative is to use a combination of toaster and Message. E.g:

```js
// for rsuite v4
Alert.info('description');

// for rsuite v5
toaster.push(
  <Message type="info" closable>
    description
  </Message>
);
```

Remove messages and clear all messages

```js
// Remove message
const key = toaster.push(
  <Message type="info" closable>
    description
  </Message>
);
toaster.remove(key);

// Clear all messages
toaster.clear();
```

#### Refactor Notification

```js
// for rsuite v4
Notification.info({
  title: 'info',
  description: 'description',
  duration: 4500,
  placement: 'topStart'
});

// for rsuite v5
toaster.push(
  <Notification type="info" header="info" duration={4500}>
    description
  </Notification>,
  { placement: 'topStart' }
);
```

#### Rename Form related components

- `FormGroup` was renamed to `Form.Group`
- `FormControl` was renamed to `Form.Control`
- `ControlLabel` was renamed to `Form.ControlLabel`
- `ErrorMessage` was renamed to `Form.ErrorMessage`
- `HelpBlock` was renamed to `Form.HelpText`

#### Rename the `componentClass` property of all components to `as`

```js
// for rsuite v4
return <Button componentClass="span" />;

// for rsuite v5
return <Button as="span" />;
```

#### Disable all picker `virtualized` by default

The default value of virtualized for all pickers is `false`. If you want to continue using it in the project, you need to set it to `true`.

```js
<SelectPicker virtualized />
```

#### Improve the way to update children asynchronously

In order to facilitate asynchronous updating of child nodes, a new `getChildren` property has been added. Affected components:

- Cascader
- MutilCascader
- TreePicker
- CheckTreePicker

```js
getChildren:(node: ItemDataType) => Promise<ItemDataType[]>
```

```js
function fetchNodes(id) {
  return new Promise(resolve => {
    // fetch the child node data async
    resolve(childrenNodes);
  });
}

return (
  <>
    <Cascader getChildren={node => fetchNodes(node.id)} />
  </>
);
```

#### Removed `Table.Pagination`, and enhanced `Pagination`

The `Table.Pagination` component has been removed in this version. Please use `Pagination` instead. The `layout` property has been added for customizing the layout.

```js
// for rsuite v4
return (
  <Table.Pagination
    lengthMenu={[
      { value: 50, label: 50 },
      { value: 100, label: 100 }
    ]}
    activePage={1}
    displayLength={20}
    total={100}
    onChangePage={handleChangePage}
    onChangeLength={handleChangeLength}
  />
);

// for rsuite v5
return (
  <Pagination
    limit={50}
    limitOptions={[50, 100]}
    layout={['total', '-', 'limit', '|', 'pager', 'skip']}
    total={100}
    activePage={1}
    onChangePage={handleChangePage}
    onChangeLimit={handleChangeLimit}
  />
);
```

#### Replace `IntlProvider` with `CustomProvider`

```js
// for rsuite v4
import { IntlProvider } from 'rsuite';
import zhCN from 'rsuite/lib/IntlProvider/locales/zh_CN';

return (
  <IntlProvider locale={zhCN}>
    <App />
  </IntlProvider>
);

// for rsuite v5
import { CustomProvider } from 'rsuite';
import zhCN from 'rsuite/locales/zh_CN';

return (
  <CustomProvider locale={zhCN}>
    <App />
  </CustomProvider>
);
```

#### Deprecate `activeKey` and `onSelect` properties of `<Sidenav>`

`<Sidenav>` is always used in conjunction with `<Nav>`.
You should use `activeKey` and `onSelect` properties of `<Nav>` instead.

```js
// for rsuite v4

return (
  <Sidenav activeKey={activeKey} onSelect={setActiveKey}>
    <Sidenav.Body>
      <Nav>
        <Nav.Item>Nav item</Nav.Item>
        <Dropdown title="Dropdown">
          <Dropdown.Item>Dropdown item</Dropdown.Item>
        </Dropdown>
      </Nav>
    </Sidenav.Body>
  </Sidenav>
);

// for rsuite v5

return (
  <Sidenav>
    <Sidenav.Body>
      <Nav activeKey={activeKey} onSelect={setActiveKey}>
        <Nav.Item>Nav item</Nav.Item>
        <Dropdown title="Dropdown">
          <Dropdown.Item>Dropdown item</Dropdown.Item>
        </Dropdown>
      </Nav>
    </Sidenav.Body>
  </Sidenav>
);
```

#### Import on Demand

**Import components**

```ts
// v4
import Button from 'rsuite/lib/Button';
import 'rsuite/lib/Button/styles/index.less';

// v5
import Button from 'rsuite/Button';
import 'rsuite/Button/styles/index.less';
```

**Import locales**

```ts
// v4
import ruRU from 'rsuite/lib/IntlProvider/locales/ru_RU';

// v5
import ruRU from 'rsuite/locales/ru_RU';
```

**Import styles globally**

```ts
// v4
import 'rsuite/lib/styles/index.less'; // less
import 'rsuite/dist/styles/rsuite-default.css'; // css

// v5
import 'rsuite/styles/index.less'; // less
import 'rsuite/dist/rsuite.min.css'; // or css
import 'rsuite/dist/rsuite-rtl.min.css'; // or rtl css
```

#### Deprecate `renderTitle` property of `<Dropdown>`

The `renderTitle` has been deprecated and replaced by `renderToggle`.

```js
//v4
return (
  <Dropdown
    renderTitle={() => <IconButton appearance="primary" icon={<Icon icon="plus" />} circle />}
  >
    ...
  </Dropdown>
);

//v5
return (
  <Dropdown
    renderToggle={(props, ref) => (
      <IconButton {...props} ref={ref} icon={<PlusIcon />} circle appearance="primary" />
    )}
  >
    ...
  </Dropdown>
);
```

#### Use `open/close` instead of `show/hide`.

In v4, the attribute naming of the component has the use of `open/close` and `show/hide` at the same time. Unified naming in v5.

```html
// v4

<Modal show="{true}" onShow="{...}" onHide="{...}" />
<Drawer show="{true}" onShow="{...}" onHide="{...}" />
<Whisper delayHide="{1000}" delayShow="{1000}" />

// v5
<Modal open="{true}" onOpen="{...}" onClose="{...}" />
<Drawer open="{true}" onOpen="{...}" onClose="{...}" />
<Whisper delayClose="{1000}" delayOpen="{1000}" />
```
