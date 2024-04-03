<!--start-code-->

```js
import { Text } from 'rsuite';

const App = () => (
  <>
    <Text weight="thin">Thin text</Text>
    <Text weight="light">Light text</Text>
    <Text weight="regular">Regular text (default) </Text>
    <Text weight="medium">Medium text</Text>
    <Text weight="semibold">Semibold text</Text>
    <Text weight="bold">Bold text</Text>
    <Text weight="extrabold">Extrabold text</Text>
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->

| Weight    | Font weight |
| --------- | ----------- |
| thin      | 100         |
| light     | 300         |
| regular   | 400         |
| medium    | 500         |
| semibold  | 600         |
| bold      | 700         |
| extrabold | 800         |
