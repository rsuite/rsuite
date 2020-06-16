### Radio 组 - Picker

<!--start-code-->

```js
const styles = {
  radioGroupLabel: {
    padding: '8px 2px 8px 10px',
    display: 'inline-block',
    verticalAlign: 'middle'
  }
};

const instance = (
  <FormGroup controlId="radioList">
    <RadioGroup name="radioList" inline appearance="picker" defaultValue="A">
      <Radio value="A">Item A</Radio>
      <Radio value="B">Item B</Radio>
      <Radio value="C">Item C</Radio>
      <Radio value="D" disabled>
        Item D
      </Radio>
    </RadioGroup>
    <hr />
    <RadioGroup name="radioList" inline appearance="picker" defaultValue="A">
      <span style={styles.radioGroupLabel}>状态: </span>
      <Radio value="A">全部</Radio>
      <Radio value="B">启用</Radio>
      <Radio value="C">停用</Radio>
    </RadioGroup>
  </FormGroup>
);
ReactDOM.render(instance);
```

<!--end-code-->
