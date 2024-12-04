<!--start-code-->

```js
import { Card, Text } from 'rsuite';

const App = () => {
  return (
    <Card width={320} shaded="hover">
      <Card.Header as="h5">John Doe</Card.Header>
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
