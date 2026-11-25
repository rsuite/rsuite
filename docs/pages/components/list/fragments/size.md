<!--start-code-->

```js
import { List, SegmentedControl } from 'rsuite';

const data = ['Roses are red', 'Violets are blue', 'Sugar is sweet', 'And so are you'];

const App = () => {
  const [size, setSize] = React.useState('sm');
  return (
    <>
      <SegmentedControl
        data={[
          { value: 'xs', label: 'Extra Small' },
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' }
        ]}
        value={size}
        onChange={setSize}
      />

      <hr />

      <List size={size}>
        {data.map((item, index) => (
          <List.Item key={index} index={index}>
            {item}
          </List.Item>
        ))}
      </List>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
