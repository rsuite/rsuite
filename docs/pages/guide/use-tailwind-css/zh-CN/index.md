# Tailwind CSS

React Suite 组件可以搭配 Tailwind 工具类实现布局和样式定制。请根据使用的 Tailwind 版本选择配置。

## Tailwind CSS v4

以下配置适用于已发布的 React Suite 6.2.5 样式。将 React Suite 放入 CSS 级联层后，普通 Tailwind 工具类即可覆盖组件样式，无需 `!important`。

### 安装和配置 PostCSS

在使用 PostCSS 的应用中安装：

```bash
npm install -D tailwindcss@4 @tailwindcss/postcss@4 postcss
```

在 `postcss.config.mjs` 中添加 Tailwind 插件：

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {}
  }
};
```

如果框架已配置 Tailwind，请沿用其集成方式。Vite 等构建工具的配置请参阅[官方安装指南](https://tailwindcss.com/docs/installation)。

### 在一个 CSS 入口中声明层级顺序

创建 `globals.css`：

```css
@layer theme, base, rsuite, components, utilities;

@import 'tailwindcss';
@import 'rsuite/dist/rsuite-no-reset.min.css' layer(rsuite);
```

在应用入口中导入一次该文件，例如 `src/main.tsx`、Next.js 的 `app/layout.tsx` 或 `pages/_app.tsx`：

```tsx
import './globals.css';
```

第一行必须出现在这些级联层首次声明之前。它将 Tailwind Preflight 放在 `base` 层，将 React Suite 放在其上的 `rsuite` 层，并让 `utilities` 中的普通工具类优先于组件样式。

请保留这个 CSS 入口中的 React Suite 导入。如果另外在 JavaScript 中导入 `rsuite/dist/rsuite-no-reset.min.css`，或再导入未分层的组件样式，这些样式会优先于普通的分层工具类。React Suite 包内的 CSS 文件本身不包含级联层；`layer(rsuite)` 为当前应用启用分层。

Tailwind v4 自行处理 CSS 导入。这里使用普通 `.css` 入口；如果应用同时使用 Sass，请参阅 [Tailwind 的预处理器兼容说明](https://tailwindcss.com/docs/compatibility#sass-less-and-stylus)。

### 在组件上使用工具类

```tsx
import { Button, Panel } from 'rsuite';

function Example() {
  return (
    <Panel bordered className="mx-auto max-w-md p-6">
      <Button appearance="primary" className="rounded-full px-8 shadow-lg">
        保存修改
      </Button>
    </Panel>
  );
}
```

使用 `appearance`、`color`、`size` 等组件属性选择内置样式。工具类作用于接收 `className` 的元素；修改内部元素时可能需要组件提供的样式 API。行内样式和带有 `!important` 的声明仍遵循各自的级联优先级。

### 共享主题颜色

在 `globals.css` 的导入语句后添加：

```css
@theme inline {
  --color-primary: var(--rs-primary-500);
  --color-card: var(--rs-bg-card);
}
```

随后即可使用 `bg-primary`、`text-primary` 和 `bg-card`。这些工具类读取 React Suite 的 CSS 变量，包括当前主题下的变量值。

### 使用应用自己的重置样式

如果应用已有重置样式，可以省略 Tailwind Preflight，同时保留具名级联层：

```css
@layer theme, base, rsuite, components, utilities;

@import 'tailwindcss/theme.css' layer(theme);
@import 'rsuite/dist/rsuite-no-reset.min.css' layer(rsuite);
@import 'tailwindcss/utilities.css' layer(utilities);
```

将应用的重置样式放在 `@layer base` 中，使其优先级低于组件样式。部分工具类依赖基础样式，请结合应用的重置样式检查实际效果。参阅 [Tailwind Preflight](https://tailwindcss.com/docs/preflight) 了解其默认行为。

## Tailwind CSS v3

Tailwind v3 使用 JavaScript 配置和不同的 PostCSS 指令。已有的 v3 应用可以继续使用以下配置：

```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

在 `tailwind.config.js` 中配置源文件：

```js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--rs-primary-500)',
        card: 'var(--rs-bg-card)'
      }
    }
  },
  plugins: []
};
```

在 CSS 中使用 v3 的常规指令：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

在应用入口导入 React Suite 样式和编译后的 Tailwind CSS：

```tsx
import 'rsuite/dist/rsuite-no-reset.min.css';
import './globals.css';
```

v3 中的样式覆盖仍受选择器优先级影响。如果工具类无法覆盖组件规则，可使用 v3 的 [important 修饰符或选择器策略](https://v3.tailwindcss.com/docs/configuration#important)，例如 `className="!rounded-full"`。如果应用有自己的重置样式，可以在 `tailwind.config.js` 中设置 `corePlugins: { preflight: false }`，关闭 v3 Preflight。
