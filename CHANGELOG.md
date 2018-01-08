# 3.0.0 next

- 支持 Flow, 类型检查
- Breadcrumb 新增支持 separator, 自定义分隔符
- Modal autoResizeHeight 属性重命名为 overflow
- 更新 Button 组进行
  - 删除 shape 属性， 通过 appearance 属性代替，新增对 subtle，ghost 按钮支持
  - 新增支持 color 属性，定义按钮颜色
  - 新增支持 loading 属性
- 新增 Icon Button 组件
- 新增 Icon 组件，代替 IconFont 组件，同时支持 svg 自定义导入图标
- 增强 Table 组件，集成所有 rsuite-table 功能
- 增强 Form 组件，集成所有 form-lib 与 rsuite-schema 功能
- 更新 Checkbox 组件，支持 indeterminate 属性
- 更新 Dropdown 组件
  - 删除 activeKey 与 select 属性，如果需要选择功能，可以使用 SelectPicker 组
  - 支持多级菜单
  - 支持 placement 属性，设置菜单显示位置
- 新增 Drawer 组件
- 新增 Progress 组件
- 新增 Alert 组件
- 新增 Message 组件
- 新增 Notification 组件
- 更新 Nav 组件，新增 appearance（'default' | 'subtle' | 'tabs'） 属性。

