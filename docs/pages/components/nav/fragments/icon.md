<!--start-code-->

```js
import { Nav } from 'rsuite';

import FacebookSquareIcon from '@rsuite/icons/legacy/FacebookSquare';
import GithubAltIcon from '@rsuite/icons/legacy/GithubAlt';
import CircleIcon from '@rsuite/icons/legacy/Circle';
import ChromeIcon from '@rsuite/icons/legacy/Chrome';
import EllipsisHIcon from '@rsuite/icons/legacy/EllipsisH';
import DropboxIcon from '@rsuite/icons/legacy/Dropbox';
import FirefoxIcon from '@rsuite/icons/legacy/Firefox';
import GitlabIcon from '@rsuite/icons/legacy/Gitlab';
import LinuxIcon from '@rsuite/icons/legacy/Linux';

const App = () => (
  <Nav>
    <Nav.Item icon={<FacebookSquareIcon />}>facebook</Nav.Item>
    <Nav.Item icon={<GithubAltIcon />}>github</Nav.Item>
    <Nav.Item icon={<CircleIcon />}>amazon</Nav.Item>
    <Nav.Item icon={<ChromeIcon />}>chrome</Nav.Item>
    <Nav.Menu icon={<EllipsisHIcon />} title="more...">
      <Nav.Item icon={<DropboxIcon />}>dropbox</Nav.Item>
      <Nav.Item icon={<FirefoxIcon />}>firefox</Nav.Item>
      <Nav.Item icon={<GitlabIcon />}>gitlab</Nav.Item>
      <Nav.Item icon={<LinuxIcon />}>linux</Nav.Item>
    </Nav.Menu>
  </Nav>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
