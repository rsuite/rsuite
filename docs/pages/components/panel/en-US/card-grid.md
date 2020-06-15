### Card Group

<!--start-code-->

```js
const Card = props => (
  <Panel {...props} bordered header="Card title">
    <Paragraph />
  </Panel>
);

const instance = (
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

ReactDOM.render(instance);
```

<!--end-code-->
