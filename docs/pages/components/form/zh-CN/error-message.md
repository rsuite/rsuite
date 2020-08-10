### 错误消息

错误消息提醒可以通过 2 种方式设定：

- `<Form.Control>` 组件上传递一个 `errorMessage` 属性设置错误信息，通过 `errorPlacement`设置错误信息显示的位置 。
- 自定义一个提示信息。

<!--start-code-->

```js
const errorPlacementData = [
  { label: 'bottomStart', value: 'bottomStart' },
  { label: 'bottomEnd', value: 'bottomEnd' },
  { label: 'topStart', value: 'topStart' },
  { label: 'topEnd', value: 'topEnd' },
  { label: 'leftStart', value: 'leftStart' },
  { label: 'rightStart', value: 'rightStart' },
  { label: 'leftEnd', value: 'leftEnd' },
  { label: 'rightEnd', value: 'rightEnd' }
];

const errorStyles = errorVisible => {
  return { display: errorVisible ? 'block' : 'none', color: 'red', marginTop: 6 };
};

const App = () => {
  const [errorVisible, setErrorVisible] = React.useState(false);
  const [errorPlacement, setErrorPlacement] = React.useState('bottomStart');
  const errorMessage = errorVisible ? 'This field is required' : null;

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Control
            name="input-2"
            placeholder="Form.Control"
            errorMessage={errorMessage}
            errorPlacement={errorPlacement}
          />
        </Form.Group>
        <Form.Group>
          <InputGroup inside>
            <Form.Control
              name="input-1"
              placeholder="Form.Control in InputGroup"
              errorMessage={errorMessage}
              errorPlacement={errorPlacement}
            />
            <InputGroup.Addon>
              <Icon icon="avatar" />
            </InputGroup.Addon>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Control name="input-3" placeholder="Custom error messages" />
          <div style={errorStyles(errorVisible)}>{errorMessage}</div>
        </Form.Group>
      </Form>
      <hr />
      <div className={'rs-form-control-wrapper'} style={{ width: 300 }}>
        <Input placeholder="Custom error messages" />
        <Form.ErrorMessage show={errorVisible} placement={errorPlacement}>
          {errorMessage}
        </Form.ErrorMessage>
      </div>
      <hr />
      Show Error: <Toggle onChange={setErrorVisible} checked={errorVisible} />
      <SelectPicker
        value={errorPlacement}
        placeholder="errorPlacement"
        data={errorPlacementData}
        cleanable={false}
        onChange={setErrorPlacement}
      />
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
