<!--start-code-->

```js
import { Text, Box } from 'rsuite';

const App = () => (
  <Box w={500} p={10} bd="1px solid #ddd">
    <Text maxLines={1}>
      Max lines is 1: This is a long text that will be truncated with an ellipsis. To demonstrate
      the effect, we copied the text several times. This is a long text that will be truncated with
      an ellipsis. To demonstrate the effect, we copied the text several times. This is a long text
      that will be truncated with an ellipsis. To demonstrate the effect, we copied the text several
      times.
    </Text>

    <hr />

    <Text maxLines={3}>
      Max lines is 2: This is a long text that will be truncated with an ellipsis. To demonstrate
      the effect, we copied the text several times. This is a long text that will be truncated with
      an ellipsis. To demonstrate the effect, we copied the text several times. This is a long text
      that will be truncated with an ellipsis. To demonstrate the effect, we copied the text several
      times.
    </Text>
  </Box>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
