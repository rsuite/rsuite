<!--start-code-->

```js
import { Steps, ButtonGroup, Button } from 'rsuite';
import { FaShoppingCart, FaTruck, FaCheckCircle, FaBoxOpen } from 'react-icons/fa';

const OrderStatus = () => {
  const [current, setCurrent] = React.useState(1);

  return (
    <div>
      <Steps current={current} vertical>
        <Steps.Item
          title="Order Placed"
          description="2023-06-01 10:30 AM"
          icon={<FaShoppingCart size={26} />}
        />
        <Steps.Item
          title="Processing"
          description="Preparing your order"
          icon={<FaTruck size={26} />}
        />
        <Steps.Item title="Shipped" description="On the way" icon={<FaBoxOpen size={26} />} />
        <Steps.Item
          title="Delivered"
          description="Order completed"
          icon={<FaCheckCircle size={26} />}
        />
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
