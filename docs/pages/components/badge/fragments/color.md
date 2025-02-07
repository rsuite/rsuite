<!--start-code-->

```js
import { Badge, Avatar, HStack } from 'rsuite';

const App = () => (
  <>
    <HStack spacing={10}>
      <Badge color="red" content={6}>
        <Avatar />
      </Badge>
      <Badge color="orange" content={6}>
        <Avatar />
      </Badge>
      <Badge color="yellow" content={6}>
        <Avatar />
      </Badge>
      <Badge color="green" content={6}>
        <Avatar />
      </Badge>
      <Badge color="cyan" content={6}>
        <Avatar />
      </Badge>
      <Badge color="blue" content={6}>
        <Avatar />
      </Badge>
      <Badge color="violet" content={6}>
        <Avatar />
      </Badge>
      <Badge color="#000000" content={6} content="Custom">
        <Avatar />
      </Badge>
    </HStack>
    <hr />
    <HStack spacing={10}>
      <Badge color="red" content="red" />
      <Badge color="orange" content="orange" />
      <Badge color="yellow" content="yellow" />
      <Badge color="green" content="green" />
      <Badge color="cyan" content="cyan" />
      <Badge color="blue" content="blue" />
      <Badge color="violet" content="violet" />
      <Badge color="#000000" content={6} content="custom" />
    </HStack>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
