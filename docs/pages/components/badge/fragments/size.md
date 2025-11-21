<!--start-code-->

```js
import { Badge, Avatar, HStack } from 'rsuite';

const App = () => (
  <>
    <HStack spacing={10} wrap>
      <Badge content={6} size="xs">
        <Avatar />
      </Badge>
      <Badge content={6} size="sm">
        <Avatar />
      </Badge>
      <Badge content={6} size="md">
        <Avatar />
      </Badge>
      <Badge content={6} size="lg">
        <Avatar />
      </Badge>
      <Badge content={6} size="xl">
        <Avatar />
      </Badge>
    </HStack>
    <hr />
    <HStack spacing={10} wrap>
      <Badge content="Xsmall" size="xs" />
      <Badge content="Small" size="sm" />
      <Badge content="Medium" size="md" />
      <Badge content="Large" size="lg" />
      <Badge content="Xlarge" size="xl" />
    </HStack>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
