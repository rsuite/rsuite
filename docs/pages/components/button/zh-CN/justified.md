### 等宽

按钮在按钮组中横向布局，并且等宽。

<!--start-code-->

```js
const CustomButtonGroup = ({ appearance }) => (
  <ButtonGroup style={{ marginTop: 12 }} justified>
    <Button appearance={appearance}>Top</Button>
    <Button appearance={appearance}>Middle</Button>
    <Button appearance={appearance}>Bottom</Button>
  </ButtonGroup>
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
