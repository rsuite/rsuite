<!--start-code-->

```js
import { Card, Text, Avatar, HStack } from 'rsuite';

const App = () => {
  return (
    <Card width={320} shaded>
      <Card.Header>
        <HStack>
          <Avatar circle src="https://i.pravatar.cc/150?u=9" />
          <VStack spacing={2}>
            <Text>John Doe</Text>
            <Text muted size="sm">
              Software Engineer
            </Text>
          </VStack>
        </HStack>
      </Card.Header>
      <Card.Body>
        A passionate developer with a love for learning new technologies. Enjoys building innovative
        solutions and solving problems.
      </Card.Body>
      <Card.Footer>
        <Text muted>Joined in January 2023</Text>
      </Card.Footer>
    </Card>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
