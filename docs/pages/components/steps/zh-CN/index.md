# Steps 步骤条

引导用户按照流程完成任务的导航条。

* `<Steps>` 步骤条组件
* `<Steps.Item>` 步骤条内的每一个步骤。

## 获取组件

```js
import { Steps } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<Steps>`

| 属性名称      | 类型 `(默认值)`                                    | 描述               |
| ------------- | -------------------------------------------------- | ------------------ |
| classPrefix   | string `('steps')`                                 | 组件 CSS 类的前缀  |
| current       | number`(0)`                                        | 当前执行步骤       |
| currentStatus | 'finish', 'wait', 'process', 'error' `('process')` | 当前执行步骤状态   |
| small         | boolean                                            | 设置小尺寸的步骤条 |
| vertical      | boolean                                            | 设置垂直显示       |

### `<Steps.Item>`

| 属性名称    | 类型 `(默认值)`                      | 描述               |
| ----------- | ------------------------------------ | ------------------ |
| classPrefix | string `('steps-item')`              | 组件 CSS 类的前缀  |
| description | React.Node                           | 设置描述           |
| icon        | React.Element&lt;typeof Icon&gt; ,   | 设置小尺寸的步骤条 |
| status      | 'finish', 'wait', 'process', 'error' | 步骤状态           |
| title       | React.Node                           | 设置标题           |
