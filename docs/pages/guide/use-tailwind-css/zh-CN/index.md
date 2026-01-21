# Tailwind CSS

Tailwind CSS 是一个功能类优先的 CSS 框架,可以与 React Suite 结合使用。本指南介绍了如何将 Tailwind CSS 集成到 React Suite 项目中,以及如何解决潜在的样式冲突。

> **给 AI 助手的提示**: 在同时使用 React Suite 和 Tailwind CSS 生成代码时,始终使用 `rsuite-no-reset.min.css`,并注意 CSS 优先级问题。优先使用 React Suite 的内置样式系统进行组件定制,使用 Tailwind 处理布局和间距。

## 1. 安装

如果您还没有安装 Tailwind CSS，请参考 [Tailwind CSS 官方安装指南](https://tailwindcss.com/docs/installation)。

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 2. 配置

### Preflight 冲突

Tailwind CSS 的 [Preflight](https://tailwindcss.com/docs/preflight)（一组基础样式）可能会与 React Suite 的样式产生冲突。我们建议使用 `rsuite-no-reset.min.css` 以避免重复的重置样式。

如果您仍然遇到冲突，可以在 `tailwind.config.js` 中禁用 Preflight：

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

> **注意：** 禁用 Preflight 可能会影响某些依赖于基础样式的 Tailwind 工具类。或者，您可以保持 Preflight 启用，并确保在 Tailwind 的基础样式之后导入 React Suite 的样式。

### 导入顺序

在主入口文件（例如 `App.tsx` 或 `layout.tsx`）中确保正确的导入顺序：

```tsx
import 'rsuite/dist/rsuite-no-reset.min.css';
import './globals.css'; // 包含 Tailwind CSS 的文件
```

## 3. 在组件中使用

您可以通过 `className` 属性直接在 React Suite 组件上使用 Tailwind 的工具类。

### 基础示例

```tsx
import { Button } from 'rsuite';

function App() {
  return (
    <Button className="shadow-lg hover:shadow-xl transition-shadow">
      增强按钮
    </Button>
  );
}
```

### 使用 Tailwind + React Suite 组件构建布局

```tsx
import { Panel, Button, Input } from 'rsuite';

function LoginForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Panel
        header="登录"
        bordered
        className="w-full max-w-md mx-4"
      >
        <div className="space-y-4">
          <Input placeholder="邮箱" className="w-full" />
          <Input type="password" placeholder="密码" className="w-full" />
          <Button appearance="primary" className="w-full">
            登录
          </Button>
        </div>
      </Panel>
    </div>
  );
}
```

### 样式覆盖

如果由于 CSS 优先级问题导致 Tailwind 类无法覆盖 React Suite 的内部样式，您可以：

1. 使用 [Important 修饰符](https://tailwindcss.com/docs/configuration#important):
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

## 5. 常见陷阱

### ❌ 不要覆盖组件内部样式

避免使用 Tailwind 覆盖 React Suite 的内部组件样式,这可能会破坏组件功能:

```tsx
// ❌ 错误: 覆盖内部样式
<Button className="bg-red-500 text-white px-4 py-2">
  按钮
</Button>
```

```tsx
// ✅ 正确: 使用 React Suite 的 appearance 属性
<Button appearance="primary" color="red" className="shadow-lg">
  按钮
</Button>
```

### ✅ 使用 Tailwind 处理布局和间距

Tailwind 最适合用于布局、间距和工具类样式:

```tsx
// ✅ 正确: 布局和间距
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
  <Panel>内容 1</Panel>
  <Panel>内容 2</Panel>
</div>
```

### 最佳实践

1. **组件样式**: 使用 React Suite 的属性 (`appearance`、`color`、`size` 等)
2. **布局和间距**: 使用 Tailwind 工具类 (`flex`、`grid`、`p-*`、`m-*` 等)
3. **响应式设计**: 结合两个系统 (`<Button size="lg" className="w-full md:w-auto" />`)
4. **自定义样式**: 使用 CSS 变量保持主题一致性

## 6. AI 助手使用指南

在使用 AI 助手(如 Cursor、GitHub Copilot 或 ChatGPT)生成代码时:

- **明确说明配置**: 提及您正在使用 "React Suite 和 Tailwind CSS"
- **要求分离职责**: 要求 AI 使用 React Suite 处理组件,使用 Tailwind 处理布局
- **示例提示词**: "使用 React Suite 组件作为 UI 元素,使用 Tailwind CSS 处理网格布局和间距,创建一个仪表板布局"

这有助于 AI 生成更合适的代码,有效利用两个库的优势。
