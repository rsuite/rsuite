```js
import { createIconFont } from '@rsuite/icons';

const IconFont = createIconFont({
  // Icon resource: https://www.iconfont.cn/
  scriptUrl: '//at.alicdn.com/t/font_2144422_r174s9i1orl.js'
});
```

<!--start-code-->

```js
import { createIconFont } from '@rsuite/icons';

const IconFont = createIconFont({
  scriptUrl: '//at.alicdn.com/t/font_2144422_r174s9i1orl.js',
  commonProps: { style: { fontSize: 30, color: '#1675e0' } },
  onLoaded: () => {
    console.log('onLoaded');
  }
});

const App = () => (
  <div style={{ display: 'flex', gap: 10 }}>
    <IconFont icon="rs-iconuser-badge" />
    <IconFont icon="rs-iconmember" />
    <IconFont icon="rs-icongear-16" spin />
    <IconFont icon="rs-iconreload" pulse />
    <IconFont icon="rs-iconnotice" rotate={90} />
    <IconFont icon="rs-iconrandom" />
    <IconFont icon="rs-iconrandom" flip="horizontal" />
    <IconFont icon="rs-icongrowth" />
    <IconFont icon="rs-icongrowth" flip="vertical" />
    <IconFont icon="rs-iconemail-fill" />
    <IconFont icon="rs-iconemail" />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
