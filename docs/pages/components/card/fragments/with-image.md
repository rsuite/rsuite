<!--start-code-->

```js
import { Card, Text, Button, TagGroup, Tag } from 'rsuite';

const App = () => {
  return (
    <Card width={320} shaded>
      <img
        src="https://images.unsplash.com/photo-1619590694371-7eed5838e880?q=80&w=2083&auto=format&fit=crop"
        alt="Cream"
      />
      <Card.Header as="h5">Cream</Card.Header>
      <Card.Body>
        The dog's name is "Cream." She is a gentle and lovable senior Labrador with soft,
        cream-colored fur that radiates warmth.
      </Card.Body>
      <Card.Footer>
        <TagGroup>
          <Tag size="sm">Dog</Tag>
          <Tag size="sm">Pet</Tag>
          <Tag size="sm">Labrador</Tag>
        </TagGroup>
      </Card.Footer>
    </Card>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
