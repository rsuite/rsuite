<!--start-code-->

```js
import { TagGroup, Tag } from 'rsuite';

const App = () => (
  <TagGroup>
    <Tag color="red">Red</Tag>
    <Tag color="orange">Orange</Tag>
    <Tag color="yellow">Yellow</Tag>
    <Tag color="green">Green</Tag>
    <Tag color="cyan">Cyan</Tag>
    <Tag color="blue">Blue</Tag>
    <Tag color="violet">Violet</Tag>
    <Tag color="#000">Custom Color</Tag>
    <Tag color="#c5e7fc">Custom Color</Tag>
  </TagGroup>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
