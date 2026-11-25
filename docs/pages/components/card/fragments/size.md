<!--start-code-->

```js
import { Card, CardGroup, VStack } from 'rsuite';

const App = () => {
  return (
    <VStack spacing={10}>
      <Card size="sm">
        <Card.Header>
          <Text size="lg" bold>
            Card Header - Small
          </Text>
        </Card.Header>
        <Card.Body>
          This is a small card with a brief description to highlight key information or content. It
          can be used for various purposes like displaying details, statistics, or any relevant
          content.
        </Card.Body>
      </Card>
      <Card size="md">
        <Card.Header>
          <Text size="lg" bold>
            Card Header - Medium
          </Text>
        </Card.Header>
        <Card.Body>
          This is a medium card with a brief description to highlight key information or content. It
          can be used for various purposes like displaying details, statistics, or any relevant
          content.
        </Card.Body>
      </Card>
      <Card size="lg">
        <Card.Header>
          <Text size="lg" bold>
            Card Header - Large
          </Text>
        </Card.Header>
        <Card.Body>
          This is a large card with a brief description to highlight key information or content. It
          can be used for various purposes like displaying details, statistics, or any relevant
          content.
        </Card.Body>
      </Card>
    </VStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
