<!--start-code-->

```js
/**
 * import { AutoComplete } from 'rsuite';
 */

const data = [
  'HYPER Advertiser',
  'HYPER Web Analytics',
  'HYPER Video Analytics',
  'HYPER DMP',
  'HYPER Ad Serving',
  'HYPER Data Discovery'
];
const instance = (
  <div>
    <label>Disabled:</label>
    <AutoComplete data={data} disabled defaultValue="HYPER Web Analytics" />
    <hr />
    <label>Read only:</label>
    <AutoComplete data={data} readOnly defaultValue="HYPER Web Analytics" />
    <hr />
    <label>Plaintext:</label>
    <AutoComplete data={data} plaintext defaultValue="HYPER Web Analytics" />
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
