# V3 upgrade to V4 considerations

There are some breaking changes to upgrading to V4 that require some tweaking.

## 1.Directory changes introduced by style files

Because the Dark theme has been added to V4, the directory structure has been adjusted.

Import directory changes for `less` files:

```diff
- import 'rsuite/styles/less/index.less';
+ import 'rsuite/lib/styles/index.less';  // or 'rsuite/lib/styles/themes/default/index.less'
```

Import directory changes for css files:

```diff
- import 'rsuite/dist/styles/rsuite.css';
+ import 'rsuite/dist/styles/rsuite-default.css';
```

## 2.Dropdown, Whisper, all Picker attribute placement value changes

```diff
type Placement4 = 'top' | 'bottom' | 'right' | 'left';
type Placement8 =
- | 'bottomLeft'
+ | 'bottomStart'
- | 'bottomRight'
+ | 'bottomEnd'
- | 'topLeft'
+ | 'topStart'
- | 'topRight'
+ | 'topEnd'
- | 'leftTop'
+ | 'leftStart'
- | 'leftBottom'
+ | 'leftEnd'
- | 'rightTop'
+ | 'rightStart'
- | 'rightBottom';
+ | 'rightEnd';
type PlacementAuto =
  | 'auto'
- | 'autoVerticalLeft'
+ | 'autoVerticalStart'
- | 'autoVerticalRight'
+ | 'autoVerticalEnd'
- | 'autoHorizontalTop'
+ | 'autoHorizontalStart'
- | 'autoHorizontalBottom';
+ | 'autoHorizontalEnd';
```

## 3.Priority change for addRule method calls in Schema

**3.0 version call priority**

- `addRule`
- `isRequired`
- Predefined verification method

**Modified version of the 4.0 version**

- `isRequired`
- Other predefined validation methods and `addRule` are executed in sequence

If you want to revert to the previous priority, `addRule` adds a third parameter to adjust the priority, the default is `false`, if set to `true` then the highest priority. Will be executed first.

## 4.TreePicker and CheckTreePicker discard the expandAll property

The `TreePicker` and the `CheckTreePicker` deprecated the `expandAll` property and added the `expandItemValues` ​​property to expand the specified node.

## 5.CheckTreePicker onSelect method parameter change

```diff
- onSelect (activeNode:DataItemType, layer:number, values:string[]) => void
+ onSelect (activeNode: any, value: any, event: React.SyntheticEvent<any>) => void;
```

## 6.Upgrade `babel-preset-rsuite`

Due to the adjustments on the catalog, if the on-demand loading tool `babel-preset-rsuite` is used in the project, you need to upgrade to the `4.0.0` version.

```
npm i babel-preset-rsuite@4.0.0
```
