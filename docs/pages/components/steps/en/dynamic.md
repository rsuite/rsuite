### Dynamic

<!--start-code-->

```js
class DynamicSteps extends React.Component {
  constructor() {
    super();
    this.state = {
      step: 0
    };
    this.decline = this.decline.bind(this);
    this.increase = this.increase.bind(this);
  }
  changePercent(nextstep) {
    const step = nextstep < 0 ? 0 : nextstep > 3 ? 3 : nextstep;
    this.setState({
      step
    });
  }
  decline() {
    this.changePercent(this.state.step - 1);
  }
  increase() {
    this.changePercent(this.state.step + 1);
  }
  render() {
    const { step } = this.state;
    return (
      <div>
        <Steps current={step}>
          <Steps.Item title="Finished" description="Description" />
          <Steps.Item title="In Progress" description="Description" />
          <Steps.Item title="Waiting" description="Description" />
          <Steps.Item title="Waiting" description="Description" />
        </Steps>
        <hr />
        <ButtonGroup>
          <Button onClick={this.decline} disabled={step === 0}>
            Previous
          </Button>
          <Button onClick={this.increase} disabled={step === 3}>
            Next
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

ReactDOM.render(<DynamicSteps />);
```

<!--end-code-->
