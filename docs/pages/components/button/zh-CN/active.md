### 激活状态

<!--start-code-->
```js
const instance = (
  <ButtonToolbar>
    <Button appearance="default" active>Default</Button>
    <Button appearance="primary" active>Primary</Button>
    <Button appearance="link" active>Link</Button>
    <Button appearance="subtle" active>Subtle</Button>
    <Button appearance="ghost" active>Ghost</Button>
    <IconButton icon={<Icon icon="star" />} active >Icon Button</IconButton>
  </ButtonToolbar>
);
ReactDOM.render(instance);
```
<!--end-code-->