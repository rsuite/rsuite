<!-- start-code -->

```js
import { Slider, RangeSlider, Row, Col } from 'rsuite';

const App = () => {
  const style = { height: 400 };
  return (
    <Row>
      <Col md={2} xs={4}>
        <div style={style}>
          <Slider defaultValue={50} vertical />
        </div>
      </Col>

      <Col md={2} xs={4}>
        <div style={style}>
          <Slider defaultValue={50} vertical progress />
        </div>
      </Col>
      <Col md={2} xs={4}>
        <div style={style}>
          <RangeSlider defaultValue={[10, 50]} vertical />
        </div>
      </Col>
      <Col md={2} xs={4}>
        <div style={style}>
          <Slider defaultValue={50} min={0} step={10} max={100} graduated vertical progress />
        </div>
      </Col>
      <Col md={2} xs={4}>
        <div style={style}>
          <RangeSlider min={0} step={10} max={100} defaultValue={[10, 50]} vertical graduated />
        </div>
      </Col>
      <Col md={2} xs={4}>
        <div style={style}>
          <Slider
            defaultValue={50}
            min={0}
            step={10}
            max={100}
            graduated
            vertical
            progress
            renderMark={mark => {
              return <span>{mark} °C</span>;
            }}
          />
        </div>
      </Col>
    </Row>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
```

<!-- end-code -->
