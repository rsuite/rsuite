### 自定义表单组件

所有的 Data Entry 相关的组件都可以在表单中使用，例如 `Checkbox`,`SelectPicker`,`Slider` 等等。 但是需要通过 `FormControl` 组件进行数据管理，实现与 `Form` 组件的数据关联。

- FormControl 用于绑定 Form 中的数据字段，通过 `name` 属性和 Schema.Model 对象的 `key` 对应。
- FormControl 默认是个 `Input` 组件，可以通过 `accepter` 设置需要的数据录入组件。

<!--start-code-->

```js
const { ArrayType, StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  skills: ArrayType()
    .minLength(2, 'Please select at least 2 types of Skills.')
    .isRequired('This field is required.'),
  status: ArrayType()
    .minLength(2, 'Please select at least 2 types of Status.')
    .isRequired('This field is required.'),
  level: NumberType().min(5, 'This field must be greater than 5')
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

class CustomFieldForm extends React.Component {
  constructor(props) {
    super(props);
    const formValue = {
      number: 10,
      skills: ['Node.js'],
      browser: 'Chrome',
      status: ['open'],
      level: 1,
      level2: 1,
      createDate: new Date()
    };
    this.state = {
      formValue: formValue,
      formError: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    const { formValue } = this.state;
    if (!this.form.check()) {
      Alert.error('Error');
      return;
    }
    Alert.success('Success');
  }
  render() {
    const { formError, formValue } = this.state;

    return (
      <div>
        <JSONView formValue={formValue} formError={formError} />
        <Form
          ref={ref => (this.form = ref)}
          onChange={formValue => {
            console.log(formValue);
            this.setState({ formValue });
          }}
          onCheck={formError => {
            console.log(formError, 'formError');
            this.setState({ formError });
          }}
          formValue={formValue}
          model={model}
        >
          <CustomField
            name="number"
            label="Number"
            accepter={InputNumber}
            error={formError.number}
          />

          <CustomField
            name="skills"
            label="Skills"
            accepter={CheckboxGroup}
            error={formError.skills}
            inline
          >
            <Checkbox value={'Node.js'}>Node.js</Checkbox>
            <Checkbox value={'CSS3'}>CSS3</Checkbox>
            <Checkbox value={'Javascript'}>Javascript</Checkbox>
            <Checkbox value={'HTML5'}>HTML5</Checkbox>
          </CustomField>

          <CustomField
            name="browser"
            label="Browser"
            accepter={RadioGroup}
            error={formError.browser}
            inline
          >
            <Radio value={'Chrome'}>Chrome</Radio>
            <Radio value={'FireFox'}>FireFox</Radio>
            <Radio value={'IE'}>IE</Radio>
          </CustomField>

          <CustomField
            name="status"
            label="Status"
            accepter={CheckPicker}
            error={formError.status}
            style={{ display: 'inline-block', width: 200 }}
            data={[
              { label: 'Todo', value: 'todo' },
              { label: 'Open', value: 'open' },
              { label: 'Close', value: 'close' },
              { label: 'Error', value: 'error' },
              { label: 'Processing', value: 'processing' },
              { label: 'Done', value: 'done' }
            ]}
          />

          <CustomField
            accepter={Slider}
            min={0}
            max={20}
            name="level"
            label="Level"
            style={{ width: 200, margin: '10px 0' }}
            errorMessage={formError.level}
          />

          <CustomField
            accepter={DatePicker}
            name="createDate"
            label="Create Date"
            errorMessage={formError.createDate}
          />

          <FormGroup>
            <Button appearance="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

ReactDOM.render(<CustomFieldForm />);
```

<!--end-code-->

> 例如: `<FormControl accepter={CheckboxGroup} />` , FormControl 会渲染一个 `<CheckboxGroup>` 组件, 同时与 Form 中的 Schema.Model 实例绑定。以下示例中的富文本编辑器，用的是 [react-quill](https://github.com/zenoamaro/react-quill)
