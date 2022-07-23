<!--start-code-->

```js
import { Steps } from 'rsuite';
import PencilSquareIcon from '@rsuite/icons/legacy/PencilSquare';
import BookIcon from '@rsuite/icons/legacy/Book';
import WechatIcon from '@rsuite/icons/Wechat';
import SteamSquareIcon from '@rsuite/icons/legacy/SteamSquare';

const App = () => (
  <Steps current={1}>
    <Steps.Item title="Finished" icon={<PencilSquareIcon style={{ fontSize: 20 }} />} />
    <Steps.Item title="In Progress" icon={<BookIcon style={{ fontSize: 20 }} />} />
    <Steps.Item title="Waiting" icon={<WechatIcon style={{ fontSize: 20 }} />} />
    <Steps.Item title="Waiting" icon={<SteamSquareIcon style={{ fontSize: 20 }} />} />
  </Steps>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
