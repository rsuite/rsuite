# V3 升级到 V4 注意事项

升级到 V4 有些破坏性的变更，需要做一些调整。

## 1.样式文件引入的目录变更

在 V4 中新增了 Dark 主题，对目录结构做了调整。

引入 less 文件的目录变更:

```diff
- import 'rsuite/styles/less/index.less';
+ import 'rsuite/lib/styles/index.less';  // 或者 'rsuite/lib/styles/themes/default/index.less'
```

引入 css 文件的目录变更：

```diff
- import 'rsuite/dist/styles/rsuite.css';
+ import 'rsuite/dist/styles/rsuite-default.css';
```

## 2.Dropdown, Whisper 以及所有 Picker 的属性 placement 的值变更。

```diff
type Placement4 = 'top' | 'bottom' | 'right' | 'left';
type Placement8 =
- | 'bottomLeft'
+ | 'bottomStart'
- | 'bottomRight'
+ | 'bottomEnd'
- | 'topLeft'
+ | 'topStart'
- | 'topRight'
+ | 'topEnd'
- | 'leftTop'
+ | 'leftStart'
- | 'leftBottom'
+ | 'leftEnd'
- | 'rightTop'
+ | 'rightStart'
- | 'rightBottom';
+ | 'rightEnd';
type PlacementAuto =
  | 'auto'
- | 'autoVerticalLeft'
+ | 'autoVerticalStart'
- | 'autoVerticalRight'
+ | 'autoVerticalEnd'
- | 'autoHorizontalTop'
+ | 'autoHorizontalStart'
- | 'autoHorizontalBottom';
+ | 'autoHorizontalEnd';
```

## 3.Schema 中的 addRule 方法调用的优先级变更

**3.0 版本调用优先级是：**

- `addRule`
- `isRequired`
- 预定义的校验方法

**4.0 版本修改后的优先级**

- `isRequired`
- 其他预定义校验方法和 `addRule` 依次执行

如果想要恢复到之前的优先级，`addRule` 添加了第三个参数可以调整优先级，默认为 `false`, 如果设置为 `true` 则优先级最高。会最先执行。

## 4.TreePicker 与 CheckTreePicker 废弃 expandAll 属性

TreePicker 组件与 CheckTreePicker 组件废弃了 expandAll 属性，同时添加了 expandItemValues 属性，用于展开指定节点。

## 5.CheckTreePicker onSelect 方法参数变更

```diff
- onSelect (activeNode:DataItemType, layer:number, values:string[]) => void
+ onSelect (activeNode: any, value: any, event: React.SyntheticEvent<any>) => void;
```

## 6.升级 `babel-preset-rsuite`

由于目录上的调整，项目中如果使用了按需加载工具 `babel-preset-rsuite`, 需要升级到 `4.0.0` 版本。

```
npm i babel-preset-rsuite@4.0.0
```
