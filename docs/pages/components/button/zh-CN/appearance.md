### 外观

`appearance` 属性设置按钮外观:

* 'default'(默认值) 默认按钮。
* 'primary' 强调按钮，有引导作用的按钮。
* 'link' 像链接一样的按钮。
* 'subtle' 弱化的按钮。
* 'ghost' 幽灵按钮，背景透明，放带有背景元素上的按钮。

<!--start-code-->

```js
const instance = (
  <ButtonToolbar>
    <Button appearance="default">Default</Button>
    <Button appearance="primary">Primary</Button>
    <Button appearance="link">Link</Button>
    <Button appearance="subtle">Subtle</Button>
    <Button appearance="ghost">Ghost</Button>
  </ButtonToolbar>
);
ReactDOM.render(instance);
```

<!--end-code-->
