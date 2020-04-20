### 动态展示

<!--start-code-->

```js
const { Circle, Line } = Progress;

class DynamicProgress extends React.Component {
  constructor() {
    super();
    this.state = {
      status: null,
      percent: 30,
      color: '#3385ff'
    };
    this.decline = this.decline.bind(this);
    this.increase = this.increase.bind(this);
  }
  changePercent(nextPercent) {
    const percent = nextPercent < 0 ? 0 : nextPercent > 100 ? 100 : nextPercent;
    this.setState({
      percent,
      status: percent === 100 ? 'success' : null,
      color: percent === 100 ? '#52c41a' : '#3385ff'
    });
  }
  decline() {
    this.changePercent(this.state.percent - 10);
  }
  increase() {
    this.changePercent(this.state.percent + 10);
  }
  render() {
    const { percent, color, status } = this.state;
    return (
      <div>
        <ButtonGroup>
          <Button onClick={this.decline}>-</Button>
          <Button onClick={this.increase}>+</Button>
        </ButtonGroup>
        <hr />
        <Line percent={percent} strokeColor={color} status={status} />
        <div style={{ width: 120, marginTop: 10 }}>
          <Line vertical percent={percent} strokeColor={color} status={status} />
          <Circle percent={percent} strokeColor={color} status={status} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<DynamicProgress />);
```

<!--end-code-->
