# Rate 评分

一个评分组件，表示用户对内容的兴趣

- `<Rate>`

## 获取组件

```js
import { Rate } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

| 属性名称        | 类型 `(默认值)`                                                        | 描述                             |
| --------------- | ---------------------------------------------------------------------- | -------------------------------- |
| allowHalf       | boolean                                                                | 是否支持半选                     |
| character       | React.ReactNode                                                        | 自定义字符                       |
| cleanable       | boolean`(true)`                                                        | 是否支持清除                     |
| defaultValue    | number`(0)`                                                            | 默认值                           |
| disabled        | boolean                                                                | 是否禁用，为 true 时无法进行交互 |  |
| max             | number`(5)`                                                            | 最大分数                         |
| renderCharacter | (value: number,index: number) => React.ReactNode                       | 自定义渲染 character 函数        |
| readOnly        | boolean                                                                | 是否只读，为 true 时无法进行交互 |
| size            | enum: 'lg', 'md', 'sm', 'xs' `('md')`                                  | 设置组件尺寸                     |
| color           | enum: 'red', 'orange','yellow', 'green', <br/>'cyan', 'blue', 'violet' | 设置颜色                         |
| value           | number                                                                 | 设置值 `受控`                    |
| vertical        | boolean                                                                | 是否竖直方向上半选               |
| onChange        | (value: number, event: React.SyntheticEvent<HTMLElement>) => void      | `value` 发生改变时的回调函数     |
| onChangeActive  | (value: number, event: React.SyntheticEvent<HTMLElement>) => void      | 悬停状态更改时触发的回调函数。   |
