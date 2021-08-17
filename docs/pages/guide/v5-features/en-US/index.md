# React Suite 5 new features and upgrade guide

It has been a year since the first version of React Suite v4. In this year or so, v4 has iterated a total of 30 versions, adding many new features, and more and more developers are starting to use React Suite , And participate in function development and improvement. There are also developers who have always provided us with valuable suggestions. We thank you again and hope that we will move forward together in the future so that React Suite can serve more developers.

The purpose of React Suite v5 is to improve the accessibility and scalability of components. The new features and upgrade guide will be introduced in detail below.

## Major changes ✨

### 1. Improve accessibility

It is our hope that more users can use barrier-free use of products developed by React Suite. We will improve each component provided by React Suite in multiple scenarios such as keyboard operation and screen reading devices.

#### 1.1 Accessibility

React Suite follows the [WAI-ARIA](https://www.w3.org/TR/wai-aria/) standard. All components have been refactored to have appropriate attributes and keyboard interaction functions out of the box.

For details, please read: [Accessibility](/guide/accessibility)

#### 1.2 Add a set of high contrast themes

In React Suite v4, we refer to the 《Web Content Accessibility Guidelines (WCAG) 》 standard for color contrast requirements, and have made great improvements to the components to meet most users. We still hope to improve on this basis and take care of a small number of people with visual impairments.

#### 1.3 Use SVG Icon instead of Icon font

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

### 2. Support CSS variables

Current mainstream browsers already support CSS variables. We plan to provide a set of component CSS variable configurations to make theme customization and theme switching more convenient.

### 3. Refactoring with functional components

We refactored most of our components using function component and adopted the new features brought by React Hooks to enhance the development experience.

---

## Improvements in components

### 1. Improvements to Form

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

checkResult return structure is:

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

### 2. Added support for srcSet, sizes,imgProps on Avatar

- srcSet: The srcSet attribute for the img element. Use this attribute for responsive image display.
- sizes: The sizes attribute for the img element.
- imgProps: Attributes applied to the img element if the component is used to display an image.

### 3. Added support `onChangeCommitted` on Slider and RangeSlider

The difference between `onChangeCommitted` and `onChange` is that `onChange` is triggered every time the value changes, while `onChangeCommitted` is a callback that is triggered after the `mouseup` event is triggered and the value changes.

### 4. Improvements to DatePicker and DateRangePicker

- DatePicker and DateRangePicker support keyboard input.
- DateRangePicker can only select date before, and time can be selected in v5

```js
<DateRangePicker format="yyyy-MM-dd HH:mm:ss" />
```

### 5. Badge supports the color property

```js
<Badge color="red">Red</Badge>
<Badge color="orange">Orange</Badge>
<Badge color="yellow">Yellow</Badge>
```

### 6. Refactor Table

Use react hooks to refactor the Table and improve the performance when the table scrolls. [The `onDataUpdated` and `bodyRef` props are deprecated](https://github.com/rsuite/rsuite-table/pull/232).

For some components to be rendered inside the table, the body container of the table can be obtained through `bodyRef` before. Now we can get the container directly through the `ref` of `Table`.

```js
// v4
const bodyRef = uesRef();
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
const ref = uesRef();
return (
  <>
    <Table ref={ref} />
    <CheckPicker container={() => ref.current.body} />
  </>
);
```

---

## To v5 from v4

The v5 version has been released, and then I will provide you with guidance so that you can quickly upgrade from v4 to v5.

### 1. Updating your dependencies

- React is upgraded to version 16.8 and above.

### 2. Handling breaking changes

#### 2.1 It no longer supports IE 10

We will no longer support IE 10 in the v5 version. If you need to continue using the IE 10 browser, please continue to use the v4 version.

#### 2.2 Use SVG Icon instead of Icon font

Icon font has some rendering problems, resulting in blurry icons, font files need to be loaded, and flickering of the content area. For better accessibility, we decided to use SVG Icon first. You need to install `@rsuite/icons` before using it.

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

| size | fontSize   |
| ---- | ---------- |
| `lg` | `1.3333em` |
| `2x` | `2em`      |
| `3x` | `3em`      |
| `4x` | `4em`      |
| `5x` | `5em`      |

#### 2.3 date-fns upgrade v2

The date-fns tool is used in React Suite for date format, calculation, etc. Based on the Unicode standard, the new format string used for [format functions has changed](<(https://blog.date-fns.org/post/unicode-tokens-in-date-fns-v2-sreatyki91jg/)>). [Detailed description]

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

#### 2.4 Alert is deprecated. Use `toaster.push(<Message>)` instead

All pop-up notification messages are managed using the new API toaster. The Alert component will be deprecated. The alternative is to use a combination of toaster and Message. E.g:

```js
// for rsuite v4
Alert.info('description');

// for rsutie v5
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

#### 2.5 Refactor Notification

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

#### 2.6 Rename Form related components

- `FormGroup` was renamed to `Form.Group`
- `FormControl` was renamed to `Form.Control`
- `ControlLabel` was renamed to `Form.ControlLabel`
- `ErrorMessage` was renamed to `Form.ErrorMessage`
- `HelpBlock` was renamed to `Form.HelpText`

#### 2.7 Rename the `componentClass· property of all components to`as`

```js
// for rsuite v4
return <Button componentClass="span" />;

// for rsuite v5
return <Button as="span" />;
```

#### 2.8 All virtualized properties of Picker, the default value is changed from `true` to `false`

All pickers are closed `virtualized`. If you want to continue using it in the project, you need to manually open it.

```js
<SelectPicker virtualized />
```

#### 2.9 Cascader/MutilCascader/TreePicker/CheckTreePicker improves the way to update children asynchronously

In order to facilitate asynchronous updating of child nodes, a new `getChildren` property has been added.

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

#### 2.10 Removed `Table.Pagination`, and enhanced `Pagination`

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

#### 2.11 Replace `IntlProvider` with `CustomProvider`

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

#### 2.12 Deprecate `activeKey` and `onSelect` properties of `<Sidenav>`

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

#### 2.13 Import on Demand

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
