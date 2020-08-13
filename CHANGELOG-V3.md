# 3.8.10

> September 9, 2019

* **Bugfix**: Fixed alignment of Loader within its container. ([#599])

[#599]: https://github.com/rsuite/rsuite/pull/599

# 3.8.9

> September 7, 2019

* **Bugfix**: Update `<Loader>` styles replace table layout to flex. ([#593])
* **Bugfix**: Fixed an issue with `<Cascader>` select search result. ([#561])
* **Bugfix**: Fixed an issue with `<Cascader>` selected values. ([#558])

---

* **Bugfix**: 更新 `<Loader>` 样式将表布局替换为 flex。 ([#593])
* **Bugfix**: 修复 `<Cascader>` 选择值后回调缺少参数的问题. ([#561])
* **Bugfix**: 修复 `<Cascader>` 选择搜索结果值后没有触发 `onSelect` 回调的问题 ([#558])

[#593]: https://github.com/rsuite/rsuite/pull/593
[#561]: https://github.com/rsuite/rsuite/pull/561
[#558]: https://github.com/rsuite/rsuite/pull/558

# 3.8.8

> August 1, 2019

* **Bugfix**: Fix `<Uploader>` showing file size issue ([#533])
* **Bugfix**: Fix `<Uploader>` reset button will trigger automatic upload. ([#521])
* **Improve**: Improve `<Cascader>` search results, formatting options. ([#515])

---

* **Bugfix**: 修复 `<Uploader>` 文件大小显示问题 ([#533])
* **Bugfix**: 修复 `<Uploader>` 在手动上传的情况下，重新上传按钮会触发自动上传 ([#521])
* **Improve**: 改进 `<Cascader>` 搜索结果，格式化选项。 ([#515])

[#533]: https://github.com/rsuite/rsuite/pull/533
[#521]: https://github.com/rsuite/rsuite/pull/521
[#515]: https://github.com/rsuite/rsuite/pull/515

# 3.8.7

> July 11, 2019

* **Bugfix**: Fix `<Cascader>` option value is not correct under controlled conditions. ([#498])
* **Bugfix**: Fix the style problem of `<MultiCascader>` text wrap. ([#511])
* **Bugfix**: Fix `<MultiCascader>` When searching for result status error when not cascading. ([#513])
* **Bugfix**: Fix an internationalization issue with a wrong title on the calendar panel ([#513])

---

* **Bugfix**: 修复 `<Cascader>` 选项值在受控条件下不正确。 ([#498])
* **Bugfix**: 修复 `<MultiCascader>` 文本换行的样式问题。([#511])
* **Bugfix**: 修复 `<MultiCascader>` 在不级联时候，搜索结果选项的状态错误。 ([#513])
* **Bugfix**: 修复日历面板上标题错误的国际化问题。 ([#513])

[#514]: https://github.com/rsuite/rsuite/pull/514
[#513]: https://github.com/rsuite/rsuite/pull/513
[#511]: https://github.com/rsuite/rsuite/pull/511
[#498]: https://github.com/rsuite/rsuite/pull/498

# 3.8.6

> June 6, 2019

* **Bugfix**: Fix the problem that `<TagPicker>` minimum width is inconsistent with design. ([#482])
* **Bugfix**: Fix `<IconButton>` loading status style problem. ([#480])
* **Bugfix**: Fixed TypeScript definition error. ([#478],[#479],[#483])
* **Bugfix**: Fix `<Table>` setting `expandedRowKeys` value, there is a problem that child nodes cannot be expanded. ([#table-85])

* **Bugfix**: 修复 `<TagPicker>` 最小宽度值与设计不一致的问题。 ([#482])
* **Bugfix**: 修复 `<IconButton>` loading 状态样式问题. ([#480])
* **Bugfix**: 修复一些 TypeScript 定义错误。 ([#478],[#479],[#483])
* **Bugfix**: 修复 `<Table>` 设置 `expandedRowKeys` 值，存在子节点不能展开的问题。 ([#table-85])

[#483]: https://github.com/rsuite/rsuite/pull/483
[#482]: https://github.com/rsuite/rsuite/pull/482
[#480]: https://github.com/rsuite/rsuite/pull/480
[#479]: https://github.com/rsuite/rsuite/pull/479
[#478]: https://github.com/rsuite/rsuite/pull/478
[#table-85]: https://github.com/rsuite/rsuite-table/pull/85

# 3.8.5

> May 23, 2019

* **Feature**: Support `cleanErrorForField` method in `<Form>`. ([#470])
* **Feature**: Support `open` on `<Whisper>`. ([#467])
* **Bugfix**: MultiCascader: don't throw on a non-present selected value. ([#468])
* **Bugfix**: [TS] Fix type definition for DOMHelper ([#469])
* **Bugfix**: [TS] Add Steps.Item type definition to Steps ([#464])
* **Bugfix**: [TS] Fix `value` type for `<Checkbox>` `<CheckboxGroup>` `<Radio>` `<RadioGroup>` ([#471])
* **Bugfix**: [TS] Fix `onChange` type for `<Radio>` ([#472])
* **Bugfix**: [TS] Added icon names to Icon.d.ts ([#476])
* **Bugfix**: [TS] Update \*.d.ts file directory for import on demand. ([#475])

---

* **Feature**: `<Form>` 组件里支持 `cleanErrorForField` 方法。 ([#470])
* **Feature**: `<Whisper>` 支持 `open` 属性，默认打开 speaker 设置的组件。 ([#467])
* **Bugfix**: 修复 `<MultiCascader>` 的值在选项中不存在时候会抛出异常。 ([#468])
* **Bugfix**: [TS] 修复 `DOMHelper` 类型定义 ([#469])
* **Bugfix**: [TS] `Steps` 中添加 `teps.Item` 定义 ([#464])
* **Bugfix**: [TS] 修复 `<Checkbox>` `<CheckboxGroup>` `<Radio>` `<RadioGroup>` 中的 `value` 类型定义 ([#471])
* **Bugfix**: [TS] 修复 `<Radio>` 的 `onChange` 类型定义 ([#472])
* **Bugfix**: [TS] 为 `Icon` 的定义图标名称列表 ([#476])
* **Bugfix**: [TS] 为按需加载，更新 ts 类型定义文件目录 ([#475])

[#476]: https://github.com/rsuite/rsuite/pull/476
[#475]: https://github.com/rsuite/rsuite/pull/475
[#472]: https://github.com/rsuite/rsuite/pull/472
[#471]: https://github.com/rsuite/rsuite/pull/471
[#470]: https://github.com/rsuite/rsuite/pull/470
[#469]: https://github.com/rsuite/rsuite/pull/469
[#468]: https://github.com/rsuite/rsuite/pull/468
[#467]: https://github.com/rsuite/rsuite/pull/467
[#467]: https://github.com/rsuite/rsuite/pull/467
[#464]: https://github.com/rsuite/rsuite/pull/464

# 3.8.4

> May 9, 2019

* **Bugfix**: Fixed TypeScript definition error. ([#459],[#460],[#462],[#463])
* **Improve**: `<Nav.Item>` supports text wrap in `<Sidenav>` ([#458])
* **Improve**: Allow `<Form>` to trigger native `submit` event ([#456])
* **Improve**: `isRequired` method in `Schema.Types.StringType` supports `trim` parameter ([#schema-10])

---

* **Bugfix**: 修复一些 TypeScript 定义错误。 ([#459],[#460],[#462],[#463])
* **Improve**: `<Nav.Item>` 在 `<Sidenav>` 中支持文本自动换行。 ([#458])
* **Improve**: 允许 `<Form>` 触发原生的 `submit` 事件 ([#456])
* **Improve**: `Schema.Types.StringType` 的 `isRequired` 方法支持 `trim` 参数 ([#schema-10])

[#463]: https://github.com/rsuite/rsuite/pull/463
[#462]: https://github.com/rsuite/rsuite/pull/462
[#460]: https://github.com/rsuite/rsuite/pull/460
[#459]: https://github.com/rsuite/rsuite/pull/459
[#458]: https://github.com/rsuite/rsuite/pull/458
[#456]: https://github.com/rsuite/rsuite/pull/446
[#schema-10]: https://github.com/rsuite/schema-typed/pull/10

# 3.8.3

> April 18, 2019

* **Feature**: Support `reverse` on `<Table.Pagination>`. ([#444])
* **Feature**: Support `renderValue` on `<DatePicker>` and `<DateRangePicker>`. ([#435])
* **Bugfix**: Remove invalid anchors in the Panel title. ([#446])
* **Bugfix**: Fixed missing Cascader style for modular import. ([#440])
* **Bugfix**: Fixed some style issues. ([#439],[#445])
* **Bugfix**: Fixed TypeScript definition error. ([#436])
* **Bugfix**: Fixed unable to preventDefault inside passive event listener for InputNumber. ([#441],[#6662647093133312])
* **Bugfix**: Fixed unable to preventDefault inside passive event listener for Table on drag. ([#table-78],[#5093566007214080])
* **Bugfix**: Fixed a scrollbar being reset in the case of `virtualized` on Table. ([#table-76])

---

* **Feature**: `<Table.Pagination>` 支持 `reverse` 属性。([#444])
* **Feature**: `<DatePicker>` 与 `<DateRangePicker>` 支持 `renderValue` 属性。([#435])
* **Bugfix**: 删除 `<Panel>` 标题上无效的锚点。 ([#446])
* **Bugfix**: 修复模块化按需引入时缺少 Cascader 样式。 ([#440])
* **Bugfix**: 修复一些样式问题。 ([#439],[#445])
* **Bugfix**: 修复一些 TypeScript 定义错误。 ([#436])
* **Bugfix**: 修复 `<InputNumber>` 滚动事件无法阻止被动默认的事件监听。 ([#441],[#6662647093133312])
* **Bugfix**: 修复 `<Table>` 在移动端拖拽事件无法阻止被动默认的事件监听。 ([#table-78],[#5093566007214080])
* **Bugfix**: 修复 `<Table>` 在设置 `virtualized` 情况下,滚动时滚动条被重置的问题。 ([#table-76])

[#446]: https://github.com/rsuite/rsuite/pull/446
[#445]: https://github.com/rsuite/rsuite/pull/445
[#444]: https://github.com/rsuite/rsuite/pull/444
[#441]: https://github.com/rsuite/rsuite/pull/441
[#440]: https://github.com/rsuite/rsuite/pull/440
[#439]: https://github.com/rsuite/rsuite/pull/439
[#436]: https://github.com/rsuite/rsuite/pull/436
[#435]: https://github.com/rsuite/rsuite/pull/435
[#table-78]: https://github.com/rsuite/rsuite-table/pull/78
[#table-76]: https://github.com/rsuite/rsuite-table/pull/76
[#5093566007214080]: https://www.chromestatus.com/features/5093566007214080
[#6662647093133312]: https://www.chromestatus.com/features/6662647093133312

# 3.8.2

> April 3, 2019

* **Improve**: Update the title style of `<Drawer>` and `<Modal>` ([#431])
* **Bugfix**: Fixed Typescript incorrectly extends interface ([#428])
* **Bugfix**: Fixed scrollbar position not updated after data update ([#table-75])

---

* **Improve**: 更新 `<Drawer>` 和 `<Modal>` 组件的标题样式([#431])
* **Bugfix**: 修复 Typescript 定义继承错误的接口 ([#428])
* **Bugfix**: 修复表格数据更新后滚动条位置未更新的问题([#table-75])

[#431]: https://github.com/rsuite/rsuite/pull/431
[#428]: https://github.com/rsuite/rsuite/pull/429
[#table-75]: https://github.com/rsuite/rsuite-table/pull/75

# 3.8.0

> March 28, 2019

* **Feature**: Support `removable` on `<Uploader>` ([#426])
* **Feature**: Support `verticalAlign` on `<Table.Column>` ([#table-70])
* **Feature**: Support `renderEmpty` and `renderLoading` on `<Table>` ([#table-74])
* **Bugfix**: Fixed `Picker` component to trigger `onChange` event when deleting search value ([#425])
* **Bugfix**: Unable to preventDefault inside passive event listener due to target being treated as passive ([#table-73],[#6662647093133312])

---

* **Feature**: `<Uploader>` 组件支持 `removable` 属性 ([#426])
* **Feature**: `<Table.Column>` 组件支持 `verticalAlign` 属性 ([#table-70])
* **Feature**: `<Table>` 组件支持 `renderEmpty` 和 `renderLoading` 属性 ([#table-74])
* **Bugfix**: 修复 `<SelectPicker>` 与 `<CheckPicker>` 组件删除搜索框值时候会触发 `onChange` 事件 ([#425])
* **Bugfix**: 修复 `<Table>` 组件在 Chrome 73 版本中滚动时报错的问题 ([#table-73],[#6662647093133312])

[#426]: https://github.com/rsuite/rsuite/pull/426
[#425]: https://github.com/rsuite/rsuite/pull/425
[#table-70]: https://github.com/rsuite/rsuite-table/pull/70
[#table-73]: https://github.com/rsuite/rsuite-table/pull/73
[#table-74]: https://github.com/rsuite/rsuite-table/pull/74

# 3.7.9

> March 21, 2019

* **Bugfix**: Fixed modular styles issues for animation ([#422])
* **Bugfix**: Fixed TypeScript definition error ([#415],[#416],[#419])
* **Bugfix**: Fixed a scrollbar event invalid on the internal elements of the table ([#table-67])

---

* **Bugfix**: 修复了 `animation` 按需加载时的问题 ([#422])
* **Bugfix**: 修复了一些 TypeScript 定义错误 ([#415],[#416],[#419])
* **Bugfix**: 修复了表格内部元素的滚动事件无效的问题 ([#table-67])

[#422]: https://github.com/rsuite/rsuite/pull/422
[#419]: https://github.com/rsuite/rsuite/pull/419
[#416]: https://github.com/rsuite/rsuite/pull/416
[#415]: https://github.com/rsuite/rsuite/pull/415
[#table-67]: https://github.com/rsuite/rsuite-table/pull/67

# 3.7.8

> March 7, 2019

* **Feature**: Add `<TagGroup>` ([#411],[#410])
* **Improve**: Clear search box when `<Cascader>` is closed ([#409])
* **Bugfix**: Fixed `<Nav>` ripple effect styles problem ([#413])
* **Bugfix**: Fixed `*Hidden` property is invalid on `<Col>` ([#412])
* **Bugfix**: Fixed `disabledDate` property to disable `<DateRangePicker>` shortcut option is invalid ([#408])
* **Bugfix**: Fixed icon style problem with Tree Table ([#table-64])
* **Bugfix**: Fixed invalid `autoHeight` property when table data is empty ([#table-62])

---

* **Feature**: 新增 `<TagGroup>` 组件 ([#411],[#410])
* **Improve**: 在 `<Cascader>` 关闭后清空搜索框的值 ([#409])
* **Bugfix**: 修复 `<Nav>` 涟漪效果的样式问题 ([#413])
* **Bugfix**: 修复 `*Hidden` 属性 `<Col>` 组件上无效的问题 ([#412])
* **Bugfix**: 修复 `disabledDate` 属性对 `<DateRangePicker>`的快捷选项的禁用无效 ([#408])
* **Bugfix**: 修复 Tree Table 图标的样式问题 ([#table-64])
* **Bugfix**: 修复 `<Table>` 数据为空时，设置 `autoHeight` 属性无效 ([#table-62])

[#413]: https://github.com/rsuite/rsuite/pull/413
[#412]: https://github.com/rsuite/rsuite/pull/412
[#411]: https://github.com/rsuite/rsuite/pull/411
[#410]: https://github.com/rsuite/rsuite/pull/410
[#409]: https://github.com/rsuite/rsuite/pull/409
[#408]: https://github.com/rsuite/rsuite/pull/408
[#table-64]: https://github.com/rsuite/rsuite-table/pull/64
[#table-62]: https://github.com/rsuite/rsuite-table/pull/62

# 3.7.7

> February 28, 2019

* **Feature**: Support `searchable` on `<Cascader>` and `<MultiCascader>` ([#401],[#403],[#406])
* **Bugfix**: Fixed a bug in the tree table's cell word wrap ([#407])
* **Bugfix**: Fixed `flip` property not working on `<Icon>` ([#402])
* **Chore**: Update `flow-bin` 0.93.0 ([#407])
* **Chore**: Update the sample code in the documentation

---

* **Feature**: `<Cascader>` 与 `<MultiCascader>` 组件支持搜索功能 ([#401],[#403],[#406])
* **Bugfix**: 修复了 Tree Table 在自动换行时候的 bug ([#407])
* **Bugfix**: 修复了 `flip` 属性在 `<Icon>` 组件上无效 ([#402])
* **Chore**: 更新 `flow-bin` 至 0.93.0 版本 ([#407])
* **Chore**: 更新文档中的示例代码

[#407]: https://github.com/rsuite/rsuite/pull/407
[#406]: https://github.com/rsuite/rsuite/pull/406
[#405]: https://github.com/rsuite/rsuite/pull/405
[#403]: https://github.com/rsuite/rsuite/pull/403
[#402]: https://github.com/rsuite/rsuite/pull/402
[#401]: https://github.com/rsuite/rsuite/pull/401

# 3.7.6

> February 21, 2019

* **Feature**: Support `onClean` on picker ([#398])
* **Bugfix**: Fixed a tool function for `<DateRangePicker>` to disable dates ([#400])
* **Bugfix**: Fixed a style error with `<CheckPicker>` in IE ([#394])
* **Bugfix**: Fixed an error in calling Notification in ComponentDidUpdate([#393])
* **Bugfix**: Fixed a Typescript definition error ([#391],[#399])
* **Extension**: Add extension component [@rsuite/document-nav]

---

* **Feature**: `Picker` 相关的组件都支持 `onClean` 事件 ([#398])
* **Bugfix**: 修复了 `<DateRangePicker>` 禁用日期的工具函数 ([#400])
* **Bugfix**: 修复了 `<CheckPicker>` 组件在 IE 浏览器上的样式错误 ([#394])
* **Bugfix**: 修复了 Notification 在 ComponentDidUpdate 生命周期内调用的一个错误 ([#393])
* **Bugfix**: 修复了 Typescript 定义错误 ([#391],[#399])
* **Extension**: 添加扩展组件 [@rsuite/document-nav]

[#400]: https://github.com/rsuite/rsuite/pull/400
[#399]: https://github.com/rsuite/rsuite/pull/399
[#398]: https://github.com/rsuite/rsuite/pull/398
[#394]: https://github.com/rsuite/rsuite/pull/394
[#393]: https://github.com/rsuite/rsuite/pull/393
[#391]: https://github.com/rsuite/rsuite/pull/391
[@rsuite/document-nav]: https://github.com/rsuite/document-nav

# 3.7.5

> January 31, 2019

* **Improve**: Adjust the style of the Close button on `<Tag>` ([#387])
* **Bugfix**: Fixed an `errorMessage` for `<FormControl>` that could not overwrite `formError` in `<Form>` ([#389])
* **Bugfix**: Fixed a passively triggered onScroll event on `<Table>` that caused the scrollbar to be misaligned ([#388])
* **Bugfix**: Fixed an issue where the style is not uniform when the picker mouse hovers ([#386])
* **Bugfix**: Fixed an issue where the `<Notification>` header text is too long to be displayed ([#385])
* **Bugfix**: Fixed `searchKeyword` not controlled in `<TreePicker>` and `<CheckTreePicker>` ([#384])
* **Bugfix**: Fixed an issue where icons could not be used in combination in `<DropdownMenu>` and `<Sidenav>` ([#383])
* **Bugfix**: Fixed the node alignment issue that occurred after `<Checktree>` setting `uncheckableItemValues` and `virtualized` ([#382])

---

* **Improve**: 调整了 `<Tag>` 上关闭按钮的样式 ([#387])
* **Bugfix**: 修复 `<FormControl>` 的 `errorMessage` 属性不能覆盖 `<Form>` 的 `formError` ([#389])
* **Bugfix**: 修复了 `<Table>` 上被动触发的 onScroll 事件, 该事件导致滚动条不对齐 ([#388])
* **Bugfix**: 修复了 `Picker` 鼠标悬停时样式不统一的问题 ([#386])
* **Bugfix**: 修复了 `<Notification>` 标题文本太长无法显示的问题 ([#385])
* **Bugfix**: 修复了 `<TreePicker>` 和 `<CheckTreePicker>` 的 `searchKeyword` 属性不受控 ([#384])
* **Bugfix**: 修复了图标无法在 `<DropdownMenu>` 与 `<Sidenav>` 中组合使用的问题([#383])
* **Bugfix**: 修复了 `<Checktree>` 同时设置 `uncheckableItemValues` 和 `virtualized` 后出现的节点对齐问题 ([#382])

[#389]: https://github.com/rsuite/rsuite/pull/389
[#388]: https://github.com/rsuite/rsuite/pull/388
[#387]: https://github.com/rsuite/rsuite/pull/387
[#386]: https://github.com/rsuite/rsuite/pull/386
[#385]: https://github.com/rsuite/rsuite/pull/385
[#384]: https://github.com/rsuite/rsuite/pull/384
[#383]: https://github.com/rsuite/rsuite/pull/383
[#382]: https://github.com/rsuite/rsuite/pull/382

# 3.7.4

> January 25, 2019

* **Hotfix**: Fix typos
* **Improve**: Modular import `react-virtualized`

# 3.7.0

> January 24, 2019

* **Feature**: Support `virtualized` on all Tree components ([#380])
* **Breaking**: Migration from `moment.js` to `date-fns` ([#367] @fnpen)
* **Bugfix**: Fixed an uncontrolled situation about `formError` in `<Form>` ([#379],[#381])
* **Bugfix**: Fixed an issue where the onChange event is overridden in the Group ([#376])
* **Bugfix**: Fixed a problem that select text when quick click expand icon ([#372])
* **Bugfix**: Fixed issues that cannot display text after a quick click in the `<Sidenav>` menu ([#371])

---

* **Feature**: 所有的 Tree 相关组件都支持 `virtualized`, 有效地呈现大列表数据 ([#380])
* **Breaking**: `moment.js` 迁移到 `date-fns` ([#367] @fnpen)
* **Bugfix**: 修复了 `<Form>` 中关于 `formError` 的不受控制的情况 ([#379],[#381])
* **Bugfix**: 修复了在 `<CheckboxGroup>` 和 `<RadioGroup>` 中 `onChange` 事件的被覆盖问题 ([#376])
* **Bugfix**: 修复了快速单击展开图标时会选择文本的问题 ([#372])
* **Bugfix**: 修复了在 `<Sidenav>` 菜单中快速单击后无法显示文本的问题 ([#371])

[#381]: https://github.com/rsuite/rsuite/pull/381
[#380]: https://github.com/rsuite/rsuite/pull/380
[#379]: https://github.com/rsuite/rsuite/pull/379
[#376]: https://github.com/rsuite/rsuite/pull/376
[#372]: https://github.com/rsuite/rsuite/pull/372
[#371]: https://github.com/rsuite/rsuite/pull/371
[#367]: https://github.com/rsuite/rsuite/pull/367

# 3.6.0

> January 18, 2019

* **Feature**: Support `virtualized` on `<Table>`, effectively render large tabular data ([#368])
* **Feature**: Support `oneTap` on `<DatePicker>` ([#362])
* **Bugfix/Breaking**: Replace `children` with `childrenKey` on `<CheckTreePicker>` ([#365])
* **Bugfix**: Fix errors in SSR build ([#364] @fnpen)

---

* **Feature**: `<Table>` 组件支持 `virtualized`属性, 有效地呈现大表格数据 ([#368])
* **Feature**: `<DatePicker>` 组件支持 `oneTap` 属性 ([#362])
* **Bugfix/Breaking**: 在 <CheckTreePicker> 组件中用 `childrenKey` 替换 `children` ([#365])
* **Bugfix**: 修复服务端渲染的错误 ([#364] @fnpen)

[#368]: https://github.com/rsuite/rsuite/pull/368
[#365]: https://github.com/rsuite/rsuite/pull/365
[#364]: https://github.com/rsuite/rsuite/pull/364
[#362]: https://github.com/rsuite/rsuite/pull/362

# 3.5.3

> January 10, 2019

* **Improve**: The `children` property support function for `<Cell>` in `<Table>` ([#360])
* **Improve**: Make sure `<NavItem>` show in one line when setting horizontal for `<Nav>` ([#359])
* **Bugfix**: Fix `onChange` return parameter is incorrect on `<Toggle>` ([#358])
* **Bugfix**: `<RadioGroup>` and `<CheckboxGroup>` supported mutiple line when setting inline ([#355])
* **Bugfix**: Fix typescript type definition error ([#352],[#354])
* **Bugfix**: Fixed style issue when table cell fixed and resizable ([#348])
* **Bugfix**: Fix issue that button border width is less than 1px ([#346])

---

* **Improve**: `<Table>`的`<Cell>` 组件，`children` 支持设置为函数，方便自定义单元格数据([#360])
* **Improve**: 当 `<Nav>` 设置为水平布局时候，让 `<NavItem>` 都在一行显示([#359])
* **Bugfix**: 修复了`<Toggle>` 在受控情况下，`onChange` 的回调参数错误的问题 ([#358])
* **Bugfix**: 修复了 `<RadioGroup>` 和 `<CheckboxGroup>` 在换行后对齐问题 ([#355])
* **Bugfix**: 修复了 TypeScript 定义错误 ([#352],[#354])
* **Bugfix**: 修复了 `<Table>` 同时设置 fixed 和 resizable 滚动样式问题 ([#348])
* **Bugfix**: 修复了按钮边框丢失 1px 像素的问题 ([#346])

[#360]: https://github.com/rsuite/rsuite/pull/360
[#359]: https://github.com/rsuite/rsuite/pull/359
[#358]: https://github.com/rsuite/rsuite/pull/358
[#355]: https://github.com/rsuite/rsuite/pull/355
[#354]: https://github.com/rsuite/rsuite/pull/354
[#352]: https://github.com/rsuite/rsuite/pull/352
[#348]: https://github.com/rsuite/rsuite/pull/348
[#346]: https://github.com/rsuite/rsuite/pull/346

# 3.5.2

> January 3, 2019

* **Feature**: Support `sort` for pickers that can be grouped ([#343])
* **Feature**: Support fixed column to the right on `<Table>` ([#341],[#table-53])
* **Bugfix**: Fixed style issue when `<Popover>` has no title ([#339])
* **Bugfix**: Fixed issues of form inline layout ([#338])

---

* **Feature**: 支持 `groupBy` 分组的 Picker 组件，同时支持 `sort` 对选项排序 ([#343])
* **Feature**: `<Table>` 支持 `fixed='right'`, 锁定列在右侧 ([#341],[#table-53])
* **Bugfix**: 修复 `<Popover>` 在没有 `title` 时候的样式问题 ([#339])
* **Bugfix**: 修复表单 inline 布局存在对齐问题 ([#338])

[#343]: https://github.com/rsuite/rsuite/pull/343
[#341]: https://github.com/rsuite/rsuite/pull/341
[#339]: https://github.com/rsuite/rsuite/pull/339
[#338]: https://github.com/rsuite/rsuite/pull/338
[#table-53]: https://github.com/rsuite/rsuite-table/pull/53

# 3.5.1

> 2018-12-27

* **Improve**: Improve the experience of select months on Calendar ([#334])
* **Refactor**: Refactor the style of the button toolbar ([#333])
* **Breaking**: Remove `limitStartYear` prop from `<DatePicker>` and `<DateRangePicker>` ([#334])
* **Bugfix**: Fixed `<CheckPicker>` setting `toggleComponentClass` which will cause an error ([#329])
* **Bugfix**: Fixed `disabledDate` cannot disable the month ([#327])
* **Bugfix**: Fixed focus position error when `<SelectPicker>` and `<CheckPicker>` are controlled ([#324])
* **Bugfix**: Fixed calendar display date and value are inconsistent on `<DateRangePicker>` ([#323])
* **Bugfix**: Fixed some style issues ([#321])
* **Bugfix**: Fixed some issues with TypeScript ([#320],[#325])
* **Chore**: Adjust the priority of rule execution for Schema ([#schema-9])

---

* **Improve**: 改善日历上选择月份的体验 ([#334])
* **Refactor**: 重构`<ButtonToolbar>`的样式 ([#333])
* **Breaking**: 删除在 `<DatePicker>` 和 `<DateRangePicker>` 的 `limitStartYear` 属性 ([#334])
* **Bugfix**: 修复 `<CheckPicker>` 设置 `toggleComponentClass` 以后出现异常 ([#329])
* **Bugfix**: 修复 `disabledDate` 不能禁用月份 ([#327])
* **Bugfix**: 修复 `<SelectPicker>`和`<CheckPicker>`在受控情况下，选项焦点位置错误 ([#324])
* **Bugfix**: 修复 `<DateRangePicker>` 日历上显示的日期与值不一致的问题 ([#323])
* **Bugfix**: 修复了一些样式问题 ([#321])
* **Bugfix**: 修复了一些 TypeScript 问题 ([#320],[#325])
* **Chore**: 调整 Schema 中规则校验的优先级 ([#schema-9])

[#334]: https://github.com/rsuite/rsuite/pull/334
[#333]: https://github.com/rsuite/rsuite/pull/333
[#329]: https://github.com/rsuite/rsuite/pull/329
[#327]: https://github.com/rsuite/rsuite/pull/327
[#325]: https://github.com/rsuite/rsuite/pull/325
[#324]: https://github.com/rsuite/rsuite/pull/324
[#323]: https://github.com/rsuite/rsuite/pull/323
[#323]: https://github.com/rsuite/rsuite/pull/323
[#321]: https://github.com/rsuite/rsuite/pull/321
[#320]: https://github.com/rsuite/rsuite/pull/320
[#schema-9]: https://github.com/rsuite/schema-typed/pull/9

# 3.5.0

> 2018-12-20

* **Feature**: Support server side rendering ([#315])
* **Improve**: Improve picker active and hover effects ([#314],[#318])
* **Improve**: The width of the picker menu is automatically calculated ([#309])
* **Bugfix**: Fixed that the icon was not vertically centered in `<SlideMenu>` ([#315])
* **Bugfix**: Fixed some issues with TypeScript ([#312],[#313])
* **Bugfix**: Adjust breadcrumb font size ([#308])

[#318]: https://github.com/rsuite/rsuite/pull/318
[#316]: https://github.com/rsuite/rsuite/pull/316
[#315]: https://github.com/rsuite/rsuite/pull/315
[#314]: https://github.com/rsuite/rsuite/pull/314
[#313]: https://github.com/rsuite/rsuite/pull/313
[#312]: https://github.com/rsuite/rsuite/pull/312
[#309]: https://github.com/rsuite/rsuite/pull/309
[#308]: https://github.com/rsuite/rsuite/pull/308

# 3.4.5

> 2018-12-13

* **Breaking**: Adjust the callback parameters of `renderValue` on all `Picker` ([#307])
* **Feature**: Added some default utility functions for disabledDate on `<DateRangePicker>` ([#304])
* **Feature**: Support `appearance` on `<RadioGroup>`, let Radio look like a Picker . ([#303])
* **Feature**: Support `renderFileInfo` on `<Uploader>`, custom file list style ([#302])
* **Improve**: Improve the Picker keyboard operation experience ([#306])
* **Bugfix**: Fixed issue with active date item in time panel ([#305])

[#307]: https://github.com/rsuite/rsuite/pull/307
[#306]: https://github.com/rsuite/rsuite/pull/306
[#305]: https://github.com/rsuite/rsuite/pull/305
[#304]: https://github.com/rsuite/rsuite/pull/304
[#303]: https://github.com/rsuite/rsuite/pull/303
[#302]: https://github.com/rsuite/rsuite/pull/302

# 3.4.4

> 2018-12-06

* **Improve**: Refactor the animations Bounce and Slide ([#288])
* **Improve**: The active state is Displayed when the Picker is expanded ([#299])
* **Improve**: Add a title to a multi-picker ([#298])
* **Improve**: Picker clears the search input when it is cloed ([#301])
* **Bugfix**: Update progress bar when the `<Uploader>` is controlled ([#300])
* **Bugfix**: Fixed issue with active date item in month panel ([#295])
* **Bugfix**: Fixed selectNode null exception in `<MultiCascader>` ([#293])
* **Bugfix**: Fixed checkForField API in `<Form>` is invalid ([#289])
* **Chore**: Update flow type definition ([#294],[#295],[#296])

[#301]: https://github.com/rsuite/rsuite/pull/301
[#300]: https://github.com/rsuite/rsuite/pull/300
[#299]: https://github.com/rsuite/rsuite/pull/299
[#298]: https://github.com/rsuite/rsuite/pull/298
[#296]: https://github.com/rsuite/rsuite/pull/296
[#295]: https://github.com/rsuite/rsuite/pull/295
[#294]: https://github.com/rsuite/rsuite/pull/294
[#293]: https://github.com/rsuite/rsuite/pull/293
[#289]: https://github.com/rsuite/rsuite/pull/289
[#288]: https://github.com/rsuite/rsuite/pull/288

# 3.4.3

> 2018-11-22

* **Feature**: Support `uncheckableItemValues` on `<CheckTreePicker>` ([#284])
* **Bugfix**: The `Picker` menu should update the position after the height has changed ([#282])
* **Bugfix**: Fixed the `<Uploader>` component retry button styles ([#280])
* **Bugfix**: Fixed the problem that cursor is default pointer when mouse over the `<TagPicker>` ([#279])
* **Bugfix**: Fixed bugs in IE10 browser ([#277])
* **Bugfix**: The Drawer will trigger onHide when clicking inside the Drawer ([#273])
* **Improve**: Improve the way that tree related components are updated asynchronously ([#287])
* **Improve**: Improve FormControl to avoid unnecessary rendering ([#276]) @zpbc007
* **Improve**: Adjust the default font family ([#275])
* **Improve**: Improve TypeScript type definitions ([#262],[#264],[#267],[#270],[#270],[#274]) @zpbc007

[#287]: https://github.com/rsuite/rsuite/pull/287
[#284]: https://github.com/rsuite/rsuite/pull/284
[#282]: https://github.com/rsuite/rsuite/pull/282
[#280]: https://github.com/rsuite/rsuite/pull/280
[#279]: https://github.com/rsuite/rsuite/pull/279
[#277]: https://github.com/rsuite/rsuite/pull/277
[#276]: https://github.com/rsuite/rsuite/pull/276
[#275]: https://github.com/rsuite/rsuite/pull/275
[#274]: https://github.com/rsuite/rsuite/pull/274
[#273]: https://github.com/rsuite/rsuite/pull/273
[#271]: https://github.com/rsuite/rsuite/pull/271
[#270]: https://github.com/rsuite/rsuite/pull/270
[#267]: https://github.com/rsuite/rsuite/pull/267
[#264]: https://github.com/rsuite/rsuite/pull/264
[#262]: https://github.com/rsuite/rsuite/pull/262

# 3.4.2

> 2018-11-15

* **Feature**: Support `rowClassName` on `<Table>` ([#table-45])
* **Feature**: Support `defaultSortType` on `<Table>` and let `sortType` be controlled ([#table-43])
* **Feature**: Added public API `start` on `<Uploader>` for manual upload ([#255])
* **Feature**: Improve the interactive experience of `<MultiCascader>`, `<CheckTreePicker>`, and `<CheckPicker>` ([#259])
* **Refactor**: Used new contextType API in `<Form>` ([#256])
* **Bugfix**: The height of `body` should be reset when the content in `<Modal>` is updated ([#260])
* **Bugfix**: Fix `<InputPicker>` The keyboard return event cannot select the new option ([#254])
* **Bugfix**: Fix the problem that `<Tooltip>` without arrow ([#253])
* **Bugfix**: Fix the problem that property `fixedWith` of `<Icon>` is invalid ([#252])
* **Bugfix**: Fix `<CheckTree>` to determine the problem with node state ([#251])
* **Bugfix**: Fix typescript type check error ([#249])

[#260]: https://github.com/rsuite/rsuite/pull/260
[#259]: https://github.com/rsuite/rsuite/pull/259
[#256]: https://github.com/rsuite/rsuite/pull/256
[#255]: https://github.com/rsuite/rsuite/pull/255
[#254]: https://github.com/rsuite/rsuite/pull/254
[#253]: https://github.com/rsuite/rsuite/pull/253
[#252]: https://github.com/rsuite/rsuite/pull/252
[#251]: https://github.com/rsuite/rsuite/pull/251
[#249]: https://github.com/rsuite/rsuite/pull/249
[#table-45]: https://github.com/rsuite/rsuite-table/pull/45
[#table-43]: https://github.com/rsuite/rsuite-table/pull/43

# 3.4.1

> 2018-11-01

* **Bugfix**: Fix typos in Slider ([#246])
* **Bugfix**: Fix typescript type definition error ([#245])

[#246]: https://github.com/rsuite/rsuite/pull/246
[#245]: https://github.com/rsuite/rsuite/pull/245

# 3.4.0

> 2018-11-01

* **Feature**: Support [`Typescript`](https://www.typescriptlang.org/) ([#241])
* **Feature**: Add [`<MultiCascader>`](https://rsuitejs.com/en/components/multi-cascader) ([#238])
* **Feature**: Support `renderTooltip` on `<Slider>` ([#239])
* **Bugfix**: The scroll bar is not reset after the column of the `<Table>` has changed ([#244])
* **Bugfix**: The option value of `<InputPicker>` does not exist or is disabled and cannot be selected ([#243])
* **Bugfix**: Cannot customize options in `<DatePicker>` shortcuts ([#242])
* **Bugfix**: Fix cannot preview images in `fileList` on `<Uploader>` ([#237])
* **Bugfix**: `<FormControl>` updates error information from the context of the `<Form>` by default ([#236])
* **Bugfix**: Resolve the problem that icon exception when modularity ([#233])

[#244]: https://github.com/rsuite/rsuite/pull/244
[#243]: https://github.com/rsuite/rsuite/pull/243
[#242]: https://github.com/rsuite/rsuite/pull/242
[#241]: https://github.com/rsuite/rsuite/pull/241
[#239]: https://github.com/rsuite/rsuite/pull/239
[#238]: https://github.com/rsuite/rsuite/pull/238
[#237]: https://github.com/rsuite/rsuite/pull/237
[#236]: https://github.com/rsuite/rsuite/pull/236
[#233]: https://github.com/rsuite/rsuite/pull/233

# 3.3.1

> 2018-10-18

* **Feature**: Support `sticky` on `<CheckPicker>`, top the selected options in the options. ([#226])
* **Feature**: Support `ellipsis` and `boundaryLinks` on `<TablePagination>` ([#221])
* **Bugfix**: Fixed an issue where the input group was set inside and there were two addons. ([#227])
* **Bugfix**: `sideEffects: false` cause css file not bundled ([#222])
* **Bugfix**: Fixed a parameter error in the `onOpenChange` function when the `<Sidenav>` component was being controlled ([#221])
* **Bugfix**: Display a message when there is no option on the Picker ([#232])
* **Improve**: Optimize the experience of the resize spanner on `<Table>`. ([#229],[#230])

[#232]: https://github.com/rsuite/rsuite/pull/232
[#230]: https://github.com/rsuite/rsuite/pull/230
[#229]: https://github.com/rsuite/rsuite/pull/229
[#227]: https://github.com/rsuite/rsuite/pull/227
[#226]: https://github.com/rsuite/rsuite/pull/226
[#223]: https://github.com/rsuite/rsuite/pull/223
[#222]: https://github.com/rsuite/rsuite/pull/222
[#221]: https://github.com/rsuite/rsuite/pull/221

# 3.3.0

> 2018-09-28

* **Feature**: Add `<IconStack>` ([#219])
* **Feature**: Support for global configuration of the className prefix ([#214])
* **Bugfix**: Focus does not return to the input box on `<TagPicker>` when you click the option ([#218])
* **Bugfix**: Change `<Modal>` backdrop and `<Drawer>` backdrop zindex ([#217])
* **Bugfix**: Clicking when `<Dropdown>` is disabled still triggers ripple animation and the cursor is the default ([#215])
* **Chore**: Change browserslist IE supported to IE10+ ([#216])
* **Chore**: Remove dropdown disabled styles to dropdown.less ([#215])
* **Chore**: Update to babel 7 ([#211])

[#219]: https://github.com/rsuite/rsuite/pull/219
[#218]: https://github.com/rsuite/rsuite/pull/218
[#217]: https://github.com/rsuite/rsuite/pull/217
[#216]: https://github.com/rsuite/rsuite/pull/216
[#215]: https://github.com/rsuite/rsuite/pull/215
[#214]: https://github.com/rsuite/rsuite/pull/214
[#211]: https://github.com/rsuite/rsuite/pull/211

# 3.2.11

> 2018-09-21

* **Feature**: International support for Portuguese ([#208])
* **Bugfix**: Fixed an exception when using `<Modal>`, `<Drawer>` in modular ([#209])
* **Bugfix**: Remove the deep clone from the filterNodesOfTree function ([#206])
* **Bugfix**: Problem with the first-level menu icon blinking when the sidebar is closed ([#205])

[#209]: https://github.com/rsuite/rsuite/pull/209
[#208]: https://github.com/rsuite/rsuite/pull/208
[#206]: https://github.com/rsuite/rsuite/pull/206
[#205]: https://github.com/rsuite/rsuite/pull/205

# 3.2.10

> 2018-09-14

* **Bugfix**: Uploader size info in IE is abnormality. ([#203])
* **Bugfix**: The `DateRangePicker` end date is a problem that flashes wildly as the mouse moves ([#202])
* **Bugfix**: In safari, after multiple clicks , the loader still has not disappeared on `<Table>` ([#201])
* **Bugfix**: The loader on `<Table>` should be above the scrollbar ([#201])
* **Chore**: Compress lodash ([#200])
* **Chore**: Change icon font CDN path ([#199])

[#203]: https://github.com/rsuite/rsuite/pull/203
[#202]: https://github.com/rsuite/rsuite/pull/202
[#201]: https://github.com/rsuite/rsuite/pull/201
[#200]: https://github.com/rsuite/rsuite/pull/200
[#199]: https://github.com/rsuite/rsuite/pull/199

# 3.2.9

> 2018-09-05

* **Feature**: Support combine in Schema ([#195])
* **Feature**: Support `onHide` on Picker ([#194])
* **Feature**: Support `checkForField` in `<Form>` ([#193])
* **Feature**: Support `disabled` on `<Pagination>` ([#189])
* **Bugfix**: Calender is not updated when the value is updated ([#192])
* **Bugfix**: Fix not updated after updating the value in `<Cascader>` ([#188])

[#195]: https://github.com/rsuite/rsuite/pull/195
[#194]: https://github.com/rsuite/rsuite/pull/194
[#193]: https://github.com/rsuite/rsuite/pull/193
[#192]: https://github.com/rsuite/rsuite/pull/192
[#189]: https://github.com/rsuite/rsuite/pull/189
[#188]: https://github.com/rsuite/rsuite/pull/188

# 3.2.8

> 2018-08-30

* **Feature**: Support for return all data in `Schema.Types.addRule` ([#186])
* **Feature**: Replaced and created some icons. ([#185])
* **Bugfix**: Remove minimum with limit for menu of picker menu. ([#182])
* **Bugfix**: The default value of `sortType` on `<Table>` should be `desc`. ([#180])
* **Bugfix**: Backdrop set to `static` invalid on `<Drawer>`. ([#179])
* **Bugfix**: Fix `disabeldDate` callback parameter error on `<DateRangePicker>`. ([#178])
* **Chore**: Remove duplicate ripple DOM. ([#183])
* **Chore**: Reformat code style with prettier. ([#184])

[#186]: https://github.com/rsuite/rsuite/pull/186
[#185]: https://github.com/rsuite/rsuite/pull/185
[#184]: https://github.com/rsuite/rsuite/pull/184
[#183]: https://github.com/rsuite/rsuite/pull/183
[#182]: https://github.com/rsuite/rsuite/pull/182
[#180]: https://github.com/rsuite/rsuite/pull/180
[#179]: https://github.com/rsuite/rsuite/pull/179
[#178]: https://github.com/rsuite/rsuite/pull/178

# 3.2.7

> 2018-08-23

* **Bugfix**: The `flexGrow` is invalid when there is only one column on `<Table>` ([#177])
* **Bugfix**: `<Modal>` and `<Drawer>` have no animation problems when modular. ([#176])
* **Bugfix**: `<TreePicker>` miss active className ([#174])
* **Bugfix**: An error occurred in the `null` value when the `DatePicker` was controlled. ([#172])

[#177]: https://github.com/rsuite/rsuite/pull/177
[#176]: https://github.com/rsuite/rsuite/pull/176
[#174]: https://github.com/rsuite/rsuite/pull/174
[#172]: https://github.com/rsuite/rsuite/pull/172

# 3.2.6

> 2018-08-16

* **Feature**: Support `onResize` on `<Table.Column>` ([#table-37])
* **Bugfix**: Add className and style props for Tree and CheckTree
* **Bugfix**: The scrollbar position is reset when the data is loaded ([#table-36])
* **Bugfix**: Tree has a scroll bar that should not be there ([#169])
* **Chore**: Refactor the `<InputAutosize>` component in `<TagPicker>` ([#167])
* **Chore**: [flow-typed] Add rsuite v3 libdef ([#flow-typed-2547])

[#170]: https://github.com/rsuite/rsuite/pull/170
[#169]: https://github.com/rsuite/rsuite/pull/169
[#167]: https://github.com/rsuite/rsuite/pull/167
[#table-37]: https://github.com/rsuite/rsuite-table/pull/37
[#table-36]: https://github.com/rsuite/rsuite-table/pull/36
[#flow-typed-2547]: https://github.com/flow-typed/flow-typed/pull/2547

# 3.2.5

> 2018-08-10

* **Bugfix**: Fix click NavItem no response in Firefox.

# 3.2.4

> 2018-08-10

* **Feature**: Improve of ripple animation effects ([#154])
* **Bugfix**: Tab nav active styles abnormal ([#156])
* **Chore**: Migrated to new lifecycle method ([#157],[#158],[#159],[#161],[#164])
* **Chore**: Compatibility with the post-css autoprefixer ([#155])

[#164]: https://github.com/rsuite/rsuite/pull/164
[#161]: https://github.com/rsuite/rsuite/pull/161
[#159]: https://github.com/rsuite/rsuite/pull/159
[#158]: https://github.com/rsuite/rsuite/pull/158
[#157]: https://github.com/rsuite/rsuite/pull/157
[#156]: https://github.com/rsuite/rsuite/pull/156
[#155]: https://github.com/rsuite/rsuite/pull/155
[#154]: https://github.com/rsuite/rsuite/pull/154

# 3.2.3

> 2018-08-02

* **Bugfix**: Fixed `<CheckTree>` label horizontal padding ([#151])
* **Bugfix**: Fixed `<Button>` unusual styles when setting the size of the button group ([#149])
* **Chore**: Update flow-typed ([#150])

[#151]: https://github.com/rsuite/rsuite/pull/151
[#150]: https://github.com/rsuite/rsuite/pull/150
[#149]: https://github.com/rsuite/rsuite/pull/149

# 3.2.2

> 2018-07-26

Add a sample site: https://sample.rsuitejs.com/

* **Feature**: Support `placeholder` on `<InputNumber>` ([#140])
* **Breaking**: Remove unused `defaultActiveKey` on `<Sidenav>` ([#143])
* **Bugfix**: Fixed an issue where the input box was not centered when the form was vertical aligned ([#148])
* **Bugfix**: Set backgroud color to table. ([#146])
* **Bugfix**: `<Button>` is missing border-radius in `<ButtonGroup>` ([#145])
* **Bugfix**: The option value error when current keyboard operation option on `<TagPicker>` ([#142])
* **Bugfix**: The callback for `disableDate` is incorrect on `<DateRangePicker>` ([#138])
* **Chore**: Add `sideEffects: false` for Webpack 4 ([#144])
* **Chore**: filter the ref value of `null` for `tableRows` ([#table-33])

[#148]: https://github.com/rsuite/rsuite/pull/148
[#146]: https://github.com/rsuite/rsuite/pull/146
[#145]: https://github.com/rsuite/rsuite/pull/145
[#144]: https://github.com/rsuite/rsuite/pull/144
[#143]: https://github.com/rsuite/rsuite/pull/143
[#142]: https://github.com/rsuite/rsuite/pull/142
[#140]: https://github.com/rsuite/rsuite/pull/140
[#139]: https://github.com/rsuite/rsuite/pull/139
[#138]: https://github.com/rsuite/rsuite/pull/138
[#table-33]: https://github.com/rsuite/rsuite-table/pull/33

# 3.2.1

> 2018-07-19

* **Feature**: Support `menuStyle` on `<TreePicker>` and `<CheckTreePicker>` ([#136])
* **Bugfix**: Fix the color of pickers placeholders ([#137])
* **Bugfix**: Fix `<TreePicker>` and `<CheckTreePicker>` keydown event error ([#135])
* **Bugfix**: Table in the page picker should be subtle ([#134])
* **Chore**: The callback function returns detailed info on `<Uploader>` ([#133])

[#137]: https://github.com/rsuite/rsuite/pull/137
[#136]: https://github.com/rsuite/rsuite/pull/136
[#135]: https://github.com/rsuite/rsuite/pull/135
[#134]: https://github.com/rsuite/rsuite/pull/134
[#133]: https://github.com/rsuite/rsuite/pull/133

# 3.2.0

> 2018-07-12

* **Feature/Breaking**: Support `appearance` on `*Picker`, The default value is `default` ([#125])
* **Feature**: Added InputPicker component ([#129])
* **Feature**: Added TagPicker component ([#129])
* **Bugfix**: Calendar render incomplete when set `isoWeek` ([#128])
* **Bugfix**: Table loading unclickable ([#124])
* **Chore**: Migrate code for picker related components to `rsuite` library

[#129]: https://github.com/rsuite/rsuite/pull/129
[#128]: https://github.com/rsuite/rsuite/pull/128
[#125]: https://github.com/rsuite/rsuite/pull/125
[#124]: https://github.com/rsuite/rsuite/pull/124

# 3.1.3

> 2018-07-05

* **Feature**: Support `disabled` on `<InputGroup>` ([#117])
* **Feature**: Support `showHeader` on `<Table>` ([#table-30])
* **Feature**: Support `autoHeight` and `minHeight` on `<Table>` ([#table-29])
* **Feature**: Support `cellBordered` on `<Table>` ([#table-28])
* **Chore**: Unhandled props are passed to the DropdownToggle ([#119])
* **Bugfix**: Fixed `<Checkbox>` and `<Radio>` clickable area ([#120])
* **Bugfix**: `<Loader>` don't spin in Safari ([#121])

[#121]: https://github.com/rsuite/rsuite/pull/121
[#120]: https://github.com/rsuite/rsuite/pull/120
[#119]: https://github.com/rsuite/rsuite/pull/119
[#117]: https://github.com/rsuite/rsuite/pull/117
[#table-30]: https://github.com/rsuite/rsuite-table/pull/30
[#table-29]: https://github.com/rsuite/rsuite-table/pull/29
[#table-28]: https://github.com/rsuite/rsuite-table/pull/28

# 3.1.2

> 2018-06-28

* **Feature**: Support `expandAll` on `<TreePicker>` and `CheckTreePicker` ([#112])
* **Feature**: Support `searchKeyword` on `<TreePicker>` and `CheckTreePicker` ([#112])
* **Feature**: Support `autoVertical` and `autoHorizontal` for `placement` value on `<Popover>` and `<Tooltip>` ([#107])
* **Feature**: Support `disabledFileItem` on `<Uploader>` ([#101])
* **Feature**: Support `toggleComponentClass` on `<Uploader>` ([#104])
* **Feature**: Support `loadAnimation` on `<Table>` ([#table-27])
* **Feature**: Support for `<InputGroup>` nesting `<InputNumber>` ([#96])
* **Feature**: Support `noCaret` and `toggleComponentClass` on `<Dropdown>` ([#92])
* **Bugfix**: Select the same file without triggering the `onChange` event in `<Uploader>` ([#102])
* **Bugfix**: `<TreePicker>` error when comparing values ([#100])
* **Bugfix**: The position was updated incorrectly when the scrollbar was clicked on `<Table>` ([#table-26])
* **Bugfix**: Increase z-index when drawer opened ([#95])
* **Bugfix**: `<InputNumber>` should not set the default value ([#93])
* **Bugfix**: Set minimum height for table body ([#table-24])
* **Chore**: Improve picker selected styles ([#109])
* **Chore**: Added transition for table loader. ([#108])
* **Chore**: Handle `<InputNumber>` combination styles ([#106])
* **Chore**: Button in `<InputNumber>`, defaults to the subtle button ([#99])
* **Chore**: Keep loader backdrop-color with table loader ([#96])
* **Chore**: remove all animation for tree to optimal performance ([#94])
* **Chore**: Allowed table header height can be 0 ([#table-25])
* **Chore**: Update style for table load ([#table-25])

[#112]: https://github.com/rsuite/rsuite/pull/112
[#109]: https://github.com/rsuite/rsuite/pull/109
[#108]: https://github.com/rsuite/rsuite/pull/108
[#107]: https://github.com/rsuite/rsuite/pull/107
[#106]: https://github.com/rsuite/rsuite/pull/106
[#104]: https://github.com/rsuite/rsuite/pull/104
[#102]: https://github.com/rsuite/rsuite/pull/102
[#101]: https://github.com/rsuite/rsuite/pull/101
[#100]: https://github.com/rsuite/rsuite/pull/100
[#99]: https://github.com/rsuite/rsuite/pull/99
[#96]: https://github.com/rsuite/rsuite/pull/96
[#95]: https://github.com/rsuite/rsuite/pull/96
[#95]: https://github.com/rsuite/rsuite/pull/95
[#94]: https://github.com/rsuite/rsuite/pull/94
[#93]: https://github.com/rsuite/rsuite/pull/93
[#92]: https://github.com/rsuite/rsuite/pull/92
[#table-27]: https://github.com/rsuite/rsuite-table/pull/27
[#table-26]: https://github.com/rsuite/rsuite-table/pull/26
[#table-25]: https://github.com/rsuite/rsuite-table/pull/25
[#table-24]: https://github.com/rsuite/rsuite-table/pull/24

# 3.1.1

> 2018-06-21

* **Bugfix**: Unity picker style when select values. ([#91],[#issues-61])
* **Bugfix**: Adjust sidenav dropdown padding ([#90])
* **Feature**: Support `bordered` on `<Table>` ([#89])
* **Feature**: Support `onOpen` and `onClose` on `<Whisper>` ([#87])
* **Chore**: Update createChainedFunction [#86]
* **Chore**: Remove dropdown&picker open animations ([#85])
* **Bugfix**: Clear popover margin-top when it is full ([#84])
* **Chore**: Change the `depth equal` to the `shallow equal` for all pickers ([#83], [#88])

[#91]: https://github.com/rsuite/rsuite/pull/91
[#90]: https://github.com/rsuite/rsuite/pull/90
[#89]: https://github.com/rsuite/rsuite/pull/89
[#88]: https://github.com/rsuite/rsuite/pull/88
[#87]: https://github.com/rsuite/rsuite/pull/87
[#86]: https://github.com/rsuite/rsuite/pull/86
[#85]: https://github.com/rsuite/rsuite/pull/85
[#84]: https://github.com/rsuite/rsuite/pull/84
[#83]: https://github.com/rsuite/rsuite/pull/83
[#issues-61]: https://github.com/rsuite/rsuite/issues/61

# 3.1.0 🎉

> 2018-06-14

* **Feature**: Support for style modularized ([#76], [#81])
* **Feature**: Support `bodyRef` on `<Table>` ([#TABLE-23])
* **Bugfix**: The `<FormControl>` loses focus and the validated value is incorrect. ([#79])
* **Bugfix**: Fix some style problems ([#78])
* **Bugfix**: TreeNode title property display error on `<TreePicker>` ([#77])
* **Bugfix**: Remove popover/tooltip open animation delay ([#73])
* **Bugfix**: Bugfix: When the height of the content is updated, reset the scroll bar position ([#TABLE-22])
* **Bugfix**: `<AutoComplete>` cannot enter Chinese in controlled condition ([#70])

[#81]: https://github.com/rsuite/rsuite/pull/81
[#79]: https://github.com/rsuite/rsuite/pull/79
[#78]: https://github.com/rsuite/rsuite/pull/78
[#77]: https://github.com/rsuite/rsuite/pull/77
[#76]: https://github.com/rsuite/rsuite/pull/76
[#73]: https://github.com/rsuite/rsuite/pull/73
[#70]: https://github.com/rsuite/rsuite/pull/70
[#table-22]: https://github.com/rsuite/rsuite-table/pull/22
[#table-23]: https://github.com/rsuite/rsuite-table/pull/23

# 3.0.8

> 2018-06-07

* **Feature**: The position of the overlay can be adjusted automatically ([#69])
* **Bugfix**: The default type of `<Button>` is `button` ([#67])
* **Bugfix**: `<textarea>` in form-control will produce a whitesapce ([#65])
* **Feature**: Support `selectOnEnter` on `<AutoComplete>` ([#62])
* **Bugfix**: Fix the problem on the Picker style ([#58])
* **Feature**: Support `maxPreviewFileSize` on `<Uploader>` ([#57])
* **Bugfix**: dialogDOM is null ([#56])

[#69]: https://github.com/rsuite/rsuite/pull/69
[#67]: https://github.com/rsuite/rsuite/pull/67
[#65]: https://github.com/rsuite/rsuite/pull/65
[#62]: https://github.com/rsuite/rsuite/pull/62
[#58]: https://github.com/rsuite/rsuite/pull/58
[#57]: https://github.com/rsuite/rsuite/pull/57
[#56]: https://github.com/rsuite/rsuite/pull/56

# 3.0.7

> 2018-05-31

* **Feature**: Added support for `block` and `toggleComponentClass` on `Picker` ([#54])
* **Chore**: Update `shouldComponentUpdate` check in `<Table>` ([#53])
* **Chore**: Set max-width for some picker ([#51])
* **Bugfix**: Full Modal size not working ([#50])
* **Bugfix**: The event is not defined in the RadioGroup's onChange ([#49])
* **Bugfix**: The Click event Triggers 2 times when the checker is in the label ([#46])
* **Bugfix**: Events in the `Panel` header was blocked ([#45])

[#54]: https://github.com/rsuite/rsuite/pull/54
[#53]: https://github.com/rsuite/rsuite/pull/53
[#51]: https://github.com/rsuite/rsuite/pull/51
[#50]: https://github.com/rsuite/rsuite/pull/50
[#49]: https://github.com/rsuite/rsuite/pull/49
[#46]: https://github.com/rsuite/rsuite/pull/46
[#45]: https://github.com/rsuite/rsuite/pull/45

# 3.0.6

> 2018-05-24

* **Bugfix**: The `onSelect` event is not triggered after the enter key on `AutoComplete` ([#43])
* **Bugfix**: Omit the `style` and `className` on `DropdownMenu` of Picker ([#42])

[#43]: https://github.com/rsuite/rsuite/pull/43
[#42]: https://github.com/rsuite/rsuite/pull/42

# 3.0.5

> 2018-05-17

* **Bugfix**: Set all picker display inline-block ([#36])
* **Chore**: Create CODE_OF_CONDUCT.md ([#34])
* **Feature**: Support `onChangeCalendarDate` on `<DatePicker>` ([#33])
* **Chore**: Fix travis config for npm deployment ([#32])
* **Bugfix**: Remove redundant check `isNullOrUndefined` ([#31])
* **Bugfix**: Serious typos ([#30])
* **Bugfix**: `rsuite-schema` get precise length of a string ([#rsuite-schema-3])

[#36]: https://github.com/rsuite/rsuite/pull/36
[#34]: https://github.com/rsuite/rsuite/pull/34
[#33]: https://github.com/rsuite/rsuite/pull/33
[#32]: https://github.com/rsuite/rsuite/pull/32
[#31]: https://github.com/rsuite/rsuite/pull/31
[#30]: https://github.com/rsuite/rsuite/pull/30
[#rsuite-schema-3]: https://github.com/rsuite/rsuite-schema/pull/3

# 3.0.3

> 2018-05-10

* **Bugfix**: The error is thrown when children is false in `Container` ([#20])
* **Bugfix**: Dropdown placement not customizable in Nav ([#21])
* **Bugfix**: `tplTransform` return value mismatch when parameter is 0 ([#22])
* **Bugfix**: Form error message incomplete display in Modal ([#23])
* **Chore**: Update Babel configuration ([#24])
* **Bugfix**: Increase z-index for dropdown when modal opened ([#25])

[#20]: https://github.com/rsuite/rsuite/pull/20
[#21]: https://github.com/rsuite/rsuite/pull/21
[#22]: https://github.com/rsuite/rsuite/pull/22
[#23]: https://github.com/rsuite/rsuite/pull/23
[#24]: https://github.com/rsuite/rsuite/pull/24
[#25]: https://github.com/rsuite/rsuite/pull/25

# 3.0.2

> 2018-05-03

* **Bugfix**: `pageDate` not updated when value change for `Datepicker`.
* **Bugfix**: The scrolling operation throws an exception, when InputNumber `step` is a decimal.
* **Feature**: AutoComplete support {value,label} in data property.
* **Feature**: Added support for keydown events in AutoComplete.
* **Feature**: All picker added new property `menuClassName`.

# 3.0.1

> 2018-04-24

* **Bugfix**: styles directory not published to NPM

# 3.0.0

> 2018-04-24

* A brand new style.
* Support react 16+.
* Support Internationalization.
* Support flow, a Static Type Checker for JavaScript.
* Added prettier formatting.
* Update build to use `babel-preset-env`.
* Give up support for IE9.
* Breadcrumb New support `separator` property, custom separator.
* Modal `autoResizeHeight` attribute renamed to `overflow`.
* Update Button Group
  * Delete `shape` property, replace with `appearance` property, add support for `subtle` and `ghost` button.
  * Add property `color`, define button color.
  * Add property `loading`.
* Update Table
  * Integrate all `rsuite-table` functions.
  * Add support merged cells.
  * Add support text over long line wrap processing, you need to set the `wordWrap` property, default to flase.
* Update Checkbox, support `indeterminate` property.
* Update Dropdown
  * Delete the `activekey` and `select` properties, and use the `Selectpicker` component if you need to select a feature.
  * Add Support Multilevel Menu.
  * Add property placement` , set menu display location.
* Update Nav components, add `appearance` (`default`,`subtle`,`tabs`) property.
* Update Form related components
  * Integrates all `form-lib` and `rsuite-schema` functions.
  * Replaced the Field component with the `FormControl` component (default processing Input component, can be modified by `accepter` property).
  * Form `checktrigger` property value `null` to 'none'.
  * Support 3 kinds of layout layout: `horizontal`, `vertical`, `inline`.
  * Helpblock support `tooltip` property.
  * Add `ErrorMessage` component for displaying error messages.
* Integrate standalone component library into `rsuite` library
  * Add Uploader.
  * Add Tree.
  * Add CheckTree.
  * Add TreePicker.
  * Add CheckTreePicker.
  * Add SelectPicker.
  * Add CheckPicker.
  * Add Cascader.
  * Add AutoComplete.
  * Add DatePicker.
  * Add DateRangePicker.
  * Add Slider.
  * Add InputNumber.
  * Add Steps.
  * Add Timeline.
* New Components
  * Add Sidenav.
  * Added IconButton.
  * Add Icon, instead of IconFont component, while supporting SVG custom import icons.
  * Added Drawer.
  * Add Progress.
  * Add Alert.
  * Add Message.
  * Add Notification.
  * Add Loader.
