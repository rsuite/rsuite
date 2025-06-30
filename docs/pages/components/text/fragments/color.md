<!--start-code-->

```js
import { Text } from 'rsuite';

const App = () => (
  <>
    {/* Preset Colors */}
    <Text color="red">Red text</Text>
    <Text color="orange">Orange text</Text>
    <Text color="yellow">Yellow text</Text>
    <Text color="green">Green text</Text>
    <Text color="cyan">Cyan text</Text>
    <Text color="blue">Blue text</Text>
    <Text color="violet">Violet text</Text>

    {/* Custom Colors */}
    <Text color="#FF5733">Custom hex color</Text>
    <Text color="rgb(51, 255, 87)">Custom RGB color</Text>
    <Text color="hsl(200, 100%, 50%)">Custom HSL color</Text>
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
