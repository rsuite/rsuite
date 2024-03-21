<!--start-code-->

```js
import { Button, ButtonToolbar } from 'rsuite';
import { FaFacebook, FaGooglePlus, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { SiWechat, SiSinaweibo } from 'react-icons/si';

const App = () => (
  <ButtonToolbar>
    <Button color="blue" appearance="primary" startIcon={<FaFacebook />}>
      Facebook
    </Button>
    <Button color="red" appearance="primary" startIcon={<FaGooglePlus />}>
      Google Plus
    </Button>
    <Button color="cyan" appearance="primary" startIcon={<FaTwitter />}>
      Twitter
    </Button>
    <Button color="blue" appearance="primary" endIcon={<FaLinkedin />}>
      LinkedIn
    </Button>
    <Button color="green" appearance="primary" endIcon={<SiWechat />}>
      WeChat
    </Button>
    <Button color="yellow" appearance="primary" endIcon={<SiSinaweibo />}>
      WeiBo
    </Button>
  </ButtonToolbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
