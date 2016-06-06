# Panel

属性名称            | 类型                                                                           | 默认值     | 描述
--------------- | ---------------------------------------------------------------------------- | ------- | --
collapsible     | boolean                                                                      | false   |
classPrefix     | string                                                                       | `panel` |
defaultExpanded | boolean                                                                      | false   |
expanded        | boolean                                                                      |         |
eventKey        | any                                                                          |         |
header          | node                                                                         |         |
id              | string 或者 number                                                             |         |
shape           | one of: `default`, `primary`, `link`, `success`, `warning`, `danger`, `info` |         |
onSelect        | function                                                                     |         |
onEnter         | function                                                                     |         |
onEntering      | function                                                                     |         |
onEntered       | function                                                                     |         |
onExit          | function                                                                     |         |
onExiting       | function                                                                     |         |
onExited        | function                                                                     |         |

# PanelGroup

属性名称             | 类型       | 默认值   | 描述
---------------- | -------- | ----- | --
accordion        | boolean  | false |
classPrefix      | string   |       |
children         | node     |       |
activeKey        | any      |       |
defaultActiveKey | any      |       |
onSelect         | function |       |
