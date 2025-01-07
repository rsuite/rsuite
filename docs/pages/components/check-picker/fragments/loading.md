<!--start-code-->

```js
import { CheckPicker, VStack, RadioGroup, Radio } from 'rsuite';

const data = [];
const sizes = ['xs', 'sm', 'md', 'lg'];

const App = () => {
  const [size, setSize] = React.useState('md');

  return (
    <>
      <RadioGroup
        inline
        name="radioList"
        appearance="picker"
        value={size}
        onChange={size => setSize(size)}
      >
        <RadioLabel>Size:</RadioLabel>
        {sizes.map(item => (
          <Radio value={item} key={item}>
            {item}
          </Radio>
        ))}
      </RadioGroup>
      <hr />
      <VStack>
        <CheckPicker data={data} loading size={size} />
        <CheckPicker data={data} loading style={{ width: 200 }} size={size} />
        <CheckPicker label="User" data={data} loading size={size} />
        <CheckPicker label="User" data={data} loading style={{ width: 200 }} size={size} />
      </VStack>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

const RadioLabel = ({ children }) => <label style={{ padding: 7 }}>{children}</label>;
```

<!--end-code-->
