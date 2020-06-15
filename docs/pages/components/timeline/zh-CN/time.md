### 自定义时间轴时间

<!--start-code-->

```js
const TimelineWithTime = ({ align }) => (
  <Timeline align={align}>
    <Timeline.Item time="2019年11月5日 16:27">您的订单开始处理</Timeline.Item>
    <Timeline.Item time="2019年11月5日 18:00">您的订单待配货</Timeline.Item>
    <Timeline.Item time="昨天 16:28">您的包裹已出库</Timeline.Item>
    <Timeline.Item time="今天 10:05">发往上海虹口区</Timeline.Item>
    <Timeline.Item time="今天 15:05">正在为您派件</Timeline.Item>
  </Timeline>
);

const instance = (
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

ReactDOM.render(instance);
```

<!--end-code-->
