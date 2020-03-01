### Responsive

<!--start-code-->

```js
const instance = (
  <Grid fluid>
    <Row className="show-grid">
      <Col xs={24} sm={24} md={8}>
        xs={24} sm={24} md={6}
      </Col>
      <Col xs={24} sm={24} md={8}>
        xs={24} sm={24} md={6}
      </Col>
      <Col xs={24} sm={24} md={8}>
        xs={24} sm={24} md={6}
      </Col>
    </Row>

    <Row className="show-grid">
      <Col xs={24} sm={24} md={8} lg={6}>
        xs={24} sm={12} md={6}
      </Col>
      <Col xs={24} sm={12} md={8} lg={12}>
        xs={24} sm={12} md={6}
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        xs={24} sm={12} md={6}
      </Col>
    </Row>
  </Grid>
);
ReactDOM.render(instance);
```

<!--end-code-->
