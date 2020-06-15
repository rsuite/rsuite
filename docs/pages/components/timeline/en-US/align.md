### Custom alignment

<!--start-code-->

```js
const AlignTimeline = ({ align }) => (
  <Timeline align={align}>
    <Timeline.Item>
      <p>2018-03-01</p>
      <p>Your order starts processing</p>
    </Timeline.Item>
    <Timeline.Item>
      <p>2018-03-02</p>
      <p>Order out of stock</p>
    </Timeline.Item>
    <Timeline.Item>
      <p>2018-03-10</p>
      <p>Arrival</p>
    </Timeline.Item>
    <Timeline.Item>
      <p>2018-03-12</p>
      <p>Order out of the library</p>
    </Timeline.Item>
    <Timeline.Item>
      <p>2018-03-15</p>
      <p>Sending you a piece</p>
    </Timeline.Item>
  </Timeline>
);
const instance = (
  <Grid fluid>
    <Row>
      <Col xs={8}>
        <AlignTimeline align="left" />
      </Col>
      <Col xs={8}>
        <AlignTimeline align="alternate" />
      </Col>
      <Col xs={8}>
        <AlignTimeline align="right" />
      </Col>
    </Row>
  </Grid>
);

ReactDOM.render(instance);
```

<!--end-code-->
