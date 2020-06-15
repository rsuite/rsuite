### 栅格推拉

<!--start-code-->

```js
const instance = (
  <Grid fluid>
    <Row className="show-grid">
      <Col xs={12} xsPush={12}>
        xs={12} xsPush={12} `left`
      </Col>
      <Col xs={12} xsPull={12}>
        xs={12} xsPull={12} `right`
      </Col>
    </Row>

    <Row className="show-grid">
      <Col xs={6}>xs={6} `left`</Col>
      <Col xs={6} xsPush={12}>
        xs={6} xsPush={12} `right`
      </Col>
    </Row>

    <Row className="show-grid">
      <Col xs={6} xsPush={18}>
        xs={6} xsPush={18} `left`
      </Col>
      <Col xs={6} xsPull={6}>
        xs={6} xsPull={6} `right`
      </Col>
    </Row>
  </Grid>
);
ReactDOM.render(instance);
```

<!--end-code-->
