<!--start-code-->

```js
import { Rate, HStack, Text } from 'rsuite';

const texts = {
  1: 'Useless',
  2: 'Poor',
  3: 'Ok',
  4: 'Good',
  5: 'Excellent'
};

const App = () => {
  const [hoverValue, setHoverValue] = React.useState(3);

  return (
    <HStack spacing={10}>
      <Rate defaultValue={3} onChangeActive={setHoverValue} />
      <Text>{texts[hoverValue]}</Text>
    </HStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
