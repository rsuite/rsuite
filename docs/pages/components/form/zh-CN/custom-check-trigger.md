### 自定义触发校验

在某些情况下不需要对表单数据进行实时校验，可以自定义控制校验的方式，配置 `checkTrigger` 参数。

`checkTrigger` 默认值是 `'change'`， 选项包括：

- `'change'` : 数据改变 `onChange` 的时候会触发数据校验。
- `'blur'` : 组件失去焦点触发校验
- `'none'` : 不触发校验，只会在调用 `<Form>` 的 `check()` 方法的时候才会校验

在 `<Form>` 和 `<FormControl>` 组件上都有 `checkTrigger` 属性， 在 `<Form>` 中可以定义整个表单的校验方式，如果有个表单组件需要单独处理校验方式，可以在 `<FormControl>` 上进行设置。

<!--start-code-->

```js
const model = Schema.Model({
  name: Schema.Types.StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('This field is required.')
});

class CustomField extends React.PureComponent {
  render() {
    const { name, message, label, accepter, error, ...props } = this.props;
    return (
      <FormGroup className={error ? 'has-error' : ''}>
        <ControlLabel>{label} </ControlLabel>
        <FormControl
          name={name}
          accepter={accepter}
          errorMessage={error}
          {...props}
        />
        <HelpBlock>{message}</HelpBlock>
      </FormGroup>
    );
  }
}

class CustomCheckForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkTrigger: 'change',
      formValue: {},
      formError: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { formValue } = this.state;
    if (!this.form.check()) {
      console.error('Form Error');
      return;
    }
    console.log(formValue, 'Form Value');
  }

  render() {
    const { formError, formValue, checkTrigger } = this.state;
    return (
      <div>
        <JSONView formValue={formValue} formError={formError} />
        checkTrigger:
        <RadioGroup
          value={checkTrigger}
          onChange={checkTrigger => {
            this.setState({
              checkTrigger,
              formError: {}
            });
          }}
        >
          <Radio value="blur">blur</Radio>
          <Radio value="change">change</Radio>
          <Radio value="none">none</Radio>
        </RadioGroup>
        <hr />
        <Form
          ref={ref => (this.form = ref)}
          onChange={formValue => {
            this.setState({ formValue });
          }}
          onCheck={formError => {
            this.setState({ formError });
          }}
          formError={formError}
          formDefaultValue={formValue}
          model={model}
          checkTrigger={checkTrigger}
        >
          <CustomField
            name="name"
            label="邮箱"
            error={formError.name}
            message="请输入邮箱地址"
          />
          <Button appearance="primary" onClick={this.handleSubmit}>
            提交
          </Button>
        </Form>
      </div>
    );
  }
}

ReactDOM.render(<CustomCheckForm />);
```

<!--end-code-->

> 还可以设置校验延迟时间 `checkDelay`, 默认值为 `500` 毫秒。
