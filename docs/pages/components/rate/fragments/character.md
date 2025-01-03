<!--start-code-->

```js
import { Rate, VStack } from 'rsuite';
import { FaHeart } from 'react-icons/fa';

const App = () => {
  const [value, setValue] = React.useState(2.5);
  return (
    <VStack>
      <Rate allowHalf value={value} character={<FaHeart />} color="red" onChange={setValue} />
      <Rate allowHalf value={value} character="鼎" color="blue" onChange={setValue} />
      <Rate allowHalf value={value} character="A" onChange={setValue} />
      <Rate allowHalf value={value} character="👍" onChange={setValue} />
    </VStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
