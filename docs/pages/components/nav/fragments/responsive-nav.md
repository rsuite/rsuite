```
import ResponsiveNav from '@rsuite/responsive-nav';
```

<!--start-code-->

```js
import { Slider, Box } from 'rsuite';
import ResponsiveNav from '@rsuite/responsive-nav';

const items = [
  { eventKey: 'A', label: 'Item A' },
  { eventKey: 'B', label: 'Item B' },
  { eventKey: 'C', label: 'Item C' },
  { eventKey: 'D', label: 'Item D' },
  { eventKey: 'E', label: 'Item E' },
  { eventKey: 'F', label: 'Item F' },
  { eventKey: 'G', label: 'Item G' },
  { eventKey: 'H', label: 'Item H' },
  { eventKey: 'I', label: 'Item I' },
  { eventKey: 'J', label: 'Item J' },
  { eventKey: 'K', label: 'Item K' },
  { eventKey: 'L', label: 'Item L' },
  { eventKey: 'M', label: 'Item M' },
  { eventKey: 'N', label: 'Item N' }
];

const App = () => {
  const [activeKey, setActiveKey] = React.useState('A');
  const [width, setWidth] = React.useState(400);

  return (
    <>
      <Box w={width} bd="1px solid #ddd" p={10}>
        <ResponsiveNav activeKey={activeKey} onSelect={setActiveKey} appearance="tabs">
          {items.map(item => (
            <ResponsiveNav.Item key={item.eventKey} eventKey={item.eventKey}>
              {item.label}
            </ResponsiveNav.Item>
          ))}
        </ResponsiveNav>
      </Box>
      <hr />
      <Slider w={500} min={300} max={700} progress step={50} value={width} onChange={setWidth} />
    </>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
