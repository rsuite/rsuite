<!--start-code-->

```js
import Icon from '@rsuite/icons/Icon';
import { Timeline, Text } from 'rsuite';
import { FaPlane, FaTruck, FaUser, FaCheck, FaCreditCard } from 'react-icons/fa';

const App = () => (
  <>
    <Timeline className="custom-timeline">
      <Timeline.Item dot={<Icon as={FaCreditCard} />}>
        <Text muted>March 1, 10:20</Text>
        <Text>Your order starts processing</Text>
      </Timeline.Item>
      <Timeline.Item>
        <Text muted>March 1, 11:34</Text>
        <Text>The package really waits for the company to pick up the goods</Text>
      </Timeline.Item>
      <Timeline.Item>
        <Text muted>March 1, 16:20</Text>
        <Text>[Packed]</Text>
        <Text>Beijing company has received the shipment</Text>
      </Timeline.Item>
      <Timeline.Item dot={<Icon as={FaPlane} />}>
        <Text muted>March 2, 06:12</Text>
        <Text>[In transit]</Text>
        <Text>Order has been shipped from Beijing to Shanghai</Text>
      </Timeline.Item>
      <Timeline.Item dot={<Icon as={FaTruck} />}>
        <Text muted>March 2, 09:20</Text>
        <Text>[In transit]</Text>
        <Text>Sended from the Shanghai Container Center to the distribution center</Text>
      </Timeline.Item>
      <Timeline.Item dot={<Icon as={FaUser} />}>
        <Text muted>March 3, 14:20</Text>
        <Text>[Delivery]</Text>
        <Text>
          Shanghai Hongkou District Company Deliverer: Mr. Li, currently sending you a shipment
        </Text>
      </Timeline.Item>
      <Timeline.Item dot={<Icon as={FaCheck} style={{ background: '#15b215', color: '#fff' }} />}>
        <Text muted>March 3, 17:50</Text>
        <Text>[Received]]</Text>
        <Text>Your courier has arrived and the signer is the front desk</Text>
      </Timeline.Item>
    </Timeline>
    <style>
      {`.custom-timeline {
        margin-left: 20px;

        .rs-timeline-item-custom-dot {
          .rs-icon {
            position: absolute;
            background: #fff;
            top: 0;
            left: -2px;
            border: 2px solid #ddd;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 18px;
            color: #999;
            margin-left: -13px;
            justify-content: center;
            padding: 8px;
          }
        }

        .rs-timeline-item-content {
          margin-left: 24px;
        }
      }
    `}
    </style>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
