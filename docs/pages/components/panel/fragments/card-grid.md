<!--start-code-->

```js
import { Panel, Placeholder, Row, Col } from 'rsuite';

const Card = props => (
  <Panel {...props} bordered header="Card title">
    <Placeholder.Paragraph />
  </Panel>
);

const App = () => (
  <Row>
    <Col md={6} sm={12}>
      <Card />
    </Col>
    <Col md={6} sm={12}>
      <Card />
    </Col>
    <Col md={6} sm={12}>
      <Card />
    </Col>
    <Col md={6} sm={12}>
      <Card />
    </Col>
  </Row>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
