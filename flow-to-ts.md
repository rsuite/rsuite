# flow 迁移到 Typescript 注意事项：

* 创建一个组件文件夹把相关文件放在访问一个文件夹中
* 为组件添加 static propTypes , 参考 Button 组件
* 把组件中使用 ref 的地方修改为 React.createRef(), 参考 \_picker/DropdownMenuGroup.tsx
* 所有使用了 <PickerToggleTrigger> 的 Picker , 把 innerRef 参数 改为 ref
* 删除文件中关于 @flow 相关的注释
