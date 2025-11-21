<!--start-code-->

```js
import { Carousel, SegmentedControl, Divider, Text } from 'rsuite';

function App() {
  const [placement, setPlacement] = React.useState('bottom');
  const [shape, setShape] = React.useState('dot');

  return (
    <>
      <SegmentedControl
        data={[
          { value: 'top', label: 'Top' },
          { value: 'bottom', label: 'Bottom' },
          { value: 'left', label: 'Left' },
          { value: 'right', label: 'Right' }
        ]}
        value={placement}
        onChange={setPlacement}
      />
      <Divider vertical />
      <SegmentedControl
        data={[
          { value: 'dot', label: 'Dot' },
          { value: 'bar', label: 'Bar' }
        ]}
        value={shape}
        onChange={setShape}
      />
      <hr />
      <Carousel key={`${placement}.${shape}`} placement={placement} shape={shape} w={600} h={250}>
        <img src="https://placehold.co/600x250/8f8e94/FFFFFF?text=1" height="250" />
        <img src="https://placehold.co/600x250/8f8e94/FFFFFF?text=2" height="250" />
        <img src="https://placehold.co/600x250/8f8e94/FFFFFF?text=3" height="250" />
        <img src="https://placehold.co/600x250/8f8e94/FFFFFF?text=4" height="250" />
        <img src="https://placehold.co/600x250/8f8e94/FFFFFF?text=5" height="250" />
      </Carousel>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
