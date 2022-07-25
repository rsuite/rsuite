<!--start-code-->

```js
import { Timeline } from 'rsuite';
import CreditCardIcon from '@rsuite/icons/legacy/CreditCard';
import PlaneIcon from '@rsuite/icons/legacy/Plane';
import TruckIcon from '@rsuite/icons/legacy/Truck';
import UserIcon from '@rsuite/icons/legacy/User';
import CheckIcon from '@rsuite/icons/legacy/Check';

const App = () => (
  <Timeline className="custom-timeline">
    <Timeline.Item dot={<CreditCardIcon />}>
      <p>March 1, 10:20</p>
      <p>Your order starts processing</p>
    </Timeline.Item>
    <Timeline.Item>
      <p>March 1, 11:34</p>
      <p>The package really waits for the company to pick up the goods</p>
    </Timeline.Item>
    <Timeline.Item>
      <p>March 1, 16:20</p>
      <p>[Packed]</p>
      <p>Beijing company has received the shipment</p>
    </Timeline.Item>
    <Timeline.Item dot={<PlaneIcon />}>
      <p>March 2, 06:12</p>
      <p>[In transit]</p>
      <p>Order has been shipped from Beijing to Shanghai</p>
    </Timeline.Item>
    <Timeline.Item dot={<TruckIcon />}>
      <p>March 2, 09:20</p>
      <p>[In transit]</p>
      <p>Sended from the Shanghai Container Center to the distribution center</p>
    </Timeline.Item>
    <Timeline.Item dot={<UserIcon />}>
      <p>March 3, 14:20</p>
      <p>[Delivery]</p>
      <p>Shanghai Hongkou District Company Deliverer: Mr. Li, currently sending you a shipment</p>
    </Timeline.Item>
    <Timeline.Item dot={<CheckIcon style={{ background: '#15b215', color: '#fff' }} />}>
      <p>March 3, 17:50</p>
      <p>[Received]]</p>
      <p>Your courier has arrived and the signer is the front desk</p>
    </Timeline.Item>
  </Timeline>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
