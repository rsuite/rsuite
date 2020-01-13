# DOMHelper

在 React 项目中，我们不推荐直接操作 DOM ， 但是在 RSUITE 组件内部，为了一些考虑不得不直接操作 DOM， 如果您也有类似的需求，可以直接使用这组方法。

获取方法

```js
import { DOMHelper } from 'rsuite';
const { addClass } = DOMHelper;
```

<!--{demo}-->

### 参考及使用的项目

* https://github.com/react-bootstrap/react-bootstrap
* https://github.com/facebook/fbjs
