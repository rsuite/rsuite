<!--start-code-->

```js
import { Button, ButtonToolbar } from 'rsuite';
import FacebookOfficialIcon from '@rsuite/icons/legacy/FacebookOfficial';
import GooglePlusCircleIcon from '@rsuite/icons/legacy/GooglePlusCircle';
import TwitterIcon from '@rsuite/icons/legacy/Twitter';
import LinkedinIcon from '@rsuite/icons/legacy/Linkedin';
import WechatIcon from '@rsuite/icons/legacy/Wechat';
import WeiboIcon from '@rsuite/icons/legacy/Weibo';

const App = () => (
  <ButtonToolbar>
    <Button color="blue" appearance="primary">
      <FacebookOfficialIcon /> Facebook
    </Button>
    <Button color="red" appearance="primary">
      <GooglePlusCircleIcon /> Google Plus
    </Button>
    <Button color="cyan" appearance="primary">
      <TwitterIcon /> Twitter
    </Button>
    <Button color="blue" appearance="primary">
      <LinkedinIcon /> LinkedIn
    </Button>
    <Button color="green" appearance="primary">
      <WechatIcon /> WeChat
    </Button>
    <Button color="yellow" appearance="primary">
      <WeiboIcon /> WeiBo
    </Button>
  </ButtonToolbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
