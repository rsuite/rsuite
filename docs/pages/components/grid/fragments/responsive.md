<!--start-code-->

```js
const instance = (
  <Grid fluid>
    <Row className="show-grid">
      <Col xs={24} sm={24} md={8}>
        xs={24} sm={24} md={8}
      </Col>
      <Col xs={24} sm={24} md={8}>
        xs={24} sm={24} md={8}
      </Col>
      <Col xs={24} sm={24} md={8}>
        xs={24} sm={24} md={8}
      </Col>
    </Row>

    <Row className="show-grid">
      <Col sm={24} md={8} lg={6}>
        sm={24} md={8}
      </Col>
      <Col sm={12} md={8} lg={12}>
        sm={12} md={6} lg={12}
      </Col>
      <Col sm={12} md={8} lg={6}>
        sm={12} md={8}
      </Col>
    </Row>

    <Row className="show-grid">
      <Col lg={6} xl={8} xxl={6}>
        lg={6} xl={8} xxl={6}
      </Col>
      <Col lg={12} xl={8} xxl={12}>
        lg={12} xl={6} xxl={12}
      </Col>
      <Col lg={6} xl={8} xxl={6}>
        lg={6} xl={8} xxl={6}
      </Col>
    </Row>
  </Grid>
);
ReactDOM.render(instance);
```

<!--end-code-->
