### 外观

<!--start-code-->

```js
const styles = {
  radioGroupLabel: {
    padding: '8px 12px',
    display: 'inline-block',
    verticalAlign: 'middle'
  }
};
function App() {
  const [placement, setPlacement] = React.useState('bottom');
  const [shape, setShape] = React.useState('dot');

  function updatePlacement(value) {
    setPlacement(value);
  }

  function updateShape(value) {
    setShape(value);
  }

  return (
    <div>
      <RadioGroup
        name="radioList"
        inline
        appearance="picker"
        defaultValue={placement}
        onChange={updatePlacement}
      >
        <span style={styles.radioGroupLabel}>Placement: </span>
        <Radio value="top">Top</Radio>
        <Radio value="bottom">Bottom</Radio>
        <Radio value="left">Left</Radio>
        <Radio value="right">Right</Radio>
      </RadioGroup>
      <Divider vertical />
      <RadioGroup
        name="radioList"
        inline
        appearance="picker"
        defaultValue={shape}
        onChange={updateShape}
      >
        <span style={styles.radioGroupLabel}>Shape: </span>
        <Radio value="dot">Dot</Radio>
        <Radio value="bar">Bar</Radio>
      </RadioGroup>
      <Carousel
        key={`${placement}.${shape}`}
        placement={placement}
        shape={shape}
        className="custom-slider"
      >
        <img
          src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=1"
          height="250"
        />
        <img
          src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=2"
          height="250"
        />
        <img
          src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=3"
          height="250"
        />
        <img
          src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=4"
          height="250"
        />
        <img
          src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5"
          height="250"
        />
      </Carousel>
    </div>
  );
}

ReactDOM.render(<App />);
```

<!--end-code-->
