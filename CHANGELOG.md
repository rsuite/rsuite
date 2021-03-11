<a name="4.9.3"></a>

## [4.9.3](https://github.com/rsuite/rsuite/compare/4.9.2...4.9.3) (2021-03-11)

### Bug Fixes

- **nav:** fix `onSelect` not working on Nav.Item ([#1561](https://github.com/rsuite/rsuite/issues/1561)) ([9b6bb9f](https://github.com/rsuite/rsuite/commit/9b6bb9f))
- **uploader:** fixed Uploader unable to upload removed files ([#1548](https://github.com/rsuite/rsuite/issues/1548)) ([69d32d1](https://github.com/rsuite/rsuite/commit/69d32d1))

<a name="4.9.2"></a>

## [4.9.2](https://github.com/rsuite/rsuite/compare/4.9.1...4.9.2) (2021-02-24)

### Bug Fixes

- **inputpicker:** fix can’t click option on InputPicker ([#1529](https://github.com/rsuite/rsuite/issues/1529)) ([4c2bc6f](https://github.com/rsuite/rsuite/commit/4c2bc6f))

<a name="4.9.1"></a>

## [4.9.1](https://github.com/rsuite/rsuite/compare/4.9.0...4.9.1) (2021-02-24)

### Bug Fixes

- **tagpicker:** fix the input does not work when focused by keyboard ([#1525](https://github.com/rsuite/rsuite/issues/1525)) ([f5805c0](https://github.com/rsuite/rsuite/commit/f5805c0))

<a name="4.9.0"></a>

# [4.9.0](https://github.com/rsuite/rsuite/compare/4.8.9...4.9.0) (2021-02-24)

### Bug Fixes

- **footer:** use footer tag for Footer ([#1490](https://github.com/rsuite/rsuite/issues/1490)) ([296df45](https://github.com/rsuite/rsuite/commit/296df45))
- **inputpicker:** fix the input does not work when focused by keyboard ([#1520](https://github.com/rsuite/rsuite/issues/1520)) ([476d5c7](https://github.com/rsuite/rsuite/commit/476d5c7)), closes [#1487](https://github.com/rsuite/rsuite/issues/1487)
- **inputpicker:** inputPicker should clear search keywords when closed ([#1522](https://github.com/rsuite/rsuite/issues/1522)) ([d9108ea](https://github.com/rsuite/rsuite/commit/d9108ea))
- **pickers:** picker should not be interactive during animation exit ([#1521](https://github.com/rsuite/rsuite/issues/1521)) ([e201e78](https://github.com/rsuite/rsuite/commit/e201e78)), closes [#1491](https://github.com/rsuite/rsuite/issues/1491)
- **rangeslider:** fix RangeSlider style problem ([#1519](https://github.com/rsuite/rsuite/issues/1519)) ([a422b7d](https://github.com/rsuite/rsuite/commit/a422b7d)), closes [#1485](https://github.com/rsuite/rsuite/issues/1485)
- **rtl:** fixed the docs not work when using `rtl` ([#1503](https://github.com/rsuite/rsuite/issues/1503)) ([9c132a9](https://github.com/rsuite/rsuite/commit/9c132a9))

### Features

- **uploader:** support file async check on Uploader ([#1489](https://github.com/rsuite/rsuite/issues/1489)) ([25f5b3a](https://github.com/rsuite/rsuite/commit/25f5b3a))
- **whisper:** support `onClose` on the `speaker` prop of Whisper ([#1523](https://github.com/rsuite/rsuite/issues/1523)) ([5b25e3f](https://github.com/rsuite/rsuite/commit/5b25e3f)), closes [#1458](https://github.com/rsuite/rsuite/issues/1458)

<a name="4.8.9"></a>

## [4.8.9](https://github.com/rsuite/rsuite/compare/4.8.8...4.8.9) (2021-02-02)

### Bug Fixes

- **drawer:** accepts id and aria-labelledby attributes ([#1464](https://github.com/rsuite/rsuite/issues/1464)) ([c7a1194](https://github.com/rsuite/rsuite/commit/c7a1194))
- **modal:** remove duplicated dialog role ([#1463](https://github.com/rsuite/rsuite/issues/1463)) ([42c456f](https://github.com/rsuite/rsuite/commit/42c456f))
- **table:** fixed unhandled scroll bar width when Cell is fixed on right ([#1482](https://github.com/rsuite/rsuite/issues/1482)) ([45363bc](https://github.com/rsuite/rsuite/commit/45363bc)), closes [#1446](https://github.com/rsuite/rsuite/issues/1446)
- **tag-picker:** fix TagPicker clear button not work ([#1480](https://github.com/rsuite/rsuite/issues/1480)) ([aadcb51](https://github.com/rsuite/rsuite/commit/aadcb51)), closes [#1467](https://github.com/rsuite/rsuite/issues/1467)

<a name="4.8.8"></a>

## [4.8.8](https://github.com/rsuite/rsuite/compare/4.8.7...4.8.8) (2021-01-14)

### Bug Fixes

- **dropdown:** fix the issue of Dropdown close event ([#1455](https://github.com/rsuite/rsuite/issues/1455)) ([76e060d](https://github.com/rsuite/rsuite/commit/76e060d)), closes [#1435](https://github.com/rsuite/rsuite/issues/1435)
- **picker:** fixed the non-unique key in the Picker option when groupBy ([#1453](https://github.com/rsuite/rsuite/issues/1453)) ([1f9f790](https://github.com/rsuite/rsuite/commit/1f9f790)), closes [#1419](https://github.com/rsuite/rsuite/issues/1419)
- **whisper:** fix overlay jittering when the cursor is hovered ([#1454](https://github.com/rsuite/rsuite/issues/1454)) ([6537057](https://github.com/rsuite/rsuite/commit/6537057)), closes [#1402](https://github.com/rsuite/rsuite/issues/1402)

# 4.8.7

- fix(panel): fix the problem of wrong type definition in `Panel` [#1449]
- fix(overlay): prevent notice for overlay [#1441]
- fix(table): fix the table height problem caused by `affixHeader` [#1437]
- chore(less): bump less to 4.0.0 v4 [#1448]

[#1449]: https://github.com/rsuite/rsuite/pull/1449
[#1448]: https://github.com/rsuite/rsuite/pull/1448
[#1441]: https://github.com/rsuite/rsuite/pull/1441
[#1437]: https://github.com/rsuite/rsuite/pull/1437

# 4.8.6

- fix(tag-picker): fix the issue of invalid renderValue on `TagPicker`. [#1378]
- fix(form-inline): fix the issue of `Form` layout spacing in inline mode. [#1377]
- fix(modal): fix `Modal` will change size when opened. [#1375]
- fix(input-group): fix `InputGroup.Addon` height error when `inside` mode. [#1374]
- fix(iconbutton): fix `IconButton` style error when disabled. [#1373]
- fix(input): fix the hard-coded minimum width in textarea. [#1372]

[#1378]: https://github.com/rsuite/rsuite/pull/1378
[#1377]: https://github.com/rsuite/rsuite/pull/1377
[#1375]: https://github.com/rsuite/rsuite/pull/1375
[#1374]: https://github.com/rsuite/rsuite/pull/1374
[#1373]: https://github.com/rsuite/rsuite/pull/1373
[#1372]: https://github.com/rsuite/rsuite/pull/1372

# 4.8.5

- **Bugfix**: fix(dropdown): fixed the dropdown trigger multiple callbacks when closed. [#1352]
- **Bugfix**: fix(table): fix Cell rendering redundant padding when it is not a tree column. [rsuite-table#179]
- **Improve**: improve(table): Use ARIA to improve accessibility. [rsuite-table#178]

[#1352]: https://github.com/rsuite/rsuite/pull/1352
[rsuite-table#179]: https://github.com/rsuite/rsuite-table/pull/179
[rsuite-table#178]: https://github.com/rsuite/rsuite-table/pull/178

# 4.8.4

- **Improve**: Bump rsuite-table@3.14.0

# 4.8.2

> September 10, 2020

- **Bugfix**: fix(button): fixed that the disabled button did not disable href. [#1277]
- **Bugfix**: fix(recompose): fixed the problem of not working under vite app. [#1279]

[#1279]: https://github.com/rsuite/rsuite/pull/1279
[#1277]: https://github.com/rsuite/rsuite/pull/1277

# 4.8.1

> August 20, 2020

- **Bugfix**: fix(Steps): Children with Fragments [#1245]
- **Bugfix**: fix(Panel): Missing panel border inside PanelGroup [#1232]
- **Bugfix**: fix(TagPicker): Fix a tag picker styles issue [#1167]

[#1245]: https://github.com/rsuite/rsuite/pull/1245
[#1232]: https://github.com/rsuite/rsuite/pull/1232
[#1167]: https://github.com/rsuite/rsuite/pull/1167

# 4.8.0

> July 9, 2020

- **Feature**: Added support for `none` in `trigger` props on `<Whisper>`. [#1155]
- **Feature**: Support `scrollable` on `<InputNumber>`. ([#1133])
- **Improve**: Impove `<DateRangePicker>` panel range layout styles. ([#1164])
- **Improve**: Improve all Pickers renderValue methods. ([#1151],[#1139])
- **Bugfix**: Fix Uploader repeatedly triggering onChange event in IE11. ([#1156])
- **Bugfix**: Fix `<Whisper>` delay not working. ([#1153])
- **Bugfix**: Fix the issue of height reduction when reopening `<Modal>`. ([#1152])
- **Bugfix**: Fix the style problem of various combinations of `<InputGroup>`. ([#1149],[#1150],[#1158],[#1163])
- **Bugfix**: Fix `<Carousel>` autoplay direction error on RTL. ([#1136])

---

- **Feature**: `<InputNumber>` 新增支持 `scrollable` 属性，默认值为 `true`, 设置为 `false` 则禁用滚动更新值。 ([#1133])
- **Feature**: `<Whisper>` 的 `trigger` 属性值新增 `none` 。 [#1155]
- **Improve**: 改进 `<DateRangePicker>` 的面板样式，可以容纳更多自定义选项。 ([#1164])
- **Improve**: 改进所有 Picker 的 `renderValue` 方法，解决值与数据不匹配时也能自定义显示。 ([#1151],[#1139])
- **Bugfix**: 修复 `Uploader` 在 IE11 浏览器会触发两次 `onChange` 的问题. ([#1156])
- **Bugfix**: 修复 `<Whisper>` 的 `delay` 值属性无效的问题。 ([#1153])
- **Bugfix**: 修复 `<Modal>` 在再一次打开后高度计算不一致的问题。 ([#1152])
- **Bugfix**: 修复 `<InputGroup>` 在多种组合场景下存在的样式问题。 ([#1149],[#1150],[#1158],[#1163])
- **Bugfix**: 修复 `<Carousel>` RTL 视图下自动播放方向错误的问题。 ([#1136])

[#1164]: https://github.com/rsuite/rsuite/pull/1164
[#1156]: https://github.com/rsuite/rsuite/pull/1156
[#1155]: https://github.com/rsuite/rsuite/pull/1153
[#1153]: https://github.com/rsuite/rsuite/pull/1153
[#1152]: https://github.com/rsuite/rsuite/pull/1152
[#1163]: https://github.com/rsuite/rsuite/pull/1163
[#1158]: https://github.com/rsuite/rsuite/pull/1158
[#1150]: https://github.com/rsuite/rsuite/pull/1150
[#1149]: https://github.com/rsuite/rsuite/pull/1149
[#1148]: https://github.com/rsuite/rsuite/pull/1148
[#1139]: https://github.com/rsuite/rsuite/pull/1139
[#1151]: https://github.com/rsuite/rsuite/pull/1151
[#1136]: https://github.com/rsuite/rsuite/pull/1136
[#1133]: https://github.com/rsuite/rsuite/pull/1133

# 4.7.5

> June 18, 2020

- **Bugfix**: fix(dropdown): fixed an issue where the menu and tooltip overlapped. ([#1132])
- **Bugfix**: fix(treepicker): called onDragStart only when the node is draggable. ([#1124])

[#1132]: https://github.com/rsuite/rsuite/pull/1132
[#1124]: https://github.com/rsuite/rsuite/pull/1124

# 4.7.4

> June 11, 2020

- **Bugfix**: Fix autoplay can't be interrupted in `Carousel`. ([#1120])
- **Bugfix**: Fixed `ShowOneCalendar` disabled Months after date. ([#1118])
- **Bugfix**: Fixed type errors defined by Typescript. ([#1098],[#1106])

[#1120]: https://github.com/rsuite/rsuite/pull/1120
[#1118]: https://github.com/rsuite/rsuite/pull/1118
[#1106]: https://github.com/rsuite/rsuite/pull/1106
[#1098]: https://github.com/rsuite/rsuite/pull/1098

# 4.7.3

> June 8, 2020

- **Bugfix**: fix TypeError Cannot redefine property: prefix. ([#1115])

[#1115]: https://github.com/rsuite/rsuite/pull/1115

# 4.7.2

> June 4, 2020

- **Bugfix** fix(steps): fixed the description of Steps will break layout. ([#1100])
- **Bugfix** fix(inputpicker): fix InputNumber will not trigger onChange when input. ([#1096])
- **Bugfix** fix(ts): fix errors in Typescript. ([#1095],[#1103])
- **Bugfix** fix(dropdown): fix incorrect Dropdown caret position. ([#1094])
- **Bugfix** fix(picker): remove redundant ripple elements in PickerToggle ([#1092])
- **Bugfix** fix(sidenav): fixed display issue when sidenav was collapsed. ([#1090])
- **Bugfix**: fix(buttongroup): fixed Button componentClass not work with ButtonGroup. ([#1087])
- **Example**: docs(example): add example of Reason app. ([#1101])

---

- **Bugfix** 修复 Steps 组件描述过长后导致布局异常。 ([#1100])
- **Bugfix** 修复 InputNumber 键盘输入未触发 onChange 事件。 ([#1096])
- **Bugfix** 修复 Typescript 中存在的类型定义错误。 ([#1095],[#1103])
- **Bugfix** 修复 Dropdown 内 caret 图标的位置。 ([#1094])
- **Bugfix** 修复 PickerToggle 内冗余的涟漪元素。 ([#1092])
- **Bugfix** 修复 Sidenav 折叠以后存在的显示问题。 ([#1090])
- **Bugfix**: 修复 ButtonGroup 内 Button 的 componentClass 属性无效的问题。 ([#1087])
- **Example**: 新增 ReasonML 的示例项目 ([#1101])

[#1103]: https://github.com/rsuite/rsuite/pull/1103
[#1101]: https://github.com/rsuite/rsuite/pull/1101
[#1100]: https://github.com/rsuite/rsuite/pull/1100
[#1096]: https://github.com/rsuite/rsuite/pull/1096
[#1095]: https://github.com/rsuite/rsuite/pull/1095
[#1094]: https://github.com/rsuite/rsuite/pull/1094
[#1092]: https://github.com/rsuite/rsuite/pull/1092
[#1090]: https://github.com/rsuite/rsuite/pull/1090
[#1087]: https://github.com/rsuite/rsuite/pull/1087

# 4.7.1

> May 28, 2020

- **Improve**: Improved `<TreePicker>` and `<CheckTreePicker>` to expand nodes when searching. ([#1075])
- **Improve**: Export component props from `rsuite`. ([#1068])
- **Bugfix**: Fixed the content of the last marker of `<Slider>` not being dot-aligned. ([#1079])
- **Bugfix**: Fixed `<Slider>` drag handle error ([#1082])
- **Bugfix**: Fixed errors in the docs. ([#1080])
- **Bugfix**: Fixed type errors defined by Typescript. ([#1081])
- **Chore**: Added `commintlint` to check git meesage. ([#1078])

---

- **Improve**: 改进 `<TreePicker>` 和 `<CheckTreePicker>` 在搜索时展开节点。 ([#1075])
- **Improve**: 导出 `rsuite` 所有组件的 `props`。 ([#1068])
- **Bugfix**: 修复了 `<Slider>` 的最后一个标记的内容未点对齐的问题。([#1079])
- **Bugfix**: 修复了 `<Slider>` 拖拽手柄报错的问题。 ([#1082])
- **Bugfix**: 修复了一些文档中的错误。 ([#1080])
- **Bugfix**: 修复了一些 Typescript 类型定义错误。 ([#1081])
- **Chore**: 添加 `commintlint`，用于对 git meesage 的格式进行检查。 ([#1078])

[#1082]: https://github.com/rsuite/rsuite/pull/1082
[#1081]: https://github.com/rsuite/rsuite/pull/1081
[#1080]: https://github.com/rsuite/rsuite/pull/1080
[#1079]: https://github.com/rsuite/rsuite/pull/1079
[#1078]: https://github.com/rsuite/rsuite/pull/1078
[#1075]: https://github.com/rsuite/rsuite/pull/1075
[#1068]: https://github.com/rsuite/rsuite/pull/1068

# 4.7.0

> May 21, 2020

- **Feature**: Support `onRowContextMenu` on `<Table>`. ([rsuite-table#150])
- **Feature**: Add `<Table.ColumnGroup>`. ([rsuite-table#146])
- **Feature**: Support `filterBy` on `<AutoComplete>`. ([#1063])
- **Feature**: Added support for Spanish ([#1054])
- **Bugfix**: Fixed `<Loader>` spinner not centered when given size. ([#1059])
- **Example**: Add example for draggable table. ([#1065])

---

- **Feature**: `<Table>`新增 `onRowContextMenu` 属性，行点击右键的回调。 ([rsuite-table#150])
- **Feature**: 新增 `<Table.ColumnGroup>` 组件，用于表头分组。 ([rsuite-table#146])
- **Feature**: `<AutoComplete>` 新增 `filterBy`属性，用于自定义过滤显示的选项。 ([#1063])
- **Feature**: 新增对西班牙语的支持。 ([#1054])
- **Bugfix**: 修复 `<Loader>` 当设置 `size` 时候，未居中的问题。 ([#1059])
- **Example**: 添加了表格可拖拽行与列的示例。 ([#1065])

[#1065]: https://github.com/rsuite/rsuite/pull/1065
[#1063]: https://github.com/rsuite/rsuite/pull/1063
[#1059]: https://github.com/rsuite/rsuite/pull/1059
[#1054]: https://github.com/rsuite/rsuite/pull/1054
[rsuite-table#150]: https://github.com/rsuite/rsuite-table/pull/150
[rsuite-table#146]: https://github.com/rsuite/rsuite-table/pull/146

# 4.6.0

> May 14, 2020

- **Feature**: Support `formatDate` on `<IntlProvider>`. ([#1036])

- **Feature**: Support animation related callbacks on Picker ([#1042])
- **Improve**: The basic styles of HTML elements support import on demand. ([#1039])
- **Bugfix**: Fixed an issue that caused data inconsistency when uncheckableItemValues changed in `<CheckTreePicker>`. ([#1053])
- **Bugfix**: Fixed `<Sidenav>` style issues. ([#1052])
- **Bugfix**: Fixed `Notification` closeAll sync problem. ([#1047])
- **Bugfix**: Fixed performance issues caused by arrays in `Col`. ([#1037])
- **Bugfix**: Fixed `Affix` typings definition wrong. ([#1051])
- **Bugfix**: Fixed Table `scrollTop` method not working, when setting`virtualized`. ([rsuite-table#152])
- **Example**: Add with-electron example. ([#1045])

---

- **Feature**: `<IntlProvider>` 新增支持 `formatDate` 属性，用于对日期格式。 ([#1036])
- **Feature**: 所有 Picker 组件支持动画相关的回调。 ([#1042])
- **Improve**: HTML 元素的基础样式支持按需导入。 ([#1039])
- **Bugfix**: 修复了 `<CheckTreePicker>` 的 `uncheckableItemValues` 更新后导致的数据不一致问题。 ([#1053])
- **Bugfix**: 修复了 `<Sidenav>` 中存在的样式问题。 ([#1052])
- **Bugfix**: 修复了 `Notification` 的 `closeAll` 方法同步执行的问题。 ([#1047])
- **Bugfix**: 修复了 `<Col>` 中数组导致的性能问题。 ([#1037])
- **Bugfix**: 修复了 `<Affix>` 中 typescript 类型定义错误的问题。 ([#1051])
- **Bugfix**: 修复了 `Table`在设置 `virtualized` 属性后，`scrollTop` 方法导致白屏的问题。 ([rsuite-table#152])
- **Example**: 新增示例 `with-electron`。 ([#1045])

[#1053]: https://github.com/rsuite/rsuite/pull/1053
[#1052]: https://github.com/rsuite/rsuite/pull/1052
[#1051]: https://github.com/rsuite/rsuite/pull/1051
[#1047]: https://github.com/rsuite/rsuite/pull/1047
[#1045]: https://github.com/rsuite/rsuite/pull/1045
[#1042]: https://github.com/rsuite/rsuite/pull/1042
[#1039]: https://github.com/rsuite/rsuite/pull/1039
[#1037]: https://github.com/rsuite/rsuite/pull/1037
[#1036]: https://github.com/rsuite/rsuite/pull/1036
[rsuite-table#152]: https://github.com/rsuite/rsuite-table/pull/152

# 4.5.0

> May 7, 2020

- **Feature**: Support `maxItems` and `onExpand` on `<Breadcrumb>`.([#1009])
- **Bugfix**: Fixed TableProps onDataUpdated & shouldUpdateScroll optional. ([#1035])
- **Bugfix**: Fixed Carousel unable to render invalid children. ([#1027])
- **Bugfix**: Fixed the clear button style issue on Picker. ([#1029])
- **Bugfix**: Fixed Sidenav style issue. ([#1020])

---

- **Feature**: `<Breadcrumb>` 新增属性 `maxItems` 和 `onExpand` 。([#1009])
- **Bugfix**: 修复 TableProps 的属性 `onDataUpdated` 与 `shouldUpdateScroll` 为可选属性. ([#1035])
- **Bugfix**: 修复 `<Carousel>` 出现无效子项导致组件渲染错误的问题. ([#1027])
- **Bugfix**: 修复了 `Picker` 上清除按钮样式问题。 ([#1029])
- **Bugfix**: 修复了 `<Sidenav>` 样式问题。([#1020])

[#1035]: https://github.com/rsuite/rsuite/pull/1035
[#1029]: https://github.com/rsuite/rsuite/pull/1029
[#1027]: https://github.com/rsuite/rsuite/pull/1027
[#1020]: https://github.com/rsuite/rsuite/pull/1020
[#1009]: https://github.com/rsuite/rsuite/pull/1009

# 4.4.1

> April 29, 2020

- **Bugfix**: Fix the clear button of picker not clickable in IE11. ([#1017])
- **Bugfix**: Fix toggle clean button styles issue. ([#1016])
- **Bugfix**: Fix missing typescript type definitions. ([#1008])
- **Bugfix**: Fix the expanded state of the menu. ([#1007])

---

- **Bugfix**: 修复了 IE11 的一个兼容性问题，Picker 的清除按钮不可点击 ([#1017])
- **Bugfix**: 修复了 Toggle 按钮样式问题。 ([#1016])
- **Bugfix**: 修复了遗漏的 Typescript 类型定义。 ([#1008])
- **Bugfix**: 修复了 Dropdown 中的菜单状态错误的问题。([#1007])

[#1017]: https://github.com/rsuite/rsuite/pull/1017
[#1016]: https://github.com/rsuite/rsuite/pull/1016
[#1008]: https://github.com/rsuite/rsuite/pull/1008
[#1007]: https://github.com/rsuite/rsuite/pull/1007

# 4.4.0

> April 24, 2020

- **Feature**: Support `draggable` on `<Tree>` ([#987])
- **Feature**: Added `<Rete>`. ([#981])
- **Feature**: Added support for Italian ([#971])
- **Feature**: Added support for custom overlay. ([#969])
- **Feature**: Support `endless` on `<Timeline>` ([#982])
- **Feature**: Support `vertical` on `<Progress.Line>`. ([#938])
- **Feature**: Support `showMeridian` on `<DatePicker>`. ([#932])
- **Feature**: Support `searchBy` on all picker. ([#928],[#965])
- **Feature**: Support `tagProps` on `<TagPicker>`. ([#927])
- **Feature**: Support `container` on `<Affix>`. ([#912])
- **Feature**: Support `onDataUpdated` on `<Table>`. ([rsuite-table#140])
- **Feature**: Support `affixHorizontalScrollbar` on `<Table>`. ([rsuite-table#137])
- **Breaking**: Fix misspelling of Uploader props `dragable`, modify to`draggable`.
- **Improve**: Picker support size props at default. ([#917])
- **Improve** Improved animation of `<Placeholder>` active state.
- **Improve**: Improved `wordWrap` property for compatibility with `rowHeight`. ([rsuite-table#138])
- **Bugfix**: Fix Types.PlacementAuto definition. ([#962])
- **Chore**: Migrating `rsuite-utils` to `rsuite`. ([#963])
- **Example**: Add with-preact example. ([#977])

---

- **Feature**: `<Tree>` 组件新增 `draggable`属性， 支持拖拽。 ([#987])
- **Feature**: 新增 `<Rete>` 组件。 ([#981])
- **Feature**: 新增对意大利语言支持。 ([#971])
- **Feature**: 支持自定义浮层。 ([#969])
- **Feature**: `<Timeline>` 组件新增 `endless` 属性。 ([#982])
- **Feature**: `<Progress.Line>` 组件新增 `vertical` 属性，垂直显示进度条。 ([#938])
- **Feature**: `<DatePicker>` 组件新增 `showMeridian` 属性，支持时间 12 小时格式显示。 ([#932])
- **Feature**: `<TagPicker>` 组件支持 `tagProps`，设置 Tag 属性。 ([#927])
- **Feature**: `<Affix>` 支持 `container` 属性，把元素只在容器可见范围内才固定。 ([#912])
- **Feature**: `<Table>` 支持 `onDataUpdated` 属性，在表格数据加载完成以后的回调函数。 ([rsuite-table#140])
- **Feature**: `<Table>` 支持 `affixHorizontalScrollbar` 属性，让表格底部横向滚动条固定在可视范围内。 ([rsuite-table#137])
- **Feature**: 所有带搜索功能的 Picker 组件 `searchBy`属性，可以自定义搜索规则。 ([#928],[#965])
- **Breaking**: 修复 Uploader 属性 `dragable` 拼写错误，修改为 `draggable`。 ([#984])
- **Improve**: 改进所有的 Picker 组件，默认支持 `size` 属性。([#917])
- **Improve** 改进 `<Placeholder>` 的动画效果。
- **Bugfix**: 修复 `<Table>` 的 `wordWrap` 属性与 `rowHeight`不兼容的问题。 ([rsuite-table#138])
- **Bugfix**: 修复 Typescript 一些定义错误。([#962])
- **Example**: 新增示例项目 with-preact。 ([#977])
- **Chore**: 迁移 `rsuite-utils` 库到 `rsuite`，方便维护。 ([#963])

[#987]: https://github.com/rsuite/rsuite/pull/987
[#984]: https://github.com/rsuite/rsuite/pull/984
[#987]: https://github.com/rsuite/rsuite/pull/982
[#981]: https://github.com/rsuite/rsuite/pull/981
[#977]: https://github.com/rsuite/rsuite/pull/977
[#971]: https://github.com/rsuite/rsuite/pull/971
[#969]: https://github.com/rsuite/rsuite/pull/969
[#965]: https://github.com/rsuite/rsuite/pull/965
[#963]: https://github.com/rsuite/rsuite/pull/963
[#962]: https://github.com/rsuite/rsuite/pull/962
[#938]: https://github.com/rsuite/rsuite/pull/938
[#933]: https://github.com/rsuite/rsuite/pull/933
[#932]: https://github.com/rsuite/rsuite/pull/932
[#928]: https://github.com/rsuite/rsuite/pull/928
[#927]: https://github.com/rsuite/rsuite/pull/927
[#917]: https://github.com/rsuite/rsuite/pull/917
[#912]: https://github.com/rsuite/rsuite/pull/912
[rsuite-table#140]: https://github.com/rsuite/rsuite-table/pull/140
[rsuite-table#138]: https://github.com/rsuite/rsuite-table/pull/138
[rsuite-table#137]: https://github.com/rsuite/rsuite-table/pull/137

# 4.3.4

> April 10, 2020

- **Bugfix**: Fixed `<DatePciker>` onlyTime icon to clock icon. ([#933])
- **Bugfix**: Fixed an issue where the cache was not reset after the data was updated in `<InputPicker>`. ([#948])

---

- **Bugfix**: 修复了 `<DatePciker>` 在只显示时间时图标错误的问题。([#933])
- **Bugfix**: 修复了 `<InputPicker>` 在更新数据后未重置缓存的问题，导致新建项重复。 ([#948])

[#948]: https://github.com/rsuite/rsuite/pull/948
[#933]: https://github.com/rsuite/rsuite/pull/933

# 4.3.3

> March 26, 2020

- **Bugfix**: Fixed `<InputNumber>` triggering `onChange` event incorrectly when losing focus. ([#923])
- **Bugfix**: Update broken types in `<DateRangePicker>`. ([#916])
- **Bugfix**: `rowHeight` should be optional on `<Table>`. ([#913])
- **Improve**: The `content` props value supports `false` on `<Badge>`. ([#915])
- **Improve**: Support keyboard enter key selection after the search is completed on Picker. ([#914])

---

- **Bugfix**: 修复了 `<InputNumber>` 在失去焦点时候，值未改变的情况下也触发了 `onChange` 事件。 ([#923])
- **Bugfix**: 修复了 `<DateRangePicker>` 中错误的 typescript 类型定义。 ([#916])
- **Bugfix**: 修复了 `<Table>` 错误的 typescript 类型定义, `rowHeight` 应该是可选属性。 ([#913])
- **Improve**: 更新 `<Badge>` 组件 `content` 属性的值可以设置为 `false`。 ([#915])
- **Improve**: 改进了 `Picker` 组件在搜索后，支持键盘 `Enter` 键直接选中第一个结果。 ([#914])

[#923]: https://github.com/rsuite/rsuite/pull/923
[#916]: https://github.com/rsuite/rsuite/pull/916
[#915]: https://github.com/rsuite/rsuite/pull/915
[#914]: https://github.com/rsuite/rsuite/pull/914
[#913]: https://github.com/rsuite/rsuite/pull/913

# 4.3.2

> March 19, 2020

- **Feature**: Support `showOneCalendar` on `<DateRangePicker>`. ([#911],[#848])
- **Bugfix**: Fixed an issue where the scroll bar would not reset after the table was updated with data. ([rsuite-table#136])
- **Bugfix**: Fixed missing typescript type definition in table.
- **Example**: Added example for `Nav.Item` with `react-router-dom/link`. ([#909])
- **Example**: Added example for `Nav.Item` with `next/link`. ([#907])

---

- **Feature**: `<DateRangePicker>` 新增 `showOneCalendar` 属性，支持只显示一个日历。([#911],[#848])
- **Bugfix**: 修复了 `<Table>` 在数据更新后，滚动条位置未重重的问题。 ([rsuite-table#136])
- **Bugfix**: 修复了 `<Table>` 缺少 Typescript 的类型定义。
- **Example**: 新增 `Nav.Item` 与 `react-router-dom/link`组合的示例 ([#909])
- **Example**: 新增 `Nav.Item` 与 `next/link`组合的示例 ([#907])

[#911]: https://github.com/rsuite/rsuite/pull/911
[#909]: https://github.com/rsuite/rsuite/pull/909
[#907]: https://github.com/rsuite/rsuite/pull/907
[#904]: https://github.com/rsuite/rsuite/pull/904
[#848]: https://github.com/rsuite/rsuite/pull/848
[rsuite-table#136]: https://github.com/rsuite/rsuite-table/pull/136

# 4.3.1

> March 13, 2020

- **Bugfix**: Fixed rendering error in local language. ([#903])
- **Bugfix**: Fixed the problem that the `resizable` property of the columns of the table would not work. ([rsuite-table#135])
- **Bugfix**: Fix Icon issue when Panel is nested. ([#894])
- **Bugfix**: Fix incorrect value passing. ([#888])
- **Bugfix**: [docs] Fixed issue that website can't load in safari and ie. ([#901])
- **Bugfix**: [docs] Add title to home page. ([#898])
- **Example**: Add with-gatsby example. ([#897])

---

- **Bugfix**: 修复本地语言渲染错误的问题。 ([#903])
- **Bugfix**: 修复 Table 列设置 `resizable` 以后拖拽列宽不工作的问题。 ([rsuite-table#135])
- **Bugfix**: 修复 Panel 组件嵌套 Icon 重复显示的问题 ([#894])
- **Bugfix**: 修复 PaginationButton 中传递的错误值。 ([#888])
- **Bugfix**: [docs] 修复文档不能再 safari 和 ie 浏览器正常访问的问题。 ([#901])
- **Bugfix**: [docs] 修复文档首页缺失 title 的问题 ([#898])
- **Example**: 添加 rsuite 与 gatsby 集成的示例 ([#897])

[#903]: https://github.com/rsuite/rsuite/pull/903
[#901]: https://github.com/rsuite/rsuite/pull/901
[#898]: https://github.com/rsuite/rsuite/pull/898
[#894]: https://github.com/rsuite/rsuite/pull/894
[#888]: https://github.com/rsuite/rsuite/pull/888
[#897]: https://github.com/rsuite/rsuite/pull/897
[rsuite-table#135]: https://github.com/rsuite/rsuite-table/pull/135

# 4.3.0

> March 5, 2020

- **Feature**: Added Arabic, Finnish, Swedish and Danish locales. ([#849],[#821])
- **Feature**: Added `expanded` parameter in `renderTreeToggle` of `<Table>`. ([rsuite-table#130])
- **Feature**: Added support `treeCol` on `<Table.Column>`. ([rsuite-table#129])
- **Bugfix**: Fixed `<CheckPicker>` rendering error when setting `groupBy`. ([#887])
- **Bugfix**: Fixed `<Slider>` bar is invisible on Drawer in dark mode. ([#876])
- **Bugfix**: Fixed disabled `<InputNumber>` in `<InputGroup>` shows unexpected border radius. ([#875])
- **Bugfix**: Fixed radio-group inline item styles. ([#872])
- **Bugfix**: Fixed missing typescript declaration files \*.d.ts in `/locales`. ([#856])
- **Bugfix**: Fixed mark cannot be customized rendering in `<Slider>` correctly. ([#840])
- **Improve**: Updated check rules for disabled times on `<DatePicker>`. ([#852])
- **Improve**: Support for getting the `active` property when the Pagination button is a custom element. ([#833])
- **Breaking**: The `rowHeight` property of Table supports function values. Remove the`setRowHeight` property.
- **Chore**: Improved HoC to support ref passing. ([#862],[#872])
- **Chore**: Added some integrated examples. ([#860],[examples])
- **Chore**: The Table component migrates Typescript from Flow. ([rsuite-table#127])

---

- **Feature**: 新增支持阿拉伯语，芬兰语，瑞典语和丹麦语。 ([#849],[#821])
- **Feature**: `<Table>` 的 `renderTreeToggle`属性新增 `expanded` 参数。 ([rsuite-table#130])
- **Feature**: `<Table.Column>` 上新增 `treeCol` 属性，指定 Tree 显示的列。 ([rsuite-table#129])
- **Bugfix**: 修复了 `<CheckPicker>` 当设置 `groupBy='group'`渲染出错。 ([#887])
- **Bugfix**: 修复了 `<Slider>` 在 dark 主题下选择栏不可见的问题。 ([#876])
- **Bugfix**: 修复了 `<InputGroup>` 里禁用的 `<InputNumber>` 显示错误的边框。 ([#875])
- **Bugfix**: 修复了 `<RadioGroup>` 单行显示时的样式问题。 ([#872])
- **Bugfix**: 修复了 locales 目录下语言包缺少 Typescript 类型定义。 ([#856])
- **Bugfix**: 修复了 `<Slider>` 的标记在自定义时候无法正确呈现。 ([#840])
- **Improve**: 更新了 `<DatePicker>` 上禁用时间的检查规则。 ([#852])
- **Improve**: 支持在 `<Pagination>` 按钮是自定义元素时获取 `active` 属性 。 ([#833])
- **Breaking**: `<Table>` 的 `rowHeight` 属性值支持函数，同时删除了 `setRowHeight` 属性。
- **Chore**: 改进了高阶组件以支持 ref 传递。 ([#862],[#872])
- **Chore**: 新增了一些集成的示例项目。 ([#860],[examples])
- **Chore**: Table 组件库从 Flow 迁移到 Typescript。 ([rsuite-table#127])

[#887]: https://github.com/rsuite/rsuite/pull/887
[#876]: https://github.com/rsuite/rsuite/pull/876
[#875]: https://github.com/rsuite/rsuite/pull/875
[#873]: https://github.com/rsuite/rsuite/pull/873
[#872]: https://github.com/rsuite/rsuite/pull/872
[#862]: https://github.com/rsuite/rsuite/pull/862
[#860]: https://github.com/rsuite/rsuite/pull/860
[#856]: https://github.com/rsuite/rsuite/pull/856
[#852]: https://github.com/rsuite/rsuite/pull/852
[#849]: https://github.com/rsuite/rsuite/pull/849
[#840]: https://github.com/rsuite/rsuite/pull/840
[#833]: https://github.com/rsuite/rsuite/pull/831
[#821]: https://github.com/rsuite/rsuite/pull/821
[rsuite-table#130]: https://github.com/rsuite/rsuite-table/pull/130
[rsuite-table#129]: https://github.com/rsuite/rsuite-table/pull/129
[rsuite-table#127]: https://github.com/rsuite/rsuite-table/pull/127
[examples]: https://github.com/rsuite/rsuite/tree/master/examples

# 4.2.1

> February 2, 2020

- **Bugfix**: Fixed "script-src" content security policy (CSP) failure ([#830])
- **Bugfix**: Fixed an issue where `onSelect` was called undefined, when using `enter` on the `<AutoComplete>` to select it. ([#828])
- **Bugfix**: Fixed vertical alignment of xs `<Datepicker>` icon. ([#817])
- **Bugfix**: Fixed List and Modal combo setting has drag issue. ([#812])
- **Bugfix**: Fixed toggle text/icon font size. ([#810])
- **Bugfix**: Fixed an issue where `scrollTop` would not work in `<Table>`. ([rsuite-table#13da7a9])
- **Bugfix**: Fixed `<Table>` style overlap problem, when there are both loading and empty states. ([rsuite-table#120])
- **Bugfix**: [TS] Update ts type definition for Animation. ([#822])
- **Improve**: Special handling of `<Button>` when it is used as a `link`. ([#831])
- **Improve**: Remove defalut value of `parentSelectable` in `<Cascader>` ([#808])
- **Chore**: Update eslint ([#808])

---

- **Bugfix**: 修复了 `script-src` 内容安全策略（CSP）失败的问题。 ([#830])
- **Bugfix**: 修复了 `<AutoComplete>` 组件使用 `enter` 选择时候 `onSelect` 回调未被调用的问题。([#828])
- **Bugfix**: 修复了 xs `<Datepicker>` 图标的垂直对齐方式。 ([#817])
- **Bugfix**: 修复了 List 和 Modal 组合时候存在的拖拽问题。 ([#812])
- **Bugfix**: 修复了 Toggle 字体大小的问题。 ([#810])
- **Bugfix**: 修复了 `<Table>` 的 `scrollTop` API 调用无效的问题。([rsuite-table#13da7a9])
- **Bugfix**: 修复了 `<Table>` 的加载中状态与数据为空状态的样式重叠的问题。 ([rsuite-table#120])
- **Bugfix**: [TS] 更新了 Animation 的类型定义。 ([#822])
- **Improve**: 当 `<Button>` 为 `link` 的时候的特殊处理。 ([#831])
- **Improve**: 删除 `<Cascader>` 的 `parentSelectable` 属性的默认值。 ([#808])
- **Chore**: 更新 eslint 配置。 ([#808])

[#831]: https://github.com/rsuite/rsuite/pull/831
[#830]: https://github.com/rsuite/rsuite/pull/830
[#828]: https://github.com/rsuite/rsuite/pull/828
[#822]: https://github.com/rsuite/rsuite/pull/822
[#817]: https://github.com/rsuite/rsuite/pull/817
[#812]: https://github.com/rsuite/rsuite/pull/812
[#810]: https://github.com/rsuite/rsuite/pull/810
[#808]: https://github.com/rsuite/rsuite/pull/808
[rsuite-table#13da7a9]: https://github.com/rsuite/rsuite-table/commit/476c7573172205ba8df976035a1e770298a33367
[rsuite-table#120]: https://github.com/rsuite/rsuite-table/pull/124

# 4.2.0

> January 2, 2020

- **Feature**: Added support for `<RangeSlider>` ([#805])
- **Feature**: Added support for `parentSelectable` on `<Cascader>`. ([#802])
- **Feature**: Added support for Russian. ([#799])
- **Feature**: Added option `image` to the `graph` property of `<Placeholder>` ([#755])
- **Feature**: Added support for `draggable` on `<Uploader>`. ([#752])
- **Improve**: Enhance `<Tooltip>` and `<Popover>` to support HTML attributes ([#806])
- **Bugfix**: Fixed the height of the buttons in the `<InputGroup>`.([#807])
- **Bugfix**: Fixed `Drawer` gap bug when in RTL mode.([#803])
- **Bugfix**: Fixed `<TreePicker>` changing width does not work when setting `virtualized` props. ([#796])
- **Bugfix**: Fixed `<TreePicker>` not showing child nodes when loading data asynchronously. ([#796])
- **Bugfix**: Fixed `xsHidden` don't work as expected ([#795])

---

- **Feature**: 新增组件 `<RangeSlider>` ([#805])
- **Feature**: `<Cascader>` 组件支持 `parentSelectable` 属性，让父节点可选择。([#802])
- **Feature**: 添加对俄语支持。([#799])
- **Feature**: `<Placeholder>`的 `graph` 属性值添加了 `image` 选项。 ([#755])
- **Feature**: `<Uploader>` 组件支持 `draggable` 属性，可以拖拽上传文件。([#752])
- **Improve**: `<Tooltip>` 和 `<Popover>` 支持 HTML 元素默认属性。 ([#806])
- **Bugfix**: 修复了 `<InputGroup>` 内部按钮高度的问题。([#807])
- **Bugfix**: 修复了 `<Drawer>` 在 RTL 模式下，左侧存在间隙的样式问题。([#803])
- **Bugfix**: 修复了 `<TreePicker>` 在设置 `virtualized` 属性后，改变宽度无效的问题。 ([#796])
- **Bugfix**: 修复了 `<TreePicker>` 在异步更新后，不能展示子节点的问题。 ([#796])
- **Bugfix**: 修复了 `xsHidden` 属性不能按照预期显示的问题。 ([#795])

[#807]: https://github.com/rsuite/rsuite/pull/807
[#806]: https://github.com/rsuite/rsuite/pull/806
[#805]: https://github.com/rsuite/rsuite/pull/805
[#803]: https://github.com/rsuite/rsuite/pull/803
[#802]: https://github.com/rsuite/rsuite/pull/802
[#799]: https://github.com/rsuite/rsuite/pull/799
[#796]: https://github.com/rsuite/rsuite/pull/796
[#795]: https://github.com/rsuite/rsuite/pull/795
[#755]: https://github.com/rsuite/rsuite/pull/755
[#752]: https://github.com/rsuite/rsuite/pull/752

# 4.1.5

> December 19, 2019

- **Feature**: Added support for `virtualized` on picker.([#786])
- **Bugfix**: Fixed `<CheckTreePicker>` checkbox style issue.([#786])
- **Bugfix**: Fixed RTL related bugs. ([#779])
- **Bugfix**: Fixed `<Icon>` rotate props not working. ([#790])
- **Improve**: Added parameter to Uploader's callback method. ([#781])
- **Chore**: Added component prefix to `<Popover>` arrow. ([#791])
- **Chore**: upgrade ESLint and format code. ([#780])

---

- **Feature**: Picker 相关组件添加了 `virtualized` 属性。([#786])
- **Bugfix**: 修复了 `<CheckTreePicker>` 复选框样式问题。([#786])
- **Bugfix**: 修复了 RTL 相关的 Bug。 ([#779])
- **Bugfix**: 修复 `<Icon>` rotate 属性无效的问题。 ([#790])
- **Improve**: 为 `<Uploader>` 的回调方法中添加参数 `XMLHttpRequest`。 ([#781])
- **Chore**: 调整 `<Popover>` 内部样式的命名。 ([#791])
- **Chore**: 更新了 ESLint。 ([#780])

[#792]: https://github.com/rsuite/rsuite/pull/792
[#791]: https://github.com/rsuite/rsuite/pull/791
[#790]: https://github.com/rsuite/rsuite/pull/790
[#789]: https://github.com/rsuite/rsuite/pull/789
[#786]: https://github.com/rsuite/rsuite/pull/786
[#781]: https://github.com/rsuite/rsuite/pull/781
[#780]: https://github.com/rsuite/rsuite/pull/780
[#779]: https://github.com/rsuite/rsuite/pull/779

# 4.1.4

> December 12, 2019

- **Improve**: Improve the performance of virtualized table ([rsuite-table#120])
- **Chore**: Adjusted the sideEffects configuration.. ([#774])

---

- **Improve**: 优化了 Table 组件在渲染大数据时候性能。 ([rsuite-table#120])
- **Chore**: 调整了 sideEffects 配置。 ([#774])

[#774]: https://github.com/rsuite/rsuite/pull/774
[rsuite-table#120]: https://github.com/rsuite/rsuite-table/pull/120

# 4.1.3

> December 5, 2019

- **Bugfix**: Fixed some style issues. ([#770],[#771],[#767])
- **Bugfix**: Fixed the issue that events cannot be accessed in asynchronous callbacks. ([#763])
- **Bugfix**: Fix RTL related bugs ([#757],[#760],[#769])
- **Improve**: Improved the speed at which `<DateRangePicker`> opens. ([#768])

---

- **Bugfix**: 修复了一些样式问题。 ([#770],[#771],[#767])
- **Bugfix**: 修复了无法在组件的异步回调中获取 Event 对象的问题。 ([#763])
- **Bugfix**: 修复 RTL 相关 Bug。 ([#757],[#760],[#769])
- **Improve**: 优化了 `<DateRangePicker>` 打开的速度。 ([#768])

[#771]: https://github.com/rsuite/rsuite/pull/771
[#770]: https://github.com/rsuite/rsuite/pull/770
[#769]: https://github.com/rsuite/rsuite/pull/769
[#768]: https://github.com/rsuite/rsuite/pull/768
[#767]: https://github.com/rsuite/rsuite/pull/767
[#763]: https://github.com/rsuite/rsuite/pull/763
[#760]: https://github.com/rsuite/rsuite/pull/760
[#757]: https://github.com/rsuite/rsuite/pull/757

# 4.1.2

> November 29, 2019

- **Bugfix**: Fixed the issue where `<DateRangePicker>` was not disabled in the previous month and the next month. ([#747])
- **Bugfix**: Fixed `<DateRangePicker>` panel collapse issue. ([#746])
- **Bugfix**: Fixed multiple picker count label vertical align issue when set `size=lg` ([#742])
- **Bugfix**: Fix FormControl typescript type definition error ([#741])
- **Bugfix**: Fix RTL related bugs ([#732],[#733],[#734],[#743],[#748],[#749])
- **Chore**: Update Schema typescript definition. ([#754])
- **Chore**: Add a default value for the variable in `createConcatChildrenFunction`. ([#753])

---

- **Bugfix**: 修复 `<DateRangePicker>` 上一月与下一月未禁用的问题。 ([#747])
- **Bugfix**: 修复了 `<DateRangePicker>` 面板折叠的问题。 ([#746])
- **Bugfix**: 修复了设置 `size = lg` 时 `Picker` 计数标签垂直对齐的问题 ([#742])
- **Bugfix**: 修复 `FormControl` 的 `Typescript` 类型定义错误 ([#741])
- **Bugfix**: 修复 RTL 相关 Bug ([#732],[#733],[#734],[#743],[#748],[#749])
- **Chore**: 更新 Schema typescript 类型定义。 ([#754])
- **Chore**: 在 `createConcatChildrenFunction` 中为变量添加一个默认值。 ([#753])

[#754]: https://github.com/rsuite/rsuite/pull/754
[#753]: https://github.com/rsuite/rsuite/pull/753
[#749]: https://github.com/rsuite/rsuite/pull/749
[#748]: https://github.com/rsuite/rsuite/pull/748
[#747]: https://github.com/rsuite/rsuite/pull/747
[#746]: https://github.com/rsuite/rsuite/pull/746
[#743]: https://github.com/rsuite/rsuite/pull/743
[#742]: https://github.com/rsuite/rsuite/pull/742
[#741]: https://github.com/rsuite/rsuite/pull/741
[#734]: https://github.com/rsuite/rsuite/pull/734
[#733]: https://github.com/rsuite/rsuite/pull/733
[#732]: https://github.com/rsuite/rsuite/pull/732

# 4.1.1

> November 14, 2019

- **Feature**: Added support for `affixHeader` on `<Table>`. ([#720],[rsuite-table#105])
- **Feature**: Added support for `inline` on Cascader and MultiCascader ([#724])
- **Bugfix**: Fixed a problem where the Chinese formatting characters were too long to cause time wrap on the DatePicker. ([#722])
- **Bugfix**: Fixed checktree menu item text-algin styles issue. ([#718])
- **Bugfix**: Fixed DatePicker format issue. ([#723])
- **Bugfix**: Fixed an issue where the Table scroll bar was out of control.([rsuite-table#105])
- **Chore**: Upgrade to typescirpt 3.7. ([#721])

---

- **Feature**: 在 `<Table>` 组件上新增 `affixHeader` 属性，可以让表头页面级固定。([#720],[rsuite-table#105])
- **Feature**: 在 `<Cascader>` 与 `<MultiCascader>` 组件上新增 `inline` 属性。 ([#724])
- **Bugfix**: 修复了日期中文格式化字符过长而导致 `<DatePicker>` 上的时间换行的问题。 ([#722])
- **Bugfix**: 修复了 `<CheckTree>` 菜单项文本对齐样式问题。 ([#718])
- **Bugfix**: 修复了 `<DatePicker>` 日期格式化问题。 ([#723])
- **Bugfix**: 修复了 `<Table>` 滚动条失控的问题。 ([rsuite-table#105])
- **Chore**: 升级 Typescirpt 至 3.7 版本。 ([#721])

[#724]: https://github.com/rsuite/rsuite/pull/724
[#723]: https://github.com/rsuite/rsuite/pull/723
[#722]: https://github.com/rsuite/rsuite/pull/722
[#721]: https://github.com/rsuite/rsuite/pull/721
[#720]: https://github.com/rsuite/rsuite/pull/720
[#718]: https://github.com/rsuite/rsuite/pull/718
[rsuite-table#106]: https://github.com/rsuite/rsuite-table/pull/106
[rsuite-table#105]: https://github.com/rsuite/rsuite-table/pull/105

# 4.1.0

> November 7, 2019

- **Feature**: Add support for `<Carousel>`. ([#716])
- **Feature**: Added Right-to-left supported. ([#715])
- **Feature**: Add support for `renderItem` on the navigation component. ([#713])
- **Feature**: Added for `fileListVisible` on `<Uploader>`. ([#709])
- **Feature**: Added `shaded` props for `<Panel>`. ([#677])
- **Feature**: Added support for `<Affix>` . ([#701])
- **Feature**: Supported show mode and customizing time for `<Timeline>`. ([#666])
- **Bugfix**: Fixed sideEffects configuration. ([#706])
- **Bugfix**: Fixed when setting `sticky` and all options were selected to not render the menu. ([#710])

---

- **Feature**: 支持 `<Carousel>` 组件。 ([#716])
- **Feature**: 支持 Right-to-left。 ([#715])
- **Feature**: 导航相关组件添加 `renderItem` 属性。 ([#713])
- **Feature**: 在 `<Uploader>` 组件上，添加支持 `fileListVisible` 属性，默认为 `true`, 设置 `false` 则不显示文件列表。 ([#709])
- **Feature**: 在 `<Panel>`组件上，添加支持 `shaded`属性，用于显示阴影。 ([#677])
- **Feature**: 支持 `<Affix>` 组件。 ([#701])
- **Feature**: 在 `<Timeline>` 组件添加了更多显示模式。 ([#666])
- **Bugfix**: 修复 sideEffects 配置错误导致样式文件丢失的问题。 ([#706])
- **Bugfix**: 修复了当设置`sticky`并选择了所有选项的时候，不渲染菜单的问题。([#710])

[#716]: https://github.com/rsuite/rsuite/pull/716
[#715]: https://github.com/rsuite/rsuite/pull/715
[#713]: https://github.com/rsuite/rsuite/pull/713
[#710]: https://github.com/rsuite/rsuite/pull/710
[#709]: https://github.com/rsuite/rsuite/pull/709
[#706]: https://github.com/rsuite/rsuite/pull/706
[#701]: https://github.com/rsuite/rsuite/pull/701
[#677]: https://github.com/rsuite/rsuite/pull/677
[#666]: https://github.com/rsuite/rsuite/pull/666

# 4.0.5

> October 31, 2019

- **Improve**: Use context to refactor the logic of partial arguments. ([#695])
- **Improve**: Adjust the implementation logic of `preventOverflow` in all Picker. ([rsuite-utils#14])
- **Bugfix**: Fix `<Alert>` font color problem under dark theme. ([#697])
- **Bugfix**: Fix the problem that can't extends in the ie10 browser. ([#694])

---

- **Improve**: 使用 context API 重构部分子父组件传参的逻辑。 ([#695])
- **Improve**: 调整了所有 `Picker`组件的 `preventOverflow` 属性的实现方式。 ([rsuite-utils#14])
- **Bugfix**: 修复 `<Alert>` 组件在 dark 主题下字体颜色问题。 ([#697])
- **Bugfix**: 修复 ie10 兼容性问题，context API 在高价函数中未继承。 ([#694])

[#697]: https://github.com/rsuite/rsuite/pull/697
[#695]: https://github.com/rsuite/rsuite/pull/695
[#694]: https://github.com/rsuite/rsuite/pull/694
[rsuite-utils#14]: https://github.com/rsuite/rsuite-utils/pull/14

# 4.0.4

> October 17, 2019

- **Bugfix**: Fixed a problem with the `Dropdown` and `Button`, the `ButtonGroup` is vertically aligned. ([#682])
- **Bugfix**: Fixed an error when `CheckTreePicker` changed data. ([#681])
- **Bugfix**: Fixed an issue where `isOneOf` was not valid in `Schema.Types.StringType`. ([schema-typed#18])
- **Bugfix**: Fixed a misalignment of scroll position after `Table` data update. ([rsuite-table#100])
- **Bugfix**: [TS] Fixed an issue with type definition errors in `List`. ([#678])

---

- **Bugfix**: 修复了 `Dropdown`, `Button` 与 `ButtonGroup` 垂直对齐的问题。 ([#682])
- **Bugfix**: 修复了 `CheckTreePicker` 数据改变后出现错误的问题 ([#681])
- **Bugfix**: 修复了 `Schema.Types.StringType` 中的 `isOneOf` 方法无效的问题。 ([schema-typed#18])
- **Bugfix**: 修复了 `Table` 数据更新后滚动位置出现偏移。 ([rsuite-table#100])
- **Bugfix**: [TS] 修复了 `List` 中类型定义错误的问题。 ([#678])

[#682]: https://github.com/rsuite/rsuite/pull/682
[#681]: https://github.com/rsuite/rsuite/pull/681
[#678]: https://github.com/rsuite/rsuite/pull/678
[schema-typed#18]: https://github.com/rsuite/schema-typed/pull/18
[rsuite-table#100]: https://github.com/rsuite/rsuite-table/pull/100

# 4.0.3

> October 10, 2019

- **Feature**: Added support for Korean ([#675])
- **Improve**: The corresponding format date is displayed on the calendar according to different regional languages. ([#668])
- **Bugfix**: Add the babel plugin for `lodash` and `date-fns`. ([#674])
- **Bugfix**: Change the sm breakpoint to 480px in the Grid ([#671])
- **Bugfix**: Fix the precision of floating point arithmetic in Slider. ([#660])
- **Bugfix**: Fixed an issue with type definition errors in `List`. ([#676])

---

- **Feature**: 添加对韩语/朝鲜语的支持。 ([#675])
- **Improve**: 根据不同地域语言在日历上显示对应格式日期。([#668])
- **Bugfix**: 为 `lodash` 和 `date-fns` 添加 babel 插件,按需加载代码。 ([#674])
- **Bugfix**: 在 `<Grid>` 中将 `sm` 断点更改为 `480px`。 ([#671])
- **Bugfix**: 修复`<Slider>` 中浮点运算的精度问题。 ([#660])
- **Bugfix**: [TS] 修复了 `List` 中类型定义错误的问题。 ([#676])

[#676]: https://github.com/rsuite/rsuite/pull/676
[#675]: https://github.com/rsuite/rsuite/pull/675
[#674]: https://github.com/rsuite/rsuite/pull/674
[#671]: https://github.com/rsuite/rsuite/pull/671
[#668]: https://github.com/rsuite/rsuite/pull/668
[#660]: https://github.com/rsuite/rsuite/pull/660

# 4.0.2

> September 29, 2019

- **Feature**: Added language Traditional Chinese. ([#652])
- **Feature**: Fixed an issue where the CheckTreePicker and TreePicker keyboard operations were invalid.
- **Bugfix**: Fixed `<Cascader>` search styles ([#651])
- **Bugfix**: Fixed uncontrolled issues with `<Cascader>` and `<MultiCascader>` ([#650])
- **Bugfix**: Fixed `<Cascader>` crash while search RegExp special_characters. ([#648])
- **Bugfix**: Fixed `<Panel>` title font size.([#644])
- **Bugfix**: Fixed item styles when set active and disable. ([#641])
- **Bugfix**: Fixed `<Sidebar>` can't collapse on Firefox browser ([#638])
- **Bugfix**: Fixed `<Tree>` rendering error on the server side.([#637])
- **Bugfix**: Fixed `<CheckTreePicker>` setting root node uncheckable error.([#637])
- **Bugfix**: Fixed IE browser compatibility issue. ([#631],[#632])
- **Bugfix**: Fixed a rendering error when the column in the `<Table>` was null. ([rsuite/rsuite-table#99])
- **Bugfix**: Fixed a problem with scrolling white screen after changing height on `<Table>`. ([rsuite/rsuite-table#97])
- **Bugfix**: [TS] Fixed type definitions for missing `Notification` and `Alert`. ([#633])
- **Bugfix**: [TS] Fixed `List` component not exported. ([#625])

---

- **Feature**: 添加组件对繁体中文的支持。 ([#652])
- **Bugfix**: 修复了 CheckTreePicker 和 TreePicker 键盘操作无效的问题。
- **Bugfix**: 修复了 `<Cascader>` 搜索列表样式问题。 ([#651])
- **Bugfix**: 修复了 `<Cascader>` 和 `<MultiCascader>` 不受控的问题。 ([#650])
- **Bugfix**: 修复了 `<Cascader>` 搜索正则表达元字符报错的问题。 ([#648])
- **Bugfix**: 修复了 `<Panel>` 标题字体大小与设计不符的问题。([#644])
- **Bugfix**: 修复了选项在设置 `active` 或者 `disable` 后的样式问题。 ([#641])
- **Bugfix**: 修复了 `<Sidebar>`在 Firefox 浏览器不能收缩的问题。 ([#638])
- **Bugfix**: 修复了 `<Tree>` 在服务端渲染报错的问。([#637])
- **Bugfix**: 修复了 `<CheckTreePicker>` 设置根节点不可点击后出现的渲染问题。([#637])
- **Bugfix**: 修复了 IE 浏览器兼容性问题。 ([#631],[#632])
- **Bugfix**: 修复了 `<Table>` 的列设置中存在 `null` 时候，导致的渲染出错问题。 ([rsuite/rsuite-table#99])
- **Bugfix**: 修复了 `<Table>` 在改变高度后出现白屏的问题。 ([rsuite/rsuite-table#97])
- **Bugfix**: [TS] 修复了 `Notification` 和 `Alert` 中缺少的方法定义。 ([#633])
- **Bugfix**: [TS] 修复了 `List` 组件找不到定义。 ([#625])

[#653]: https://github.com/rsuite/rsuite/pull/653
[#652]: https://github.com/rsuite/rsuite/pull/652
[#651]: https://github.com/rsuite/rsuite/pull/651
[#650]: https://github.com/rsuite/rsuite/pull/650
[#648]: https://github.com/rsuite/rsuite/pull/648
[#644]: https://github.com/rsuite/rsuite/pull/644
[#641]: https://github.com/rsuite/rsuite/pull/641
[#638]: https://github.com/rsuite/rsuite/pull/638
[#637]: https://github.com/rsuite/rsuite/pull/637
[#633]: https://github.com/rsuite/rsuite/pull/633
[#632]: https://github.com/rsuite/rsuite/pull/632
[#631]: https://github.com/rsuite/rsuite/pull/631
[#625]: https://github.com/rsuite/rsuite/pull/625
[rsuite/rsuite-table#99]: https://github.com/rsuite/rsuite-table/pull/99
[rsuite/rsuite-table#97]: https://github.com/rsuite/rsuite-table/pull/97

# 4.0.1

> September 19, 2019

- **Feature**: Support `defaultCalendarValue` on `<DateRangePicker>` ([#610])
- **Improve**: Add ARIA for accessibility ([#612],[#613])
- **Improve**: Use grab cursors for sortable List.Item ([#617])
- **Bugfix**: Fixed ESM build error ([#611])
- **Bugfix**: Fixed component not re-rendered after `sortType` update on `<Table>`. ([rsuite/rsuite-table#96])
- **Bugfix**: Fixed the position of the scroll bar when the height of the `<Table>` changes. ([rsuite/rsuite-table#95])
- **Bugfix**: Fixed validation of merged cells for custom children in `<Table>` ([rsuite/rsuite-table#94])
- **Bugfix**: Fixed unable to find node on an unmounted component in `<Dropdown>` ([rsuite/rsuite-utils@f205799])

---

- **Feature**: `<DateRangePicker>` 支持 `defaultCalendarValue` 属性。([#610])
- **Improve**: 为可访问性添加 ARIA。 ([#612],[#613])
- **Improve**: 调整 List.Item 拖拽时候的光标为 grab。 ([#617])
- **Bugfix**: 修复 ESM 构建时候报错。 ([#611])
- **Bugfix**: 修复在 `<Table>` 上 `sortType` 更新后没有重新渲染的组件。 ([rsuite/rsuite-table#96])
- **Bugfix**: 修复 `<Table>` 高度变化后更新滚动条位置 ([rsuite/rsuite-table#95])
- **Bugfix**: 修复 `<Table>` 中自定义 `children` 后，合并单元格的校验逻辑 ([rsuite/rsuite-table#94])
- **Bugfix**: 修复 `<Dropdown>` 中报错"无法在已卸载组件上找到节点"([rsuite/rsuite-utils@f205799])

[#617]: https://github.com/rsuite/rsuite/pull/617
[#613]: https://github.com/rsuite/rsuite/pull/613
[#612]: https://github.com/rsuite/rsuite/pull/612
[#611]: https://github.com/rsuite/rsuite/pull/611
[#610]: https://github.com/rsuite/rsuite/pull/610
[rsuite/rsuite-table#96]: https://github.com/rsuite/rsuite-table/pull/96
[rsuite/rsuite-table#95]: https://github.com/rsuite/rsuite-table/pull/95
[rsuite/rsuite-table#94]: https://github.com/rsuite/rsuite-table/pull/94
[rsuite/rsuite-utils@f205799]: https://github.com/rsuite/rsuite-utils/commit/f205799796595d78dff990b0f740c8c4a9e3d581

# 4.0.0

> September 9, 2019

- **Feature**: Add `<Placeholder>`. ([#418],[#420],[#423])
- **Feature**: Add `<List>`. ([#451])
- **Feature**: Add `<Calendar>`. ([#492])
- **Feature**: Add `<Avatar>`.([#486])
- **Feature**: Add `<Badge>`.([#484])
- **Feature**: Support `size` on all `Picker`.([#494])
- **Feature**: Support dark theme.([#544])
- **Feature**: Support for asynchronous validation in `<Form>`, based on Schema. ([#570])
- **Feature**: Support for expandItemValues on `<TreePicker>` and `<CheckTreePicker>`.([#569])
- **Feature**: Support `readOnly` prop on `<FormControl>`. ([#432])
- **Feature**: Support `plaintext` prop on `<FormControl>`. ([#448],[#449])
- **Feature**: `<Whisper>` and all `Picker` components support the `preventOverfow` property to prevent overflow. ([#443])
- **Improve**: Adjust swatch algorithm to adjust font color contrast. ([#433])
- **Improve**: Migrate from Flow to Typescript. ([#531])
- **Improve**: Support showWeekNumbers on <DatePicker> and <DateRangePicker>. ([#526] @viart)
- **Breaking**: Adjust the value of `<Whisper>` with all `Picker` components `placement` properties.([#443])
- **Bugfix**: Fixed an issue where the `<Uploader>` upload file was larger than 1GB.([#536])
- **Bugfix**: Fixed compatibility issue with `<Input>` on IE browser display. ([#507])
- **Bugfix**: Fixed `<InputPicker>` on the keyboard Delete key will clear the input worthy question. ([#577])
- **Bugfix**: Fixed an issue where `<Dropdown>` set `toggleComponentClass={Button}` background style error.([#525])
- **Bugfix**: Fixed an issue where styles were missing when introduced on demand.([#567])
- **Bugfix**: Fixed an issue where `<DatePicker>` disabled day and inactive month were inconsistent.([#595])
- **Bugfix**: Fixed an issue where the scrollbar position was not updated after the `<Table>` data was updated.([#table-92])
- **Bugfix**: Fixed `<Table>` property `expandedRowKeys` The update value is not controlled. ([#table-90])
- **Bugfix**: Fixed callback `<Table>` property `onRowClick`'s callback parameter is missing `event`. ([#table-89])
- **Bugfix**: Fixed support for `focus` events by the `<Form>` component.([#566])
- **Bugfix**: Modified the default separator for `<Breadcrumb>`.([#543])
- **Bugfix**: Fixed an issue where `<Slider>` did not update the position of the handle after the change from hidden to display state.([#542])

---

- **Feature**: 支持 `<Placeholder>` 组件。 ([#418],[#420],[#423])
- **Feature**: 支持 `<List>` 组件。 ([#451])
- **Feature**: 支持 `<Calendar>` 组件。([#492])
- **Feature**: 支持 `<Avatar>` 组件。([#486])
- **Feature**: 支持 `<Badge>` 组件。([#484])
- **Feature**: `<Picker>` 组件支持 `size` 属性。([#494])
- **Feature**: 支持 dark 主题。([#544])
- **Feature**: `<Form>`组件基于 Schema 支持异步校验。([#570])
- **Feature**: `<TreePicker>` 与 `<CheckTreePicker>` 支持 expandItemValues 属性。([#569])
- **Feature**: `<FormControl>` 组件支持 `readOnly` 属性。 ([#432])
- **Feature**: `<FormControl>` 组件支持 `plaintext` 属性。 ([#448],[#449])
- **Feature**: `<Whisper>` 组件与所有的 `Picker` 组件支持 `preventOverfow` 属性，防止溢出。
- **Improve**: 调整色板算法，调整字体颜色对比度。 ([#433])
- **Improve**: 从 Flow 迁移到 Typescript。 ([#531])
- **Improve**: `<DatePicker>`和`<DateRangePicker>`组件支持 showWeekNumbers 属性，显示周数 。([#526] @viart)
- **Breaking**: 调整 `<Whisper>` 组件与所有的 `<Picker>` 组件 `placement` 属性的值。([#443])
- **Bugfix**: 修复了 `<Uploader>` 上传文件大于 1GB 显示问题。([#536])
- **Bugfix**: 修复了 `<Input>` 在 IE 浏览器显示上的兼容性问题。 ([#507])
- **Bugfix**: 修复了 `<InputPicker>` 在键盘 Delete 键会清除输入值得问题。([#577])
- **Bugfix**: 修复了 `<Dropdown>` 设置 `toggleComponentClass={Button}` 背景样式错误的问题。([#525])
- **Bugfix**: 修复了按需引入时候样式缺失的问题。 ([#567])
- **Bugfix**: 修复了 `<DatePicker>` 禁用日与禁用月不一致的问题。([#595])
- **Bugfix**: 修复了 `<Table>` 数据更新后滚动条位置不更新的问题。([#table-92])
- **Bugfix**: 修复了 `<Table>` 属性 `expandedRowKeys` 更新值不受控。 ([#table-90])
- **Bugfix**: 修复了 `<Table>` 属性 `onRowClick` 的回调参数缺少 `event`。 ([#table-89])
- **Bugfix**: 修复了 `<Form>` 组件对 `focus` 事件的支持。([#566])
- **Bugfix**: 修改了 `<Breadcrumb>` 的默认分隔符。([#543])
- **Bugfix**: 修复了 `<Slider>` 在从隐藏到显示状态变化后，手柄的位置不更新的问题。([#542])

[#595]: https://github.com/rsuite/rsuite/pull/595
[#577]: https://github.com/rsuite/rsuite/pull/577
[#570]: https://github.com/rsuite/rsuite/pull/570
[#569]: https://github.com/rsuite/rsuite/pull/569
[#567]: https://github.com/rsuite/rsuite/pull/567
[#566]: https://github.com/rsuite/rsuite/pull/566
[#544]: https://github.com/rsuite/rsuite/pull/544
[#543]: https://github.com/rsuite/rsuite/pull/543
[#542]: https://github.com/rsuite/rsuite/pull/542
[#536]: https://github.com/rsuite/rsuite/pull/536
[#525]: https://github.com/rsuite/rsuite/pull/525
[#507]: https://github.com/rsuite/rsuite/pull/507
[#494]: https://github.com/rsuite/rsuite/pull/494
[#492]: https://github.com/rsuite/rsuite/pull/492
[#486]: https://github.com/rsuite/rsuite/pull/486
[#484]: https://github.com/rsuite/rsuite/pull/484
[#451]: https://github.com/rsuite/rsuite/pull/451
[#449]: https://github.com/rsuite/rsuite/pull/449
[#448]: https://github.com/rsuite/rsuite/pull/448
[#443]: https://github.com/rsuite/rsuite/pull/443
[#433]: https://github.com/rsuite/rsuite/pull/433
[#432]: https://github.com/rsuite/rsuite/pull/432
[#423]: https://github.com/rsuite/rsuite/pull/423
[#420]: https://github.com/rsuite/rsuite/pull/420
[#418]: https://github.com/rsuite/rsuite/pull/418
[#table-92]: https://github.com/rsuite/rsuite-table/pull/92
[#table-90]: https://github.com/rsuite/rsuite-table/pull/90
[#table-89]: https://github.com/rsuite/rsuite-table/pull/89
