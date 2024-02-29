<!-- start-code -->

```js
import { Slider, RangeSlider, Row, Col, InputGroup, InputNumber } from 'rsuite';

function Example1() {
  const [value, setValue] = React.useState(0);
  return (
    <Row>
      <Col md={10} xs={12}>
        <Slider
          progress
          style={{ marginTop: 16 }}
          value={value}
          onChange={value => {
            setValue(value);
          }}
        />
      </Col>
      <Col md={4} xs={12}>
        <InputNumber
          min={0}
          max={100}
          value={value}
          onChange={value => {
            setValue(value);
          }}
        />
      </Col>
    </Row>
  );
}

function Example2() {
  const [value, setValue] = React.useState([10, 50]);
  return (
    <Row>
      <Col md={10} xs={12}>
        <RangeSlider
          progress
          style={{ marginTop: 16 }}
          value={value}
          onChange={value => {
            setValue(value);
          }}
        />
      </Col>
      <Col md={8} xs={12}>
        <InputGroup>
          <InputNumber
            min={0}
            max={100}
            value={value[0]}
            onChange={nextValue => {
              const [start, end] = value;
              if (nextValue > end) {
                return;
              }
              setValue([nextValue, end]);
            }}
          />
          <InputGroup.Addon>to</InputGroup.Addon>
          <InputNumber
            min={0}
            max={100}
            value={value[1]}
            onChange={nextValue => {
              const [start, end] = value;
              if (start > nextValue) {
                return;
              }
              setValue([start, nextValue]);
            }}
          />
        </InputGroup>
      </Col>
    </Row>
  );
}

function Example3() {
  const [value, setValue] = React.useState([10, 100]);

  return (
    <Row>
      <p>Fixed end value</p>
      <Col md={10} xs={12}>
        <RangeSlider
          progress
          style={{ marginTop: 16 }}
          value={value}
          onChange={value => {
            setValue([value[0], 100]);
          }}
        />
      </Col>
      <Col md={8} xs={12}>
        <InputGroup>
          <InputNumber
            min={0}
            max={100}
            value={value[0]}
            onChange={nextValue => {
              const [start, end] = value;
              if (nextValue > end) {
                return;
              }
              setValue([nextValue, end]);
            }}
          />
          <InputGroup.Addon>to</InputGroup.Addon>
          <InputNumber min={0} max={100} value={value[1]} disabled />
        </InputGroup>
      </Col>
    </Row>
  );
}

const App = () => (
  <>
    <Example1 />
    <hr />
    <Example2 />
    <hr />
    <Example3 />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!-- end-code -->
