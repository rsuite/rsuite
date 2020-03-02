### Asynchronous check

Under certain conditions, we need to perform asynchronous verification on the data, such as verifying whether the username is duplicated. The following example will illustrate the processing of asynchronous verification.

- Set the `checkAsync` property on `<FormControl>` that requires asynchronous validation.
- The validation rules for asynchronous validation add an object with a return value of Promise via the `addRule` method of `schema`.
- The check can be triggered manually by calling `checkAsync` and `checkForFieldAsync` of `<Form>`.

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
