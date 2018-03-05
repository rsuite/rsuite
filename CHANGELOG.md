# 3.0.0 next

* 支持 Flow, 类型检查
* 支持 React 15+,16+, 同时兼容 React 0.14.9+
* 支持 国际化
* 放弃对 IE9 的支持
* Breadcrumb 新增支持 separator, 自定义分隔符
* Modal autoResizeHeight 属性重命名为 overflow
* 更新 Button 组进行
  * 删除 shape 属性， 通过 appearance 属性代替，新增对 subtle，ghost 按钮支持
  * 新增支持 color 属性，定义按钮颜色
  * 新增支持 loading 属性
* 更新 Table 组件
  * 集成所有 rsuite-table 功能
  * 新增支持合并单元格
  * 新增支持文本过长换行的处理，需要设置 wordWrap 属性，默认为 flase
* 更新 Checkbox 组件，支持 indeterminate 属性
* 更新 Dropdown 组件
  * 删除 activeKey 与 select 属性，如果需要选择功能，可以使用 SelectPicker 组
  * 支持多级菜单
  * 支持 placement 属性，设置菜单显示位置
* 更新 Nav 组件，新增 appearance（'default' | 'subtle' | 'tabs'） 属性。
* 更新 Form 组件
  * 集成所有 form-lib 与 rsuite-schema 功能
  * 用 FormControl 组件取代了 Field 组件,(默认处理 Input 组件，可以通过 accepter 属性修改 )
  * Form checkTrigger 属性值 null 改为 'none'
  * 支持 3 种布局方式 layout: 'horizontal' | 'vertical' | 'inline'
* 把独立组件库统一集成到 rsuite 库
  * 新增 Uploader 组件
  * 新增 Tree 组件
  * 新增 CheckTree 组件
  * 新增 TreePicker 组件
  * 新增 CheckTreePicker 组件
  * 新增 SelectPicker 组件
  * 新增 CheckPicker 组件
  * 新增 Cascader 组件
  * 新增 AutoComplete 组件
  * 新增 DatePicker 组件
  * 新增 DateRangePicker 组件
  * 新增 Slider 组件
  * 新增 InputNumber 组件
  * 新增 Steps 组件
  * 新增 Timeline 组件
* 新增组件
  * 新增 Sidenav 组件
  * 新增 IconButton 组件
  * 新增 Icon 组件，代替 IconFont 组件，同时支持 svg 自定义导入图标
  * 新增 Drawer 组件
  * 新增 Progress 组件
  * 新增 Alert 组件
  * 新增 Message 组件
  * 新增 Notification 组件
  * 新增 Loader 组件
