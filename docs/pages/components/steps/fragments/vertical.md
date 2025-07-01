<!--start-code-->

```js
import { Steps, ButtonGroup, Button } from 'rsuite';

const OrderStatus = () => {
  const [current, setCurrent] = React.useState(1);

  return (
    <div>
      <Steps current={current} vertical>
        <Steps.Item title="Order Placed" description="June 28, 10:00 AM" />
        <Steps.Item title="Processing" description="Preparing your order" />
        <Steps.Item title="Shipped" description="On the way" />
        <Steps.Item title="Delivered" description="Estimated: July 1 - July 3" />
      </Steps>
      <hr />
      <ButtonGroup>
        <Button onClick={() => setCurrent(p => Math.max(0, p - 1))}>Previous</Button>
        <Button onClick={() => setCurrent(p => Math.min(3, p + 1))}>Next</Button>
      </ButtonGroup>
    </div>
  );
};

ReactDOM.render(<OrderStatus />, document.getElementById('root'));
```

<!--end-code-->
