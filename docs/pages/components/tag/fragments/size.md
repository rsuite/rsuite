<!--start-code-->

```js
import { VStack, TagGroup, Tag } from 'rsuite';

const App = () => (
  <VStack spacing={20}>
    <TagGroup>
      <Tag size="lg">Large</Tag>
      <Tag size="md">Medium</Tag>
      <Tag size="sm">Small</Tag>
    </TagGroup>

    <TagGroup>
      <Tag size="lg" closable>
        Large
      </Tag>
      <Tag size="md" closable>
        Medium
      </Tag>
      <Tag size="sm" closable>
        Small
      </Tag>
    </TagGroup>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
