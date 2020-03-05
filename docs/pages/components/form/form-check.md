### 数据模型

表单校验需要用到 `<Form>`, `<FormControl>` 组件， 和 `Schema.Model` 。

- `<Form>` 定义一个表单，可以给表单设置 `value` 和 `model`，`model` 是由 `Schema.Model` 创建的数据模型。
- `<FormControl>` 定义一个 Filed，通过 `name` 属性和 `Schema.Model` 对象的 `key` 对应, 详细参考： 自定义表单组件。
- `Schema.Model` 定义一个数据模型，详细使用参考 [schema](/components/schema)。
- 自定义触发校验： `<Form>` 实例提供 [check()](#methods) 与 [checkForField()](#methods) 方法，分别用于触发表单校验和字段校验。

<!--start-code-->

```js
const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
  email: StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('This field is required.'),
  age: NumberType('Please enter a valid number.').range(
    18,
    30,
    'Please enter a number from 18 to 30'
  ),
  password: StringType().isRequired('This field is required.'),
  verifyPassword: StringType()
    .addRule((value, data) => {
      console.log(data);

      if (value !== data.password) {
        return false;
      }

      return true;
    }, 'The two passwords do not match')
    .isRequired('This field is required.')
});

class TextField extends React.PureComponent {
  render() {
    const { name, label, accepter, ...props } = this.props;
    return (
      <FormGroup>
        <ControlLabel>{label} </ControlLabel>
        <FormControl name={name} accepter={accepter} {...props} />
      </FormGroup>
    );
  }
}

class CheckForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        name: '',
        email: '',
        age: '',
        password: '',
        verifyPassword: ''
      },
      formError: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckEmail = this.handleCheckEmail.bind(this);
  }
  handleSubmit() {
    const { formValue } = this.state;
    if (!this.form.check()) {
      console.error('Form Error');
      return;
    }
    console.log(formValue, 'Form Value');
  }

  handleCheckEmail() {
    this.form.checkForField('email', checkResult => {
      console.log(checkResult);
    });
  }
  render() {
    const { formError, formValue } = this.state;

    return (
      <div>
        <JSONView formValue={formValue} formError={formError} />
        <Form
          ref={ref => (this.form = ref)}
          onChange={formValue => {
            this.setState({ formValue });
          }}
          onCheck={formError => {
            this.setState({ formError });
          }}
          formValue={formValue}
          model={model}
        >
          <TextField name="name" label="Username" />
          <TextField name="email" label="Email" />
          <TextField name="age" label="Age" />
          <TextField name="password" label="Password" type="password" />

          <TextField name="verifyPassword" label="Verify password" type="password" />

          <ButtonToolbar>
            <Button appearance="primary" onClick={this.handleSubmit}>
              Submit
            </Button>

            <Button onClick={this.handleCheckEmail}>Check Email</Button>
          </ButtonToolbar>
        </Form>
      </div>
    );
  }
}

ReactDOM.render(<CheckForm />);
```

<!--end-code-->
