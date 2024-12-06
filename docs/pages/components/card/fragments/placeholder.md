<!--start-code-->

```js
import { Card, Placeholder } from 'rsuite';

const App = () => {
  return (
    <Card width={320}>
      <Card.Header>
        <Placeholder.Paragraph graph="circle" active />
      </Card.Header>
      <Card.Body>
        <Placeholder.Graph active />
      </Card.Body>
    </Card>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
