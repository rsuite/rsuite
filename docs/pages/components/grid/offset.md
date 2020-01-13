### 偏移

<!--start-code-->

```js
const instance = (
  <Grid fluid>
    <Row className="show-grid">
      <Col md={4} mdOffset={20}>
        xs={4} xsOffset={20}
      </Col>
    </Row>

    <Row className="show-grid">
      <Col xs={8} xsOffset={16}>
        xs={8} xsOffset={16}
      </Col>
    </Row>

    <Row className="show-grid">
      <Col xs={12} xsOffset={12}>
        xs={12} xsOffset={12}
      </Col>
    </Row>

    <Row className="show-grid">
      <Col xs={16} xsOffset={8}>
        xs={16} xsOffset={8}
      </Col>
    </Row>

    <Row className="show-grid">
      <Col xs={20} xsOffset={4}>
        xs={20} xsOffset={4}
      </Col>
    </Row>
  </Grid>
);
ReactDOM.render(instance);
```

<!--end-code-->
