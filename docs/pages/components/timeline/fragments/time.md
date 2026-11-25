<!--start-code-->

```js
import { Timeline, Grid, Row, Col } from 'rsuite';

const TimelineWithTime = ({ align }) => (
  <Timeline align={align}>
    <Timeline.Item time="November 5, 2019 16:27">Your order starts processing</Timeline.Item>
    <Timeline.Item time="November 5, 2019 18:00">Your order to be ready for delivery</Timeline.Item>
    <Timeline.Item time="Yesterday 16:28">Your parcel has been out of the library</Timeline.Item>
    <Timeline.Item time="Today 02:34">Send to Shanghai Hongkou Company</Timeline.Item>
    <Timeline.Item time="Today 15:05">Sending you a piece</Timeline.Item>
  </Timeline>
);

const App = () => (
  <Grid fluid>
    <Row>
      <Col xs={8}>
        <TimelineWithTime align="left" />
      </Col>
      <Col xs={8}>
        <TimelineWithTime align="alternate" />
      </Col>
      <Col xs={8}>
        <TimelineWithTime align="right" />
      </Col>
    </Row>
  </Grid>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
