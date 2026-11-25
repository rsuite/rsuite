<!--start-code-->

```js
import { Timeline, Grid, Row, Col, Text } from 'rsuite';

const AlignTimeline = ({ align }) => (
  <Timeline align={align}>
    <Timeline.Item>
      <Text>2018-03-01</Text>
      <Text>Your order starts processing</Text>
    </Timeline.Item>
    <Timeline.Item>
      <Text>2018-03-02</Text>
      <Text>Order out of stock</Text>
    </Timeline.Item>
    <Timeline.Item>
      <Text>2018-03-10</Text>
      <Text>Arrival</Text>
    </Timeline.Item>
    <Timeline.Item>
      <Text>2018-03-12</Text>
      <Text>Order out of the library</Text>
    </Timeline.Item>
    <Timeline.Item>
      <Text>2018-03-15</Text>
      <Text>Sending you a piece</Text>
    </Timeline.Item>
  </Timeline>
);

const App = () => (
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

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
