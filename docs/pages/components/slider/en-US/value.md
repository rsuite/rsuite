### Show value (Controlled)

<!-- start-code -->

```js
function Example1() {
  const [value, setValue] = React.useState(0);
  return (
    <Row>
      <Col md={10}>
        <Slider
          progress
          style={{ marginTop: 16 }}
          value={value}
          onChange={value => {
            setValue(value);
          }}
        />
      </Col>
      <Col md={4}>
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
      <Col md={10}>
        <RangeSlider
          progress
          style={{ marginTop: 16 }}
          value={value}
          onChange={value => {
            setValue(value);
          }}
        />
      </Col>
      <Col md={8}>
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
      <Col md={10}>
        <RangeSlider
          progress
          style={{ marginTop: 16 }}
          value={value}
          onChange={value => {
            setValue([value[0], 100]);
          }}
        />
      </Col>
      <Col md={8}>
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

const instance = (
  <div>
    <Example1 />
    <hr />
    <Example2 />
    <hr />
    <Example3 />
  </div>
);

ReactDOM.render(instance);
```

<!-- end-code -->
