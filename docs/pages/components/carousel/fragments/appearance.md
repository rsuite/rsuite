<!--start-code-->

```js
import { Carousel, RadioGroup, Radio, Divider } from 'rsuite';

const RadioLabel = ({ children }) => <label style={{ padding: 7 }}>{children}</label>;

function App() {
  const [placement, setPlacement] = React.useState('bottom');
  const [shape, setShape] = React.useState('dot');

  return (
    <>
      <RadioGroup
        name="radioList"
        inline
        appearance="picker"
        defaultValue={placement}
        onChange={setPlacement}
      >
        <RadioLabel>Placement: </RadioLabel>
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
        onChange={setShape}
      >
        <RadioLabel>Shape: </RadioLabel>
        <Radio value="dot">Dot</Radio>
        <Radio value="bar">Bar</Radio>
      </RadioGroup>
      <Carousel
        key={`${placement}.${shape}`}
        placement={placement}
        shape={shape}
        className="custom-slider"
      >
        <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=1" height="250" />
        <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=2" height="250" />
        <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=3" height="250" />
        <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=4" height="250" />
        <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5" height="250" />
      </Carousel>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
