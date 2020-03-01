### 自定义图标

<!--start-code-->

```js
const instance = (
  <Timeline className="custom-timeline">
    <Timeline.Item dot={<Icon icon="credit-card" size="2x" />}>
      <p>03-01 10:20</p>
      <p>您的订单开始处理</p>
    </Timeline.Item>
    <Timeline.Item>
      <p>03-01 11:34</p>
      <p>包裹真正等待收揽</p>
    </Timeline.Item>
    <Timeline.Item>
      <p>03-01 16:20</p>
      <p>[已揽件]</p>
      <p>北京公司已经揽件</p>
    </Timeline.Item>
    <Timeline.Item dot={<Icon icon="plane" size="2x" />}>
      <p>03-02 06:12</p>
      <p>[运输中]</p>
      <p>订单已出库，从北京发送到上海</p>
    </Timeline.Item>
    <Timeline.Item dot={<Icon icon="truck" size="2x" />}>
      <p>03-02 09:20</p>
      <p>[运输中]</p>
      <p>从上海集装中心发送到配送中心</p>
    </Timeline.Item>
    <Timeline.Item dot={<Icon icon="user" size="2x" />}>
      <p>03-03 14:20</p>
      <p>[派送中]</p>
      <p>上海市虹口区公司派送员：李先生, 当前正在为您派件</p>
    </Timeline.Item>
    <Timeline.Item
      dot={
        <Icon
          icon="check"
          size="2x"
          style={{ background: '#15b215', color: '#fff' }}
        />
      }
    >
      <p>03-03 17:50</p>
      <p>[已签收]]</p>
      <p>您的快递已到达，签收人 前台</p>
    </Timeline.Item>
  </Timeline>
);

ReactDOM.render(instance);

/**
.custom-timeline {
  margin-left: 20px;
}

.custom-timeline .rs-timeline-item-custom-dot .rs-icon {
  position: absolute;
  background: #fff;
  top: 0;
  left: -2px;
  border: 2px solid #ddd;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 18px;
  padding-top: 9px;
  color: #999;
  margin-left: -13px;
}

.custom-timeline .rs-timeline-item-content {
  margin-left: 24px;
}
**/
```

<!--end-code-->
