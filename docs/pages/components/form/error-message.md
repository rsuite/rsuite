### 错误消息

错误消息提醒可以通过 2 种方式设定：

* `<FormControl>` 组件上传递一个 `errorMessage` 属性设置错误信息，通过 `errorPlacement`设置错误信息显示的位置 。
* 自定义一个提示信息。

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

class ErrorMessageDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorPlacement: 'bottomStart',
      showError: false
    };
  }
  render() {
    const { showError, errorPlacement } = this.state;
    const errorMessage = showError ? 'This field is required' : null;
    return (
      <div>
        <Form>
          <FormGroup>
            <FormControl
              name="email"
              placeholder="Email"
              errorMessage={errorMessage}
              errorPlacement={errorPlacement}
            />
          </FormGroup>

          <FormGroup>
            <FormControl name="age" placeholder="Custom error messages" />
            <div
              style={{
                display: showError ? 'block' : 'none',
                color: 'red',
                marginTop: 6
              }}
            >
              {errorMessage}
            </div>
          </FormGroup>
        </Form>
        <hr />
        Show Error:{' '}
        <Toggle
          onChange={checked => {
            this.setState({ showError: checked });
          }}
          checked={showError}
        />
        <SelectPicker
          value={errorPlacement}
          placeholder="errorPlacement"
          data={errorPlacementData}
          cleanable={false}
          onChange={value => {
            this.setState({ errorPlacement: value });
          }}
        />
      </div>
    );
  }
}

ReactDOM.render(<ErrorMessageDemo />);
```

<!--end-code-->
