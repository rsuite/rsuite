### 异步校验

在某些条件下，我们需对数据进行异步校验，比如校验用户名是否重名，下面一个示例将说明异步校验的处理。

- 在需要异步校验的 `<FormControl>` 上设置 `checkAsync` 属性。
- 异步校验的验证规则通过 `schema` 的 `addRule` 方法添加一个返回值为 Promise 的对象。
- 通过调用 `<Form>` 的 `checkAsync` 与 `checkForFieldAsync` 的访问，可以手动触发校验。

<!--start-code-->

```js
const { StringType, NumberType } = Schema.Types;

function asyncCheckUsername(name) {
  return new Promise(resolve => {
    setTimeout(() => {
      if (name === 'abc') {
        resolve(false);
      } else {
        resolve(true);
      }
    }, 500);
  });
}

const model = Schema.Model({
  name: StringType()
    .addRule((value, data) => {
      return asyncCheckUsername(value);
    }, 'Duplicate username')
    .isRequired('This field is required.')
});

class CheckForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        name: ''
      },
      formError: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    const { formValue } = this.state;

    this.form.checkAsync().then(result => {
      console.log(result);
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
          <FormGroup>
            <ControlLabel>Username </ControlLabel>
            <FormControl checkAsync name="name" />
          </FormGroup>

          <ButtonToolbar>
            <Button appearance="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
          </ButtonToolbar>
        </Form>
      </div>
    );
  }
}

ReactDOM.render(<CheckForm />);
```

<!--end-code-->
