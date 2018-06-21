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
* **Bugfix**: `<textarea />` in form-control will produce a whitesapce ([#65])
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

* **Bugfix**: Set all picker display inline-block ([#35])
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
