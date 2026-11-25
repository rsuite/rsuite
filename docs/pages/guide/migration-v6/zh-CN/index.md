# 从 v5 升级到 v6

React Suite v6 是一个现代化的版本，主要带来了样式系统的重构（Less 转 SCSS）、React 18 的强制要求以及对 CSS 逻辑属性的全面支持。本指南将帮助你将现有的 v5 应用迁移到 v6。

## 概览

v6 的主要破坏性变更包括：

- **最低版本要求**：React >= 18.0.0, 不再支持 IE11。
- **样式系统**：从 Less 迁移到 SCSS。如果你使用了自定义主题或导入了 Less 文件，需要进行调整。
- **CSS 属性**：全面使用 CSS 逻辑属性（如 `margin-inline-start` 替代 `margin-left`）以支持 RTL。
- **依赖升级**：`date-fns` 升级到 v4。

## 1. 升级依赖

首先，更新 `rsuite` 和相关对等依赖：

```bash
npm install rsuite@latest react@latest react-dom@latest
# 或者
yarn add rsuite@latest react@latest react-dom@latest
```

如果你使用了 `date-fns`，也请确保升级到 v4 版本：

```bash
npm install date-fns@^4.0.0
```

## 2. 样式迁移 (Less -> SCSS)

这是 v6 中最大的变化。我们不再提供 Less 文件，而是提供编译好的 CSS 和 SCSS 源码。

### 如果你只使用编译后的 CSS

如果你只是引入了 `rsuite/dist/rsuite.min.css`，通常不需要做任何更改，除非你依赖了一些已被移除的 CSS 类名或特定的层叠样式。

### 如果你使用了自定义主题 (Less)

在 v5 中，你可能通过配置 Less loader 来修改变量。在 v6 中，为了提供更好的性能和兼容性（如支持 RSC），我们不再支持在运行时或构建时编译 Less/SCSS 变量。

**v6 推荐使用 CSS 变量进行主题定制。**

RSuite v6 全面引入了 CSS 变量系统。你可以在你的全局 CSS 文件中重新定义这些变量来覆盖默认样式：

```css
/* global.css */
:root {
  --rs-primary-50: #e3f2fd;
  --rs-primary-100: #bbdefb;
  --rs-primary-200: #90caf9;
  --rs-primary-500: #2196f3; /* 主色 */
  /* ...更多变量 */
}
```

更多可用的 CSS 变量，请参考 [CSS 变量](/guide/css-variables) 文档。

### 移除了废弃的 Less 变量

由于架构调整，我们不再暴露 Less/SCSS 变量供用户直接使用。请直接使用对应的 CSS 变量。

## 3. CSS 逻辑属性与 RTL

为了更好地支持从右到左（RTL）的语言布局，我们将所有的物理 CSS 属性（Physical Properties）替换为了逻辑属性（Logical Properties）。

- `margin-left` -> `margin-inline-start`
- `margin-right` -> `margin-inline-end`
- `padding-top` -> `padding-block-start`
- ...

**影响：**
如果你在自己的 CSS 中覆盖了 RSuite 的样式，并使用了物理属性（如 `margin-left`）去覆盖，可能因为优先级或属性名不同而失效。建议检查涉及布局覆盖的样式代码。

## 4. 组件变更

### Form 组件

1. **布局变更**：`Form` 组件不再包含布局相关的样式，不再默认处理子组件的间距。
   - 请使用新的 `Form.Stack` 组件来控制表单布局。
   - 为了兼容旧语法，`Form` 仍然保留了 `layout` 和 `fluid` 属性，会自动包裹 `Form.Stack`，但默认 `layout` 值不再是 `vertical`，你需要显式设置。

   ```jsx
   // v5
   <Form layout="horizontal">...</Form>

   // v6 推荐
   <Form>
     <Form.Stack layout="horizontal">...</Form.Stack>
   </Form>
   ```

2. **别名**：
   - `Form.ControlLabel` 可简写为 `Form.Label`。
   - `Form.HelpText` 可简写为 `Form.Text`。

### Grid 系统

1. **属性重构**：`Row` 和 `Col` 组件的响应式 API 进行了重设计，以支持更灵活的配置。
2. **Col 属性废弃**：直接的 `xs`, `sm`, `md`, `lg`, `xl`, `xxl` 以及对应的 `Offset`, `Push`, `Pull` 属性已被**废弃**。
3. **新用法**：请使用 `span` 属性配合对象语法。

   ```jsx
   // v5
   <Col xs={24} md={8}>...</Col>

   // v6
   <Col span={{ xs: 24, md: 8 }}>...</Col>
   ```

4. **FlexboxGrid**：已废弃，请直接使用 `Row` 和 `Col`（现在基于 Flex 布局且功能更强）。

### Navbar 与 Nav

`Nav` 组件的 `pullRight` 属性已废弃。请使用 `Navbar.Content` 来控制布局。

```jsx
// v5
<Navbar>
  <Nav>...</Nav>
  <Nav pullRight>...</Nav>
</Navbar>

// v6
<Navbar>
  <Nav>...</Nav>
  <Navbar.Content>
    <Nav>...</Nav>
  </Navbar.Content>
</Navbar>
```

### NumberInput (原 InputNumber)

`InputNumber` 已重命名为 `NumberInput`，以与其他输入组件（如 `DateInput`、`PasswordInput`）保持命名一致性。

```jsx
// v5
import { InputNumber } from 'rsuite';

// v6 推荐
import { NumberInput } from 'rsuite';
```

为了兼容性，`InputNumber` 仍然保留，但建议迁移到新名称。此外，`NumberInput` 还新增了 `controls` 属性支持。

### Picker 组件属性重命名

为了提高 API 一致性，Picker 组件的一系列属性进行了重命名：

| v5 属性名 | v6 新属性名 |
| :--- | :--- |
| `menuClassName` | `popupClassName` |
| `menuStyle` | `popupStyle` |
| `menuAutoWidth` | `popupAutoWidth` |
| `menuMaxHeight` | `listboxMaxHeight` |
| `renderMenu` | `renderListbox` |
| `renderMenuItem` | `renderOption` |
| `renderMenuGroup` | `renderOptionGroup` |
| `renderMenuItemCheckbox` | `renderCheckbox` |

### Badge 组件

隐藏 Badge 的方式发生变更。请使用 `invisible` 属性，而不是设置 `content={false}`。

### 样式单位 (rem)

组件样式中的字体大小、间距等尺寸单位已从 `px` 转换为 `rem`，以更好地支持响应式排版和无障碍缩放。

### FlexboxGrid (废弃)

`FlexboxGrid` 已被标记为废弃。建议使用新的布局组件 `Grid` (基于 CSS Grid) 或 `Box` (基于 Flexbox) 和 `Stack` (间距管理) 来替代。

```jsx
// v5
<FlexboxGrid>
  <FlexboxGrid.Item colspan={6}>...</FlexboxGrid.Item>
</FlexboxGrid>

// v6 推荐
<Grid>
  <Col xs={6}>...</Col>
</Grid>
// 或者
<Stack>...</Stack>
```

### Picker 属性重命名

为了保持 API 一致性，部分 Picker 组件的属性可能进行了微调（具体请参考组件文档）。主要关注 `cleanable`、`searchable` 等通用属性在不同 Picker 中的行为统一。

### 废弃属性移除

在 v5 中标记为 `@deprecated` 的属性在 v6 中已被正式移除。请检查控制台警告并在升级前修复。

## 5. 其他破坏性变更

- **DateFns v4**: `Calendar`, `DatePicker` 等组件内部依赖 `date-fns` v4。如果你在项目中混用了 `date-fns`，请注意版本兼容性。
- **React 17**: v6 内部使用了 `useId` 等 React 18 的 Hooks，因此不再支持 React 17。
- **IE11**: 移除了所有针对 IE11 的 Polyfill 和特殊样式处理。

## 遇到问题？

如果你在迁移过程中遇到任何问题，欢迎在 [GitHub Issues](https://github.com/rsuite/rsuite/issues) 中反馈，或在 [Discussions](https://github.com/rsuite/rsuite/discussions) 中讨论。
