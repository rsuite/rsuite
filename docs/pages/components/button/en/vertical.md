### Vertical ButtonGroup

<!--start-code-->

```js
const CustomButtonGroup = ({ appearance }) => (
  <ButtonGroup vertical>
    <Button appearance={appearance}>Top</Button>
    <Button appearance={appearance}>Middle</Button>
    <Button appearance={appearance}>Bottom</Button>
  </ButtonGroup>
);

const instance = (
  <ButtonToolbar>
    <CustomButtonGroup />
    <CustomButtonGroup appearance="primary" />
    <CustomButtonGroup appearance="link" />
    <CustomButtonGroup appearance="subtle" />
    <CustomButtonGroup appearance="ghost" />
  </ButtonToolbar>
);
ReactDOM.render(instance);
```

<!--end-code-->
