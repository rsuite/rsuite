<!--start-code-->

```js
import { Steps, Panel, ButtonGroup, Button, Tag } from 'rsuite';
import { FaShoppingCart, FaBoxOpen, FaTruck, FaCheckCircle } from 'react-icons/fa';

const App = () => {
  const [step, setStep] = React.useState(0);
  const [orderStatus, setOrderStatus] = React.useState('Processing');

  const steps = [
    {
      title: 'Order Placed',
      description: 'Order received and confirmed',
      icon: <FaShoppingCart size={26} />,
      content: (
        <div>
          <p>
            <strong>Order #RS-2023-00145</strong>
          </p>
          <p>Date: June 28, 2023 14:30</p>
          <p>
            Payment: <Tag color="green">Paid</Tag>
          </p>
          <p>Estimated delivery: July 5, 2023</p>
        </div>
      )
    },
    {
      title: 'Processing',
      description: 'Preparing your order',
      icon: <FaBoxOpen size={26} />,
      content: (
        <div>
          <p>Items in this order:</p>
          <ul>
            <li>Wireless Earbuds Pro × 1</li>
            <li>Phone Case × 2</li>
            <li>Screen Protector × 1</li>
          </ul>
          <p>
            Status: <Tag color="blue">Packaging</Tag>
          </p>
        </div>
      )
    },
    {
      title: 'Shipped',
      description: 'On the way to you',
      icon: <FaTruck size={26} />,
      content: (
        <div>
          <p>
            Shipped with: <strong>Express Shipping</strong>
          </p>
          <p>Tracking #: EX123456789</p>
          <p>
            Estimated delivery: <strong>July 3, 2023</strong>
          </p>
          <p>
            Status: <Tag color="orange">In Transit</Tag>
          </p>
        </div>
      )
    },
    {
      title: 'Delivered',
      description: 'Order completed',
      icon: <FaCheckCircle size={26} />,
      content: (
        <div>
          <p>
            Delivered on: <strong>July 2, 2023 15:45</strong>
          </p>
          <p>Received by: Front Desk</p>
          <p>Delivery note: Left at the front door</p>
          <p>
            Status: <Tag color="green">Delivered</Tag>
          </p>
        </div>
      )
    }
  ];

  const onChange = nextStep => {
    const newStep = nextStep < 0 ? 0 : nextStep > steps.length - 1 ? steps.length - 1 : nextStep;
    setStep(newStep);
    setOrderStatus(steps[newStep].title);
  };

  const onNext = () => onChange(step + 1);
  const onPrevious = () => onChange(step - 1);

  return (
    <div>
      <Box mb={20}>
        <h4>Order Status: {orderStatus}</h4>
      </Box>

      <Steps current={step}>
        {steps.map((item, index) => (
          <Steps.Item
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </Steps>

      <Panel header={steps[step].title} bordered my={20}>
        {steps[step].content}
      </Panel>

      <ButtonGroup>
        <Button onClick={onPrevious} disabled={step === 0}>
          Previous
        </Button>
        <Button onClick={onNext} disabled={step === steps.length - 1}>
          {step === steps.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </ButtonGroup>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
