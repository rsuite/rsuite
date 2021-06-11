# React Suite 5 新特性及升级指南

React Suite v4 的第一个版本已经有一年的时间了，在这一年左右的时间里 v4 一共迭代了 30 个版本，新增了许多特性，也越来越多的开发者开始使用 React Suite，并且参与功能开发与改进。还有一直对我们提出宝贵建议的开发者们，我们再次表示感谢，希望未来我们一起前行，让 React Suite 能够服务到更多的开发者。

React Suite v5 的目的是改进组件的可访问性和可扩展性，以下将详细介绍新增特性及升级指南。

## 主要功能 ✨

### 1. 提升可访问(Accessibility)

#### 1.1 无障碍设计

可以让更多的用户在 React Suite 开发的产品上无障碍的使用，是我们的希望，我们会在键盘操作、读屏设备等多个场景去改善 React Suite 提供的每一个组件。

详细的内容请阅读: [无障碍设计](/zh/guide/accessibility)

#### 1.2 新增一套高对比度主题

在 React Suite v4 我们参照 [《Web Content Accessibility Guidelines (WCAG) 》](https://www.w3.org/TR/WCAG/#contrast-minimum)标准对颜色对比度的要求，对组件做了很大的改进，可以满足大多数用户。 我们还是希望在此基础上进行提升，并照顾到一小部分在视力上存在障碍的人群。

#### 1.3 采用 SVG Icon 代替 Icon font

Icon font 存在存在一些渲染上问题，导致图标模糊，需要载入字体文件，导致内容区域闪烁等问题。 为了更好的可访问性(Accessibility)，我们决定优先采用 SVG Icon。

```js
import GearIcon from '@rsuite/icons/Gear';

render(<GearIcon />);

// output
<svg>
  <path d="M11.967 ..."></path>
  <path d="M8 10a2 2 0 10.001-3.999A2 2 0 008 10zm0 1a3 3 0 110-6 3 3 0 010 6z"></path>
</svg>;
```

### 2. 支持 CSS 变量

当前主流的浏览器都已经支持 CSS 变量，我们计划提供一套组件 CSS 变量配置，可以更方便的做主题自定义，主题切换。

### 3. 采用函数组件重构

我们函数组件去重构大部分的组件，采用 React Hooks 所带来的新特性，提升开发体验。

---

## 功能改进 🔨

### 1. 对 Form 表单的改进

- 改进 Form 在纯文本视图的效果

- 对组件重命名

```
`FormGroup` 重命名为 `Form.Group`
`FormControl` 重命名为 `Form.Control`
`ControlLabel` 重命名为 `Form.ControlLabel`
`ErrorMessge` 重命名为 `Form.ErrorMessge`
`HelpBlock` 重命名为 `Form.HelpText`
```

- 表单校验支持对象结构

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

详细的使用请阅读: [表单校验](/zh/components/form-validation)与[Schema](https://github.com/rsuite/schema-typed)

### 2. Avatar 新增支持 srcSet、sizes、imgProps 属性

- srcSet: `<img>` 元素的 `srcSet` 属性。 使用此属性进行响应式图像显示。
- sizes: `<img>` 元素的 `sizes` 属性。
- imgProps: 如果该组件用于显示图像，则应用于 `<img>` 元素的属性。

### 3. Slider 和 RangeSlider 支持 `onChangeCommitted`

`onChangeCommitted` 和 `onChange` 不同的点在于，`onChange` 是每一次值的改变都会触发，而 `onChangeCommitted` 是在 `mouseup` 事件触发后并且值发生了改变而触发的的回调。

### 4. DatePicker 和 DateRangePicker 功能改进

- DatePicker 与 DateRangePicker 支持键盘输入。
- DateRangePicker 之前只能选择日期，在 v5 中可以选择时间

```js
<DateRangePicker format="yyyy-MM-dd HH:mm:ss" />
```

### 5. Badge 支持 `color` 属性

`color` 属性设置徽标提示点样式

```js
<Badge color="red">Red</Badge>
<Badge color="orange">Orange</Badge>
<Badge color="yellow">Yellow</Badge>
```

---

## 从 v4 升级到 v5 🚀

接下来将为你提供指导，从而能够迅速的从 v4 升级到 v5。

### 1. 准备工作

- React 升级到 16.8 以上版本。

### 2. 不兼容的变更

#### 2.1 不再对 IE 10 进行兼容支持

我们将在 v5 版本中不再支持 IE 10，如果你需要继续在 IE 10 浏览器上使用请继续使用 v4 版本。

#### 2.2 采用 SVG Icon 代替 Icon font

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

#### 2.3 date-fns 升级 v2

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

#### 2.4 废弃 Alert 组件，用 `toaster.push(<Message>)` 代替

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

#### 2.5 修改 Notification 使用方式

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

#### 2.6 Form 相关组件重命名

- `FormGroup` 重命名为 `Form.Group`
- `FormControl` 重命名为 `Form.Control`
- `ControlLabel` 重命名为 `Form.ControlLabel`
- `ErrorMessge` 重命名为 `Form.ErrorMessge`
- `HelpBlock` 重命名为 `Form.HelpText`

#### 2.7 所有组件的 componentClass 属性重命名为 as

```js
// for rsuite v4
return <Button componentClass="span" />;

// for rsuite v5
return <Button as="span" />;
```

#### 2.8 所有 Picker 的 virtualized 属性，默认值从 true 改为 false

所有的 Picker 关闭了 virtualized ，如果你希望继续在项目中使用，需要手动开启。

```js
<SelectPicker virtualized />
```

#### 2.9 Cascader/MutilCascader/TreePicker/CheckTreePicker 改进异步更新子级的方式

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

#### 2.10 删除 Table.Pagination， 并增强 Pagination

`Table.Pagination` 组件在本次更新中删除，请使用 `Pagination` 代替，新增了 `layout` 属性，用于自定义布局。

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
