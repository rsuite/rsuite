# 从 v4 升级到 v5

我们已经发布了 v5 版本，接下来将为你提供指导，从而能够迅速的从 v4 升级到 v5。

## 为什么要升级到 v5 ？

本文将介绍如果升级到 v5 ，关于为什么要升级到 v5, 在[Github discussions](https://github.com/rsuite/rsuite/discussions/1165) 对升级的内容进行详细的说明，大家可以讨论。

## 准备工作

- React 升级到 16.8 以上版本。

## 不兼容的变更

### 不再对 IE 10 进行兼容支持

我们将在 v5 版本中不再支持 IE 10，如果你需要继续在 IE 10 浏览器上使用请继续使用 v4 版本。

### 采用 SVG Icon 代替 Icon font

Icon font 存在存在一些渲染上问题，导致图标模糊，需要载入字体文件，导致内容区域闪烁等问题。 为了更好的可访问性(Accessibility)，我们决定优先采用 SVG Icon，使用前你需要安装 `@rsuite/icons`。

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

### date-fns 升级 v2

在 React Suite 中使用了 date-fns 工具用于对日期格式、计算等等。基于 Unicode 标准，[用于格式功能的新格式字符串有变更](https://blog.date-fns.org/post/unicode-tokens-in-date-fns-v2-sreatyki91jg/)。

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

### 废弃 Alert 组件，用 `toaster.push(<Message>)` 代替

所有的弹出的通知消息，都使用新的 API toaster 进行管理。Alert 组件将会被废弃，替代的方式是通过 toaster 与 Message 组合使用。 例如：

```js
// for rsuite v4
Alert.info('description');

// for rsutie v5
toaster.push(<Message type="info" description="description" closable />);
```

一个可以配置的通知信息

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

### Form 相关组件重命名

- `FormGroup` 重命名为 `Form.Group`
- `FormControl` 重命名为 `Form.Control`
- `ControlLabel` 重命名为 `Form.ControlLabel`
- `ErrorMessge` 重命名为 `Form.ErrorMessge`
- `HelpBlock` 重命名为 `Form.HelpText`

### 所有组件的 componentClass 属性重命名为 as

```js
// for rsuite v4
return <Button componentClass="span" />;

// for rsuite v5
return <Button as="span" />;
```

### 所有 Picker 的 virtualized 属性，默认值从 true 改为 false

所有的 Picker 关闭了 virtualized ，如果你希望继续在项目中使用，需要手动开启。

```js
<SelectPicker virtualized />
```

### Cascader/MutilCascader/TreePicker/CheckTreePicker 改进异步更新子级的方式

为了方便异步更新子节点，新增了一个 getChildren 属性。

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
