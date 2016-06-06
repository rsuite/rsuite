#### Tooltip

属性名称            | 类型                                       | 默认值       | 描述
--------------- | ---------------------------------------- | --------- | ----------
placement       | one of: `top`, `right`, `bottom`, `left` | `right`   |
positionLeft    | number
positionTop     | number                                   |           |
classPrefix     | string                                   | `tooltip` |
arrowOffsetLeft | number or string                         |           |
arrowOffsetTop  | number or string                         |           |
title           | node                                     |           | Title text


#### Whisper

属性名称                 | 类型                                                                           | 默认值 | 描述
-------------------- | ---------------------------------------------------------------------------- | --- | --
placement            | one of: `top`, `right`, `bottom`, `left`                                 |`right`|
trigger              | one of: `click`, `hover`, `focus` or  array one of: `click`, `hover`, `focus` |  [`hover`, `focus`]   |
delay                | number                                                                       |     |
delayShow            | number                                                                       |     |
delayHide            | number                                                                       |     |
speaker `isRequired` | node   `Tooltip`, `Popover`                                                                   |     |
onBlur               | function                                                                     |     |
onClick              | function                                                                     |     |
onFocus              | function                                                                     |     |
onMouseLeave         | function                                                                     |     |
