<!--start-code-->

```js
import { Button, IconButton, ButtonGroup, VStack } from 'rsuite';
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa6';

const App = () => (
  <VStack spacing={12}>
    <ButtonGroup>
      <Button>Bold</Button>
      <Button>Italic</Button>
      <Button>Underline</Button>
    </ButtonGroup>

    <ButtonGroup>
      <IconButton icon={<FaBold />} />
      <IconButton icon={<FaItalic />} />
      <IconButton icon={<FaUnderline />} />
    </ButtonGroup>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
