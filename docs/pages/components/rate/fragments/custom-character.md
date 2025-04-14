<!--start-code-->

```js
import { Rate } from 'rsuite';
import { FaFrown, FaMeh, FaSmile } from 'react-icons/fa';

const renderCharacter = (value, index) => {
  // unselected character
  if (value < index + 1) {
    return <FaMeh />;
  }
  if (value < 3) {
    return <FaFrown color="#99A9BF" />;
  }
  if (value < 4) {
    return <FaMeh color="#F4CA1D" />;
  }
  return <FaSmile color="#ff9800" />;
};

const App = () => (
  <>
    <VStack>
      <Rate defaultValue={1} renderCharacter={renderCharacter} />
      <Rate defaultValue={2} renderCharacter={renderCharacter} />
      <Rate defaultValue={3} renderCharacter={renderCharacter} />
      <Rate defaultValue={4} renderCharacter={renderCharacter} />
      <Rate defaultValue={5} renderCharacter={renderCharacter} />
    </VStack>

    <hr />
    <Rate max={10} defaultValue={2} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
