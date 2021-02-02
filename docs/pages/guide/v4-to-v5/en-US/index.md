# To v5 from v4

The v5 version has been released, and then I will provide you with guidance so that you can quickly upgrade from v4 to v5.

## Why upgrade to v5?

This article will introduce if you upgrade to v5 and why you should upgrade to v5, you can discuss the content of the upgrade in [Github discussions](https://github.com/rsuite/rsuite/discussions/1165) in detail.

## Updating your dependencies

- React is upgraded to version 16.8 and above.

## Handling breaking changes

### It no longer supports IE 10

We will no longer support IE 10 in the v5 version. If you need to continue using the IE 10 browser, please continue to use the v4 version.

### Use SVG Icon instead of Icon font

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

### date-fns upgrade v2

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

### Alert is deprecated. Use `toaster.push(<Message>)` instead

All pop-up notification messages are managed using the new API toaster. The Alert component will be deprecated. The alternative is to use a combination of toaster and Message. E.g:

```js
// for rsuite v4
Alert.info('description');

// for rsutie v5
toaster.push(<Message type="info" description="description" closable />);
```

```js
// Remove message
const key = toaster.push(<Message type="info" description="description" closable />);
toaster.remove(key);

// Clear all messages
toaster.clear();
```

### 修改 Notification 使用方式

```js
// for rsuite v4
Notification.info({
  title: 'info',
  description: 'description',
  duration: 4500,
  placement: 'topStart'
});

// for rsuite v5
toaster.push(<Notification title="info" description="description" />, {
  duration: 4500,
  placement: 'topStart'
});
```

### Rename Form related components

- `FormGroup` was renamed to `Form.Group`
- `FormControl` was renamed to `Form.Control`
- `ControlLabel` was renamed to `Form.ControlLabel`
- `ErrorMessge` was renamed to `Form.ErrorMessge`
- `HelpBlock` was renamed to `Form.HelpText`

### Rename the `componentClass· property of all components to`as`

```js
// for rsuite v4
return <Button componentClass="span" />;

// for rsuite v5
return <Button as="span" />;
```

### All virtualized properties of Picker, the default value is changed from `true` to `false`

All pickers are closed `virtualized`. If you want to continue using it in the project, you need to manually open it.

```js
<SelectPicker virtualized />
```

### Cascader/MutilCascader/TreePicker/CheckTreePicker improves the way to update children asynchronously

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
