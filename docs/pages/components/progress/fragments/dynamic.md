<!--start-code-->

```js
import { Progress, ButtonGroup, Button, Row, Col } from 'rsuite';

const App = () => {
  const [percent, setPercent] = React.useState(30);

  const decline = () => {
    const value = Math.max(percent - 10, 0);
    setPercent(value);
  };

  const increase = () => {
    const value = Math.min(percent + 10, 100);
    setPercent(value);
  };

  const status = percent === 100 ? 'success' : null;
  const color = percent === 100 ? '#52c41a' : '#3385ff';

  return (
    <>
      <ButtonGroup>
        <Button onClick={decline}>-</Button>
        <Button onClick={increase}>+</Button>
      </ButtonGroup>
      <hr />
      <Progress.Line percent={percent} strokeColor={color} status={status} />
      <Row>
        <Col md={6}>
          <Progress.Line vertical percent={percent} strokeColor={color} status={status} />
        </Col>
        <Col md={6}>
          <div style={{ width: 120, marginTop: 10 }}>
            <Progress.Circle percent={percent} strokeColor={color} status={status} />
          </div>
        </Col>
      </Row>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
