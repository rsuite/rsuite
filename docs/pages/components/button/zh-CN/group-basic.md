### 按钮组

<!--start-code-->

```js
const CustomButtonGroup = ({ appearance }) => (
  <ButtonToolbar>
    <ButtonGroup>
      <Button appearance={appearance}>Left</Button>
      <Button appearance={appearance}>Center</Button>
      <Button appearance={appearance}>Right</Button>
    </ButtonGroup>
  </ButtonToolbar>
);

const instance = (
  <div>
    <CustomButtonGroup />
    <CustomButtonGroup appearance="primary" />
    <CustomButtonGroup appearance="link" />
    <CustomButtonGroup appearance="subtle" />
    <CustomButtonGroup appearance="ghost" />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
