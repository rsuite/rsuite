<!--start-code-->

```js
import { Text } from 'rsuite';

const App = () => (
  <div style={{ maxWidth: 500, border: '1px solid #ddd', padding: 10 }}>
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
  </div>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
