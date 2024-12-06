<!--start-code-->

```js
import { List, RadioGroup, Radio } from 'rsuite';

const data = ['Roses are red', 'Violets are blue', 'Sugar is sweet', 'And so are you'];

const App = () => {
  const [size, setSize] = React.useState('sm');
  return (
    <>
      <RadioGroup inline appearance="picker" value={size} onChange={setSize}>
        <RadioLabel>Size: </RadioLabel>
        <Radio value="xs">Extra Small</Radio>
        <Radio value="sm">Small</Radio>
        <Radio value="md">Medium</Radio>
        <Radio value="lg">Large</Radio>
      </RadioGroup>

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

const RadioLabel = ({ children }) => <label style={{ padding: 7 }}>{children}</label>;
```

<!--end-code-->
