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
