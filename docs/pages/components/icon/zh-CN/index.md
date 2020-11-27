# Icon 图标

语义化的矢量图标组件。除了内置的常用图标外，还可以使用自定义的矢量图标。使用图标组件，你需要安装`@rsuite/icons`图标组件包。

## 安装组件

<!--{include:(components/icon/fragments/install.md)}-->

## 获取组件

<!--{include:(components/icon/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 动态图标

<!--{include:`spin.md`}-->

### 旋转和翻转

<!--{include:`rotate.md`}-->

### 自定义图标

<!--{include:`custom.md`}-->

### 使用 icontfont.cn

如果你是 [iconfont.cn](https://iconfont.cn) 的用户，可以使用 `createIconFont` 方法绘制已有项目中的图标。

<!--{include:`create-icon-font.md`}-->

### API

#### `<Icon>` 和内置图标

| 属性名称 | 类型 `(默认值)`                | 描述                        |
| -------- | ------------------------------ | --------------------------- |
| fill     | boolean`currentColor`          | 计算后的 `svg` 的填充颜色   |
| width    | string &#124; number           | 计算后的 `svg` 的宽度       |
| height   | string &#124; number           | 计算后的 `svg` 的高度       |
| spin     | boolean                        | 动态旋转图标                |
| pulse    | boolean                        | 动态旋转图标，旋转 8 步     |
| rotate   | number                         | 旋转图标                    |
| flip     | enum: 'horizontal', 'vertical' | 翻转图标                    |
| style    | enum: 'horizontal', 'vertical' | 计算后的 `svg` 元素样式     |
| as       | React.ReactNode                | 传入一个自定义的 react 组件 |

#### `createIconFont`

| 属性名称         | 类型 `(默认值)`        | 描述                                                                                |
| ---------------- | ---------------------- | ----------------------------------------------------------------------------------- |
| scriptUrl        | string &#124; string[] | [iconfont.cn](https://iconfont.cn) 项目在线生成的 js 地址，当然你也可以使用本地地址 |
| extraCommonProps | { [key:string]: any }  | 给所有的 `svg` 图标组件设置额外属性                                                 |

#### `createIconFont`返回的 `<Icon/>` 组件

| 属性名称 | 类型 `(默认值)`                | 描述                      |
| -------- | ------------------------------ | ------------------------- |
| icon     | string                         | iconfont 图标集中的图标名 |
| fill     | boolean`currentColor`          | `svg` 的填充颜色          |
| width    | string &#124; number `1em`     | `svg` 的宽度              |
| fill     | string &#124; number `1em`     | `svg` 的高度              |
| spin     | boolean                        | 动态旋转图标              |
| pulse    | boolean                        | 动态旋转图标，旋转 8 步   |
| rotate   | number                         | 旋转图标                  |
| flip     | enum: 'horizontal', 'vertical' | 翻转图标                  |
| style    | enum: 'horizontal', 'vertical' | 计算后的 `svg` 元素样式   |
