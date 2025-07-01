<!--start-code-->

```js
import { Steps } from 'rsuite';

const OrderStatus = () => (
  <Steps current={1}>
    <Steps.Item title="Order Placed" description="June 28, 10:00 AM - Order #12345" />
    <Steps.Item title="Processing" description="June 28, 10:05 AM - Payment confirmed" />
    <Steps.Item title="Shipped" description="June 29, 2:30 PM - Shipped via Express Delivery" />
    <Steps.Item title="Delivered" description="Estimated delivery: July 1 - July 3" />
  </Steps>
);

ReactDOM.render(<OrderStatus />, document.getElementById('root'));
```

<!--end-code-->
