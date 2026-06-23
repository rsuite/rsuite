# Tailwind CSS

Tailwind CSS 是一个功能类优先的 CSS 框架，可以与 React Suite 结合使用。本指南介绍如何将 Tailwind CSS 集成到 React Suite 项目中，以及如何解决潜在的样式冲突。

> **给 AI 助手的提示**: 在同时使用 React Suite 和 Tailwind CSS 生成代码时，始终使用 `rsuite-no-reset.min.css`。从 v6.3.x 开始，所有 React Suite CSS 都包裹在 `@layer rsuite` 中，因此 Tailwind 工具类会自动覆盖 rsuite 样式，无需使用 `!important`。优先使用 React Suite 的内置样式系统进行组件定制，使用 Tailwind 处理布局和间距。

## 1. 安装

如果您还没有安装 Tailwind CSS，请参考 [Tailwind CSS 官方安装指南](https://tailwindcss.com/docs/installation)。

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 2. 配置

### 禁用 Preflight

Tailwind CSS 的 [Preflight](https://tailwindcss.com/docs/preflight) 是通过 `@layer base` 应用的一组激进的 CSS 重置样式。与 React Suite 一起使用时，Preflight 会导致**布局和样式问题**：

| Preflight 规则 | 问题 |
| --- | --- |
| `svg { display: block }` | 内联 SVG 图标被迫换行 |
| `button { background-color: transparent }` | React Suite 按钮丢失背景色 |
| `button { border-radius: 0 }` | 按钮丢失圆角 |
| `*, ::before, ::after { margin: 0; padding: 0 }` | 组件间距和布局被破坏 |

由于 React Suite 有自己的 CSS 重置，**应该禁用 Preflight**。

#### Tailwind v4

将 `@import 'tailwindcss'` 替换为选择性导入：

```css
/* ✅ 只导入 theme（CSS 变量）和 utilities，跳过 Preflight */
@import 'tailwindcss/theme';
@import 'tailwindcss/utilities';
```

#### Tailwind v3

在 `tailwind.config.js` 中禁用 Preflight：

```js
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
};
```

### CSS @layer

从 v6.3.x 开始，所有 React Suite CSS 都被包裹在 `@layer rsuite { ... }` 中。这提供了自动的优先级控制：

- **Tailwind 工具类自动优先**：`@layer utilities` 比 `@layer rsuite` 优先级更高，因此 Tailwind 类会自动覆盖 rsuite 样式，无需 `!important`。
- **先加载 rsuite CSS 即可保证顺序**：Layer 的优先级取决于首次出现的顺序，先加载 rsuite CSS 可确保 `rsuite` 在前（低优先级），`utilities` 在后（高优先级）。如果希望完全不依赖导入顺序，可以显式声明层级顺序。

```tsx
import 'rsuite/dist/rsuite-no-reset.min.css';
import './globals.css'; // 包含 Tailwind CSS 的文件
```

如需完全不依赖导入顺序，在 CSS 文件顶部添加显式层级声明：

```css
/* 优先级：theme（最低）→ rsuite → components → utilities（最高） */
@layer theme, rsuite, components, utilities;
```

有了这个声明，rsuite 和 Tailwind CSS 的导入顺序就不再影响优先级。

> **注意：** 如果您使用的是 v6.3.x 之前的版本，可能仍然需要 `!important` 修饰符或注意导入顺序。参见下面的[样式覆盖](#样式覆盖)部分。

### 推荐的 CSS 入口配置

以下是项目全局 CSS 文件的推荐配置：

```css
/* globals.css */
@layer theme, rsuite, components, utilities;
@import 'tailwindcss/theme';
@import 'tailwindcss/utilities';

/* 您的自定义样式 */
```

```tsx
// App.tsx 或 layout.tsx
import 'rsuite/dist/rsuite-no-reset.min.css';
import './globals.css';
```

## 3. 在组件中使用

您可以通过 `className` 属性直接在 React Suite 组件上使用 Tailwind 的工具类。

### 基础示例

<!--{include:`basic.md`}-->

### 使用 Tailwind + React Suite 组件构建布局

<!--{include:`layout.md`}-->

### 样式覆盖

从 v6.3.x 开始，React Suite 的 CSS 被包裹在 `@layer rsuite` 中，因此 Tailwind 工具类会自动覆盖 rsuite 样式：

<!--{include:`override.md`}-->

如果您使用的是较旧版本的 React Suite（不支持 `@layer`），您可以：

1. 使用 [Important 修饰符](https://tailwindcss.com/docs/configuration#important)：
   ```tsx
   <Button className="!bg-red-500">强制红色</Button>
   ```
2. 或者在 `tailwind.config.js` 中配置 [选择器策略](https://tailwindcss.com/docs/configuration#selector-strategy)。

## 4. 设计系统集成

为了保持设计一致性，您可以将 React Suite 的 CSS 变量映射到 Tailwind 主题中：

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--rs-primary-500)',
        secondary: 'var(--rs-secondary-500)',
        bg: 'var(--rs-bg-card)',
      },
    },
  },
}
```

现在您可以使用 `text-primary` 或 `bg-bg` 等类名，这些类名将与 React Suite 的主题保持同步。

## 5. 最佳实践

### 使用 React Suite 属性设置组件样式

```tsx
// ❌ 避免：用 Tailwind 覆盖组件内部样式
<Button className="bg-red-500 text-white px-4 py-2">按钮</Button>

// ✅ 推荐：用内置属性，Tailwind 只做补充
<Button appearance="primary" color="red" className="shadow-lg">按钮</Button>
```

### 使用 Tailwind 处理布局和间距

```tsx
// ✅ Tailwind 擅长布局
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
  <Panel>内容 1</Panel>
  <Panel>内容 2</Panel>
</div>
```